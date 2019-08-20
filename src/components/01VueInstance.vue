// Vue实例

<template>
    <div>
        {{message}}
    </div>
</template>

<script>

// 每个 Vue 应用都是通过用 Vue 函数创建一个新的 Vue 实例开始的
// 项目建议只 new 一个 vue
// 除了数据属性，Vue 实例还暴露了一些有用的实例属性与方法。它们都有前缀 $，以便与用户定义的属性区分开来
// vm.$data === data  => true
// vm.$el === document.getElementById('example')  => true

//export default这是es6的，在vue的文件里导出一个对象，然后在main.js里面就可以import引入，然后就可以使用这个对象
//这个跟es6理解起来是一样的，其中export default导出的对象里有个name属性，那个就可以当做vue组件的名字了，Vue.component('组件名字',{})
export default{
    name:'VueInstance',
    // 数据data是在new Vue()里面才可以是对象，在组件中的data都是函数返回对象，这也是vue规定的，官方解释就是防止数据共享
    data(){
        return{
            message:'Hello Vue',
            //可以设置一些初始值
            newTodoText: '',
            visitCount: 0,
            hideCompletedTodos: false,
            todos: [],
            error: null
        }
    },
    // created 钩子可以用来在一个实例被创建之后执行代码
    created:function(){
        // 生命周期钩子的 this 上下文指向调用它的 Vue 实例
        console.log('message:'+this.message)
    }
    // 也有一些其它的钩子，在实例生命周期的不同阶段被调用，如 mounted、updated 和 destroyed
}

</script>