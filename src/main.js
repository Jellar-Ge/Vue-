import Vue from 'vue'
import { Pagination, Button, Table, Divider, Icon, Comment, Tooltip, Avatar, List, Form, Input  } from 'ant-design-vue'
import 'ant-design-vue/lib/button/style/css'
import 'ant-design-vue/lib/table/style/css'
import 'ant-design-vue/lib/comment/style/css'
import 'ant-design-vue/lib/input/style/css'
import 'ant-design-vue/lib/form/style/css'
import App from './App.vue'
import router from './router'
import '../src/assets/css/globle.css'

Vue.config.productionTip = false

Vue.use(Button).use(Table).use(Divider).use(Icon).use(Comment).use(Tooltip).use(Avatar).use(List).use(Form).use(Input).use(Pagination)

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
