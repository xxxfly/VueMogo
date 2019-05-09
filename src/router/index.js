import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import Home from '@/components/Home'
import Login from '@/components/Login'
import GridTable from '@/components/GridTable'

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
        }
    ]
})