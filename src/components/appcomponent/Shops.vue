<template>
  
     <section class="shops"> <!--For Shops  Template in vue-->
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
                                      


                                          <span><i class="material-icons " v-on:click="Like(shop.id)" >
                                            favorite_border
                                            </i></span>

 
                                    <span><i class="material-icons " :class="(shop.shops_i_hate == 1) ? 'disliked' : 'waiting'"  v-on:click="disLike(shop.id)" >
                                            sentiment_very_dissatisfied
                                            </i><small>{{shop.dislikes_count}}</small></span>

                                      
    
                                    </div>
                                  

                                            
                                            <p>Distance : <b>{{shop.distance}}</b> km</p>
                                </div>


                                
                            </div>

                        </div>
                        
                        
                    </div> 
                </div>
            </section>
</template>


<script>

import FilterShop from '@/components/appcomponent/elements/shopFilter.vue';
export default {
  
  name: 'Shops',

  components:{
    FilterShop
  },
 


  mounted () {



    this.$store.dispatch('loadShops');

    

    
  },
  

data(){
  return {
    dislikedShop:false,
    dataArray:[]
   };
},
 computed: {

    
   loadShops(){
     
     return this.$store.getters.loadShops;
 
     },

 },

  methods:{
    Like(id){

      if (this.$store.getters.isAuth) {
      this.$store.dispatch('likeShop',id)

       }else{
           return false
         }
      
    },
    
 

    
    

     disLike(id) {

  

       if (this.$store.getters.isAuth) {

         this.dataArray={
                                "id":id,
                                "dislike":this.dislikedShop,
                            }
          this.$store.dispatch('disLikeShop',this.dataArray)
         }else{
           return false
         }
      
        },




  },
 
}
</script>



