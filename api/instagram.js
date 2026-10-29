// Vercel serverless function: returns recent Instagram posts for the
// website feed section. Uses the Instagram API when INSTAGRAM_ACCESS_TOKEN
// is configured; returns demo posts when called with ?demo=1 (used to
// preview the section design before the account has posts/a token).

const DEMO_IMAGES = [
  'coffee-cart.jpg', 'cup-in-hand.jpg', 'barista-pour.jpg',
  'cart-event.jpg', 'cups-pair.jpg', 'cart-handoff.jpg',
];
const DEMO_POSTS = DEMO_IMAGES.map((f) => ({
  image: '/images/' + f,
  permalink: 'https://www.instagram.com/aromacoffee',
  caption: 'Demo post — this tile will show a real Instagram post',
}));

module.exports = async (req, res) => {
  // Cache at the edge for an hour; new Instagram posts appear within ~1h.
  res.setHeader('Cache-Control', 's-maxage=3600, stale-while-revalidate=86400');

  if (req.query && req.query.demo) {
    return res.status(200).json({ demo: true, posts: DEMO_POSTS });
  }

  const token = process.env.INSTAGRAM_ACCESS_TOKEN;
  if (!token) {
    return res.status(200).json({ posts: [] });
  }

  try {
    const url =
      'https://graph.instagram.com/me/media' +
      '?fields=id,caption,media_type,media_url,thumbnail_url,permalink,timestamp' +
      '&limit=12&access_token=' + encodeURIComponent(token);
    const r = await fetch(url);
    const d = await r.json().catch(() => ({}));
    if (!r.ok) throw new Error('Instagram API ' + r.status + ': ' + JSON.stringify(d));

    const posts = (d.data || [])
      // A post captioned with #nosite is kept off the website.
      .filter((m) => !/#nosite\b/i.test(m.caption || ''))
      .map((m) => ({
        image: m.media_type === 'VIDEO' ? m.thumbnail_url : m.media_url,
        permalink: m.permalink,
        caption: (m.caption || '').slice(0, 140),
      }))
      .filter((p) => p.image);
    return res.status(200).json({ posts });
  } catch (err) {
    console.error(err);
    // Fail closed: an empty list keeps the section hidden rather than broken.
    return res.status(200).json({ posts: [] });
  }
};
