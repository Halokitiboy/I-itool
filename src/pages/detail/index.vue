<template>
  <view class="content">
    <view class="container">
      <u-tabs :list="list" @click="tabClick" lineWidth="50" lineHeight="6"> </u-tabs>
      <view v-if="name === '视频下载'">
        <video :src="videoUrl" style="width: 100vw"></video>
        <view class="btn">
          <u-button type="primary" :color="color" @click="downLoadVideo" :loading="loading" :text="progress"></u-button>
        </view>
      </view>
      <view v-if="name === '图片下载'">
        <image :src="cover" style="width: 100vw"></image>
        <view class="btn">
          <u-button type="primary" :color="color">下载</u-button>
        </view>
      </view>
      <view v-if="name === '复制文案'">
        <u--textarea v-model="title" class="title"></u--textarea>
        <view class="btn">
          <u-button type="primary" :color="color">复制</u-button>
        </view>
      </view>
    </view>
  </view>
</template>
<script>
export default {
  data() {
    return {
      list: [
        {
          name: "视频下载",
        },
        {
          name: "复制文案",
        },
        {
          name: "图片下载",
        },
      ],
      title: "",
      cover: "",
      videoUrl: "",
      name: "视频下载",
      color: "#000",
      loading:false,
      progress:'下载'
    };
  },
  onLoad() {
    const { title = "", cover = "", url = "" } = this.$store.state.videoInfo;
    if (title || cover || ur) {
      this.title = title;
      this.cover = cover;
      this.videoUrl = url;
    }
  },
  onUnload() {
    this.$store.commit("setVideoInfo", {});
  },
  methods: {
    tabClick(e) {
      console.log(e);
      const { name } = e;
      this.name = name;
    },
    downLoadVideo() {
      this.loading = true
      const downloadTask = uni.downloadFile({
        // 视频路径 测试视频demo时长有1分钟
        url: this.videoUrl,
        success: (res) => {
          if (res.statusCode === 200) {
            // 视频保存到手机相册
            uni.saveVideoToPhotosAlbum({
              filePath: res.tempFilePath,
              success: function () {
                this.loading = false
                uni.showToast({
                  title: "保存成功",
                  icon: "none",
                });
              },
              fail: function () {
                this.loading = false
                uni.showToast({
                  title: "保存失败，请稍后重试",
                  icon: "none",
                });
              },
            });
          }
        },
      });
      // 下载进度监听
      downloadTask.onProgressUpdate((res) => {
        console.log("下载进度" + res.progress);
        console.log("已经下载的数据长度" + res.totalBytesWritten);
        console.log("预期需要下载的数据总长度" + res.totalBytesExpectedToWrite);
        if(res.progress<100){
          this.progress =   `下载中，进度：${res.progress}%`
        }else{
          this.progress = '下载完成'
          setTimeout(()=>{
            this.progress = '下载'
          },2000)
        }
        if(res.progress === 100){
          this.loading  = false
        }
      });
    },
  },
};
</script>
<style lang="scss">
.content {
  display: flex;
  justify-content: center;
  .container {
    flex: 1;
  }
  .title {
    margin: 10px;
  }
  .btn {
    margin: 20px 16px;
  }
}
</style>
