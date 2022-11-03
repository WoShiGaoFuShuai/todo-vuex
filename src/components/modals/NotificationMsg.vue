<template>
  <div :class="['notification-msg', getBg]">
    <div class="left">
      <div class="left-img">
        <img class="image" :src="notification.img" alt="" />
      </div>
    </div>
    <div class="right">
      <h3 class="text">{{ notification.text }}</h3>
      <button @click="closeNotification" class="close"></button>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  name: "NotificationMsg",
  computed: {
    ...mapGetters({
      notification: "modals/notification",
    }),
    getBg() {
      let res;
      switch (this.notification.bg) {
        case "#ffa841":
          res = "warning-msg";
          break;
        case "#f75c4c":
          res = "error-msg";
          break;
        case "#1abc9c":
          res = "success-msg";
          break;
      }
      return res;
    },
  },
  methods: {
    closeNotification() {
      this.$store.dispatch("modals/closeNotification");
    },
  },
};
</script>

<style lang="scss" scoped>
.notification-msg {
  display: flex;
  align-items: center;
  min-height: 56px;
  border: 1px solid #fff;
  border-radius: 4px;

  &.warning-msg {
    background: #ffa841;
  }

  &.error-msg {
    background: var(--error-bg);
  }

  &.success-msg {
    background: var(--success-bg);
  }

  .left {
    display: flex;
    align-items: center;
    background-color: rgba(255, 255, 255, 0.2);
    min-height: inherit;
    padding: 0 20px;
  }

  .right {
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    padding: 0 16px;

    .text {
      font-weight: 700;
      font-size: 15px;
      line-height: 16px;
    }

    .close {
      background-image: url("@/assets/images/Cancel-btn.svg");
      width: 24px;
      height: 20px;
      filter: brightness(0) saturate(100%) invert(100%) sepia(0%)
        saturate(7473%) hue-rotate(59deg) brightness(115%) contrast(107%);
    }
  }
}
</style>
