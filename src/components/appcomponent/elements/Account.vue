<template>
  <div class="Home">

   <RegForm />
   
 
  </div>
</template>

<script>

import RegForm from '@/components/appcomponent/elements/regForm.vue';
import LogForm from '@/components/appcomponent/elements/loginForm.vue';
export default {
  name: 'Account',

   components: {
    RegForm,LogForm
  }
}
</script>


