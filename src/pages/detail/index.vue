<template>
  <view class="content">
    <view class="container">
      <u-tabs
        :list="list"
        @click="tabClick"
        lineWidth="50"
        lineHeight="6"
        lineColor="#000000"
        :activeStyle="{
          color: '#303133',
          fontWeight: 'bold',
          transform: 'scale(1.05)',
        }"
      >
      </u-tabs>
      <view class="content-box">
      <view v-if="name === '视频下载'">
        <video :src="videoUrl" style="width: 100vw"></video>
        <view class="btn">
          <u-row
            customStyle="margin-bottom: 10px;margin-top:10px;"
            justify="space-between"
            gutter="20"
          >
            <u-col span="6">
              <u-button
                type="primary"
                :color="color"
                @click="downLoadVideo"
                :loading="loading"
                :text="progress"
              ></u-button>
            </u-col>
            <u-col span="6">
              <u-button
                type="primary"
                :color="color"
                text="复制链接"
                @click="copyInfo(videoUrl)"
              ></u-button>
            </u-col>
          </u-row>
        </view>
      </view>
      <view v-if="name === '图片下载'">
        <image :src="cover" style="width: 100vw"></image>
        <view class="btn">
          <u-button type="primary" :color="color" @click="savePic">下载</u-button>
        </view>
      </view>
      <view v-if="name === '复制文案'">
        <u--textarea v-model="title" class="title"></u--textarea>
        <view class="btn">
          <u-button type="primary" :color="color" @click="copyInfo(title)">复制</u-button>
        </view>
      </view>
      </view>
    </view>
    <ad unit-id="adunit-062f2627c6a9f95d" ad-type="video" ad-theme="white"></ad>
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
      loading: false,
      progress: "下载",
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
      this.loading = true;
      const downloadTask = uni.downloadFile({
        // 视频路径 测试视频demo时长有1分钟
        url: this.videoUrl,
        success: (res) => {
          if (res.statusCode === 200) {
            // 视频保存到手机相册
            uni.saveVideoToPhotosAlbum({
              filePath: res.tempFilePath,
              success: function () {
                this.loading = false;
                uni.showToast({
                  title: "保存成功",
                  icon: "none",
                });
              },
              fail: function () {
                this.loading = false;
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
        if (res.progress < 100) {
          this.progress = `下载中，进度：${res.progress}%`;
        } else {
          this.progress = "下载完成";
          setTimeout(() => {
            this.progress = "下载";
          }, 2000);
        }
        if (res.progress === 100) {
          this.loading = false;
        }
      });
    },
    copyInfo(info) {
      uni.setClipboardData({
        data: info,
        success: function () {
          console.log("success");
        },
      });
    },
    savePic() {
      uni.downloadFile({
        url: this.cover,
        success: (res) => {
          if (res.statusCode === 200) {
            // 视频保存到手机相册
            uni.saveImageToPhotosAlbum({
              filePath: res.tempFilePath,
              success: function () {
                uni.showToast({
                  title: "保存成功",
                  icon: "none",
                });
              },
            });
          }
        },
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
  .btn-group {
    display: flex;
  }
}
.content-box{
  margin-top: 16px;
}
</style>
