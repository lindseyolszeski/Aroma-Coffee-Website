// Populates the Instagram feed section. The section stays hidden until
// the feed has at least MIN_POSTS posts, so it never appears empty.
// Append ?ig-demo to the page URL to preview the section with demo tiles.
(function () {
  var MIN_POSTS = 1;
  var MAX_POSTS = 6;
  var section = document.getElementById('instagram-feed');
  if (!section) return;

  var demo = new URLSearchParams(window.location.search).has('ig-demo');
  fetch('/api/instagram' + (demo ? '?demo=1' : ''))
    .then(function (r) { return r.json(); })
    .then(function (data) {
      var posts = (data.posts || []).slice(0, MAX_POSTS);
      if (posts.length < MIN_POSTS) return;
      var grid = section.querySelector('.ig-grid');
      // With only a few posts, center larger tiles instead of a sparse row.
      if (posts.length < 4) {
        grid.style.gridTemplateColumns = 'repeat(' + posts.length + ', minmax(0, 320px))';
        grid.style.justifyContent = 'center';
      }
      posts.forEach(function (p) {
        var a = document.createElement('a');
        a.className = 'ig-tile';
        a.href = p.permalink;
        a.target = '_blank';
        a.rel = 'noopener';
        var img = document.createElement('img');
        img.src = p.image;
        img.alt = p.caption || 'Instagram post from Aroma Coffee';
        img.loading = 'lazy';
        a.appendChild(img);
        grid.appendChild(a);
      });
      section.style.display = '';
    })
    .catch(function () { /* leave hidden */ });
})();
