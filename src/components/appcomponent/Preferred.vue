<template>
 

     <section class="preferred">
                <FilterShop/>
                
                <div class="container">

                        <h2>Shops from our DB</h2>
                    
               <div class="row">

                        <div class="col-md-4" v-for="shop in loadShops" :key="shop.id">
                            <div class="box">
                                <h3>{{shop.name}} <span>Votes: {{shop.vote_count}}</span></h3>
                                <div class="imgs">

                                        <img src="https://www.soc.tas.edu.au/wp-content/uploads/college-shop-internal.jpg" alt="">

                                </div>
                                
                                <div class="box_foot">
                                        <address>{{shop.address}}</address>


                                     <div class="like_duskike">

                                          <span><i v-on:click="remove(shop.id)" class="material-icons">
                                                remove_circle
                                                </i></span>

                                                <span>
                                                         <b>{{shop.distance}}</b> km
                                                        </span>
                                            
                                   
                                    </div>
                                  
                                </div>


                                
                            </div>

                        </div>
                        
                        
                    </div> 
                </div>
            </section>
</template>


<script>


export default {
  
  name: 'PreferredShop',

 

  mounted () {



    this.$store.dispatch('PreferredShop');

    

    
  },
  

 computed: {

    
   loadShops(){return this.$store.getters.loadShops;},
 

 },

  methods:{
   
    

     remove(id) {
       this.$store.dispatch('likeShop',id).then(resp=> {
       
      }
      )
    }

  },
 
}
</script>




<style scoped>

</style>
