<template>
  <el-container>
    <el-header></el-header>
    <el-main>
      <el-row>
        <el-col :span="14" :offset="5">
          <el-card :body-style="{ padding: '0px' }">
            <div slot="header" class="header">
              <el-link type="success" @click="back">←  Back</el-link>
              <el-button class="like_bt" @click="click" :disabled="goodsDetail.isLike">❤</el-button>
            </div>
            <div class="body">
              <div>
                  <el-carousel height="300px" direction="vertical" :autoplay="false" class="card">
                    <el-carousel-item v-for="item in goodsDetail.pictures" :key="item">
                     <div class="img">
                       <el-image style="height: 280px;width: auto" :src="item" fit="scale-down"></el-image>
                     </div>
                    </el-carousel-item>
                  </el-carousel>
              <el-row>
                <el-col :span="12">
                  <div class="left bgCo6">
                    <span class="title">{{goodsDetail.title}}</span>
                    <span class="price">¥{{goodsDetail.price}}</span>
                    <span class="des">{{goodsDetail.des}}</span>
                  </div></el-col>
                <el-col :span="12">
                  <div class="right bgCo7">
                    <div class="da">
                        <div class="visit">
                          <span class="visit_span">被浏览 :</span>
                          <div class="visit_number">
                            <el-image style="height: 20px;width: 20px" src="./static/articleReadEyes.png"></el-image>
                            <span class="vn">{{goodsDetail.visit}}</span>
                          </div>
                        </div>
                        <div class="like">
                          <span class="visit_span">被喜欢 :</span>
                          <div class="visit_number">
                            <el-image  style="height: 20px;width: 20px" src="./static/heart.jpg"></el-image>
                            <span class="vn">{{goodsDetail.like}}</span>
                          </div>
                        </div>
                        <div class="rate">
                          <span class="visit_span">评分 :</span>
                          <div class="visit_number">
                            <el-rate
                              v-model="goodsDetail.score"
                              disabled
                              show-text
                              :texts="texts"
                              text-color="#ff9900"
                            >
                            </el-rate>
                          </div>
                        </div>
                    </div>
                    <div class="rated">
                      <span>我认为 :</span>
                      <el-rate v-model="rate" show-text :texts="texts" text-colorElContainer="#ff9900" @change="changeScore"></el-rate>
                    </div>
                    <div class="sellerMessage">
                      <i class="el-icon-user-solid">:{{sellerContact.sellerName}}</i>&nbsp&nbsp
                      <i class="el-icon-phone">:{{sellerContact.phone}}</i>
                    </div>
                    <div class="sellerMessage">
                      <i>微信:{{sellerContact.wechat}}</i>&nbsp&nbsp
                      <i >QQ:{{sellerContact.qq}}</i>
                    </div>
                  </div>
                </el-col>
              </el-row>
              </div>
            </div>
          </el-card>
        </el-col>
      </el-row>
    </el-main>
    <el-footer></el-footer>
  </el-container>
</template>

<script>
  import "@/style/bgColor.css"
  import "@/style/goodsDetail.css"
  import {Notification} from "element-ui";
    export default {
      name: "GoodsDetil",
      data(){
          return{
            goodsId:'',
            goodsDetail:{
              pictures:[],
              title:'',
              price:'',
              des:'',
              score:4,
              visit:'',
              like:'',
              scoreTimes:'',
              isLike:false
            },
            sellerContact:{},
            rate:0,
            texts:['很不值','不值','一般','很值','无脑入']
          }
        },
      methods:{
        load(){
          this.getGoodsDetail();
          this.getGoodsScore();
        },
        //获取商品详细信息
        getGoodsDetail(){
          let _this=this;
          this.$axios.get("/goods/getGoodsDetail?id="+this.goodsId).then(res=>{
            _this.goodsDetail.pictures=res.bean.dalItem.picturesurl.split(",");
            _this.goodsDetail.title=res.bean.dalItem.title;
            _this.goodsDetail.price=res.bean.dalItem.price;
            _this.goodsDetail.des=res.bean.dalItem.des;
            _this.sellerContact=res.bean.userContact.contact;
            _this.sellerContact.sellerName=res.bean.userContact.userName;
          })
        },
        click(){
          debugger;
        },
        //返回上一层
        back(){
          this.$router.back();
        },
        changeScore(score){
          let _this=this;
          this.$axios.get("/goods/changeGoodsScore?id="+this.goodsId+"&number="+score+"&type="+"score").then(
            res=>{
              this.getGoodsScore();
            }
          );

        },
        getGoodsScore(){
          let _this=this;
          this.$axios.get("/goods/getGoodsScore?id="+this.goodsId).then(res=>{
            _this.goodsDetail.visit=res.bean.itemVisit;
            _this.goodsDetail.like=res.bean.itemLike;
            _this.goodsDetail.score=parseInt(res.bean.itemSorce);
            _this.goodsDetail.scoreTimes=res.bean.itemSorceTime;
          })
        }
      },
      mounted() {
        this.goodsId=this.$route.query.id;
        this.load();
      },
      beforeCreate() {
        document.body.style.backgroundColor="rgb(175,215,237)";
      },
      beforeDestroy() {
        document.body.style.backgroundColor="";
      }
    }
</script>
