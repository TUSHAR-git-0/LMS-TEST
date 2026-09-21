export const getFullUrl = (url) => {
  if (!url) return "";
  if (/^https?:\/\//i.test(url)) return url;
  if (/^blob:/i.test(url)) return url;
  return `${import.meta.env.VITE_SERVER_URL || ""}${url}`;
};