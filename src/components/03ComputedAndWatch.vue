<template>
    <div>
        <h2>计算属性</h2>
        <hr/>
        <p>模板内的表达式非常便利，但是设计它们的初衷是用于简单运算的。在模板中放入太多的逻辑会让模板过重且难以维护。</p>
        <p>源字符串：{{message}}</p>
        <p>字符串反转：{{message.split('').reverse().join('')}}</p>
        <h3># 基础例子</h3>
        <P>Computed reversed message: {{reversedMessage}}</P>
        <pre style="background-color:#f8f8f8">
            <code>
            computed:{
                // 计算属性的 getter
                reversedMessage:function(){
                    // this 指向 vm 实例
                    return this.message.split('').reverse().join('')
                }
            }
            </code>
        </pre>
        <p>这里我们声明了一个计算属性 reversedMessage。我们提供的函数将用作属性 vm.reversedMessage 的 getter 函数</p>
        <pre style="background-color:#f8f8f8">
            <code>
            console.log(vm.reversedMessage) // => 'olleH'
            vm.message = 'Goodbye'
            console.log(vm.reversedMessage) // => 'eybdooG'
            </code>
        </pre>
        <p>
            你可以像绑定普通属性一样在模板中绑定计算属性。Vue 知道 vm.reversedMessage 依赖于 vm.message，因此当 vm.message 发生改变时，所有依赖 vm.reversedMessage 的绑定也会更新。而且最妙的是我们已经以声明的方式创建了这种依赖关系：计算属性的 getter 函数是没有副作用 (side effect) 的，这使它更易于测试和理解。
        </p>
        <h3># 计算属性宣传 vs 方法</h3>
        <p>methods reversed message:{{reversedMessages()}}</p>
        <p>
            我们可以将同一函数定义为一个方法而不是一个计算属性。两种方式的最终结果确实是完全相同的。然而，不同的是计算属性是基于它们的响应式依赖进行缓存的。只在相关响应式依赖发生改变时它们才会重新求值。这就意味着只要 message 还没有发生改变，多次访问 reversedMessage 计算属性会立即返回之前的计算结果，而不必再次执行函数。
            相比之下，每当触发重新渲染时，调用方法将总会再次执行函数。
        </p>
        <p>
            我们为什么需要缓存？假设我们有一个性能开销比较大的计算属性 A，它需要遍历一个巨大的数组并做大量的计算。然后我们可能有其他的计算属性依赖于 A 。如果没有缓存，我们将不可避免的多次执行 A 的 getter！如果你不希望有缓存，请用方法来替代。
        </p>
        <h3># 计算属性 vs 侦听属性</h3>
        <p>Vue 提供了一种更通用的方式来观察和响应 Vue实例上的数据变动：侦听属性 watch。当你有一些数据需要随着其它数据变动而变动时，你很容易滥用 watch——特别是如果你之前使用过 AngularJS。然而，通常更好的做法是使用计算属性而不是命令式的 watch 回调。</p>
        <p>{{fullName}}</p>
        <p>{{fullNames}}</p>
        <h3># 计算属性的 setter</h3>
        <p>计算属性默认只有getter，不过在需要时也可以提供 setter</p>
        <p>{{fullName2}}</p>
        
        <h2>侦听器</h2>
        <hr />
        <p>
            虽然计算属性在大多数情况下更合适，但有时也需要一个自定义的侦听器。这就是为什么 Vue 通过 watch 选项提供了一个更通用的方法，来响应数据的变化。当需要在数据变化时执行异步或开销较大的操作时，这个方式是最有用的。
        </p>
        <div>
            <p>
                Ask a yes/no question:
                <input v-model="question">
            </p>
            <p>{{answer}}</p>
        </div>
        <p>
            在这个示例中，使用 watch 选项允许我们执行异步操作 (访问一个 API)，限制我们执行该操作的频率，并在我们得到最终结果前，设置中间状态。这些都是计算属性无法做到的。
            除了 watch 选项之外，您还可以使用命令式的 vm.$watch API。
        </p>
    </div>
</template>

<script>

export default {
    name:'ComputedAndWatch',
    data(){
        return{
            message:'Hello Vue',
            firstName:'Foo',
            lastName:'Bar',
            fullName:'Foo Bar',
            question:null,
            answer:'I cannot give you an answer until you ask a question!'
        }
    },
    watch:{
        // 侦听属性
        firstName:function(val){
            this.fullName=val+' '+this.lastName
        },
        lastName:function(val){
            this.fullName=this.firstName+' '+val
        },
        // 如果 question 发生改变，这个函数就会运行
        question:function(newQuestion,oldQuestion){
            this.answer = 'Waiting for you to stop typing...'
            this.debouncedGetAnswer()
        }
    },
    computed:{
        // 计算属性的 getter
        reversedMessage:function(){
            // this 指向 vm 实例
            return this.message.split('').reverse().join('')
        },
        fullNames:function(){
            return this.firstName+' '+this.lastName
        },
        fullName2:{
            // getter
            get:function(){
                return this.firstName+' '+this.lastName
            },
            // setter
            set:function(newValue){
                var names=newValue.split(' ')
                this.firstName=names[0]
                this.lastName=names[names.length-1]
            }
        }
    },
    created:function(){
        // `_.debounce` 是一个通过 Lodash 限制操作频率的函数。
        // 在这个例子中，我们希望限制访问 yesno.wtf/api 的频率
        // AJAX 请求直到用户输入完毕才会发出。想要了解更多关于
        // `_.debounce` 函数 (及其近亲 `_.throttle`) 的知识，
        // 请参考：https://lodash.com/docs#debounce
        this.debouncedGetAnswer = this._.debounce(this.getAnswer,500)
    },
    methods:{
        // 方法调用，每次渲染，调用方法总会再次执行函数
        reversedMessages:function(){
            return this.message.split('').reverse().join('')
        },
        getAnswer:function(){
            if(this.question.indexOf('?') === -1){
                this.answer = 'Questions usually contain a question mark.;-'
                return
            }
            this.answer = 'Thinking...'
            var vm = this
            vm.$http.get('https://yesno.wtf/api')
                    .then(function(response){
                        vm.answer = vm._.capitalize(response.data.answer)
                    })
                    .catch(function(error){
                        vm.answer='Error!Could not reach the API.'+error
                    })
        }
    }
}
</script>