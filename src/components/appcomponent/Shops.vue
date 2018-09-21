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

                                          <span><i class="material-icons " :class="{ liked: likedShop !=false }">
                                            sentiment_satisfied_alt
                                            </i><small>{{shop.likes_count}}</small></span>
                                            
                                    <span><i class="material-icons " :class="{ disliked: likedShop !=false }"   >
                                            sentiment_very_dissatisfied
                                            </i><small>{{shop.dislikes_count}}</small></span>

                                             <!-- <button v-on:click="Like(shop.id)"  :class="{ Voted: likedShop !=false }" >Like</button>
      <button v-on:click="disLike(shop.id)" :class="{ Voted: dislikedShop !=false }">Dislike</button> -->
    
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
  return {dislikedShop:false,likedShop:false};
},
 computed: {

    
   loadShops(){return this.$store.getters.loadShops;},
 

 },

  methods:{
    //Always Use noraml function -> Not like react 
    Like(id){
      this.$store.dispatch('likeShop',id).then(resp=> {
        console.log('Store added to your Prefered')
      }
      )
      
    },
    

     disLike(id) {
       this.$store.dispatch('disLikeShop',id).then(resp=> {
        this.dislikedShop = this.$store.getters.dislikeShop;
      }
      )
    }

  },
 
}
</script>




<style scoped >
.shops{
  height:100%;
}

 p{
       position: absolute;
    bottom: 10px;
    right: 12px;
  }
    .box{
    min-height: 453px; position: relative;
  }
  address{
    text-transform: capitalize;
  }

</style>
