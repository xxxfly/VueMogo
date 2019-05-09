<template>
    <div class='home'>
        <h1>{{title}}</h1>
        <p>count:{{count}}</p>
        <a href='/login'>登录</a>
        <button type='button' @click="meTest">计数</button>
    </div>
</template>

<script>
    export default{
        name:'home',
        data(){
            return{
                title:'主页',
                count:0
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