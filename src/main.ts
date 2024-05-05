import { createApp } from 'vue';

import App from './App.vue'

import '@unocss/reset/tailwind.css'
import './styles/main.css'
import 'uno.css'


const create = createApp(App)

Object.values(import.meta.glob('./modules/*.ts', { eager: true }))
  .forEach((i: any) => i.install?.(create))

create.mount('#app')
