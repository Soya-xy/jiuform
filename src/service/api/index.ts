import { alovaInstance } from '../request'

const api = alovaInstance()

export const loginApi = (e: any) => api.Post('/login', e)
export const getOrderFlow = (e?: any) => api.Post<any>('/order_flow/query', e)
export const addOrderFlow = (e?: any) => api.Post<any>('/order_flow/insert', e)
export const updateOrderFlow = (e?: any) => api.Post<any>('/order_flow/update', e)
export const addOrderAction = (e?: any) => api.Post<any>('/order_flow/order_action', e)
export const getStations = (e?: any) => api.Get<any>('/get_stations', e)
export const getUsers = (e?: any) => api.Get<any>('/get_users', e)

// 中心
export const getUndistributed = (e?: any) => api.Get<any>('/center/undistributed', e)
export const getCenterAuditQuota = (e?: any) => api.Post<any>('/center/audit_quota', e)
export const distribution = (e?: any) => api.Post<any>('/center/distribution', e)

// 收费站
export const getAuditQuota = (e?: any) => api.Post<any>('/station/audit_quota', e)
export const obtainable = (e?: any) => api.Get<any>('/station/obtainable', e)
export const takeOrder = (e?: any) => api.Post<any>('/station/take_order', e)
