<script setup>
import {ref} from "vue";
import {useToast} from "vue-toastification";
import router from "../../router.js";
import AuthService from "../../services/AuthService.js";
import Input from "../../components/forms/Input.vue";
import Button from "../../components/forms/Button.vue";

const email = ref('admin@vue.com');
const password = ref('admin');

const toast = useToast();

const login = () => {
  AuthService.login(email.value, password.value).then(response => {
    localStorage.setItem('token', response.access_token);
    router.push('/home')
  }).catch(() => {
    toast.error('Přihlášení se nezdařilo');
  });
}

</script>

<template>
  <div class="min-h-full flex items-center justify-center">
    <div class="min-w-96 bg-base-300/50 p-8 rounded shadow-md text-base-content">
      <div class="text-2xl font-semibold mb-6">Přihlášení</div>

      <form @submit.prevent="login">
        <Input label="E-mail" v-model="email" type="email" required/>
        <Input label="Heslo" v-model="password" type="password" required/>
        <Button label="Přihlásit" type="submit" data-class="btn-primary w-full mt-4"/>
        <div class="flex justify-between mt-4">
          <router-link :to="{ name: 'Register'}">
            <a class="text-sm text-secondary">Registrovat</a>
          </router-link>
          <router-link :to="{ name: 'ForgottenPassword'}">
            <span class="text-sm text-secondary">Zapomenuté heslo?</span>
          </router-link>
        </div>
      </form>

    </div>
  </div>
</template>