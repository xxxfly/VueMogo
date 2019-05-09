<template>
    <div class='tablePage'>
        <h1>{{title}}</h1>
        <!--表格-->
        <v-table
            is-horizontal-resize
            style="width:100%"
            :columns="tableConfig.columns"
            :table-data="tableConfig.tableData"
            :paging-index="(pageIndex-1)*pageSize"
            row-hover-color="#eee"
            row-click-color="#edf7ff"
            even-bg-color="#f2f2f2"
        >
        </v-table>
        <!--分页-->
        <v-pagination
            @page-change="pageChange"
            @page-size-change="pageSizeChange"
            :total="total" :page-size="pageSize"
            :layout="['total','prev','pager','next','sizer','jumper']"
        ></v-pagination>
    </div>
</template>

<script>
    export default{
        name:'tablePage',
        data(){
            return{
                title:'表格展示',
                pageIndex:1,
                pageSize:10,
                total:'',
                tableConfig:{
                    tableData:[],
                    columns:[
                        {
                            field:'name',
                            title:'名称',
                            width:80,
                            columnAlign:"center",
                            titleAlign:'center',
                            isFrozen:true
                        },
                        {
                            field:'age',
                            title:'年龄',
                            width:180,
                            columnAlign:"center",
                            titleAlign:'center',
                            isResize:true
                        },   {
                            field:'sex',
                            title:'性别',
                            width:180,
                            columnAlign:"center",
                            titleAlign:'center',
                            isResize:true
                        }
                    ]
                }
            };
        },
        created() {
            this.getData();
        },
        methods:{
            getData(){
                const userList=[{'name':'张三','age':17,'sex':'1'},
                {'name':'李四','age':18,'sex':'0'},
                {'name':'王五','age':17,'sex':'1'},
                {'name':'赵六','age':16,'sex':'0'},
                {'name':'刘七','age':15,'sex':'1'},
                {'name':'周八','age':20,'sex':'1'}];
                this.tableConfig.tableData=userList.slice(
                    (this.pageIndex-1)*this.pageSize,
                    this.pageIndex*this.pageSize
                )
                console.log(this.tableConfig.tableData);
                this.total=userList.length;
            },
            pageChange(pageIndex){
                this.pageIndex=pageIndex;
                this.getData();
                console.log(pageIndex)
            },
            pageSizeChange(pageSize){
                this.pageIndex=1;
                this.pageSize=pageSize;
                this.getData();
            }
        }
    }
</script>
<style scoped>
    
</style>