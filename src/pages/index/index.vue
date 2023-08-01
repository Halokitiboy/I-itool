<template>
  <view class="container">
    <view class="content">
      <u--textarea
        class="textarea-box"
        height="150"
        v-model="urlvalue"
        border="none"
        placeholder="请粘贴主流平台视频分享链接"
      ></u--textarea>
    </view>
    <view class="statement"> 没有套路,下载无需观看视频 </view>
    <!-- 去水印 -->
    <u-row
      customStyle="margin-bottom: 10px;margin-top:10px;"
      justify="space-between"
      gutter="20"
    >
      <u-col span="6">
        <u-button
          type="primary"
          @click="pasteAndAnalyze"
          :loading="loading"
          :color="color"
          :text="btnLeft"
        ></u-button>
      </u-col>
      <u-col span="6">
        <u-button type="primary" :color="color" @click="pasteText" :text="btnRight">
        </u-button>
      </u-col>
    </u-row>
    <u-row
      customStyle="margin-bottom: 10px;margin-top:10px;"
      justify="space-between"
      gutter="20"
    >
      <u-col span="6">
        <u-button
          type="primary"
          :color="color"
          text="常见问题"
          @click="goToQuestion"
        ></u-button>
      </u-col>
      <u-col span="6">
        <u-button type="primary" :color="color" @click="goToHistory" text="历史记录">
        </u-button>
      </u-col>
    </u-row>
    <ad unit-id="adunit-062f2627c6a9f95d" ad-type="video" ad-theme="white"></ad>
  </view>
</template>

<script>
import { video } from "@/api/api";
import { extractLinkFromString } from "@/utils/index";
export default {
  data() {
    return {
      title: "Hello",
      urlvalue: "",
      color: "#000",
      btnLeft: "粘贴并解析",
      btnRight: "清空内容",
      loading: false,
      videoInfo: {},
      videoHistory: [],
    };
  },
  onLoad() {
    uni.showShareMenu({
      withShareTicket: true,
      title: "水印工具盒",
      content: "免费，好用的去水印工具",
      path: "/pages/index/index",
    });
  },
  watch: {
    urlvalue(newVal, oldVal) {
      if (newVal) {
        this.btnRight = "清空内容";
      }
    },
  },
  methods: {
    change() {},
    /**
     * 粘贴并解析
     */
    pasteAndAnalyze() {
      uni.getClipboardData({
        success: (res) => {
          this.urlvalue = res.data;
          this.loading = true;
          this.getVideo();
        },
      });
    },
    /**
     * 粘贴
     */
    pasteText() {
      if (this.urlvalue) {
        this.urlvalue = "";
      } else {
        // uni.getClipboardData({
        //   success: (res) => {
        //     this.urlvalue = res.data;
        //   },
        // });
      }
    },
    // 获取视频
    async getVideo() {
      console.log("video", video);
      let url = extractLinkFromString(this.urlvalue);
      console.log(url);
      if (!url) {
        uni.showToast({
          title: "请粘贴正确的视频地址",
          icon: "none",
        });
        this.loading = false;
        return;
      }
      if (!this.urlvalue) {
        uni.showToast({
          title: "请先粘贴视频地址",
          icon: "none",
        });
        this.loading = false;
        return;
      }
      uni.getStorage({
        key: "video_history",
        success: (res) => {
          console.log(res.data);
          if (res.data && res.data) {
            this.videoHistory = res.data.concat([this.urlvalue]);
            uni.setStorage({
              key: "video_history",
              data: this.videoHistory,
              success: () => {
                console.log("success");
              },
            });
          } else {
            this.urlvalue &&
              uni.setStorage({
                key: "video_history",
                data: [this.urlvalue],
                success: () => {
                  console.log("success");
                },
              });
          }
        },
        fail: () => {
          uni.setStorage({
            key: "video_history",
            data: this.videoHistory.concat([this.urlvalue]),
            success: () => {
              console.log("success");
            },
          });
        },
      });
      await this.$http
        .get(`${video}`, {
          url: url,
        })
        .then((res) => {
          if (res.code === 200) {
            const { data } = res;
            this.$store.commit("setVideoInfo", data);
            this.videoInfo = data;
            uni.navigateTo({
              url: "/pages/detail/index",
            });
          } else {
            uni.showToast({
              title: res.msg,
            });
          }
          this.loading = false;
        })
        .catch((error) => {
          this.loading = false;
          console.log(error);
        });
    },
    goToQuestion() {
      uni.navigateTo({
        url: "/pages/question/index",
      });
    },
    goToHistory() {
      uni.navigateTo({
        url: "/pages/history/index",
      });
    },
  },
};
</script>

<style lang="scss">
.container {
  box-sizing: border-box;
  padding: 0 16px;
  .textarea-box {
    // height: ;
    border: 1px solid #000000;
  }
  .content {
    box-sizing: border-box;
    margin-top: 16px;
    display: flex;
    align-items: center;
    justify-content: center;
    border: 1px solid #000000;
    border-radius: 10px;
    overflow: hidden;
  }
  .fn-btn {
    margin-top: 16px;
    display: flex;
  }
  .paste_btn {
    margin-left: 10px;
  }
  .statement {
    color: #000000;
    font-size: 14px;
    text-align: center;
    margin: 10px 0;
  }
}
</style>
