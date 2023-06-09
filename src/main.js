import {createApp} from 'vue'
import App from './App.vue'
import ElementPlus from 'element-plus'

import './assets/main.css'

const app = createApp(App)

app.use(ElementPlus)
app.mount('#app')
