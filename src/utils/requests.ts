import GlobalConfig from './config';
import axios from 'axios';

export const GetApi = async (url: string, params?: {}) => {
  return await axios.get(url, {
    baseURL: GlobalConfig.getBackendURL(),
    params: {
      ...params,
      token: GlobalConfig.getAccessToken()
    }
  });
};

export const PostApi = async (url: string, body: {}) => {
  return await axios.post(
    url,
    {
      ...body,
      token: GlobalConfig.getAccessToken()
    },
    {
      baseURL: GlobalConfig.getBackendURL()
    }
  );
};


export async function DeleteApi(url: string, params?: {}) {
  return await axios.delete(url, {
    baseURL: GlobalConfig.getBackendURL(),
    params: {
      ...params,
      token: GlobalConfig.getAccessToken()
    }
  });
}
