<template>
  <div>
    <u-list @scrolltolower="scrolltolower">
      <u-list-item v-for="(item, index) in historyList" :key="index">
        <view class="history_item">
          <view class="content">
            {{ item }}
          </view>
          <u-button
            class="custom-style"
            text="去水印"
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
  </div>
</template>
<script>
export default {
  data() {
    return {
      historyList: [],
      customStyle: {
				marginTop: '20px', // 注意驼峰命名，并且值必须用引号包括，因为这是对象
				color: 'red'
			}
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
  },
};
</script>
<style lang="scss">
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
</style>
