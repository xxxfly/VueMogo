// Vue 模板语法

<template>
  <div>
    <hr />
    <h2># 插值</h2>
    <p>Message:{{msg}}</p>
    <h3>## v-once 指令，能执行一次性地插值，当数据改变时，插值处的内容不会更新</h3>
    <p>
      <span v-once>这个将不会改变：{{msg2}}</span>
    </p>
    <h3>## v-html 指令,输出真正的 HTML</h3>
    <p>
      Using v-html directive:
      <span v-html="rawHtml"></span>
    </p>
    <h3>## 特性 v-bind 指令</h3>
    <p v-bind:id="dynamicId">绑定id</p>
    <p><button v-bind:disabled="isButtonDisabled">Button</button></p>   
    <h3>## 使用JavaScript 表达式</h3>
    <p>
      <span>{{ number + 1 }}</span>
      <span>{{ ok ? 'Yes':'NO' }}</span>
      <span>{{ msg.split('').reverse().join('') }}</span>
    </p>
    <hr />
    <h2># 指令</h2>
    <h3>## 指令 (Directives) 是带有 v- 前缀的特殊特性。指令特性的值预期是单个 JavaScript 表达式 (v-for 是例外情况，稍后我们再讨论)。指令的职责是，当表达式的值改变时，将其产生的连带影响，响应式地作用于 DOM。</h3>  
    <P><b>## v-if 指令将根据表达式 seen 的值的真假来插入/移除 p 元素</b></P>
    <p v-if="seen">现在你看到我了</p>
    <h3>## 参数 一些指令能够接收一个“参数”，在指令名称之后以冒号表示。</h3>
    <p><a v-bind:href="url">百度-v:bind:href</a></p>
    <p><a v-on:click="addNumber">增加number-v-on:click</a></p>
    <h3>## 动态参数</h3>
    <p>## 从 2.6.0 开始，可以用方括号括起来的 JavaScript 表达式作为一个指令的参数 v-bind:[attributeName]="url" 。
        这里的 attributeName 会被作为一个 JavaScript 表达式进行动态求值，求得的值将会作为最终的参数来使用。例如，如果你的 Vue 实例有一个 data 属性 attributeName，其值为 "href"，那么这个绑定将等价于 v-bind:href。
    </p>
    <!-- <a><a v-bind:[attribute]="url">百度</a></p> -->
    <P>## 还可以使用动态参数为一个动态的事件名绑定处理函数。v-on:[eventName]="doSomething"。当 eventName 的值为 "focus" 时，v-on:[eventName] 将等价于 v-on:focus</P>
    <p><a v-on:[eventC]="addNumber">增加number</a></p>
    <h3>## 修饰符</h3>
    <p>## 修饰符 (modifier) 是以半角句号 . 指明的特殊后缀，用于指出一个指令应该以特殊方式绑定。例如，.prevent 修饰符告诉 v-on 指令对于触发的事件调用 event.preventDefault()</p>
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
      attribute:"href",
      url:'http://www.baidu.com', 
      eventC:'click',     
    };
  },
  methods:{
      addNumber(){
          this.number++;
      }
  }
};
</script>