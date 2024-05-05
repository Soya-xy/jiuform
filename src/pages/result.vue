<script setup>
import { Chart } from '@antv/g2'

onMounted(() => {
  const data = [
    { type: '名酒配比额度', percent: 6, color: '#0a9afe' },
  ]
  const chart = new Chart({
    container: 'container',
    autoFit: true,
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
</script>

<template>
  <div>
    <van-nav-bar safe-area-inset-top title="感谢提交" />
    <h1 my-4>
      恭喜您，获得本次考察会现场的高额名酒配比额度为
    </h1>
    <div id="container" />
    <p>我们会尽快与您联系，谢谢！</p>
  </div>
</template>
