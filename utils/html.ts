/**
 * Safely decode HTML entities in a string
 */
export function decodeHTML(html: string): string {
  const txt = document.createElement('textarea');
  txt.innerHTML = html;
  return txt.value;
}

/**
 * Parse HTML string to DOM nodes and return text content
 */
export function stripHTML(html: string): string {
  const div = document.createElement('div');
  div.innerHTML = html;
  return div.textContent || div.innerText || '';
}
