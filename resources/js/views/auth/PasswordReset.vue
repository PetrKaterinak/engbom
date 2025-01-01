<script setup>

import {computed, ref} from "vue";
import Button from "../../components/forms/Button.vue";
import Input from "../../components/forms/Input.vue";
import {useRoute} from "vue-router";
import {useToast} from "vue-toastification";
import router from "../../router.js";
import AuthService from "../../services/AuthService.js";

const toast = useToast();
const route = useRoute();
const resetToken = ref(route.params.reset_token);
const errorBag = ref({});

const password = ref('');
const passwordConfirmation = ref('');

const resetPassword = () => {
  AuthService.resetPassword(resetToken.value, password.value, passwordConfirmation.value).then(response => {
    toast.success('Heslo bylo úspěšně změněno');
    router.push('/login')
  }).catch(() => {
    toast.error('Heslo se nepodařilo změnit');
  });
}

const cantSave = computed(() => {
  errorBag.value = {};
  let retVal = false;

  if (password.value.length < 6) {
    errorBag.value.password = 'Heslo musí mít alespoň 6 znaků';
    retVal = true;
  }

  if (password.value !== passwordConfirmation.value) {
    errorBag.value.passwordConfirmation = 'Hesla se neshodují';
    retVal = true;
  }
  return retVal;
});

</script>

<template>
  <div class="min-h-full flex items-center justify-center">
    <div class="min-w-96 bg-base-300/50 p-8 rounded shadow-md text-base-content">
      <div class="text-2xl font-semibold mb-6">Resetovat heslo</div>
      <form @submit.prevent="resetPassword">
        <Input label="Token" type="hidden" v-model="resetToken" required/>
        <Input label="Nové heslo" type="password" placeholder="Zadejte heslo" v-model="password" required :error="errorBag?.password"/>
        <Input label="Potvrzení hesla" type="password" placeholder="Zadejte heslo znovu" v-model="passwordConfirmation" required :error="errorBag?.passwordConfirmation"/>
        <Button label="Resetovat heslo" type="submit" data-class="btn-primary w-full mt-4" :disabled="cantSave"/>
      </form>

    </div>
  </div>
</template>

<style scoped>

</style>