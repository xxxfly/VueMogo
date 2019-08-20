import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import Home from '@/components/Home'
import Login from '@/components/Login'
import GridTable from '@/components/GridTable'
import VueInstance from '@/components/01VueInstance'
import VueTemplete from '@/components/02Templete'

Vue.use(Router)

export default new Router({
    mode: 'history',
    routes: [{
            path: '/',
            name: 'HelloWorld',
            component: HelloWorld
        },
        {
            // 主页
            path: '/home',
            name: 'Home',
            component: Home
        },
        {
            // 登录界面
            path: '/login',
            name: 'Login',
            component: Login
        },
        {
            // 列表展示
            path: '/GridTable',
            name: 'GridTable',
            component: GridTable
        },
        {
            // VUE实例
            path: '/01VueInstance',
            name: '01VueInstance',
            component: VueInstance
        },
        {
            // 模板语法
            path: '/02Templete',
            name: 'VueTemplete',
            component: VueTemplete
        }
    ]
})