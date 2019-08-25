// 事件处理
<template>
    <div>
        <h2>事件监听</h2>        
        <hr>
        <p>可以用 v-on 指令监听 DOM 事件，并在触发时运行一些 JavaScript 代码。</p>
        <button v-on:click='counter+=1'>Add 1</button>
        <p>The button above has been clicked {{counter}} times</p>

        <h2>事件处理方法</h2>
        <hr>
        <p>然而许多事件处理逻辑会更加复杂，所以直接把 JavaScript 代码写在 v-on 指令中是不可行的。因此 v-on 还可以接受一个需要调用的方法名称。</p>
        <button v-on:click="greet">Greet</button>

        <h2>内联处理器中的方法</h2>
        <hr>
        <p>除了直接绑定到一个方法，也可以在内联 JavaScript 语句中调用方法。</p>
        <button v-on:click="say('hi')">Say hi</button>
        <button v-on:click="say('hello')">Say hello</button>
        <p>有时也需要在内联语句中访问原始的 DOM 事件。可以用特殊变量 $event 把它传入方法。</p>
        <button v-on:click="warn('Form connot be submitted yet.',$event)">Submit</button>

        <h2>事件修饰符</h2>
        <hr>
        <p>
            在事件处理程序中调用 event.preventDefault() 或 event.stopPropagation() 是非常常见的需求。尽管我们可以在方法中轻松实现这点，但更好的方式是：方法只有纯粹的数据逻辑，而不是去处理 DOM 事件细节。
        </p>
        <p>为了解决这个问题，Vue.js 为 v-on 提供了 <b>事件修饰符</b>。修饰符是由 点 开头的指令后缀来表示的。</p>
        <ul>
            <li>.stop</li>
            <li>.prevent</li>
            <li>.capture</li>
            <li>.self</li>
            <li>.once</li>
            <li>.passive</li>
        </ul>
        <!-- 阻止单击事件继续传播 -->
        <a v-on:click.stop='doThis'>阻止单击事件继续传播</a>
        <!-- 提交事件不再重载页面 -->
        <form v-on:submit.prevent='doThis'>提交事件不再重载页面</form>
        <!-- 修饰符可以串联 -->
        <a v-on:click.stop.prevent='doThis'>修饰符可以串联</a>
        <!-- 只有修饰符 -->
        <form v-on:submit.prevent>只有修饰符</form>
        <!-- 添加事件监听器时使用事件捕获模式 -->
        <!-- 即元素自身触发的事件先在此处理，然后才交由内部元素进行处理 -->
        <a v-on:click.capture="doThis">添加事件监听器时使用事件捕获模式</a>
        <!-- 只当在 event.target 是当前元素自身时触发处理函数 -->
        <!-- 即事件不是从内部元素触发的 -->
        <a v-on:click.self="doThis">事件不是从内部元素触发的</a>
        <!-- 点击事件将只会触发一次 -->
        <a v-on:click.once="doThis">点击事件将只会触发一次</a>
        <p>
            使用修饰符时，顺序很重要；相应的代码会以同样的顺序产生。因此，用 v-on:click.prevent.self 会阻止所有的点击，而 v-on:click.self.prevent 只会阻止对元素自身的点击。
        </p>
        <p>
            不像其它只能对原生的 DOM 事件起作用的修饰符，.once 修饰符还能被用到自定义的组件事件上。如果你还没有阅读关于组件的文档，现在大可不必担心。
        </p>
        <p>Vue 还对应 addEventListener 中的 passive 选项提供了 .passive 修饰符。</p>
        <p>这个 .passive 修饰符尤其能够提升移动端的性能。</p>
        <!-- 滚动事件的默认行为 (即滚动行为) 将会立即触发 -->
        <!-- 而不会等待 `onScroll` 完成  -->
        <!-- 这其中包含 `event.preventDefault()` 的情况 -->
        <div v-on:scroll.passive="doThis">滚动事件</div>
        <p>不要把 .passive 和 .prevent 一起使用，因为 .prevent 将会被忽略，同时浏览器可能会向你展示一个警告。请记住，.passive 会告诉浏览器你不想阻止事件的默认行为。</p>

        <h2>按键修饰符</h2>
        <hr>
        <p>
            在监听键盘事件时，我们经常需要检查详细的按键。Vue 允许为 v-on 在监听键盘事件时添加按键修饰符
        </p>
        <input  v-on:keyup.enter="submit">
        <p>你可以直接将 KeyboardEvent.key 暴露的任意有效按键名转换为 kebab-case 来作为修饰符。</p>
        <input type="text" v-on:keyup.page-down="onPageDown">
        <p>处理函数只会在 $event.key 等于 PageDown 时被调用。</p>
        <h3># 按键码</h3>
        <p>keyCode 的事件用法已经被废弃了并可能不会被最新的浏览器支持。</p>
        <p>使用 keyCode 特性也是允许的：</p>
        <input type="text" v-on:keyup.13='submit'>
        <p>为了在必要的情况下支持旧浏览器，Vue 提供了绝大多数常用的按键码的别名：</p>
        <ul>
            <li>.enter</li>
            <li>.tab</li>
            <li>.delete (捕获“删除”和“退格”键)</li>
            <li>.esc</li>
            <li>.space</li>
            <li>.up</li>
            <li>.down</li>
            <li>.left</li>
            <li>.right</li>
        </ul>
        <p>有一些按键 (.esc 以及所有的方向键) 在 IE9 中有不同的 key 值, 如果你想支持 IE9，这些内置的别名应该是首选。</p>
        <p>你还可以通过全局 config.keyCodes 对象自定义按键修饰符别名</p>
        <P>Vue.config.keyCodes.f1 = 112</P>

        <h2>系统修饰键</h2>
        <p>2.1.0 新增</p>
        <p>可以用如下修饰符来实现仅在按下相应按键时才触发鼠标或键盘事件的监听器。</p>
        <ul>
            <li>.ctrl</li>
            <li>.alt</li>
            <li>.shift</li>
            <li>.meta</li>
        </ul>
        <!-- Alt + C -->
        <input type="text" @keyup.alt.67="clear">
        <div> @click.ctrl="doThis">doThis</div>
        <p>
            请注意修饰键与常规按键不同，在和 keyup 事件一起用时，事件触发时修饰键必须处于按下状态。换句话说，只有在按住 ctrl 的情况下释放其它按键，才能触发 keyup.ctrl。而单单释放 ctrl 也不会触发事件。如果你想要这样的行为，请为 ctrl 换用 keyCode：keyup.17。
        </p>
        <h3># .exact 修饰符</h3>
        <p>.exact 修饰符允许你控制由精确的系统修饰符组合触发的事件。</p>
        <button @click.ctrl="onClick">A</button>
        <button @click.ctrl.exact="onCtrlClick">A</button>
        <button @click.exact="onClick">A</button>
        <h3># 鼠标按钮修饰符</h3>
        <ul>
            <li>.left</li>
            <li>.right</li>
            <li>.middle</li>
        </ul>
        <p>这些修饰符会限制处理函数仅响应特定的鼠标按钮。</p>

        <h2>为什么在 HTML 中监听事件？</h2>
        <p>你可能注意到这种事件监听的方式违背了关注点分离 (separation of concern) 这个长期以来的优良传统。但不必担心，因为所有的 Vue.js 事件处理方法和表达式都严格绑定在当前视图的 ViewModel 上，它不会导致任何维护上的困难。实际上，使用 v-on 有几个好处：</p>
        <p>1.扫一眼 HTML 模板便能轻松定位在 JavaScript 代码里对应的方法。</p>
        <p>2.因为你无须在 JavaScript 里手动绑定事件，你的 ViewModel 代码可以是非常纯粹的逻辑，和 DOM 完全解耦，更易于测试。</p>
        <p>3.当一个 ViewModel 被销毁时，所有的事件处理器都会自动被删除。你无须担心如何清理它们。</p>
    </div>
</template>

<script>
export default {
    name:'EventHandle',
    data(){
        return{
            counter:0,
            name:'Vue.js'
        }
    },
    // 在 methods 对象中定义方法
    methods:{
        greet:function(event){
            // this 在方法里指向当前 Vue 实例
            console.info('Hello'+this.name)
            // event 是原生 DOM 事件
            if (event) {
                console.info(event.target.tagName)
            }
        },
        say:function(message){
            console.info(message)
        },
        warn:function(message,event){
            if (event) {
                event.preventDefault()
            }
            console.info(message)
        },
        doThis:function(event){
            if (event) {
                console.info(event.target.tagName)
            }
        },
        submit:function(){
            console.info('Submit')
        },
        onPageDown:function(){
            console.info('onPageDown')
        },
        clear:function(){
            console.info('clear')
        },
        onClick:function(){
            console.info('onClick')
        },
        onCtrlClick:function(){
            console.info('onCtrlClick')
        }
    }
}
</script>