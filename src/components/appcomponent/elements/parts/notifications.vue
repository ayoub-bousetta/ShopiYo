<template >
    <div class="alert" :class="(msgNotif[1]== 'success') ? 'success' : 'error'" v-show="!hideShow" v-if="msgNotif" >
     <!--You Can loop to show multi msg-->
        <p v-html="msgNotif[0]"></p>

      <i v-on:click="KillNotifications" class="material-icons">
                clear
                </i>

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


<style>
.alert p {
 
    font-size: 0.9rem;
    text-align: center;
}

.alert b{
      display: block;
    font-size: 1rem;
    font-weight: 600;
    margin-bottom: 8px;
}

.alert {
   
    -webkit-transition: background-color .0s!important;
    transition: background-color .0s!important;
    -webkit-animation: alertshow 0.01s ease-in!important;
    animation: alertshow 0.1s ease-in !important;}
</style>
