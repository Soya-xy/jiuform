import { createAlova } from 'alova'
import GlobalFetch from 'alova/GlobalFetch'
import VueHook from 'alova/vue'
import { axiosRequestAdapter } from '@alova/adapter-axios'
import { router } from '~/modules/router'

// const baseURL = import.meta.env.DEV ? '/api' : ''
// const baseURL = 'http://frp.xiaoyio.com/api'
// const baseURL = '/api'
const baseURL = 'https://form.guosuan.cc/api'
export function alovaInstance(base = baseURL) {
  return createAlova({
    baseURL: base,
    statesHook: VueHook,
    // requestAdapter: mockAdapter,
    requestAdapter: GlobalFetch(),
    localCache: null,
    beforeRequest(method) {
      const token = sessionStorage.getItem('token')
      if (token)
        method.config.headers['x-token'] = token
    },
    responded: {
      onSuccess: async (res, method) => {
        const data = await res.json()
        if (res.status === 401) {
          showToast('请重新登录')
          router.replace('/')
          return new Error('请重新登录')
        }

        if (data.code !== 0) {
          if (data?.err)
            throw new Error(data.err)
          if (data?.msg)
            throw new Error(data.msg)
        }
        else {
          if (data?.err)
            throw new Error(data.err)
        }
        switch (method.meta?.type) {
          case 'text':
            return await res.text()
          case 'blob':
            return await res.blob()
        }
        const contentType = res.headers.get('content-type')
        if (!contentType?.includes('json'))
          throw new Error(`invalid content type: ${contentType}`)

        return data as any
      },
      onError: (err, method) => {
        console.error('🚀 ~ alovaInstance ~ err, method:', err, method)
      },
    },
  })
}

// upload alova instance
export const uploadAlova = createAlova({
  baseURL,
  statesHook: VueHook,
  requestAdapter: axiosRequestAdapter(),
})
