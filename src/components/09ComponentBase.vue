// 组件基础
<template>
    <div>
        <h2>组件基础</h2>
        <hr>
        <p>组件是可复用的 Vue 实例，且带有一个名字：在这个例子中是 button-counter(main.js 中定义)。我们可以在一个通过 new Vue 创建的 Vue 根实例中，把这个组件作为自定义元素来使用：</p>
        <button-counter></button-counter>
        <p>因为组件是可复用的 Vue 实例，所以它们与 new Vue 接收相同的选项，例如 data、computed、watch、methods 以及生命周期钩子等。仅有的例外是像 el 这样根实例特有的选项。</p>

        <h2>组件的复用</h2>
        <p>你可以将组件进行任意次数的复用</p>
        <button-counter></button-counter>
        <button-counter></button-counter>
        <button-counter></button-counter>
        <p>
            注意当点击按钮时，每个组件都会各自独立维护它的 count。因为你每用一次组件，就会有一个它的新实例被创建。
        </p>
        <h3># data 必须是一个函数</h3>
        <p>
            当我们定义这个 button-counter 组件时，你可能会发现它的 data 并不是像这样直接提供一个对象,data: {count: 0}。取而代之的是，一个组件的 data 选项必须是一个函数，因此每个实例可以维护一份被返回对象的独立的拷贝。
        </p>
        <p>如果 Vue 没有这条规则，点击一个按钮就可能会像如下代码一样影响到其它所有实例</p>

        <h2>组件的组织</h2>
        <hr>
        <p>通常一个应用会以一颗嵌套的组件树的形式来组织</p>
        <img src="/static/images/ComponentStructTree.png" alt="">
        <p>例如，你可能会有页头、侧边栏、内容区等组件，每个组件又包含了其它的像导航链接、博文之类的组件。</p>
        <p>
            为了能在模板中使用，这些组件必须先注册以便 Vue 能够识别。这里有两种组件的注册类型：<b>全局注册</b> 和 <b>局部注册</b> 。至此，我们的组件都只是通过 Vue.component 全局注册的
        </p>
        <p>
            全局注册的组件可以用在其被注册之后的任何 (通过 new Vue) 新创建的 Vue 根实例，也包括其组件树中的所有子组件的模板中。
        </p>

        <h2>通过 Prop 向子组件传递数据</h2>
        <p>早些时候，我们提到了创建一个博文组件的事情。问题是如果你不能向这个组件传递某一篇博文的标题或内容之类的我们想展示的数据的话，它是没有办法使用的。这也正是 prop 的由来。</p>
        <p>Prop 是你可以在组件上注册的一些自定义特性。当一个值传递给一个 prop 特性的时候，它就变成了那个组件实例的一个属性。为了给博文组件传递一个标题，我们可以用一个 props 选项将其包含在该组件可接受的 prop 列表中：</p>
        <blog-post title="My journey with Vue"></blog-post>
        <blog-post title="Blogging with Vue"></blog-post>
        <blog-post title="Why Vue is so fun"></blog-post>
        <p>一个组件默认可以拥有任意数量的 prop，任何值都可以传递给任何 prop。在上述模板中，你会发现我们能够在组件实例中访问这个值，就像访问 data 中的值一样。</p>
        <p>一个 prop 被注册之后，你就可以像这样把数据作为一个自定义特性传递进来</p>
        <p>然而在一个典型的应用中，你可能在 data 里有一个博文的数组</p>
        <blog-post v-for="post in posts" v-bind:key="post.id" v-bind:title="post.title"></blog-post>
        <p>我们可以使用 v-bind 来动态传递 prop。</p>

        <h2>单个根元素</h2>
        <hr>
        <p>当构建一个 blog-post 组件时，你的模板最终会包含的东西远不止一个标题</p>
        <p>最最起码，你会包含这篇博文的正文 </p>
        <p>然而如果你在模板中尝试这样写，Vue 会显示一个错误，并解释道 every component must have a single root element (每个组件必须只有一个根元素)。你可以将模板的内容包裹在一个父元素内，来修复这个问题。例如：</p>
        <textarea  cols="60" rows="5" style="background-color:#f8f8f8;color:#2973b7">
        <div class="blog-post">
            <h3> title </h3>
            <div v-html="content"></div>
        </div>
        </textarea>
        <p>看起来当组件变得越来越复杂的时候，我们的博文不只需要标题和内容，还需要发布日期、评论等等。为每个相关的信息定义一个 prop 会变得很麻烦：</p>
        <textarea  cols="60" rows="9" style="background-color:#f8f8f8;color:#2973b7">
        <blog-post
        v-for="post in posts"
        v-bind:key="post.id"
        v-bind:title="post.title"
        v-bind:content="post.content"
        v-bind:publishedAt="post.publishedAt"
        v-bind:comments="post.comments"
        ></blog-post>
        </textarea>
        <p>所以是时候重构一下这个 blog-post 组件了，让它变成接受一个单独的 post prop</p>
        <blog-post2 v-for="post in posts2" v-bind:key="post.id" v-bind:post="post"></blog-post2>
        <p>现在，不论何时为 post 对象添加一个新的属性，它都会自动地在 blog-post 内可用。</p>

        <h2>监听子组件事件</h2>
        <hr>
        <p>在我们开发 blog-post 组件时，它的一些功能可能要求我们和父级组件进行沟通。例如我们可能会引入一个辅助功能来放大博文的字号，同时让页面的其它部分保持默认的字号。</p>
        <p>在其父组件中，我们可以通过添加一个 postFontSize 数据属性来支持这个功能</p>
        <p>它可以在模板中用来控制所有博文的字号</p>
        <div :style="{fontSize:postFontSize+'em'}">
            <blog-post2 v-for="post in posts2" v-bind:key="post.id" v-bind:post="post" v-on:enlarge-text="postFontSize+=0.1"></blog-post2>
        </div>
        <p>现在我们在每篇博文正文之前添加一个按钮来放大字号</p>
        <p>问题是这个按钮不会做任何事</p>
        <p>当点击这个按钮时，我们需要告诉父级组件放大所有博文的文本。幸好 Vue 实例提供了一个自定义事件的系统来解决这个问题。父级组件可以像处理 native DOM 事件一样通过 v-on 监听子组件实例的任意事件：v-on:enlarge-text="postFontSize += 0.1"</p>
        <p>同时子组件可以通过调用内建的 $emit 方法 并传入事件名称来触发一个事件：v-on:click="$emit('enlarge-text')"</p>
        <p>有了这个 v-on:enlarge-text="postFontSize += 0.1" 监听器，父级组件就会接收该事件并更新 postFontSize 的值。</p>
        <h3>#使用事件抛出一个值</h3>
        <p>有的时候用一个事件来抛出一个特定的值是非常有用的。例如我们可能想让 blog-post 组件决定它的文本要放大多少。这时可以使用 $emit 的第二个参数来提供这个值：</p>
        <p>然后当在父级组件监听这个事件的时候，我们可以通过 $event 访问到被抛出的这个值：</p>  
        <div :style="{fontSize:postFontSize+'em'}">
            <blog-post3 v-for="post in posts3" v-bind:key="post.id" v-bind:post="post" v-on:enlarge-text="postFontSize+=$event"></blog-post3>
        </div>
        <p>或者，如果这个事件处理函数是一个方法</p>
        <p>那么这个值将会作为第一个参数传入这个方法</p>
        <div :style="{fontSize:postFontSize+'em'}">
            <blog-post3 v-for="post in posts3" v-bind:key="post.id" v-bind:post="post" v-on:enlarge-text="onEnlargeText"></blog-post3>
        </div>
        <h3>#在组件上使用 v-model</h3>
        <p>自定义事件也可以用于创建支持 v-model 的自定义输入组件。</p>
        <textarea  cols="60" rows="2" style="background-color:#f8f8f8;color:#2973b7">
            <input v-model="searchText">
        </textarea>
        <p>等价于</p>
        <textarea  cols="60" rows="5" style="background-color:#f8f8f8;color:#2973b7">
            <input
            v-bind:value="searchText"
            v-on:input="searchText = $event.target.value"
            >
        </textarea>
        <p>当用在组件上时，v-model 则会这样：</p>
        <textarea  cols="60" rows="5" style="background-color:#f8f8f8;color:#2973b7">
            <custom-input
            v-bind:value="searchText"
            v-on:input="searchText = $event"
            ></custom-input>
        </textarea>
        <p>为了让它正常工作，这个组件内的 input 必须：</p>
        <ul>
            <li>将其 value 特性绑定到一个名叫 value 的 prop 上</li>
            <li>在其 input 事件被触发时，将新的值通过自定义的 input 事件抛出</li>
        </ul>
        <custom-input v-model="searchText"></custom-input>
        <p>searchText:{{searchText}}</p>

        <h2>通过插槽分发内容</h2>
        <hr>
        <p>和 HTML 元素一样，我们经常需要向一个组件传递内容，像这样</p>
        <textarea  cols="60" rows="5" style="background-color:#f8f8f8;color:#2973b7">
            <alert-box>
            Something bad happened.
            </alert-box>
        </textarea>
        <p>幸好，Vue 自定义的 slot 元素让这变得非常简单：</p>
        <alert-box>
            <slot>提示消息</slot>
        </alert-box>

        <h2>动态组件</h2>
        <hr>
        <p>有的时候，在不同组件之间进行动态切换是非常有用的，比如在一个多标签的界面里：</p>
        <p>上述内容可以通过 Vue 的 component 元素加一个特殊的 is 特性来实现：</p>
        <textarea  cols="80" rows="5" style="background-color:#f8f8f8;color:#2973b7">
            <!-- 组件会在 `currentTabComponent` 改变时改变 -->
            <component v-bind:is="currentTabComponent"></component>
        </textarea>
        <p>在上述示例中，currentTabComponent 可以包括</p>
        <ul>
            <li>已注册组件的名字，或</li>
            <li>一个组件的选项对象</li>
        </ul>
    </div>    
</template>

<script>
export default {
    name:'ComponentBase',
    data(){
        return{
            posts:[
                { id: 1, title: 'My journey with Vue'},
                { id: 2, title: 'Blogging with Vue'},
                { id: 3, title: 'Why Vue is so fun'},
            ],
            posts2:[
                { id: 12, title: 'My journey with Vue',author:'zz',publish:'2013',content:'<h3>Hello</h3>'},
                { id: 22, title: 'Blogging with Vue',author:'dd',publish:'2014',content:'<h3>Hi</h3>'},
                { id: 32, title: 'Why Vue is so fun',author:'xx',publish:'2015',content:'<h3>Good</h3>'},
            ],
            posts3:[
                { id: 13, title: 'My journey with Vue',author:'zz',publish:'2013',content:'<h3>Hello</h3>'},
                { id: 23, title: 'Blogging with Vue',author:'dd',publish:'2014',content:'<h3>Hi</h3>'},
                { id: 33, title: 'Why Vue is so fun',author:'xx',publish:'2015',content:'<h3>Good</h3>'},
            ],
            postFontSize:1,
            searchText:''
        }
    },
    methods:{
        onEnlargeText:function(enlargeAmount){
            this.postFontSize+=enlargeAmount
        }
    }
}
</script>