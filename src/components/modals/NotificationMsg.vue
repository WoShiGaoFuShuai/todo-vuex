<template>
  <div :class="['notification-msg']">
    <!-- <div class="left">
      <div class="left-img">
        <img class="image" :src="notification.img" alt="" />
      </div>
    </div>
    <div class="right">
      <h3 class="text">{{ notification.text }}</h3>
      <button @click="closeNotification" class="close"></button>
    </div> -->

    <div
      v-for="notification in arrayNotification"
      :key="notification.id"
      :class="[
        'wrapper-notification',
        {
          'warning-msg': notification.bg === '#ffa841',
          'error-msg': notification.bg === '#f75c4c',
          'success-msg': notification.bg === '#1abc9c',
        },
      ]"
    >
      <div class="left">
        <div class="left-img">
          <img class="image" :src="notification.img" alt="" />
        </div>
      </div>
      <div class="right">
        <h3 class="text">{{ notification.text }}</h3>
        <button
          @click="closeNotification(notification.id)"
          class="close"
        ></button>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  name: "NotificationMsg",
  computed: {
    ...mapGetters({
      // notification: "modals/notification",
      arrayNotification: "modals/arrayNotification",
    }),
    // getBg() {
    //   let res;
    //   switch (this.notification.bg) {
    //     case "#ffa841":
    //       res = "warning-msg";
    //       break;
    //     case "#f75c4c":
    //       res = "error-msg";
    //       break;
    //     case "#1abc9c":
    //       res = "success-msg";
    //       break;
    //   }
    //   return res;
    // },
  },
  methods: {
    closeNotification(id) {
      this.$store.dispatch("modals/closeNotification", id);
    },
  },
};
</script>

<style lang="scss" scoped>
.notification-msg {
  .wrapper-notification {
    display: flex;
    align-items: center;
    min-height: 56px;
    border: 1px solid #fff;
    border-radius: 4px;
    position: fixed;
    bottom: 50px;
    right: 44px;
    left: 44px;

    @media (max-width: 768px) {
      left: 20px;
      right: 20px;
      bottom: 20px;
    }

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

      .left-img {
        height: 32px;
      }

      @media (max-width: 425px) {
        padding: 0 10px;
      }
    }

    .right {
      display: flex;
      align-items: center;
      justify-content: space-between;
      width: 100%;
      padding: 0 16px;

      @media (max-width: 425px) {
        padding: 0 8px;
      }

      .text {
        font-weight: 700;
        font-size: 15px;
        line-height: 16px;
        padding-right: 20px;
      }

      .close {
        background-image: url("@/assets/images/Cancel-btn.svg");
        width: 30px;
        height: 20px;
        filter: brightness(0) saturate(100%) invert(100%) sepia(0%)
          saturate(7473%) hue-rotate(59deg) brightness(115%) contrast(107%);
      }
    }
  }
}
</style>
