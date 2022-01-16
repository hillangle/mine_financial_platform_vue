<template>
<div>
  <div class="seach">
    <table>
      <tr>
        <td>借贷方名称</td>
        <td><input v-model="query.bookName"></td>
        <td>科目</td>
        <td><input v-model="query.bookType"></td>
        <td>记账日期</td>
        <td><input v-model="query.bookDate"></td>
        <td>
          <button @click="search">搜索</button>
          <button @click="addBook">记账</button>
        </td>
      </tr>
    </table>
  </div>
  <div>
    <p>记账记录列表</p>
    <table>
      <tr>
        <th>序号</th>
        <th>科目</th>
        <th>借贷方名称</th>
        <th>借款额</th>
        <th>贷款额</th>
        <th>记账日期</th>
      </tr>
      <tr v-for="(book,index) in tableData" :key="index">
        <td>{{index+1}}</td>
        <td>{{book.bookType}}</td>
        <td>{{book.bookName}}</td>
        <td>{{book.debit}}</td>
        <td>{{book.credit}}</td>
        <td>{{book.bookDate}}</td>
      </tr>
    </table>
    <Pager
        v-if="!query.dataChanged"
        ref="pager"
        :pageSize="query.pageSize"
        :page="query.curPage"
        :total="query.total"
        @setPage="gotoPage"
        @setRowNum="changeRowNum" />
  </div>
  <div>
    <Dialog v-if="isMask" v-bind:propsItem="propsItem" @child-ok="childok" @child-cancel="childcancel">
      <template>
        <EditBook v-bind:bookInfo="bookInfo" @child-ok="childok" @child-cancel="childcancel"/>
      </template>
    </Dialog>
  </div>
</div>
</template>

<script>
import Pager from '../public/pager'
import $EditBook from './BookEdit'
import {queryBookInfos} from '../../api/book'
import Dialog from "../public/dialog";

export default {
  name: "BookList",
  components: {
    Dialog,
    'Pager':Pager,
    'EditBook': $EditBook
  },
  data() {
    return {
      tableData: [],
      query: {
        bookName: "",
        bookType: "",
        bookDate: "",
        curPage:1,//当前页
        total:0,//总共页数
        pageSize:200,//每页记录数
        dataChanged:false
      },
      isMask:false,
      propsItem:{
        title:'记账',
        contents:'',
        isMask:true,
        rgba:true
      },
      bookInfo:{
        bookName:''
      }
    }
  },
  created() {
    this.queryBookInfos();
  },
  methods:{
    queryBookInfos() {
      this.refresh();
      queryBookInfos(this.query).then(res => {
        this.tableData = res.rows;
        this.query.total = res.total || 0;
        this.query.curPage = res.curPage || 1;
      })
    },
    search() {
      this.queryBookInfos();
    },
    refresh(){//用于刷新组件，需手动调用
      this.query.dataChanged = true
      this.$nextTick(() => {
        this.query.dataChanged = false
      })
    },
    gotoPage(){
    },
    changeRowNum(){
    },
    addBook(){
      this.propsItem.isMask = this.isMask = true
    },
    childok(){
      this.queryBookInfos();
      this.propsItem.isMask = false
    },
    childcancel(){
      this.propsItem.isMask = false
    }
  }
}
</script>

<style scoped>
.seach {
  margin-bottom: 10px;
  border: 0px;
}
p {
  font-size: 5px;
  font-weight: bold;
  text-align: left;
}
table {
  width: 100%;
  border-left: 1px solid #999;
  border-top: 1px solid #999;
  border-spacing: 0;/*去掉单元格间隙*/
}
table th {
  border-bottom: 1px solid #999;
  border-right: 1px solid #999;
}
table td {
  border-bottom: 1px solid #999;
  border-right: 1px solid #999;
}
</style>