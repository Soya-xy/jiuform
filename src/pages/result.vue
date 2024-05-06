<script setup>
import { Chart } from '@antv/g2'
import { findByPhone } from '~/service/api'

const value = ref('')
const info = ref()

function search() {
  findByPhone({
    phone: value.value,
  }).then((res) => {
    if (res.code === 0) {
      info.value = res.data
      if (res.data.matchRate > 0) {
        nextTick().then(() => {
          const data = [
            { type: '名酒配比额度', percent: res.data.matchRate, color: '#0a9afe' },
          ]
          const chart = new Chart({
            container: 'container',
            autoFit: true,
            height: 300,
          })

          const facetRect = chart
            .facetRect()
            .data(data)
            .encode('x', 'type')
            .axis(false)
            .legend(false)
            .view()
            .attr('frame', false)
            .coordinate({ type: 'theta', innerRadius: 0.5, outerRadius: 0.8 })

          facetRect
            .interval()
            .encode('y', 100)
            .scale('y', { zero: true })
            .style('fill', '#e8e8e8')
            .tooltip(false)
            .animate(false)

          facetRect
            .interval()
            .encode('y', 'percent')
            .encode('color', 'color')
            .scale('color', { type: 'identity' })
            .tooltip(data => ({
              name: data.type,
              value: data.percent,
            }))
            .animate('enter', { type: 'waveIn', duration: 1000 })

          facetRect
            .text()
            .encode('text', 'type')
            .style('textAlign', 'center')
            .style('textBaseline', 'middle')
            .style('fontSize', 20)
            .style('color', '#8c8c8c')
            .style('x', '50%')
            .style('y', '50%')
            .style('dy', -20)

          facetRect
            .text()
            .encode('text', (e) => {
              return `${e.percent}%`
            })
            .style('textAlign', 'center')
            .style('textBaseline', 'middle')
            .style('fontSize', 30)
            .style('fontWeight', 500)
            .style('color', '#000')
            .style('x', '50%')
            .style('y', '50%')
            .style('dy', 20)

          chart.render()
        })
      }
    }
    else {
      showToast({
        message: res.msg,
        type: 'fail',
      })
    }
  })
}
</script>

<template>
  <div>
    <van-nav-bar safe-area-inset-top title="结果查询" />
    <img src="/logo.jpg" h-50 w-full alt="">

    <div v-if="info?.matchRate > 0">
      <h1 my-4>
        恭喜您，获得本次考察会现场的高额名酒配比额度为
      </h1>
      <div id="container" />
      <p>我们会尽快与您联系，谢谢！</p>
    </div>
    <div v-else-if="info?.matchRate <= 0">
      <van-empty image="error" description="很遗憾，您未能获得本次考察会现场的高额名酒配比额度" />
    </div>
    <div v-else-if="info?.matchRate === null">
      <van-empty description="请确保你的资料填写真实有效，  审核中" />
    </div>
    <div v-else my-4 px4>
      <van-cell-group>
        <van-field v-model="value" label="手机号" placeholder="请输入手机号" />
      </van-cell-group>
      <div mt-4>
        <van-button block type="primary" native-type="submit" @click="search">
          查询
        </van-button>
      </div>
    </div>
  </div>
</template>
