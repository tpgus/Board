export const setStorage = <T>(key: string, items: T) => {
  localStorage.setItem(key, JSON.stringify(items));
};

export const getStorage = (key: string) => {
  const jsonData = localStorage.getItem(key);
  if (jsonData) {
    return JSON.parse(jsonData);
  }
  return {};
};
