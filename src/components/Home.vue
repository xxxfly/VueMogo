<template>
    <div class='home'>
        <h1>{{title}}</h1>
        <p>count:{{count}}</p>
        <p>{{message}}
            <span v-bind:title="msgTitle">鼠标悬停几秒查看此处动态绑定的信息！</span>
        </p>
        <button type='button' @click="meTest">计数</button>
        <a href='/login'>登录</a>         
    </div>
  
</template>

<script>
    export default{
        name:'home',
        data(){
            return{
                title:'主页',
                count:0,
                message:'Hello Vue',
                msgTitle:'页面加载于'+new Date().toLocaleString()
            }
        },
        methods:{
            meTest(){
                this.count+=1
            }
        }
    }
</script>

<style scoped>
 
</style>