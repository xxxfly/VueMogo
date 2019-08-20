// Vue 模板语法

<template>
  <div>
    <hr />
    <p><b># 插值</b></p>
    <p>Message:{{msg}}</p>
    <p><b>## v-once 指令，能执行一次性地插值，当数据改变时，插值处的内容不会更新</b></p>
    <p>
      <span v-once>这个将不会改变：{{msg2}}</span>
    </p>
    <p><b>## v-html 指令,输出真正的 HTML</b></p>
    <p>
      Using v-html directive:
      <span v-html="rawHtml"></span>
    </p>
    <p><b>## 特性 v-bind 指令</b></p>
    <p v-bind:id="dynamicId">绑定id</p>
    <p><button v-bind:disabled="isButtonDisabled">Button</button></p>   
    <p><b>## 使用JavaScript 表达式</b></p>
    <p>
      <span>{{ number + 1 }}</span>
      <span>{{ ok ? 'Yes':'NO' }}</span>
      <span>{{ msg.split('').reverse().join('') }}</span>
    </p>
    <hr />
    <p><b># 指令</b></p>    
    <p><b>## 指令 (Directives) 是带有 v- 前缀的特殊特性。指令特性的值预期是单个 JavaScript 表达式 (v-for 是例外情况，稍后我们再讨论)。指令的职责是，当表达式的值改变时，将其产生的连带影响，响应式地作用于 DOM。</b></p>    
    <P><b>## v-if 指令将根据表达式 seen 的值的真假来插入/移除 p 元素</b></P>
    <p v-if="seen">现在你看到我了</p>
    <p><b>## 参数 一些指令能够接收一个“参数”，在指令名称之后以冒号表示。</b></p>
    <p><a v-bind:href="url">百度-v:bind:href</a></p>
    <p><a v-on:click="addNumber">增加number-v-on:click</a></p>
    <p><b>## 动态参数</b>  </p>  
    <p>## 从 2.6.0 开始，可以用方括号括起来的 JavaScript 表达式作为一个指令的参数 v-bind:[attributeName]="url" 。
        这里的 attributeName 会被作为一个 JavaScript 表达式进行动态求值，求得的值将会作为最终的参数来使用。例如，如果你的 Vue 实例有一个 data 属性 attributeName，其值为 "href"，那么这个绑定将等价于 v-bind:href。
    </p>
    <P>## 还可以使用动态参数为一个动态的事件名绑定处理函数。v-on:[eventName]="doSomething"。当 eventName 的值为 "focus" 时，v-on:[eventName] 将等价于 v-on:focus</P>
  </div>
</template>
<script>

// 在底层的实现上，Vue 将模板编译成虚拟 DOM 渲染函数。结合响应系统，Vue 能够智能地计算出最少需要重新渲染多少组件，并把 DOM 操作次数减到最少。

export default {
  name: "VueTemplete",
  data() {
    return {
      msg: "Hello Vue",
      msg2: "once value",
      rawHtml: '<span style="color:red">This is red text.<span>',
      dynamicId: "id1",
      isButtonDisabled: true,
      number: 1,
      ok: true,
      seen:true,
      url:'http://www.baidu.com'
    };
  },
  methods:{
      addNumber(){
          this.number++;
      }
  }
};
</script>