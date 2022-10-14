<template>
  <div class="auth">
    <form class="form" @submit.enter.prevent="">
      <h1 class="title">Login</h1>
      <input class="input" type="email" placeholder="email" required />
      <input class="input" type="password" placeholder="password" required />
      <button class="btn">Log in</button>
      <!-- <button v-else>Loading...</button> -->
      <!-- <div v-if="error" class="error">{{ error }}</div> -->
      <p class="text">
        Don't have an account yet?
        <router-link class="link" :to="{ name: 'signup' }">Signup</router-link>
      </p>
    </form>
  </div>
</template>

<script>
import "@/views/auth/authStyle.scss";

export default {};
</script>
