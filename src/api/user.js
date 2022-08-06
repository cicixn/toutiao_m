import request from '@/utils/request'

/**
 * 验证登录
 * @param {String} mobile 手机号
 * @param {String} code 验证码
 * @returns Promise
 */
export const login = (mobile, code) => {
  return request({
    url: '/v1_0/authorizations',
    method: 'POST',
    data: { mobile, code }
  })
}

/**
 * 发送验证码
 * @param {String} mobile 手机号
 * @returns Promise
 */
export const getCodeAPI = (mobile) => {
  return request({
    url: `/v1_0/sms/codes/${mobile}`
  })
}

/**
 * 获取用户个人信息
 * @returns Promise
 */
export const getUserInfoAPI = () => {
  return request({
    url: '/v1_0/user/profile'
  })
}

/**
 * 上传用户头像
 * @param {*} file 图片的file对象
 * @returns Promise
 */
export const uploadAvatorAPI = (file) => {
  const fm = new FormData()
  fm.append('photo', file)
  return request({
    url: '/v1_0/user/photo',
    method: 'PATCH',
    data: fm
  })
}

/**
 * 编辑用户姓名
 * @param {*} name
 * @returns
 */
export const editUserNameAPI = (name) => {
  return request({
    url: '/v1_0/user/profile',
    method: 'PATCH',
    data: { name }
  })
}

/**
 * 编辑用户性别
 * @param {*} gender
 * @returns
 */
export const editUserGenderAPI = (gender) => {
  return request({
    url: '/v1_0/user/profile',
    method: 'PATCH',
    data: { gender }
  })
}

/**
 * 更新用户生日
 * @param {*} birthday
 * @returns
 */
export const editUserBirthdayAPI = (birthday) => {
  return request({
    url: '/v1_0/user/profile',
    method: 'PATCH',
    data: { birthday }
  })
}
