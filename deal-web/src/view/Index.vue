<template>
  <el-container>
    <el-header height="120px">
      <el-row class="bgCo1">
        <el-col :span="6">
          <div class="bg-dark">
            <span class="title">校园置换</span>
          </div>
        </el-col>
        <el-col :span="6" :offset="3">
          <div class="bg-dark">
              <el-input placeholder="请输入内容" >
                <el-button  class="input-with-select" slot="append" icon="el-icon-search"></el-button>
              </el-input>
            </div>
        </el-col>
        <el-col :span="6" :offset="3">
          <div class="bg-dark">
            <el-button  icon="el-icon-user-solid">
              <el-link type="primary">登录</el-link>
              <el-link type="primary">注册</el-link>
            </el-button>
          </div>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="24">
          <div class="braed">
            <el-link><span class="br">首页</span></el-link>
            |
            <el-link @click="onclick"><span class="br">发布闲置</span></el-link>
            |
            <el-link><span class="br">求购商城</span></el-link>
            |
            <el-link><span class="br">反馈与意见</span></el-link>
            |
            <el-link><span class="br">联系我们</span></el-link>
          </div>
        </el-col>
      </el-row>
    </el-header>
    <el-main>
      <div class="lunbo">
        <el-carousel :interval="4000" type="card" height="440px" >
          <el-carousel-item v-for="item in top3Goods" :key="item.id">
            <div class="bgCo1">
              <el-image :src="item.picturesurl"></el-image>
            </div>
          </el-carousel-item>
        </el-carousel>
      </div>
      <div class="recommend">
        <div class="recommend-title">推荐商品</div>
        <div>
          <el-row>
            <el-col :span="3" v-for="(item, index) in topGoods" :key="item.id" :offset='2'>
              <el-card :body-style="{ padding: '0px',height:'290px'}" class="card">
                <el-image :src="item.picturesurl" fit="fill" class="image"></el-image>
                <div style="padding: 14px;">
                  <span>{{item.title}}:¥{{item.price}}</span>
                  <div class="">
                    <el-button type="text" class="button" @click="jumpGoodsDetail(item.id)">查看详情</el-button>
                  </div>
                </div>
              </el-card>
            </el-col>
          </el-row>
        </div>
      </div>
    </el-main>
    <el-footer>
      <div class="footer">
        <div>关于我们</div>
        <div>团队信息</div>
      </div>

    </el-footer>
  </el-container>

</template>

<script>
  import "@/style/index.css"
  import "@/style/bgColor.css"
  import {Notification} from "element-ui";
    export default {
      name: "Index",
      data(){
        return{
          top3Goods:[],
          topGoods:[],
        }
      },
      methods:{
        onclick(){
          this.$router.push("/addGoods");
        },
        load(){
          this.getTopGoods();
        },
        getTopGoods(){
          let _this=this;
          this.$axios.get("/goods/getTopGoods?number="+'15').then(res=>{
            if (res.returnCode!='0'){
              _this.errorAlert("服务器错误");
              return;
            };
            let list=res.beans;
            for (let i=0; i<3 ;i++){
              _this.top3Goods.push(list[i]);
            };

            list.splice(0,3);
            _this.topGoods=list;
          });
        },
        //跳转详情
        jumpGoodsDetail(id){
          debugger;
          this.$router.push("/goodsDetail?id="+id);
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

