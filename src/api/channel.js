import request from '@/utils/request'
import storage from '@/utils/storage'

export const getMyChannel = () => {
  return request({
    url: '/v1_0/user/channels'
  })
}

/**
 * 获取所有频道列表
 * @returns
 */
export const getAllChannels = () => {
  return request({
    url: '/v1_0/channels'
  })
}

/**
 * 删除用户频道
 * @param {*} target 频道id
 * @returns
 */
export const delChannelAPI = (target) => {
  return request({
    url: `/v1_0/user/channels/${target}`,
    method: 'DELETE'
  })
}

/**
 * 添加频道
 * @param {*} id 添加的频道id
 * @param {*} req 添加频道的索引值
 * @returns
 */
export const addChannel = (id, seq) => {
  return request({
    url: '/v1_0/user/channels',
    method: 'PATCH',
    data: {
      channels: [{ id, seq }]
    }
  })
}

const HEIMA_TOUTIAO_MY_CHANNELS = 'HEIMA_TOUTIAO_MY_CHANNELS'
export const setMyChannelsToLocal = (myChannels) => {
  storage.set(HEIMA_TOUTIAO_MY_CHANNELS, myChannels)
}

export const getMyChannelsToLocal = () => {
  return storage.get(HEIMA_TOUTIAO_MY_CHANNELS)
}
