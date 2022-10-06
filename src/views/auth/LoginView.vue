<template>
  <div class="auth">
    <form @submit.enter.prevent="">
      <h1>Login</h1>
      <input type="email" placeholder="email" required />
      <input type="password" placeholder="password" required />
      <button>Log in</button>
      <!-- <button v-else>Loading...</button> -->
      <!-- <div v-if="error" class="error">{{ error }}</div> -->
      <p class="text">
        Don't have an account yet?
        <router-link class="link" :to="{ name: 'signup' }">Signup</router-link>
      </p>
    </form>
  </div>
</template>
