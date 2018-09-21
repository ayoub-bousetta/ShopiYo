<template>
      <div id="filter">
                        <input  placeholder="filter by distance ex:{ 20 } km "  v-model="distance" type="text" v-on:input="getDistance">
                       <span v-show="showReset"><i class="material-icons">
                                sync_disabled
                                </i></span> 
                </div>
</template>

<script>
export default {
    name:'FilterShop',


    data(){
        return{
            distance:'',
            showReset:false
        }
    },

    methods:{

            getDistance(){
                this.showReset=!this.showReset
                this.$store.dispatch('FilterShops',this.distance)
                
            }

    }


}
</script>

