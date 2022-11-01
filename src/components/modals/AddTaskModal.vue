<template>
  <!-- <BaseModal> -->
  <div class="modal-add-task wrapper" @click="closeModal">
    <div class="add-task" @click.stop="">
      <form @submit.prevent="agreeModalTodo" class="form">
        <ul class="buttons">
          <li class="button-item">
            <img
              @click="closeModal"
              src="@/assets/images/Cancel-btn.svg"
              alt=""
            />
          </li>
          <li class="button-item">
            <button class="agree-btn"></button>
          </li>
        </ul>
        <h2 class="title-modal">{{ titleModal }} Task</h2>
        <!-- <h2 class="title">{{ type === "edit" ? "Edit" : "Add" }} Task</h2> -->
        <div class="content">
          <fieldset class="fieldset">
            <label class="label-title" for="title">Title</label>
            <input
              class="input-text"
              id="title"
              type="text"
              placeholder="Add title here"
              v-model="title"
              required
            />
          </fieldset>
          <fieldset class="fieldset">
            <label class="label-title" for="description">Description</label>
            <input
              class="input-text"
              id="description"
              type="text"
              placeholder="Add description here"
              v-model="description"
              required
            />
          </fieldset>
          <fieldset class="fieldset radio category">
            <span class="label-wrapper">
              <span class="label-title">Category</span>
              <label
                class="label-item"
                v-for="({ name, className, value }, index) in categoryArray"
                :key="index"
              >
                <input
                  :value="value"
                  id="category"
                  class="radio"
                  type="radio"
                  name="category"
                  :checked="index === 4"
                  @click="addCategory(value)"
                />
                <span :class="['fake', className]"></span>
                <span class="text">{{ name }}</span>
              </label>
            </span>
          </fieldset>
          <fieldset class="fieldset">
            <label class="label-title" for="deadline"> Deadline </label>
            <input
              v-model="deadline"
              class="input-text"
              id="deadline"
              type="date"
              placeholder="Add DEADLINE here"
              required
            />
          </fieldset>

          <fieldset class="fieldset radio estimation">
            <span class="label-wrapper estimation">
              <span class="label-title">Estimation</span>

              <label
                v-for="{ name, value } in estimationArray"
                :key="value"
                class="label-item estimation"
              >
                <input
                  class="radio estimation-checkbox"
                  :name="name"
                  id="estimation"
                  :value="value"
                  @click="addEstimation(value)"
                  type="checkbox"
                  :checked="value === 0"
                />
                <span class="fake estimation"></span>
              </label>
            </span>
          </fieldset>

          <fieldset class="fieldset radio priority">
            <span class="label-wrapper">
              <span class="label-title">Priority</span>

              <label
                class="label-item"
                v-for="({ name, className, value }, index) in priorityArray"
                :key="index"
              >
                <input
                  :value="value"
                  id="priority"
                  class="radio"
                  type="radio"
                  name="priority"
                  @click="addPriority(value)"
                  :checked="index === 3"
                />
                <span :class="['fake', className]"></span>
                <span class="text">{{ name }}</span>
              </label>
            </span>
          </fieldset>
        </div>
      </form>
    </div>
  </div>
  <!-- </BaseModal> -->
</template>

<script>
// import BaseModal from "@/components/Modal.vue";
import { mapGetters } from "vuex";

