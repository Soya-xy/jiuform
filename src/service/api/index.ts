import { alovaInstance } from '../request'

const api = alovaInstance()

// 中心
export const submit = (e?: any) => api.Post<any>('/v2/form/submit', e)
export const login = (e?: any) => api.Post<any>('/v2/user/login', e)
export function sendSms(e?: any) {
  return api.Get<any>('/v2/form/sms', {
    params: e,
  })
}
export function findByPhone(e?: any) {
  return api.Get<any>('/v2/form/findByPhone', {
    params: e,
  })
}
export function upload(e?: any) {
  return api.Post<any>('/v2/form/uploadFile', e, {
    // 开启上传进度
    enableUpload: true,
  })
}
export const distribution = (e?: any) => api.Post<any>('/center/distribution', e)

// 收费站
export const getAuditQuota = (e?: any) => api.Post<any>('/station/audit_quota', e)
export const obtainable = (e?: any) => api.Get<any>('/station/obtainable', e)
export const takeOrder = (e?: any) => api.Post<any>('/station/take_order', e)
