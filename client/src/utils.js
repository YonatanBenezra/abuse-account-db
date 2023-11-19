export function formatDate(dateString) {
  const date = new Date(dateString);
  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0"); // January is 0!
  const year = date.getFullYear();
  return `${day}/${month}/${year}`;
}

export function extractAfterSlash(url) {
  const parts = url.split("/");
  return parts[parts.length - 1]; // returns the last element
}
export function extractBeforeSlash(url) {
  const parts = url.split("/");
  return parts[0]; // returns the last element
}
