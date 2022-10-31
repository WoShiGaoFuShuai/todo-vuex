<template>
  <div>
    <!-- <nav class="nav">
      <ul class="nav-ul">
        <template>
          <li class="nav-li nav-username">Welcome, USERNAME!</li>
          <li :class="['nav-li', { active: activeHamburger }]">
            <img src="@/assets/images/Logout.svg" alt="" />
          </li>
          <li :class="['nav-li', { active: activeHamburger }]">
            <router-link :to="{ name: 'deleted' }">
              <div class="delete-btn-wrapper">
                <img src="@/assets/images/Delete.svg" alt="" />
                <div v-if="deletedTodos.length" class="delete-quantity">
                  <img src="@/assets/images/Delete-quantity.svg" alt="" />
                  <span class="delete-quantity-num">{{
                    deletedTodos.length
                  }}</span>
                </div>
              </div>
            </router-link>
          </li>
          <li :class="['nav-li', { active: activeHamburger }]">
            <router-link :to="{ name: 'home' }">
              <img src="@/assets/images/Global List.svg" alt="" />
            </router-link>
          </li>
          <li :class="['nav-li', { active: activeHamburger }]">
            <router-link :to="{ name: 'timer' }">
              <img src="@/assets/images/Timer.svg" alt="" />
            </router-link>
          </li>

          <li :class="['nav-li', { active: activeHamburger }]">
            <router-link :to="{ name: 'settings' }">
              <img src="@/assets/images/Settings.svg" alt="" />
            </router-link>
          </li>
          <li
            :class="['hamburger', { active: activeHamburger }]"
            @click="toggleHamburger"
          >
            <span class="bar"></span>
            <span class="bar"></span>
            <span class="bar"></span>
          </li>
        </template>
        <template>
          <div class="gone">
            <router-link :to="{ name: 'login' }"
              ><li class="nav-li link">Login</li></router-link
            >
            <router-link :to="{ name: 'signup' }"
              ><li class="nav-li link">Signup</li></router-link
            >
          </div>
        </template>
      </ul>
    </nav> -->

    <nav class="nav">
      <span :class="['username', { mobile: activeHamburger }]"
        >Welcome, USERNAME</span
      >
      <ul :class="['nav-ul', { mobile: activeHamburger }]">
        <template>
          <li :class="['nav-li', { active: activeHamburger }]">
            <img src="@/assets/images/Logout.svg" alt="" />
          </li>
          <li :class="['nav-li', { active: activeHamburger }]">
            <router-link :to="{ name: 'deleted' }">
              <div class="delete-btn-wrapper">
                <img src="@/assets/images/Delete.svg" alt="" />
                <div v-if="deletedTodos.length" class="delete-quantity">
                  <img src="@/assets/images/Delete-quantity.svg" alt="" />
                  <span class="delete-quantity-num">{{
                    deletedTodos.length
                  }}</span>
                </div>
              </div>
            </router-link>
          </li>
          <li :class="['nav-li', { active: activeHamburger }]">
            <router-link :to="{ name: 'home' }">
              <img src="@/assets/images/Global List.svg" alt="" />
            </router-link>
          </li>
          <li :class="['nav-li', { active: activeHamburger }]">
            <router-link :to="{ name: 'timer' }">
              <img src="@/assets/images/Timer.svg" alt="" />
            </router-link>
          </li>

          <li :class="['nav-li', { active: activeHamburger }]">
            <router-link :to="{ name: 'settings' }">
              <img src="@/assets/images/Settings.svg" alt="" />
            </router-link>
          </li>
          <li
            :class="['hamburger', { active: activeHamburger }]"
            @click="toggleHamburger"
          >
            <span class="bar"></span>
            <span class="bar"></span>
            <span class="bar"></span>
          </li>
        </template>
        <template>
          <div class="gone">
            <router-link :to="{ name: 'login' }"
              ><li class="nav-li link">Login</li></router-link
            >
            <router-link :to="{ name: 'signup' }"
              ><li class="nav-li link">Signup</li></router-link
            >
          </div>
        </template>
      </ul>
    </nav>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  name: "AppNavbar",
  data() {
    return {
      activeHamburger: false,
    };
  },
  methods: {
    toggleHamburger() {
      this.activeHamburger = !this.activeHamburger;
    },
  },
  computed: {
    ...mapGetters({ deletedTodos: "tasks/deletedTodos" }),
  },
};
</script>

