import { Toast } from 'antd-mobile';
import { toastTime } from '@/config';
const enums = {
  '001': '未知错误',
  '400': '请求参数错误',
  '404': '接口不存在',
  '405': '请求出错',
  '415': '请求出错',
  '500': '服务器错误',
  '502': '系统出错了',
};

const throwError = (status, message = '') => {
  throw {
    status,
    message,
  };
};

const failException =  (error) => {
  const { status = '001' } = error;
  const message = enums[status] || '未知错误';
  const { durationLong } = toastTime;
  Toast.fail(`${status}：${message}`, durationLong);
  return throwError(status, message);
};

const notSuccessException = (data) => {
  if (!data.success) {
    const { duration } = toastTime;
    Toast.fail(data.retMsg, duration);
  }
};

export {
  failException,
  notSuccessException,
};

