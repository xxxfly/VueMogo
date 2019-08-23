// 列表渲染
<template>
    <div>
        <h2>用 v-for 把一个数组对应为一组元素</h2>
        <hr/>
        <p>
            我们可以用 v-for 指令基于一个数组来渲染一个列表。v-for 指令需要使用 item in items 形式的特殊语法，其中 items 是源数据数组，而 item 则是被迭代的数组元素的别名。
        </p>
        <ul>
            <li v-for="item in items" v-bind:key="item.id">{{item.message}}</li>
        </ul>
        <p>在 v-for 块中，我们可以访问所有父作用域的属性。v-for 还支持一个可选的第二个参数，即当前项的索引。</p>
        <ul>
            <li v-for="(item,index) in items" v-bind:key="item.id">{{message}}--{{index}}--{{item.message}}</li>
        </ul>
        <p>你也可以用 of 替代 in 作为分隔符，因为它更接近 JavaScript 迭代器的语法</p>
        <ul>
            <li v-for="item of items" v-bind:key="item.id">{{item.message}}</li>
        </ul>

        <h2>在 v-for 里使用对象</h2>
        <hr/>
        <p>可以使用 v-for 遍历一个对象的属性</p>
        <ul>
            <li v-for="value in book" v-bind:key="value.id">{{value}}</li>
        </ul>
        <p>也可以提供第二个参数 property 名称，也就是键名</p>
        <ul>
            <li v-for="(value,name) in book" v-bind:key="value.id">{{name}}:{{value}}</li>
        </ul>
        <p>还可以第三个参数作为索引</p>
        <ul>
            <li v-for="(value,name,index) in book" v-bind:key="value.id">{{index}}--{{name}}:{{value}}</li>
        </ul>

        <h2>维护状态</h2>
        <hr/>
        <p>
            当 Vue 正在更新使用 v-for 渲染的元素列表时，它默认使用“就地更新”的策略。如果数据项的顺序被改变，Vue 将不会移动 DOM 元素来匹配数据项的顺序，而是就地更新每个元素，并且确保它们在每个索引位置正确渲染。这个类似 Vue 1.x 的 track-by="$index"。
        </p>
        <p>这个默认的模式是高效的，但是只适用于不依赖子组件状态或临时 DOM 状态 (例如：表单输入值) 的列表渲染输出。</p>
        <p>为了给 Vue 一个提示，以便它能跟踪每个节点的身份，从而重用和重新排序现有元素，你需要为每项提供一个唯一 key 属性.v-bind:key="item.id"</p>
        <p>
            建议尽可能在使用 v-for 时提供 key attribute，除非遍历输出的 DOM 内容非常简单，或者是刻意依赖默认行为以获取性能上的提升。因为它是 Vue 识别节点的一个通用机制，key 并不仅与 v-for 特别关联。
        </p>

        <h2>数组更新检测</h2>
        <hr/>
        <h3># 变异方法(mutation method)</h3>
        <ul>
            <label>Vue 将被侦听的数组的变异方法进行了包裹，所以它们也将会触发视图更新。这些被包裹过的方法包括：</label>
            <li>push()</li>
            <li>pop()</li>
            <li>shift()</li>
            <li>unshift()</li>
            <li>splice()</li>
            <li>sort()</li>
            <li>reverse()</li>
        </ul>
        <button @click="changeList">变异方法</button>
        <h3># 替换数组</h3>
        <p>
            变异方法，顾名思义，会改变调用了这些方法的原始数组。相比之下，也有非变异 (non-mutating method) 方法，例如 filter()、concat() 和 slice() 。它们不会改变原始数组，而总是返回一个新数组。当使用非变异方法时，可以用新数组替换旧数组
        </p>
        <button @click="replaceList">替换数组</button>
        <h3># 注意事项</h3>
        <p>
            由于 JavaScript 的限制，Vue 不能检测以下数组的变动：
            <ul>
                <li>1.当你利用索引直接设置一个数组项时，例如：vm.items[indexOfItem] = newValue</li>
                <li>2.当你修改数组的长度时，例如：vm.items.length = newLength</li>
            </ul>                        
        </p>
        <P>为了解决第一类问题，以下两种方式都可以实现和 vm.items[indexOfItem] = newValue 相同的效果，同时也将在响应式系统内触发状态更新</P>
        <p>// Vue.set Vue.set(vm.items, indexOfItem, newValue)</p>
        <p>// Array.prototype.splice vm.items.splice(indexOfItem, 1, newValue)</p>
        <p>你也可以使用 vm.$set 实例方法，该方法是全局方法 Vue.set 的一个别名</p>
        <p>vm.$set(vm.items, indexOfItem, newValue)</p>
        <p>为了解决第二类问题，你可以使用 splice</p>
        <p>vm.items.splice(newLength)</p>

        <h2>对象变更检测注意事项</h2>
        <hr/>
        <p>由于 JavaScript 的限制，Vue 不能检测对象属性的添加或删除</p>
        <p>对于已经创建的实例，Vue 不允许动态添加根级别的响应式属性。但是，可以使用 Vue.set(object, propertyName, value) 方法向嵌套对象添加响应式属性。</p>
        <button @click="changeObject">对象变更</button>
        <p>
            有时你可能需要为已有对象赋值多个新属性，比如使用 Object.assign() 或 _.extend()。在这种情况下，你应该用两个对象的属性创建一个新的对象。
        </p>
        <p>
            vm.userProfile = Object.assign({}, vm.userProfile, {
                age: 27,
                favoriteColor: 'Vue Green'
            })
        </p>

        <h2>显示过滤/排序后的结果</h2>
        <hr/>
        <p>
            有时，我们想要显示一个数组经过过滤或排序后的版本，而不实际改变或重置原始数据。在这种情况下，可以创建一个计算属性，来返回过滤或排序后的数组。
        </p>
        <ul>
            <li v-for="item in numbers" v-bind:key="item.id">{{item}}</li>
        </ul>
        <ul>
            <li v-for="item in evenNumbers" v-bind:key="item.id">{{item}}</li>
        </ul>
        <p>在计算属性不适用的情况下 (例如，在嵌套 v-for 循环中) 你可以使用一个方法</p>
        <ul>
            <li v-for="n in even(numbers)" v-bind:key="n.id">{{n}}</li>
        </ul>

        <h2>在 v-for 里使用值范围</h2>
        <hr/>
        <p>v-for 也可以接受整数。在这种情况下，它会把模板重复对应次数。</p>
        <ul>
            <li v-for="n in 10" v-bind:key="n.id">{{n}}</li>
        </ul>

        <h2>在 template 上使用 v-for</h2>
        <hr/>
        <p>类似于 v-if，你也可以利用带有 v-for 的 template 来循环渲染一段包含多个元素的内容。</p>

        <h2>v-for 与 v-if 一同使用</h2>
        <hr/>
        <p>
            当它们处于同一节点，v-for 的优先级比 v-if 更高，这意味着 v-if 将分别重复运行于每个 v-for 循环中。当你只想为部分项渲染节点时，这种优先级的机制会十分有用。
        </p>
        <p>
            v-for="todo in todos" v-if="!todo.isComplete"
        </p>
        <p>上面的代码将只渲染未完成的 todo。</p>
        <p>而如果你的目的是有条件地跳过循环的执行，那么可以将 v-if 置于外层元素 (或 template)上</p>
        <p>v-if="todos.length"</p>
        <p>v-for="todo in todos"</p>

        <h2>早组件上使用 v-for</h2>
        <hr/>
        <p>在自定义组件上，你可以像在任何普通元素上一样使用 v-for</p>
        <p><b>2.2.0+ 的版本里，当在组件上使用 v-for 时，key 现在是必须的。</b></p>
        <p>然而，任何数据都不会被自动传递到组件里，因为组件有自己独立的作用域。为了把迭代数据传递到组件里，我们要使用 prop。</p>
        <p>不自动将 item 注入到组件里的原因是，这会使得组件与 v-for 的运作紧密耦合。明确组件数据的来源能够使组件在其他场合重复使用。</p>
        <form v-on:submit.prevent="addNewTodo">
            <label for="new-todo">Add a todo</label>
            <input v-model="newTodoText" id="new-todo" placeholder="E.g Feed the cat">
            <button>Add</button>
        </form>
        <ul>
            <li is="todo-item" v-for="(todo,index) in todos" v-bind:key="todo.id" v-bind:title="todo.title" v-on:remove="todos.splice(index,1)"></li>
        </ul>
    </div>    
