fetch('https://gwttspeed.blogspot.com/2026/04/blog-post_28.html')
  .then(res => res.text())
  .then(html => {
    const urls = [];
    const regex = /<img[^>]+src=(["'])(.*?)\1/gi;
    let match;
    while ((match = regex.exec(html)) !== null) {
      urls.push(match[2]);
    }
    console.log(urls.join('\n'));
  });
