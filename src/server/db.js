const mongoose = require('mongoose')

// 连接数据库 如果不自己创建 默认 test 数据库会自动生成
mongoose.connect('mongodb://test:test@127.0.0.1:27017/test')

// 为这次连接绑定事件
const db = mongoose.connection
db.once('error', () => console.log('Mongo connection error'))
db.once('open', () => console.log('Mongo connection successed'))

/********** 定义模式LogonSchema ********/
const loginSchema = mongoose.Schema({
    account: String,
    password: String,
    newPassword: String
}, { collection: 'listData' })

/********** 定义模式userSchema ********/
const userSchema = mongoose.Schema({
    name: String,
    gender: Boolean,
    age: Number
}, { collection: 'user' })

/************ 定义模型 Model **********/
const Models = {
    Login: mongoose.model('Login', loginSchema),
    User: mongoose.model('User', userSchema)
}

module.exports = Models