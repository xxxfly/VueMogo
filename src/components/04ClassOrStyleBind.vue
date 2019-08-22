// Class 和 Style 绑定
<template>
<div>
    <h2>绑定HTML Class</h2>
    <hr/>
    <h3># 对象语法</h3>
    <p>我们可以传给 <span style='color:#d63200'>v-bind:class</span> 一个对象，以动态的切换 class</p>
    <p v-bind:class="{active:isActivate,'text-danger':hasError}">提示消息</p>
    <p>v-bind:class="{active:isActivate,'text-danger':hasError}"</p>
    <p>
        上面的语法表示 active 这个 class 存在与否将取决于数据属性 isActive 的 truthiness。
        你可以在对象中传入更多属性来动态切换多个 class。此外，v-bind:class 指令也可以与普通的 class 属性共存。
    </p>
    <p>
        当 isActive 或者 hasError 变化时，class 列表将相应地更新。例如，如果 hasError 的值为 true，class 列表将变为 "active text-danger"。
    </p>
    <p>绑定的对象不必内联定义在模板里</p>
    <p v-bind:class='classObject'>提示消息</p>
    <p>我们也可以在这里绑定一个返回对象的<b>计算属性</b>。这是一个常用且强大的模式</p>
    <p v-bind:class='classObject2'>提示消息</p>
    <h3># 数组语法</h3>
    <p>我们可以把一个数组传给 <span style='color:#d63200'>v-bind:class</span> , 以应用一个 class 列表</p>
    <p v-bind:class='[activeClass,errorClass]'>提示消息</p>
    <p>如果你也想根据条件切换列表中的 class，可以用三元表达式</p>
    <p v-bind:class="[isActivate?activeClass:'',errorClass]">提示消息</p>
    <p>在数组语法中也可以使用对象语法</p>
    <p v-bind:class="[{active:isActivate},errorClass]">提示消息</p>
    <h3># 用在组件上</h3>
    <p>当在一个自定义组件上使用 class 属性时，这些类将被添加到该组件的根元素上面。这个元素上已经存在的类不会被覆盖。</p>

    <h2>绑定内联样式</h2>
    <hr/>
    <h3># 对象语法</h3>
    <p>
        <span style='color:#d63200'>v-bind:style</span> 的对象语法十分直观——看着非常像 CSS，但其实是一个 JavaScript 对象。CSS 属性名可以用驼峰式 (camelCase) 或短横线分隔 (kebab-case，记得用引号括起来) 来命名
    </p>
    <p v-bind:style="{color:activeColor,fontSize:fontSize+'px'}">提示消息</p>
    <p>直接绑定到一个样式对象 通常更好，这样会让模板更清晰</p>
    <p v-bind:style="styleObject">提示消息</p>
    <h3># 数组语法</h3>
    <p><span style='color:#d63200'>v-bind:style</span> 的数组语法可以将多个 样式对象 用到同一个元素上。</p>
    <h3># 字段添加前缀</h3>
    <p>
        当 <span style='color:#d63200'>v-bind:style</span> 使用需要浏览器引擎前缀 的 CSS 属性时，如 transform ,Vue.js 会自动侦测并添加相应的前缀
    </p>
    <h3># 多重值</h3>
    <p>从 2.3.0 起你可以为 style 绑定中的属性提供一个包含多个值的数组，常用于提供多个带前缀的值</p>
    <p :style="{display:['-webkit-box', '-ms-flexbox', 'flex']}">提示消息</p>
</div>
</template>

<script>
export default {
    name:'ClassOrStyleBind',
    data(){
        return{
            isActivate:true,
            hasError:false,
            classObject:{
                active:true,
                'text-danger':true
            },
            error:null,
            activeClass:'active',
            errorClass:'text-danger',
            activeColor:'red',
            fontSize:20,
            styleObject:{
                color:'red',
                fontSize:'20px'
            }
        }
    },
    computed:{
        classObject2:function(){
            return{
                active:this.isActivate && !this.error,
                'text-danger':this.error && this.error.typ==='fatal'
            }
        }
    }
}
</script>

<style scoped>
    .active{
        font-size:20px;
        font:bold;
    }
    .text-danger{
        color:crimson;
    }
</style>