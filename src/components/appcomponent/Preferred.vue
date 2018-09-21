<template>
  <div class="ddg">
  <h1>This is My Liked Shops</h1>
  
  
  <div v-for="shop in loadShops" :key="shop.id">


     <p>Name:  {{shop.name}}</p>
     <p> Address:  {{shop.address}}</p>
     <p> Votes:  {{shop.vote_count}}</p>
      <p> Likes {{shop.likes_count}}</p>
      <p >  Dislikes {{shop.dislikes_count}}</p>

      <button v-on:click="remove(shop.id)">Remove</button>
      
    

  </div>
   </div>
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
