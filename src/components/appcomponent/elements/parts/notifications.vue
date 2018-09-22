<template >
    <div class="alert" v-show="!hideShow" v-if="msgNotif" >
     <!--You Can loop to show multi msg-->
        <p  :class="msgNotif[1]">{{msgNotif[0]}}</p>

        <button v-on:click="KillNotifications">hide</button>


    </div>
</template>


<script>

export default {
    name:'Notifs',
    

    data(){
        return {

            msg:'',
            killit:false

        }
 
    },

methods:{

    KillNotifications(){
        this.$store.dispatch('KillNotifications')
    }
},
computed:{


            hideShow(){
               return this.killit= this.$store.getters.isKillNotifications
            },

            msgNotif(){
                if (this.$store.getters.Errors !== 'undefined' &&  this.$store.getters.Errors != null) {

                       Object.keys(this.$store.getters.Errors).forEach(() => {
                      this.msg= this.$store.getters.Errors; // Errors
                        });
                         
                        
                          return  this.msg
                        }
                        else{
                            return  this.msg
                        }


                          
                  
              
                    }
            }

}
</script>





<style scoped>
.alert{
    position: absolute;
    width: 250px;
    height: 50px;
   
    z-index: 40;
      top: 20%;
    right: 0px;

}

  .alert  p{
        background-color: #be4b49;
    border: 0;
    border-radius: 2px;
    box-shadow: 0 0 0 1px rgba(139, 3, 0, .75), 0 1px 10px rgba(0, 0, 0, .35);
    color: #fff;
    }
</style>
