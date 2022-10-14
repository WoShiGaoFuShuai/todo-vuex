<template>
  <div class="auth">
    <form class="form" @submit.enter.prevent="">
      <h1 class="title">Sign up</h1>
      <input class="input" type="text" placeholder="nickname" required />
      <input class="input" type="email" placeholder="email" required />
      <input
        class="input"
        type="password"
        pattern=".{8,}"
        title="8 characters minimum"
        placeholder="password"
        required
      />
      <button class="btn">Sign up</button>
      <!-- <button v-else>Loading...</button> -->
      <!-- <div class="error" v-if="error">{{ error }}</div> -->
      <p class="text">
        Already have an account?
        <router-link class="link" :to="{ name: 'login' }">Login</router-link>
      </p>
    </form>
  </div>
</template>

<script>
import "@/views/auth/authStyle.scss";

export default {};
</script>
