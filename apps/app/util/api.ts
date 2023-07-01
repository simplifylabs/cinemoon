import Constants from 'expo-constants';
import axios from 'axios';
import { Buffer } from 'buffer';

const API_URL = Constants.expoConfig?.extra?.apiUrl as string;

if (!API_URL) {
  throw new Error('API_URL is not defined. Please set API_URL in .env file.');
}

export class API {
  static getHeaders() {
    return {
      'X-Platform': 'mobile',
      'X-Device-OS': Constants.platform?.android ? 'android' : 'ios',
      'X-Preferences': Buffer.from(
        JSON.stringify({
          platforms: ['Netflix', 'Amazon Prime Video'],
          locale: 'en_US',
          age: 18,
        })
      ).toString('base64'),
    };
  }

  static async get(url: string) {
    console.log('GET', `${API_URL}${url}`);
    const res = await axios.get(`${API_URL}${url}`, {
      headers: API.getHeaders(),
    });
    return res;
  }

  static async post(url: string, data: any) {
    console.log('POST', `${API_URL}${url}`, data);
    const res = await axios.post(`${API_URL}${url}`, data, {
      headers: API.getHeaders(),
    });
    return res;
  }
}
