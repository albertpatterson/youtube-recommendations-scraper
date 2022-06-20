export function addBanner() {
  const container = document.createElement('div');
  container.style.position = 'fixed';
  container.style.height = '20vh';
  container.style.width = '100vw';
  container.style.zIndex = '1000000000000';
  container.style.background = '#0000ff47';
  container.style.display = 'flex';
  container.style.alignItems = 'center';
  container.style.justifyContent = 'center';

  const banner = document.createElement('h1');
  banner.innerText = 'Scraping';

  container.appendChild(banner);
  document.body.appendChild(container);

  let count = 0;
  const interval = setInterval(() => {
    count++;
    const ps = new Array(count % 4).fill('.').join('');
    banner.innerText = 'Scraping' + ps;
  }, 1e3);

  return () => {
    document.body.removeChild(container);
    clearInterval(interval);
  };
}
