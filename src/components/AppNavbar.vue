<template>
  <nav class="nav">
    <ul class="nav-ul">
      <template>
        <li class="nav-li nav-username">Welcome, USERNAME!</li>
        <li :class="['nav-li', { active: activeHamburger }]">
          <img src="@/assets/images/Logout.svg" alt="" />
        </li>
        <li :class="['nav-li', { active: activeHamburger }]">
          <img src="@/assets/images/Delete.svg" alt="" />
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
</template>

<script>
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
  mounted() {
    console.log("!MOUNTED NAVBAR");
  },
};
</script>

<style lang="scss" scoped>
.gone {
  display: none;
}
.nav {
  position: relative;

  .nav-ul {
    display: flex;
    justify-content: flex-end;
    align-items: center;

    @media (max-width: 768px) {
      flex-direction: column;
      align-items: flex-end;
    }

    .hamburger {
      display: none;
      cursor: pointer;
      padding-top: 0;

      @media (max-width: 768px) {
        display: block;
        position: absolute;
        top: 0;
        right: 0;
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

      &:first-of-type {
        margin-left: 0;
        margin-right: auto;
        color: var(--greyish);
        padding-top: 3px;

        @media (max-width: 768px) {
          display: block;
        }
      }

      @media (max-width: 768px) {
        display: none;
        margin-left: 0;
        padding-top: 10px;
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
