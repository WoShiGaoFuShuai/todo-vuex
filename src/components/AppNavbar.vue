<template>
  <nav class="nav">
    <ul class="nav-ul">
      <template>
        <li class="nav-username">Welcome, USERNAME!</li>
        <li>
          <img src="@/assets/images/Logout.svg" alt="" />
        </li>
        <li><img src="@/assets/images/Delete.svg" alt="" /></li>
        <li>
          <router-link :to="{ name: 'home' }">
            <img src="@/assets/images/Global List.svg" alt="" />
          </router-link>
        </li>
        <li>
          <img src="@/assets/images/Statistics.svg" alt="" />
        </li>

        <li>
          <router-link :to="{ name: 'settings' }">
            <img src="@/assets/images/Settings.svg" alt="" />
          </router-link>
        </li>
      </template>
      <template>
        <router-link :to="{ name: 'login' }"
          ><li class="link">Login</li></router-link
        >
        <router-link :to="{ name: 'signup' }"
          ><li class="link">Signup</li></router-link
        >
      </template>
    </ul>
  </nav>
</template>

<script>
export default {
  name: "AppNavbar",
};
</script>

<style lang="scss" scoped>
.nav-ul {
  display: flex;
  justify-content: flex-end;
  align-items: center;

  .router-link-exact-active {
    img {
      filter: brightness(0) saturate(100%) invert(100%) sepia(5%) saturate(1%)
        hue-rotate(37deg) brightness(105%) contrast(100%);
    }
  }

  li {
    margin-left: 32px;

    img {
      transition: all 0.2s ease-in;
    }

    &:hover {
      img {
        cursor: pointer;
        transform: scale(1.05);
        filter: brightness(0) saturate(100%) invert(100%) sepia(5%) saturate(1%)
          hue-rotate(37deg) brightness(105%) contrast(100%);
      }
    }
  }

  .nav-username {
    margin-left: 0;
    margin-right: auto;
    color: var(--grey);
  }

  .link,
  .btn {
    background-color: var(--grey);
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
</style>
