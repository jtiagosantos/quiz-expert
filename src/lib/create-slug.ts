export const createSlug = (title: string) => {
  return title
    .toLowerCase()
    .replace(/[^\w\sáàâãéèêíìîóòôõúùûç]/gi, '')
    .split(' ')
    .join('-');
};
