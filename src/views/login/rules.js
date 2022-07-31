export const mobileRule = [
  { required: true, message: '手机号不能为空' },
  { pattern: /^1[0-9]\d{9}$/, message: '手机号格式不正确' }
]

export const codeRule = [
  { required: true, message: '验证码不能为空' },
  { pattern: /^[0-9]{6}$/, message: '验证码格式不正确' }
]
