<template>
  <div class="main-title">
    <h1 class="title">Daily Task List</h1>
    <img
      @click="openModalAdd"
      class="img"
      src="@/assets/images/Add.svg"
      alt=""
    />
    <!-- <AddTaskModal :type="'Add'" /> -->
  </div>
</template>

<script>
// import AddTaskModal from "@/components/AddTaskModal.vue";
// import { mutationModals } from "@/store/modules/modals";
// import modals from "@/store/modules/modals";

export default {
  name: "DailyTask",
  components: {
    // AddTaskModal,
  },
  methods: {
    openModalAdd() {
      this.$store.dispatch("modals/toggleModals");
      this.$store.dispatch("modals/changeTitleModals", "Add");
    },
  },
};
</script>

<style lang="scss" scoped>
.main-title {
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 16px;

  .title {
    cursor: pointer;
    letter-spacing: 0.7px;
    font-size: 28px;
    margin-right: 16px;
  }

  .img {
    cursor: pointer;
    transition: all 0.5s ease-in-out;
    &:hover {
      transform: scale(1.3) rotate(90deg);
    }
  }
}
</style>
