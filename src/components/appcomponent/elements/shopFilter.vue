<template>
      <div id="filter">
                        <input  placeholder="filter by distance ex:{ 20 } km "  v-model="distance" type="text" v-on:input="getDistance">
                       <span v-show="showReset"><i v-on:click="ResetFilter()" class="material-icons">
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
            showReset:false,
            dataArray:[],
            url:'/shops/'
        
        }
    },

    methods:{

           

            getDistance(){

                     
               

                if (this.$options.parent.$options.name=='PreferredShop') {
                    this.url ='/account/preferred/'
                }

               

                 this.dataArray={
                                "distance":this.distance,
                                "url":this.url,
                            }
                this.showReset=true
                this.$store.dispatch('FilterShops',this.dataArray,this.url)
                
            },

            ResetFilter(){

                

               

                if (this.$options.parent.$options.name=='PreferredShop') {
                  this.$store.dispatch('PreferredShop')
                }else{
                    this.$store.dispatch('loadShops')
                }

               this.showReset=!this.showReset
                this.distance=''

               
                
                
            }

    }


}
</script>

