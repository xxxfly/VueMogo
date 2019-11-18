// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import axios from 'axios'
import _ from 'lodash'
// 引入样式
import 'vue-easytable/libs/themes-base/index.css'
// 导入 table 和 分页组件
import { VTable, VPagination } from 'vue-easytable'

Vue.config.productionTip = false
    // 扩展vue 组件
Vue.prototype.$http = axios
Vue.prototype._ = _
Vue.use(ElementUI)

// 注册到全局变量
Vue.component(VTable.name, VTable)
Vue.component(VPagination.name, VPagination)

// 组件基础
// 全局注册
// 自定义组件
Vue.component('button-counter', {
    data: function() {
        return {
            count: 0
        }
    },
    template: '<button v-on:click="count++">You clicked me {{ count }} times.</button>'
})

// Prop 像子组件传递数据
Vue.component('blog-post', {
    props: ['title'],
    template: '<h3>{{title}}</h3>'
})


// 监听子组件事件
Vue.component('blog-post2', {
    props: ['post'],
    template: `
        <div>
            <h3>{{post.title}}</h3>
            <button v-on:click="$emit('enlarge-text')">Enlarge text</button>
            <p>{{post.author}}--{{post.publish}}</p>
            <div v-html="post.content"></div>
        </div>
    `
})

// 监听子组件事件
Vue.component('blog-post3', {
    props: ['post'],
    template: `
        <div>
            <h3>{{post.title}}</h3>
            <button v-on:click="$emit('enlarge-text',0.1)">Enlarge text</button>
            <p>{{post.author}}--{{post.publish}}</p>
            <div v-html="post.content"></div>
        </div>
    `
})

// 在组件上使用 v-model
Vue.component('custom-input', {
    props: ['value'],
    template: `
        <input
        v-bind:value="value"
        v-on:input="$emit('input', $event.target.value)"
        >
    `
})

// 通过插槽分发内容
Vue.component('alert-box', {
    template: `
        <div>
            <strong>Error!</strong>
            <slot></slot>
        </div>
    `
})


/* eslint-disable no-new */
new Vue({
    el: '#app',
    router,
    template: '<App/>',
    components: {
        App
    }
})