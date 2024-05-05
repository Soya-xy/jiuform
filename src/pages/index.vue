<script setup>
const answer = ref({})
function onSubmit(values) {
  console.log('submit', values)
}

const question = ref([
  {
    title: '姓名',
    type: 'input',
    placeholder: '请输入姓名',
  },
  {
    title: '手机号码',
    type: 'numberInput',
    placeholder: '请输入手机号码',
  },
  {
    title: '身份证号码',
    type: 'idcard',
    placeholder: '请输入身份证号码',
    show: false,
  },
  {
    title: '申请区域',
    type: 'input',
    placeholder: '请输入申请区域',
  },
  {
    title: '自有企业名称',
    type: 'input',
    placeholder: '请输入自有企业名称',
  },
  {
    title: '企业工商类型',
    type: 'radio',
    labelWidth: '20em',

    options: [
      {
        label: '小规模小微企业',
        value: '小规模小微企业',
      },
      {
        label: '一般纳税人',
        value: '一般纳税人',
      },
    ],
  },
  {
    title: '茅台系列酒计划投入资金（单位/万）',
    type: 'input',
    labelWidth: '10em',
    placeholder: '请输入金额',
  },
  {
    title: '为申请茅台名酒配额，本次需缴纳保证金能接受的范围，一旦名酒配额系统匹配成功，则保证金会自动转为茅台名酒的货款，匹配失败，则原路退回！',
    type: 'radio',
    labelWidth: '20em',
    options: [
      {
        label: '500万系列酒申配名酒对应的保证金： 50万',
        value: '500万系列酒申配名酒对应的保证金： 50万',
      },
      {
        label: '300万系列酒申配名酒对应的保证金：30万',
        value: '300万系列酒申配名酒对应的保证金：30万',
      },
      {
        label: '120万系列酒申配名酒对应的保证金：12万',
        value: '120万系列酒申配名酒对应的保证金：12万',
      },
      {
        label: '50万系列酒申配名酒对应的保证金：5万',
        value: '50万系列酒申配名酒对应的保证金：5万',
      },
    ],
  },
  {
    title: '名酒配额初步评估审核匹配通过后，能否在考察会期间签订合同',
    type: 'radio',
    labelWidth: '20em',

    options: [
      {
        label: '能',
        value: '能',
      },
      {
        label: '不能',
        value: '不能',
      },
    ],
  },
  {
    title: '您申请茅台名酒的初衷是什么？（可多选）',
    type: 'checkbox',
    labelWidth: '20em',

    options: [
      {
        label: '收藏、增值',
        value: '收藏、增值',
      },
      {
        label: '社交应用',
        value: '社交应用',
      },
      {
        label: '作为团购用酒，引流带动旗下系列酒共同发展',
        value: '作为团购用酒，引流带动旗下系列酒共同发展',
      },
      {
        label: '其它',
        value: '其它',
      },
    ],
  },
  {
    title: '您日常用于接待宴请的茅台名酒是哪些？',
    type: 'checkbox',
    labelWidth: '20em',

    options: [
      {
        label: '普茅',
        value: '普茅',
      },
      {
        label: '精品茅台',
        value: '精品茅台',
      },
      {
        label: '生肖茅台',
        value: '生肖茅台',
      },
      {
        label: '年份茅台',
        value: '年份茅台',
      },
    ],
  },
  {
    title: '个人主要从业经历(从事岗位的时间及行业）',
    type: 'input',
    placeholder: '请输入个人主要从业经历',
  },
  {
    title: '对酒水行业市场前景的分析',
    type: 'input',
    placeholder: '请输入对酒水行业市场前景的分析',
  },
  {
    title: '与您联系的招商经理是哪位？',
    type: 'input',
    placeholder: '请输入经理姓名',
  },
])
</script>

<template>
  <div>
    <van-nav-bar safe-area-inset-top title="问卷调查" />
    <van-form mt4 @submit="onSubmit">
      <van-cell-group inset>
        <template v-for="v, k in question" :key="k">
          <van-field
            v-if="v.type === 'input'" v-model="answer[v.title]" :label-width="v.labelWidth || '6em'"
            :name="v.title" :placeholder="v.placeholder" required :label="v.title"
          />
          <template v-if="v.type === 'idcard'">
            <van-field
              v-model="answer[v.title]" :label-width="v.labelWidth || '6em'" readonly clickable required
              :label="v.title" :name="v.title" placeholder="请输入身份证号码" @touchstart.stop="v.show = true"
            />
            <van-number-keyboard
              v-model="answer[v.title]" :show="v.show" extra-key="X" close-button-text="完成"
              @blur="v.show = false"
            />
          </template>
          <van-field
            v-if="v.type === 'numberInput'" v-model="answer[v.title]" type="number" :name="v.title"
            :placeholder="v.placeholder" required :label="v.title" :label-width="v.labelWidth || '6em'"
          />

          <van-field
            v-if="v.type === 'radio'" :name="v.title" :label="v.title" required :label-width="v.labelWidth || '6em'"
          >
            <template #input>
              <van-radio-group v-model="answer[v.title]" direction="horizontal">
                <van-radio v-for="item, idx in v.options" :key="idx" :name="item.label">
                  {{ item.label }}
                </van-radio>
              </van-radio-group>
            </template>
          </van-field>
          <van-field v-if="v.type === 'checkbox'" :name="v.title" :label="v.title" required :label-width="v.labelWidth || '6em'">
            <template #input>
              <van-checkbox-group v-model="answer[v.title]" direction="horizontal">
                <van-checkbox v-for="item, idx in v.options" :key="idx" shape="square" :name="item.label">
                  {{ item.label }}
                </van-checkbox>
              </van-checkbox-group>
            </template>
          </van-field>
        </template>
      </van-cell-group>
      <div style="margin: 16px;" pb10>
        <van-button round block type="primary" native-type="submit">
          提交
        </van-button>
      </div>
    </van-form>
  </div>
</template>

<route lang="yaml">
meta:
  layout: home
</route>
