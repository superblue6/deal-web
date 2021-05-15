
<template>
<el-container>
  <el-header height="130px">
    <el-row>
      <el-col :span="4" :offset="3">
        <el-image src="./static/logo.png" style="height: 130px"></el-image>
      </el-col>
      <el-col :span="4">
        <div class="titl"><span>新增闲置</span></div>
      </el-col>
    </el-row>
  </el-header>
  <el-main>
    <el-row >
      <el-col class="form-row" :span="15" :offset="4">
        <div class="form-div">
          <el-form ref="form" :model="goods" label-width="150px"  label-position="left" size="medium">
            <el-form-item  label="物品分类:" prop="categoryId">
              <el-cascader v-model="goods.categoryId" :options="cats" :props="{value:'id',label:'name'}" >
              </el-cascader>
            </el-form-item>
            <el-form-item label="物品标题:" prop="title">
              <el-input v-model="goods.title">
              </el-input>
            </el-form-item>
            <el-form-item label="物品图片:">
              <el-upload list-type="picture"
                         ref="upload"
                         action=""
                         :limit="6"
                         :auto-upload="false"
                         :http-request="pushPictures"
                         :file-list="fileList" >
                <el-button slot="trigger" size="small" type="primary">选取文件</el-button>
                <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
              </el-upload>
            </el-form-item>
            <el-form-item  label="价格" prop="price"><el-input v-model="goods.price"></el-input></el-form-item>
            <el-form-item  label="物品新旧程程度:" prop="oldLevel">
              <el-select v-model="goods.oldLevel" placeholder="请选择">
                <el-option v-for="item in oldLevel"
                :key="item.id"
                :label="item.level"
                :value="item.id">
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="物品描述:" prop="des">
              <el-input type="textarea" v-model="goods.des"></el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="submit">立即创建</el-button>
              <el-button @click="resetForm('form')">重置</el-button>
            </el-form-item>
          </el-form>
        </div>
      </el-col>
    </el-row>
  </el-main>
  <el-footer></el-footer>
</el-container>
</template>
<script>
  import "../../style/addGoods.css"
  import {Notification} from "element-ui";
    export default {
      name: "AddGoods",
      data(){
        return{
          cats:[],
          goods:{
            categoryId:'',
            title:'',
            price:'',
            oldLevel:'',
            des:''
          },
          oldLevel:[],
          fileList:[],
          pictures:[],
          formData:new FormData(),
        }
      },
      methods:{
        //加载页面数据
        load(){
          this.getCats();
          this.getOldLevel();
        },
        //获取商品分类
        getCats(){
          let _this=this;
          this.$axios.get('/goods/getGoodsCat').then(res=>{
            _this.clearNull(res.beans);
            _this.cats=res.beans;
          })
        },
        //获取商品新旧程度码表
        getOldLevel(){
          let _this=this;
          this.$axios.get("/goods/getOldLevel").then(res=>{
            _this.oldLevel=res.beans;
          })
        },
        //使用递归清楚为空的children
        clearNull(data){
          data.forEach(item=>{
            if (item.children.length>0){
              this.clearNull(item.children)
            }else {
              item.children=undefined;
            }
          })
        },
        // 将上传的图片添加到表单中
        pushPictures(param){
          this.formData.append("pictures",param.file);
        },
        //提交上传
        submit(){
          debugger;
          let _this=this;
          this.$refs.upload.submit();
          let id = this.goods.categoryId;
          this.goods.categoryId=id[id.length-1];
          let goods = JSON.stringify(this.goods);
          this.formData.append("goods",goods);
          this.$axios.post("/goods/addGoods",this.formData,{headers:{'Content-Type':'multipart/form-data'}}).then(res=>{
            if (res.returnCode=="0"){
              _this.$confirm('新增商品成功','提示',{
                confirmButtonText:'返回首页',
                cancelButtonText:'查看详情',
                type: 'success'
              }).then(()=>{
                _this.$router.go(-1);
              }).catch(()=>{
                _this.$router.push();
              })
            }else {
              _this.formData.delete("pictures");
              _this.errorAlert(res.returnMessage);
            }
          })
        },
        //表单置空
        resetForm(formName) {
          this.$refs[formName].resetFields();
          this.$refs.upload.clearFiles();
        },
        //错误提示框
        errorAlert(message) {
          Notification.error({
            title: '错误',
            message: message,
            customClass:'custom-error'
          })
        },
        //成功提示框
        successAlert(message){
          Notification.success({
            title:'成功',
            message:''
          })
        }
      },
      mounted() {
        this.load();
      }
    }
</script>
