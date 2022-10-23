<template>
  <!-- <div class="modal-add-task wrapper" v-if="isOpen">
    <slot></slot>
  </div> -->
  <div>aa</div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  name: "ModalWindow",
  computed: {
    // isOpen() {
    // return this.$store.state.modals.isOpenAddTaskModal;
    // },
    ...mapGetters({
      isOpen: ["modals/isOpen"],
    }),
  },
  // props: {
  //   value: {
  //     type: Boolean,
  //     default: false,
  //   },
  // },
  // data() {
  //   return {
  //     isOpenAddTaskModal: false,
  //   };
  // },
  // watch: {
  //   value: {
  //     handler(newValue, oldValue) {
  //       if (newValue !== oldValue) this.isOpenAddTaskModal = newValue;
  //     },
  //     immediate: true,
  //   },
  // },
};

// // const categoryIndex = ["work", "education", "hobby", "sport", "other"];
</script>

<style lang="scss" scoped>
* {
  font-family: "Roboto", sans-serif;
  font-weight: 400;
  color: #fff;
  font-size: 14px;
}

.modal-add-task {
  // display: none;
  background-color: rgba(0, 0, 0, 0.7);
  position: absolute;
  z-index: 100;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;

  .add-task {
    background-color: var(--main-bg);
    z-index: 101;
    padding: 20px;
    max-width: 520px;
    margin: 0 auto;
    border-radius: 0px 15px 0px 15px;

    box-shadow: 0px 0px 20px 20px rgba(141, 165, 184, 0.3);
    transition: all 0.3s ease-out;

    &:hover {
      border-radius: 15px 0px 15px 0px;
      transform: scale(1.01);
      box-shadow: 0px 0px 20px 20px rgba(130, 199, 224, 0.3);
    }

    .form {
      .buttons {
        display: flex;
        justify-content: flex-end;

        .button-item {
          margin-left: 16px;

          &:hover {
            cursor: pointer;
            filter: brightness(0) saturate(100%) invert(81%) sepia(29%)
              saturate(806%) hue-rotate(165deg) brightness(93%) contrast(87%);
          }
        }
      }

      .title {
        text-align: center;
        margin-bottom: 24px;
        font-weight: 700;
        font-size: 28px;
        letter-spacing: 1.5px;
      }

      .content {
        padding: 0 28px;

        .fieldset {
          border: none;
          border-bottom: 1px solid #425869;
          margin-bottom: 32px;

          .label-title {
            text-transform: uppercase;
            margin-bottom: 12px;
            display: block;
            line-height: 16px;
          }

          .input-text {
            font-size: 16px;
            width: 100%;
            line-height: 20px;
            background: transparent;
            border: none;
            line-height: 20px;
            outline: none;
            margin-bottom: 8px;
          }

          ::-webkit-input-placeholder {
            color: var(--greyish);
          }
          :-moz-placeholder {
            color: var(--greyish);
            opacity: 1;
          }
          ::-moz-placeholder {
            color: var(--greyish);
            opacity: 1;
          }
          :-ms-input-placeholder {
            color: var(--greyish);
          }
          ::-ms-input-placeholder {
            color: var(--greyish);
          }

          ::placeholder {
            color: var(--greyish);
          }
        }

        .radio {
          .label-wrapper {
            display: inline-block;
            margin-bottom: 8px;

            .label-item {
              margin-left: 16px;

              &.estimation {
                margin-left: 8px;
              }

              &:hover {
                cursor: pointer;

                .text {
                  color: var(--grey-light);
                }

                .fake.orangeish {
                  background-color: var(--orangeish);
                }

                .fake.blueish {
                  background-color: var(--blueish);
                }

                .fake.pinkish {
                  background-color: var(--purpleish);
                }

                .fake.redish {
                  background-color: var(--redish);
                }

                .fake.aquaish {
                  background-color: var(--aquaish);
                }

                .fake.yellowish {
                  background-color: var(--yellowish);
                }

                .fake.greenish {
                  background-color: var(--greenish);
                }
              }

              &:nth-of-type(1) {
                margin-left: 0;
              }

              .radio {
                display: none;
              }

              .fake {
                display: inline-block;
                width: 16px;
                height: 16px;
                position: relative;
                background-color: var(--greyish);
                border-radius: 50%;

                &.estimation {
                  background: url("@/assets/images/Estimation-null.svg")
                    no-repeat;
                  width: 20px;
                  height: 20px;
                }

                &::before,
                &.estimation::before {
                  content: "";
                  position: absolute;
                  display: block;
                  background-color: inherit;
                  width: 7px;
                  height: 7px;
                  border-radius: 50%;
                  border: 2.6px solid var(--main-bg);
                  top: 50%;
                  left: 50%;
                  transform: translate(-50%, -50%);
                  opacity: 0;
                  transition: 0.2s ease;
                }

                &.estimation::before {
                  background: url("@/assets/images/Estimation-full.svg")
                    no-repeat;
                  width: 20px;
                  height: 20px;
                  border-radius: none;
                  border: none;
                  transition: 0.5s ease;
                }
              }

              .radio:checked + .fake::before,
              .radio:checked + .fake.estimation::before {
                opacity: 1;
              }

              .radio:checked ~ .text {
                color: #fff;
              }

              .radio:checked ~ .fake.orangeish {
                background-color: var(--orangeish);
              }

              .radio:checked ~ .fake.blueish {
                background-color: var(--blueish);
              }

              .radio:checked ~ .fake.pinkish {
                background-color: var(--purpleish);
              }

              .radio:checked ~ .fake.redish {
                background-color: var(--redish);
              }

              .radio:checked ~ .fake.aquaish {
                background-color: var(--aquaish);
              }

              .radio:checked ~ .fake.yellowish {
                background-color: var(--yellowish);
              }

              .radio:checked ~ .fake.greenish {
                background-color: var(--greenish);
              }

              .text {
                margin-left: 8px;
                color: var(--greyish);
                font-weight: 400px;
                line-height: 20px;
                font-size: 16px;
              }
            }
          }
        }
      }
    }
  }
}
</style>
