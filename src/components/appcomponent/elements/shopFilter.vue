<template>
    <div class="formfilter">

         <input v-model="distance" type="text" v-on:input="getDistance" />
         {{distance}}

    </div>
</template>

<script>
export default {
    name:'FilterShop',


    data(){
        return{
            distance:''
        }
    },

    methods:{

            getDistance(){

                this.$store.dispatch('FilterShops',this.distance)
                
            }

    }


}
</script>

