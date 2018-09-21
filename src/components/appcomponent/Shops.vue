<template>
  <div class="ddg">
  <h1>This is Shops</h1>
  
  <FilterShop/>
  
  <div v-for="shop in loadShops" :key="shop.id">


     <p>Name:  {{shop.name}}</p>
     <p> Address:  {{shop.address}}</p>
     <p> Votes:  {{shop.vote_count}}</p>
      <p> Likes {{shop.likes_count}}</p>
      <p >  Dislikes {{shop.dislikes_count}}</p>

      <button v-on:click="Like(shop.id)"  :class="{ Voted: likedShop !=false }" >Like</button>
      <button v-on:click="disLike(shop.id)" :class="{ Voted: dislikedShop !=false }">Dislike</button>
    

  </div>
   </div>
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




<style scoped>

</style>
