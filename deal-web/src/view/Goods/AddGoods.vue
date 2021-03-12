
<template>
<el-container>
  <el-header height="130px">
    <el-row>
      <el-col :span="4" :offset="3">
        <el-image src="./static/logo.png" style="height: 130px"></el-image>
      </el-col>
      <el-col :span="2">
        <div class="titl"><span>新增闲置</span></div>
      </el-col>
    </el-row>
  </el-header>
  <el-main>
    <el-row >
      <el-col class="form-row" :span="15" :offset="4">
        <div class="form-div">
          <el-form ref="form" :model="goods" label-width="150px"  label-position="left" size="medium">
            <el-form-item label="物品分类:">
              <el-cascader :options="cats" :props="{value:'id',label:'name'}" >
              </el-cascader>
            </el-form-item>
            <el-form-item label="物品标题:">
              <el-input>
              </el-input>
            </el-form-item>
            <el-form-item label="物品图片:">
              <el-upload list-type="picture-card" action="/"></el-upload>
            </el-form-item>
            <el-form-item label="物品新旧程程度:">

            </el-form-item>
            <el-form-item label="物品描述:">
              <el-input type="textarea"></el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="te">立即创建</el-button>
              <el-button>重置</el-button>
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
    export default {
      name: "AddGoods",
      data(){
        return{
          cats:[],
          goods:{},
        }

      },
      methods:{
        getCats(){
          let _this=this;
          this.$axios.get('/goods/getGoodsCat').then(res=>{
            _this.clearNull(res.beans);
            _this.cats=res.beans;
            debugger;
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
        }
      },
      mounted() {
        this.getCats();
      }
    }
</script>
