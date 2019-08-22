<template>
  <div class="home-main">
    <img class="home-bg-img" src="./../assets/img/bg2.jpeg" alt="">
    <div class="home-form">
      <h3>欢迎进入聊天室</h3>
      <div class="home-input-div">
        <input type="text" v-model="userName" placeholder="请输入用户名">
      </div>
      <button class="entry-btn" @click="enterChat()">进入群聊</button>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

@Component
export default class Home extends Vue {
  private userName: string = '';
  private enterChat() {
    this.$router.push('chat');
  }
}
</script>
<style lang="scss">
@import "@/style/commonStyle.scss";
.home-main{
  max-width: $max-width;
  width: 100%;
  height: $max-height;
  position: relative;
  margin: 0 auto;
  .home-bg-img{
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    z-index: -1
  }
  .home-form{
    z-index: 1;
    width: 400px;
    height: 200px;
    margin: 0 auto;
    background: rgba(255, 255, 255, 0.7);
    border-radius: 5px;
    position: absolute;
    top: 50%;
    left: 50%;
    margin-left: -200px;
    margin-top: -100px;
    padding: 20px;
    .home-input-div{
      margin-top: 20px;
      input{
        width: 100%;
        height: 32px;
        outline: 2px;
        border-radius: 5px;
        padding: 0 20px;
        border: 1px solid $border-color;
      }
    }
    .entry-btn{
        width: 100%;
        height: 32px;
        line-height: 32px;
        border-radius: 5px;
        border: 1px solid $border-color;
        margin-top: 20px;
        cursor: pointer;
        &:hover{
          border: 1px solod $link-color;
          background: $btn-bg-color;
        }
    }
    
  }
}
</style>
