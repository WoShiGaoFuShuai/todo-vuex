<template>
  <div @click="cancelDeleteCompletely" class="modal-confirm-del wrapper">
    <div class="confirm" @click.stop="">
      <form @submit.prevent="" class="form">
        <div class="top-wrapper">
          <div class="btn-wrapper">
            <button
              @click="cancelDeleteCompletely"
              type="button"
              class="btn"
            ></button>
          </div>
          <h2 class="title-modal">Remove Task</h2>
        </div>
        <div class="main-content">
          <h2 class="text">
            Are you sure you want to remove selected <br />
            task(s)?
          </h2>
        </div>
        <div class="button-wrapper-btm">
          <button @click="cancelDeleteCompletely" type="button" class="cancel">
            Cancel
          </button>
          <button @click="confirmDeleteCompletely" type="button" class="remove">
            Remove
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  name: "ConfirmDelete",
  methods: {
    cancelDeleteCompletely() {
      this.$store.dispatch("modals/toggleDeleteCompletelyModal");
      this.$store.dispatch("tasks/resetDeleteCompletelyTaskId");
    },
    confirmDeleteCompletely() {
      this.$store.dispatch("tasks/removeCompletelyDeletedTask");
      this.$store.dispatch("modals/toggleDeleteCompletelyModal");
    },
  },
};
</script>

<style lang="scss" scoped>
.modal-confirm-del {
  background-color: rgba(0, 0, 0, 0.7);
  position: absolute;
  z-index: 100;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;

  .confirm {
    background-color: var(--main-bg);
    z-index: 101;
    padding: 20px;
    max-width: 520px;
    max-height: 520px;
    height: 100%;
    margin: 0 auto;
    border-radius: 0px 15px 0px 15px;

    box-shadow: 0px 0px 20px 20px rgba(141, 165, 184, 0.3);
    transition: all 0.3s ease-out;

    &:hover {
      border-radius: 15px 0px 15px 0px;
      transform: scale(1.01);
      box-shadow: 0px 0px 20px 20px rgba(130, 199, 224, 0.3);
    }

    @media (max-width: 425px) {
      padding: 16px 8px;
    }
  }

  .form {
    height: inherit;
    display: flex;
    flex-direction: column;
    justify-content: space-between;

    .top-wrapper {
      .btn-wrapper {
        text-align: end;

        .btn {
          width: 20px;
          height: 20px;
          background: url("@/assets/images/Cancel-btn.svg") no-repeat center;
        }
      }
      .title-modal {
        text-align: center;
        margin-bottom: 16px;
        font-weight: 700;
        font-size: 24px;
        letter-spacing: 1.5px;

        @media (max-width: 375px) {
          font-size: 22px;
          margin-top: 10px;
        }
      }
    }

    .main-content {
      text-align: center;
      margin: 0 30px;

      @media (max-width: 425px) {
        margin: 0;
      }

      .text {
        color: var(--greyish);
        font-weight: 300;
        font-size: 30px;
        line-height: 42px;

        @media (max-width: 425px) {
          font-size: 22px;
          line-height: 30px;
        }

        @media (max-width: 375px) {
          font-size: 20px;
        }
      }
    }

    .button-wrapper-btm {
      display: flex;
      justify-content: center;
      margin-bottom: 28px;

      .cancel,
      .remove {
        background: var(--btn-blue);
        padding: 12px 32px;
        margin: 0 12px;
        font-family: var(--second-font);
        font-weight: 700;
        font-size: 18px;
        line-height: 20px;

        @media (max-width: 425px) {
          padding: 10px 22px;
          margin: 0 8px;
        }

        @media (max-width: 375px) {
          font-size: 14px;
        }
      }

      .remove {
        background: var(--btn-red);
      }
    }
  }
}
</style>