<style lang="scss" scoped>
.gone {
  display: none;
}
.nav {
  position: relative;

  @media (max-width: 768px) {
    padding-bottom: 32px;
  }

  .username {
    position: absolute;
    top: 5px;
    color: var(--greyish);
  }

  .nav-ul {
    display: flex;
    justify-content: flex-end;
    align-items: center;

    @media (max-width: 768px) {
      flex-direction: column;
      align-items: flex-end;
    }

    &.mobile {
      position: absolute;
      right: 0;
      background-color: rgba(0, 0, 0, 0.2);
      border-radius: 8px;
      padding: 6px 0;
    }

    .hamburger {
      display: none;
      cursor: pointer;
      padding-top: 0;

      @media (max-width: 768px) {
        display: block;
        position: absolute;
        top: 6px;
        right: 8px;
      }

      .bar {
        display: block;
        width: 24px;
        height: 3px;
        margin: 5px auto;
        -webkit-transition: all 0.3s ease-in-out;
        transition: all 0.3s ease-in-out;
        background: var(--greyish);
      }

      &.active {
        @media (max-width: 768px) {
          .bar:nth-child(2) {
            opacity: 0;
          }

          .bar:nth-child(1) {
            transform: translateY(8px) rotate(45deg);
            background: white;
          }

          .bar:nth-child(3) {
            transform: translateY(-8px) rotate(-45deg);
            background: white;
          }
        }
      }
    }

    .router-link-exact-active {
      img {
        filter: brightness(0) saturate(100%) invert(100%) sepia(5%) saturate(1%)
          hue-rotate(37deg) brightness(105%) contrast(100%);
      }
    }

    .nav-li {
      margin-left: 32px;
      padding-top: 5px;

      // &:first-of-type {
      //   margin-left: 0;
      //   margin-right: auto;
      //   color: var(--greyish);
      //   padding-top: 3px;

      //   @media (max-width: 768px) {
      //     display: block;
      //   }
      // }

      @media (max-width: 768px) {
        &:first-of-type {
          padding-top: 40px;
        }

        display: none;
        margin-left: 0;
        padding-top: 10px;
      }

      .delete-btn-wrapper {
        position: relative;

        .delete-quantity {
          width: 16px;
          height: 16px;
          position: absolute;
          bottom: 3px;
          right: -5px;

          img {
            filter: invert(49%) sepia(88%) saturate(3232%) hue-rotate(334deg)
              brightness(104%) contrast(94%);
          }

          .delete-quantity-num {
            position: absolute;
            font-size: 11px;
            top: 50%;
            left: 50%;
            line-height: 11px;
            transform: translate(-50%, -33%);
          }
        }
      }

      img {
        transition: all 0.2s ease-in;
      }

      &:hover {
        img {
          cursor: pointer;
          transform: scale(1.05);
          filter: brightness(0) saturate(100%) invert(83%) sepia(11%)
            saturate(1681%) hue-rotate(163deg) brightness(91%) contrast(93%);
        }
      }

      &.active {
        @media (max-width: 768px) {
          display: block;
          padding-left: 10px;
          padding-right: 10px;
        }
      }
    }

    .link,
    .btn {
      background-color: var(--greyish);
      padding: 8px 10px;
      border-radius: 10px 0px 10px 0px;
      transition: all 0.3s ease;

      &:hover {
        cursor: pointer;
        background-color: var(--grey-light);
        border-radius: 0px 10px 0px 10px;
      }
    }

    .btn {
      padding: 5px 8px;
    }
  }
}
</style>
