// 表单输入绑定
<template>
    <div>
        <h2>基础用法</h2>
        <hr>
        <p>
            你可以用 v-model 指令在表单 input、textarea 及 select 元素上创建双向数据绑定。它会根据控件类型自动选取正确的方法来更新元素。尽管有些神奇，但 v-model 本质上不过是语法糖。它负责监听用户的输入事件以更新数据，并对一些极端场景进行一些特殊处理。
        </p>
        <p>
            <b>v-model 会忽略所有表单元素的 value、checked、selected 特性的初始值而总是将 Vue 实例的数据作为数据来源。你应该通过 JavaScript 在组件的 data 选项中声明初始值。</b>
        </p>
        <ul>
            <label>v-model 在内部为不同的输入元素使用不同的属性并抛出不同的事件：</label>
            <li>text 和 textarea 元素使用 value 属性和 input 事件；</li>
            <li>checkbox 和 radio 使用 checked 属性和 change 事件；</li>
            <li>select 字段将 value 作为 prop 并将 change 作为事件。</li>
        </ul>
        <p>对于需要使用输入法 (如中文、日文、韩文等) 的语言，你会发现 v-model 不会在输入法组合文字过程中得到更新。如果你也想处理这个过程，请使用 input 事件。</p>
        <h3># 文本</h3>
        <input type="text" v-model="message" placeholder="Edit me">
        <p>Message is:{{message}}</p>
        <h3># 多行文本</h3>
        <textarea cols="30" rows="10" v-model="mulMessage" placeholder="add multiple lines"></textarea>
        <br>
        <span>MulitMessage is:</span>
        <p style="white-space:pre-line">{{mulMessage}}</p>
        <p>在文本区域插值 (&lt;textarea&gt;text&lt;/textarea&gt;) 并不会生效，应用 v-model 来代替。</p>
        <h3># 复选框</h3>
        <p>单个复选框，绑定到布尔值</p>
        <input type="checkbox" name="checkbox" id="checkbox" v-model="checkd">
        <label for="checkbox">{{checkd}}</label>
        <p>多个复选框，绑定到同一个数组</p>
        <div>
            <input type="checkbox" value="jack" id="jack" v-model="checkNames">
            <label for="jack">Jack</label>
            <input type="checkbox" value="jone" id="jone" v-model="checkNames">
            <label for="jone">Jone</label>
            <input type="checkbox" value="mike" id="mike" v-model="checkNames">
            <label for="mike">Mike</label>    
            <br>
            <span>Checked names:{{checkNames}}</span>        
        </div>
        <h3># 单选按钮</h3>
        <div>
            <input type="radio" value="one" id="one" v-model="picked">
            <label for="one">one</label>
            <input type="radio" value="two" id="two" v-model="picked">
            <label for="two">two</label>
            <br>
            <span>Picked:{{picked}}</span>
        </div>
        <h3># 选择框</h3>
        <p>单选时：</p>
        <div>
            <select v-model="selected">
                <option disabled value="">请选择</option>
                <option value="A">A</option>
                <option value="B">B</option>
                <option value="C">C</option>
            </select>
            <br>
            <span>Selected:{{selected}}</span>
        </div>
        <p>
            如果 v-model 表达式的初始值未能匹配任何选项，select 元素将被渲染为“未选中”状态。在 iOS 中，这会使用户无法选择第一个选项。因为这样的情况下，iOS 不会触发 change 事件。因此，更推荐像上面这样提供一个值为空的禁用选项。
        </p>
        <p>多选时（绑定到一个数组）:</p>
        <div>
            <select multiple style="width:50px" v-model="mulSelected">
                <option value="A">A</option>
                <option value="B">B</option>
                <option value="C">C</option>
            </select>
            <br>
            <span>MulSelected:{{mulSelected}}</span>
        </div>
        <p>用 v-for 渲染的动态选项：</p>
        <div>
            <select  v-model="selected">
                <option v-for="option in options" v-bind:value="option.value" v-bind:key="option.value">{{option.text}}</option>
            </select>
            <br>
            <span>Selectd:{{selected}}</span>
        </div>

        <h2>值绑定</h2>
        <hr>
        <p>对于单选按钮，复选框及选择框的选项，v-model 绑定的值通常是静态字符串 (对于复选框也可以是布尔值)：</p>
        <!-- `toggle` 为 true 或 false -->
        <input type="checkbox" v-model="toggle" id="toggle">
        <label for="toggle">yes or no</label>
        <span>Toggle:{{toggle}}</span>
        <p>但是有时我们可能想把值绑定到 Vue 实例的一个动态属性上，这时可以用 v-bind 实现，并且这个属性的值可以不是字符串。</p>
        <h3># 复选框</h3>
        <input type="checkbox" v-model="toggle2" true-value="yes" false-value="no" id="toggle2">
        <label for="toggle2">yes or no</label>
        <span>toggle2:{{toggle2}}</span>
        <p>这里的 true-value 和 false-value 特性并不会影响输入控件的 value 特性，因为浏览器在提交表单时并不会包含未被选中的复选框。如果要确保表单中这两个值中的一个能够被提交，(比如“yes”或“no”)，请换用单选按钮。</p>
        <h3># 单选按钮</h3>
        <input type="radio" v-model="pick" v-bind:value="a" id="pick">
        <label for="pick">yes or no</label>
        <span>pick:{{pick}}</span>
        <h3># 选择框的选项</h3>
        <div>
            <select  v-model="selected2">
                <option v-bind:value="{number:123}">123</option>
            </select>
            <br>
            <span>Selected2:{{selected2.number}}</span>
        </div>

        <h2>修饰符</h2>
        <hr>
        <h3># .lay</h3>
        <p>
            在默认情况下，v-model 在每次 input 事件触发后将输入框的值与数据进行同步 (除了上述输入法组合文字时)。你可以添加 lazy 修饰符，从而转变为使用 change 事件进行同步。
        </p>
        <!-- 在“change”时而非“input”时更新 -->
        <input v-model.lazy="msg">
        <span>msg:{{msg}}</span>
        <h3># .number</h3>
        <p>如果想自动将用户的输入值转为数值类型，可以给 v-model 添加 number 修饰符</p>
        <input type="number" v-model.number="age">
        <span>age:{{age}}</span>
        <p>这通常很有用，因为即使在 type="number" 时，HTML 输入元素的值也总会返回字符串。如果这个值无法被 parseFloat() 解析，则会返回原始的值。</p>
        <h3># .trim</h3>
        <p>如果要自动过滤用户输入的首尾空白字符，可以给 v-model 添加 trim 修饰符：</p>
        <input v-model.trim="msg">
        <span>msg:{{msg}}</span>
    </div>
</template>

<script>
export default {
    name:'FormBind',
    data(){
        return{
            message:'',
            mulMessage:'',
            checkd:false,
            checkNames:[],
            picked:'',
            selected:'',
            mulSelected:[],
            options:[
                {text:'One',value:'A'},
                {text:'Two',value:'B'},
                {text:'Three',value:'C'}
            ],
            toggle:false,
            toggle2:'',
            a:'A',
            pick:'',
            selected2:{},
            msg:'',
            age:0
        }
    }
}
</script>