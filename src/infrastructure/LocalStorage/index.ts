import { log } from '@/infrastructure/LogRepository';

export const getFromLocalStorage = (key: string): log[] => {
  const result = localStorage.getItem(key);

  if (!result) {
    return [];
  }

  try {
    return JSON.parse(result);
  } catch {
    return [];
  }
};

export const saveToLocalStorage = (key: string, data: log[]): log | {} => {
  if (!key) {
    return {};
  }

  if (!data) {
    return {};
  }

  try {
    const stringifiedData = JSON.stringify(data);
    localStorage.setItem(key, stringifiedData);
    return JSON.parse(stringifiedData);
  } catch {
    return {};
  }
};
