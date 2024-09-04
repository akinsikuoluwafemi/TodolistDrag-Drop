import localforage from "localforage";

export const LocalStorageService = {
  async set(key: string, value: any) {
    try {
      await localforage.setItem(key, value);
    } catch (e) {
      console.error("Error setting key", key, value, e);
    }
  },

  async get(key: string) {
    try {
      const value = await localforage.getItem(key);
      return value;
    } catch (e) {
      console.error("Error getting key", key, e);
    }
  },

  async remove(key: string) {
    try {
      await localforage.removeItem(key);
    } catch (e) {
      console.error("Error removing key", key, e);
    }
  },
};
