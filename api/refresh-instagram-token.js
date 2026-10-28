// Runs weekly via Vercel Cron (see vercel.json). Instagram access tokens
// expire after 60 days; this refreshes the token, stores the new value in
// the project's environment variables, and triggers a production redeploy
// so the running functions pick it up. Requires env vars:
// INSTAGRAM_ACCESS_TOKEN, VERCEL_TOKEN, VERCEL_PROJECT_ID, VERCEL_TEAM_ID,
// CRON_SECRET (Vercel sends it as the Authorization bearer for cron calls).

module.exports = async (req, res) => {
  if (req.headers.authorization !== `Bearer ${process.env.CRON_SECRET}`) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  const { INSTAGRAM_ACCESS_TOKEN, VERCEL_TOKEN, VERCEL_PROJECT_ID, VERCEL_TEAM_ID } = process.env;
  if (!INSTAGRAM_ACCESS_TOKEN || !VERCEL_TOKEN || !VERCEL_PROJECT_ID || !VERCEL_TEAM_ID) {
    return res.status(500).json({ error: 'Missing configuration' });
  }

  try {
    // 1. Refresh the Instagram token (returns a new 60-day token).
    const r = await fetch(
      'https://graph.instagram.com/refresh_access_token?grant_type=ig_refresh_token&access_token=' +
        encodeURIComponent(INSTAGRAM_ACCESS_TOKEN)
    );
    const d = await r.json();
    if (!r.ok || !d.access_token) {
      throw new Error('refresh failed: ' + r.status + ' ' + JSON.stringify(d));
    }

    const vercel = (path, body) =>
      fetch('https://api.vercel.com' + path + '?teamId=' + VERCEL_TEAM_ID + (path.includes('/env') ? '&upsert=true' : ''), {
        method: 'POST',
        headers: { Authorization: 'Bearer ' + VERCEL_TOKEN, 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });

    // 2. Store the new token for future deployments.
    const envRes = await vercel(`/v10/projects/${VERCEL_PROJECT_ID}/env`, {
      key: 'INSTAGRAM_ACCESS_TOKEN',
      value: d.access_token,
      type: 'encrypted',
      target: ['production', 'preview'],
    });
    if (!envRes.ok) throw new Error('env update failed: ' + envRes.status);

    // 3. Redeploy production so the running function uses the new token.
    const projRes = await fetch(
      `https://api.vercel.com/v10/projects/${VERCEL_PROJECT_ID}?teamId=${VERCEL_TEAM_ID}`,
      { headers: { Authorization: 'Bearer ' + VERCEL_TOKEN } }
    );
    const proj = await projRes.json();
    const depRes = await vercel('/v13/deployments', {
      name: proj.name,
      project: VERCEL_PROJECT_ID,
      target: 'production',
      gitSource: { type: 'github', repoId: proj.link.repoId, ref: 'main' },
    });
    if (!depRes.ok) throw new Error('redeploy failed: ' + depRes.status);

    console.log('Instagram token refreshed; expires in', d.expires_in, 'seconds');
    return res.status(200).json({ ok: true, expires_in: d.expires_in });
  } catch (err) {
    console.error(err);
    return res.status(502).json({ error: String(err.message || err) });
  }
};
