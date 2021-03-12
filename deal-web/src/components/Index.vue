<template>
  <el-container>
    <el-header height="120px">
      <el-row style="background-color: #B3C0D1">
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
        <el-carousel :interval="4000" type="card" height="340px" >
          <el-carousel-item v-for="item in 6" :key="item">
            <h3 class="medium">{{ item }}</h3>
          </el-carousel-item>
        </el-carousel>
      </div>
      <div class="recommend">
        <div class="recommend-title">推荐商品</div>
        <div>
          <el-row>
            <el-col :span="6"><div class="recommend-product">1</div></el-col>
            <el-col :span="6"><div class="recommend-product">2</div></el-col>
            <el-col :span="6"><div class="recommend-product">3</div></el-col>
            <el-col :span="6"><div class="recommend-product">4</div></el-col>
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
    export default {
      name: "Index",
      methods:{
        onclick(){
          this.$router.push("/addGoods");
        },
      }
    }
</script>

