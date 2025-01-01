<script setup>
import {computed, ref} from "vue";
import {useToast} from "vue-toastification";
import router from "../../router.js";
import AuthService from "../../services/AuthService.js";
import Input from "../../components/forms/Input.vue";
import Button from "../../components/forms/Button.vue";

const firstName = ref('');
const lastName = ref('');
const email = ref('');
const password = ref('');
const passwordConfirmation = ref('');

const errorBag = ref({});
const toast = useToast();

const register = () => {
  AuthService.register(firstName.value, lastName.value, email.value, password.value, passwordConfirmation.value).then(response => {
    toast.success('Registrace proběhla úspěšně')
    router.push('/login')
  }).catch(() => {
    toast.error('Přihlášení se nezdařilo');
  });
}

const cantSave = computed(() => {
  errorBag.value = {};
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  let retVal = false;
  if (firstName.value.length < 2) {
    errorBag.value.firstName = 'Jméno musí mít alespoň 2 znaky';
    retVal = true;
  }
  if (lastName.value.length < 2) {
    errorBag.value.lastName = 'Příjmení musí mít alespoň 2 znaky';
    retVal = true;
  }

  if (email.value && !emailRegex.test(email.value)) {
    errorBag.value.email = 'Zadejte platný e-mail';
    retVal = true;
  }

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
      <div class="text-2xl font-semibold mb-6">Registrace</div>

      <form @submit.prevent="register">
        <Input label="Jméno" placeholder="Zadejte jméno (minimálně 2 znaky)" v-model="firstName" required :error="errorBag?.firstName" autofocus/>
        <Input label="Příjmení" placeholder="Zadejte příjmení (minimálně 2 znaky)" v-model="lastName" required :error="errorBag?.lastName"/>
        <Input label="E-mail" type="email" placeholder="Zadejte e-mail" v-model="email" required :error="errorBag?.email"/>
        <Input label="Heslo" type="password" placeholder="Zadejte heslo" v-model="password" required :error="errorBag?.password"/>
        <Input label="Potvrzení hesla" type="password" placeholder="Zadejte heslo znovu" v-model="passwordConfirmation" required :error="errorBag?.passwordConfirmation"/>
        <Button label="Registrovat" type="submit" :disabled="cantSave" data-class="btn-primary w-full mt-4"/>
        <div class="flex justify-between mt-4">
          <router-link :to="{ name: 'Login'}">
            <a class="text-sm text-secondary">Přihlášení</a>
          </router-link>
          <router-link :to="{ name: 'ForgottenPassword'}">
            <span class="text-sm text-secondary">Zapomenuté heslo</span>
          </router-link>
        </div>
      </form>

    </div>
  </div>
</template>