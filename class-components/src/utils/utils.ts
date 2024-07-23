export const idFromUrl = (url: string) => {
  const num = url.match(/\/(\d+)\/$/);
  return num ? num[1] : null;
};