export default {
  name: "AddTaskModal",
  components: {
    // BaseModal,
  },
  // props: {
  //   type: {
  //     type: String,
  //     default: "Add",
  //   },
  // },
  data() {
    return {
      title: "",
      description: "",
      category: "other",
      deadline: "",
      estimation: 1,
      priority: "low",
      categoryArray: [
        {
          name: "Work",
          className: "orangeish",
          value: "work",
        },
        { name: "Education", className: "blueish", value: "education" },
        { name: "Hobby", className: "pinkish", value: "hobby" },
        { name: "Sport", className: "redish", value: "sport" },
        { name: "Other", className: "aquaish", value: "other" },
      ],
      priorityArray: [
        { name: "Urgent", className: "redish", value: "urgent" },
        { name: "High", className: "orangeish", value: "high" },
        {
          name: "Middle",
          className: "yellowish",
          value: "middle",
        },
        { name: "Low", className: "greenish", value: "low" },
      ],
      estimationArray: [
        { name: 0, checked: true, value: 0 },
        { name: 1, checked: true, value: 1 },
        { name: 2, checked: true, value: 2 },
        { name: 3, checked: false, value: 3 },
        { name: 4, checked: false, value: 4 },
      ],
    };
  },
  methods: {
    closeModal() {
      this.$store.dispatch("modals/closeModals");
      this.$store.dispatch("tasks/clearEditTask");
      this.defaultValueInputs();
    },
    agreeModalTodo() {
      console.log("DEADLINE", this.deadline);
      const newTodo = {
        title: this.title,
        description: this.description,
        category: this.category,
        deadline: this.deadline,
        estimation: this.estimation,
        priority: this.priority,
        done: false,
      };

      if (!this.editTask.length) {
        newTodo.id = Math.random();
        console.log("WORKS");
        this.$store.dispatch("tasks/addNewTodo", newTodo);
      } else {
        newTodo.id = this.editTask[0].id;
        this.$store.dispatch("tasks/addEditedTodo", newTodo);
      }
      this.$store.dispatch("tasks/clearEditTask");
      this.$store.dispatch("modals/closeModals");
      this.defaultValueInputs();
    },
    defaultValueInputs() {
      this.title = "";
      this.description = "";
      this.category = "other";
      this.deadline = "";
      this.estimation = 0;
      this.priority = "low";
    },

    addCategory(inputValue) {
      this.category = inputValue;
    },
    addPriority(inputValue) {
      this.priority = inputValue;
    },
    addEstimation(inputValue) {
      this.estimation = inputValue + 1;
      const allEstimation = document.querySelectorAll("#estimation");
      for (let i = 0; i < allEstimation.length; i++) {
        if (i <= inputValue) allEstimation[i].checked = true;
        else allEstimation[i].checked = false;
      }
    },
  },
  computed: {
    ...mapGetters({
      titleModal: ["modals/titleModal"],
      editTask: ["tasks/editTask"],
    }),
  },
  mounted() {
    if (this.editTask.length) {
      const { title, description, deadline, category, priority, estimation } =
        this.editTask[0];
      //    done,, id,

      this.title = title;
      this.description = description;

      //GETTING CATEGORY
      const indexOfCategory = this.categoryArray.indexOf(
        ...this.categoryArray.filter((item) => item.value === category)
      );
      const allCategoryValue = document.querySelectorAll("#category");
      allCategoryValue[indexOfCategory].checked = true;
      this.category = this.categoryArray[indexOfCategory].value;

      //GETTING priority
      const indexOfPriority = this.priorityArray.indexOf(
        ...this.priorityArray.filter((item) => item.value === priority)
      );
      const allPriorityValue = document.querySelectorAll("#priority");
      allPriorityValue[indexOfPriority].checked = true;
      this.priority = this.priorityArray[indexOfPriority].value;

      //GETTING ESTIMATION
      const indexOfEstimation = this.estimationArray.indexOf(
        ...this.estimationArray.filter((item) => item.value === estimation)
      );
      this.addEstimation(indexOfEstimation - 1);
      this.estimation = estimation;

      //GETTING DEADLINE
      if (deadline === "today") {
        // WE NEED TO TRANSFER TODAY INTO 2022-11-20
        const date = new Date();

        let day = date.getDate();
        if (day < 10) {
          day = "0" + day;
        }

        let month = date.getMonth();
        if (month < 10) {
          month = month + 1;
          month = "0" + month;
        } else {
          month = month + 1;
        }
        this.deadline = `${date.getFullYear()}-${month}-${day}`;
      } else {
        this.deadline = deadline;
      }
    }
  },
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

    @media (max-width: 425px) {
      padding: 16px 8px;
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

          .agree-btn {
            width: 20px;
            height: 20px;
            background: url("@/assets/images/Agree-btn.svg") center no-repeat;
          }
        }
      }

      .title-modal {
        text-align: center;
        margin-bottom: 16px;
        font-weight: 700;
        font-size: 24px;
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

            @media (max-width: 375px) {
              font-size: 14px;
            }
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

            @media (max-width: 768px) {
              display: flex;
              flex-direction: column;
            }

            &.estimation {
              display: inline-block;
            }

            .label-item {
              margin-left: 16px;

              @media (max-width: 768px) {
                margin-left: 0px;
                margin-bottom: 6px;
              }

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
  ::-webkit-calendar-picker-indicator {
    filter: invert(73%) sepia(6%) saturate(1216%) hue-rotate(165deg)
      brightness(89%) contrast(85%);
    font-size: 24px;

    &:hover {
      filter: invert(96%) sepia(100%) saturate(15%) hue-rotate(335deg)
        brightness(105%) contrast(103%);
      cursor: pointer;
    }
  }
}
</style>
