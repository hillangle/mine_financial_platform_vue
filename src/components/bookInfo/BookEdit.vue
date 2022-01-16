<template>
  <div>
    <ul>
      <li>
        <span>借贷方</span>
        <span><input v-model="bookInfo.bookName" v-bind:readonly="isReadOnly"/></span>
      </li>
      <li>
        <span>科目</span>
        <span><input v-model="bookInfo.bookType" v-bind:readonly="isReadOnly"/></span>
      </li>
      <li>
        <span>借款额</span>
        <span><input v-model="bookInfo.debit" v-bind:readonly="isReadOnly"/></span>
      </li>
      <li>
        <span>贷款额</span>
        <span><input v-model="bookInfo.credit" v-bind:readonly="isReadOnly"/></span>
      </li>
      <li>
        <span>借贷时间</span>
        <span><input v-model="bookInfo.bookDate" v-bind:readonly="isReadOnly"/></span>
      </li>
    </ul>
    <hr class="hr1">
    <input type="button" class="ok" value="提交" @click="okCallback">
    <input type="button" class="cancel" value="取消" @click="cancelCallback">
  </div>
</template>

<script>
import {editBookInfo} from '../../api/book'

export default {
  name: "BookEdit",
  components: {
  },
  data() {
    return {
      bookInfo: {
        bookName: '',
        bookType: '',
        debit: '',
        credit: '',
        bookDate: ''
      },
      isReadOnly: false
    }
  },
  created() {
    this.queryBookInfo();
  },
  methods:{
    queryBookInfo(){
      // this.bookName = "qwe"
      // this.isReadOnly = true
    },
    okCallback(){
      editBookInfo(this.bookInfo).then(res => {
        if(res.code === 200){
          this.$emit('child-ok')
        } else {
          this.$confirm(res.msg,() => {}, () => {});
        }
      })
    },
    cancelCallback(){
      this.$emit('child-cancel')
    }
  }
}
</script>

<style scoped>
.hr1{
  position: relative;
  width: 100%;
  border:1px solid #cccccc;
}
ul {
  margin: 0;
  padding: 0;
}
ul li {
  list-style: none;
}
ul li span {
  padding: 15px;
}
ul li span:first-child{
  display: inline-block;
  width: 25%;
}
.cancel,.ok{
  position: absolute;
  bottom: 10px;
  right: 10px;
}
.ok{
  right:100px;
}
</style>