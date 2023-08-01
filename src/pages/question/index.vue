<template>
  <view class="container">
    <view class="container-item">
      <view class="title">1.为什么解析后还是有水印? </view>
      <view>
        如果原作者上传的视频本身就存在水印，那么本小程序将无法去除，原视频是否有水印请查看在对应APP中播放时是否有水印
      </view>
    </view>
    <view class="container-item">
      <view class="title">2.为什么会解析失败?</view>
      <view
        >有几种可能:1、作品或者账号设置了私密;2、作品还在审核中;3、作品被作者删除了;4、暂时不支持该平台</view
      >
    </view>
    <view class="container-item">
      <view class="title">3.安卓下载成功后，找不到视频?</view>
      <view>视频存放在 tencent/MicroMsg/Weixin/ 文件夹中 </view>
    </view>
    <view class="container-item">
      <view class="title">4.视频保存失败? </view>
      <view
        >由于微信小程序的限制，有些视频 (视频过大或链接不符合规范)
        会保存失败，Android手机请复制链接后到浏览器(推荐使用Chrome浏览器)中下载，苹果手机可以下载Documents
        by readdle这个软件保存</view
      >
    </view>
    <ad unit-id="adunit-062f2627c6a9f95d" ad-type="video" ad-theme="white"></ad>
  </view>
</template>
<script>
export default {
  data() {
    return {};
  },
};
</script>
<style lang="scss" scoped>
.container{
    padding: 16px;
    .title{
        color: #000000;
        margin-bottom: 10px;
        font-size: 16px;
    }
    .container-item{
        margin: 10px 0;
        color: gray;
        font-size: 14px;
    }
}
</style>
