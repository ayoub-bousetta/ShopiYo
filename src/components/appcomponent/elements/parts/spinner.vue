<template >
<div>
<div v-show="isLoading" class="lds-ring"><div></div><div></div><div></div><div></div></div>
    {{isLoading}}
</div>
    

    
</template>

<script>
export default {
    name:"Loading",

computed:{

    

            isLoading(){
             

              return this.$store.getters.isLoading

            },

           
            }

}
</script>

<style>

.lds-ring {
    position: absolute;
    width: 64px;
    height: 64px;
    bottom: 8%;
    left: 0;
    right: 0;
    margin: 0 auto;
}
.lds-ring div {
  box-sizing: border-box;
  display: block;
  position: absolute;
  width: 51px;
  height: 51px;
  margin: 6px;
  border: 6px solid #ffd033;
  border-radius: 50%;
  animation: lds-ring 1.2s cubic-bezier(0.5, 0, 0.5, 1) infinite;
  border-color: #ffd033 transparent transparent transparent;
}
.lds-ring div:nth-child(1) {
  animation-delay: -0.45s;
}
.lds-ring div:nth-child(2) {
  animation-delay: -0.3s;
}
.lds-ring div:nth-child(3) {
  animation-delay: -0.15s;
}
@keyframes lds-ring {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}

</style>
