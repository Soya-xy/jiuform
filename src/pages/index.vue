<script setup>
import { Chart } from '@antv/g2'
import { login } from '~/service/api'

const user = useUserStore()
const password = ref('')
const phone = ref('')
const router = useRouter()
function search() {
  if (!phone.value) {
    showToast({
      message: '请输入账号',
      type: 'fail',
    })
    return
  }
  if (!password.value) {
    showToast({
      message: '请输入密码',
      type: 'fail',
    })
    return
  }

  login({
    username: phone.value,
    password: password.value,
  }).then((res) => {
    if (res.code === 0) {
      showToast('登录成功')
      user.token = res.data.token
      sessionStorage.setItem('token', user.token)
      setTimeout(() => {
        router.replace('/form')
      }, 1500)
    }
    else {
      showToast({
        message: res.msg,
        type: 'fail',
      })
    }
  }).catch((err) => {
    showToast({
      message: err.message,
      type: 'fail',
    })
  })
}
</script>

<template>
  <div>
    <!-- <div my-4 w-full flex justify-center px-4>
      <img src="/logo.png" h-100px alt="">
    </div> -->
    <div my-4 px4>
      <p my4 text-xl text="#b1282d" font-600>
        名酒配额申购通道
      </p>
      <van-cell-group>
        <van-field v-model="phone" label="账号" placeholder="请输入手机号" />
        <van-field v-model="password" label="密码" placeholder="请输入密码" type="password" />
      </van-cell-group>
      <div mt-4>
        <van-button block type="primary" native-type="submit" @click="search">
          登录
        </van-button>
      </div>
    </div>

    <!-- <div text-sm text-gray>
      <p>贵州茅台股份有限公司出品</p>
    </div> -->
  </div>
</template>
