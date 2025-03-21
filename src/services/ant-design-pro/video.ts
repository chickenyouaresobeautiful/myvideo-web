import { request } from '@umijs/max';

/** 登录接口 POST /api/login */
export async function getVideos(options?: { [key: string]: any }) {
  return request<API.VideoList>('/api/videos/list', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
    ...(options || {}),
  });
}
