async function downloadFromUrl(url: string, name: string) {
  const a: HTMLAnchorElement = document.createElement('a');
  a.href = url;
  a.download = name;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
}

export async function downloadJson<T>(data: T, name: string) {
  const dataUrl =
    'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(data));
  return await downloadFromUrl(dataUrl, name);
}
