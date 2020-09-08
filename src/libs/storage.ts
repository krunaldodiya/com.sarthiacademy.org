import AsyncStorage from '@react-native-community/async-storage';

export const storage = {
  async getItem(key: any) {
    const value: any = await AsyncStorage.getItem(key);
    return JSON.parse(value);
  },
  async setItem(key: any, value: any) {
    AsyncStorage.setItem(key, JSON.stringify(value));
  },
  async removeItem(key: any) {
    AsyncStorage.removeItem(key);
  },
};
