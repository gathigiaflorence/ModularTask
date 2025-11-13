export function uid() {
  return '_' + Math.random().toString(36).substr(2, 9);
}

export function escapeHTML(str) {
  const div = document.createElement('div');
  div.innerText = str;
  return div.innerHTML;
}