</template>

<script>
import Vue from 'vue';
export default {
    name:'ListRender',
    data(){
        return{
            message:'Hello!',
            items:[
                {message:'Foo'},
                {message:'Bar'}
            ],
            book:{
                title:'Vue.js',
                author:'yu',
                publishedAt:'2016-04-10'
            },
            numbers:[1,2,5,6,8,9,10,12,15],
            todos:[{
                id: 1,
                title: 'Do the dishes',
            },
            {
                id: 2,
                title: 'Take out the trash',
            },
            {
                id: 3,
                title: 'Mow the lawn'
            }],
            newTodoText:null,
            nextTodoId: 4
        }
    },
    computed:{
        evenNumbers:function(){
            return this.numbers.filter(function(number){
                return number % 2 === 0
            })
        }
    },
    methods:{
        changeList:function(){
            this.items.push({message:'Jane'})
            this.items[0]={message:'newFoo'} // 
            Vue.set(this.items,1,{message:'newBar'})
        },
        replaceList:function(){
            var vm=this
            vm.items = vm.items.filter(function(item){
                return item.message.match(/Foo/)
            })
        },
        changeObject:function(){
            this.book.description='how to use vue'
            Vue.set(this.book,'name','Vue')
        },
        even:function(numbers){
            return numbers.filter(function(number){
                return number % 2 === 0
            })
        },
        addNewTodo:function(){
            this.todos.push({
                id: this.nextTodoId++,
                title: this.newTodoText
            })
            this.newTodoText = ''
        }
    }
}

// Vue.component('todo-item', {
//   template: '\
//     <li>\
//       {{ title }}\
//       <button v-on:click="$emit(\'remove\')">Remove</button>\
//     </li>\
//   ',
//   props: ['title']
// })

</script>

