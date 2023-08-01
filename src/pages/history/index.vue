<template>
  <div
    class="container"
    :style="{ 'padding-bottom': historyList.length ? '120px' : '0' }"
  >
   <view class="list-box">
    <u-list @scrolltolower="scrolltolower" v-if="historyList.length">
      <ad unit-id="adunit-886a6eb160db9a58"></ad>
      <u-list-item v-for="(item, index) in historyList" :key="index">
        <view class="history_item">
          <view class="content">
            {{ item }}
          </view>
          <u-button
            class="custom-style"
            text="去解析"
            type="success"
            hairline
            iconColor="#000"
            color="#000"
          >
            去水印
          </u-button>
        </view>
      </u-list-item>
    </u-list>
    <u-empty mode="history" textSize="12px" textColor="#000" v-else> </u-empty>
    
   </view>
   <view class="btn-bottom">
    <view class="button-fixed" v-if="historyList.length">
      <view class="state-text">仅保存最近50条(保存在本地，删除程序会导致记录丢失)</view>
      <u-button
        text="清除历史记录"
        iconColor="#000"
        color="#000"
        @click="clearHistory"
      ></u-button>
    </view>
   </view>
  </div>
</template>
<script>
export default {
  data() {
    return {
      historyList: [],
    };
  },
  onLoad() {
    this.getList();
  },
  methods: {
    scrolltolower() {},
    getList() {
      uni.getStorage({
        key: "video_history",
        success: (res) => {
          this.historyList = res.data;
        },
      });
    },
    clearHistory() {
      uni.showModal({
        content: "确定删除吗？删除后无法恢复",
        showCancel: true,
        confirmColor: "red",
        success: (res) => {
          if (res.confirm) {
            uni.removeStorage({
              key: "video_history",
              success: function (res) {
                uni.showToast({
                  title: "清除成功",
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
.container {
  // padding-bottom: 120px;
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-content: center;
  justify-content: center;
  .list-box{
    flex: 1;
    overflow: scroll;
  }
  .btn-bottom{
    height: 113px;
  }
}
.history_item {
  margin: 20px 16px;
  .content {
    margin: 0 0 10px 0;
    border: 1px solid #000;
    border-radius: 10px;
    padding: 10px;
  }
  .custom-style {
    margin-top: "20px"; // 注意驼峰命名，并且值必须用引号包括，因为这是对象
    color: "#000";
    border: 1px solid #000;
    border-radius: 10px;
    color: #000000;
    font-size: 16px;
    padding: 4px 0;
  }
}
.state-text {
  text-align: center;
  font-size: 12px;
  color: gray;
  margin-bottom: 10px;
}
.button-fixed {
  padding: 16px 16px 30px;
  background: #ffffff;
}
</style>
