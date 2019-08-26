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
    </div>    
</template>

<script>
export default {
    name:'ComponentBase',
    data(){
        return{
            posts:[
                { id: 1, title: 'My journey with Vue' },
                { id: 2, title: 'Blogging with Vue' },
                { id: 3, title: 'Why Vue is so fun' }
            ]
        }
    }
}
</script>