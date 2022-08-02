import request from '@/utils/request'

/**
 *
 * @param {*} channelId 频道ID
 * @param {*} timestamp 第一页为当前时间戳，上一页为上一页的时间戳
 * @returns Promise
 */
export const getArticleAPI = (channelId, timestamp) => {
  return request({
    url: '/v1_0/articles',
    params: {
      channel_id: channelId,
      timestamp: timestamp
    }
  })
}
