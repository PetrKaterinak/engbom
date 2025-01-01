<script setup>
import {computed, ref} from "vue";
import Button from "../../components/forms/Button.vue";
import Input from "../../components/forms/Input.vue";
import AuthService from "../../services/AuthService.js";
import router from "../../router.js";
import {useToast} from "vue-toastification";

const email = ref('');

const toast = useToast();
const errorBag = ref({});

const forgottenPassword = () => {
  AuthService.forgottenPassword(email.value).then(response => {
    toast.success('Zkontrolujte svou e-mailovou schránku');
    router.push('/login')
  }).catch(() => {
    toast.error('E-mail nebyl odeslán');
  });
}

const cantSave = computed(() => {
  errorBag.value = {};
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  let retVal = false;
  if (email.value && !emailRegex.test(email.value)) {
    errorBag.value.email = 'Zadejte platný e-mail';
    retVal = true;
  }
  return retVal;
});
</script>

<template>
  <div class="min-h-full flex items-center justify-center">
    <div class="min-w-96 bg-base-300/50 p-8 rounded shadow-md text-base-content">
      <div class="text-2xl font-semibold mb-6">Resetovat heslo</div>
      <form @submit.prevent="forgottenPassword">
        <Input label="E-mail" v-model="email" type="email" required :error="errorBag?.email"/>
        <p>Pokud zadaný e-mail v systému existuje, bude na něj odeslán odkaz pro reset hesla.</p>
        <Button label="Odeslat reset hesla" type="submit" data-class="btn-primary w-full mt-4" :disabled="cantSave"/>
      </form>

    </div>
  </div>
</template>

<style scoped>

</style>