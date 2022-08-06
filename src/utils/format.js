import dayjs from 'dayjs'
import rTime from 'dayjs/plugin/relativeTime'

// 全局使用中文
dayjs.locale('zh-cn')

// 对时间进行格式化
export function formatTime(data = new Date(), type = 'YYYY-MM-DD') {
  return dayjs(data).format(type)
}

// 其它例如相对时间，需要单独配置它自己的插件才可以使用
dayjs.extend(rTime)

export const relativeTime = (value) => {
  return dayjs().to(dayjs(value))
}

export default {
  formatTime,
  relativeTime
}
