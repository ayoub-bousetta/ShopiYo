import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import VueAxios from 'vue-axios'

Vue.use(Vuex)
Vue.use(VueAxios, axios)
Vue.axios.defaults.baseURL = `http://127.0.0.1:8000/api/`;



const store =  new Vuex.Store({

        state: {

           //Shop
            shops: [],
            likedShop:false,
            Dislike:false,

            
           
          
            //Profile
            profileUser:localStorage.getItem("user"),
            userInfo:[],
            isToken: localStorage.getItem("token"),

            //Notif
            msgType:[],
            notification:[],
            Msg:'',
            iskillNotif:false
            
            
         
         },




         /********
          * 
          * 
          * 
          *
          ******* ACTIONS ******
          * 
          * 
          * 
          * 
          * ****/



         actions: {
            loadShops ({ commit,state }) {


              //for both Auth and non
              axios
                .get('/shops', {
                    headers: { Authorization: "Bearer " + state.isToken }
                  })
                .then(r => r.data.shops)
                .then(shops => {

                  if (!state.isToken) {

                    state.msg="Welcome To <strong>ShopiYa</strong>"
                    commit('ERRORS', [state.msg,'success'] )
                    
                  }
                 
                    commit('GET_SHOPS', shops)
                 })

            },

            FilterShops ({ commit,state },dataUrl) {

           
                axios
                  .get(dataUrl.url+dataUrl.distance, {
                      headers: { Authorization: "Bearer " + state.isToken }
                    })
                  .then(r => r.data)
                  .then(shops => {

                        //Validation
                     if (typeof shops.errors !== 'undefined' && Object.keys(shops.errors).length > 0 ) {
                        //Error
                     
                        
                    state.msg="<b>Oh_No</b> Nothing yet... "
                    commit('ERRORS', [state.msg,'error'] )
                         commit('GET_FILTRED_SHOPS', shops.shops) // Remove data from view
                    }else{

                      state.msg="<b>Oh_Yeay</b> Finally we found something... "
                      commit('ERRORS', [state.msg,'success'] )
                       commit('GET_FILTRED_SHOPS', shops.shops)

                    }
                   })
              },

            //What i Liked Aka My Preferred Shop
            PreferredShop ({ commit,state }) {
                axios
                  .get('/account/preferred', {
                      headers: { Authorization: "Bearer " + state.isToken }
                    })
                  .then(r => r.data.shops)
                  .then(shops => {
                    
                      commit('PREFERRED_SHOP', shops)
                   })
              },

             
            //Like Action & PreferredShop From Liked

            likeShop ({ commit,state },Shopid) {
                axios
                  .get('/account/shop/vote/'+Shopid+'-u',  {
                    headers: { Authorization: "Bearer " + state.isToken }
                  })
                  .then(r => r.data)
                  .then(shops => {
                    
                    if (shops.sucess=='delete_vote') {
                      state.msg="<b>Removed</b> But why, tell us what's wrong . " // Revoked Deslike
                    commit('ERRORS', [state.msg,'success'] )
                      
                    }else{
                      state.msg="<b>Yeay</b> Shop added to your preferred list"  //Deslike
                      commit('ERRORS', [state.msg,'success'] )
                    }


                     commit('LIKE_SHOP', Shopid)
                   })
                   
              },

                //Dislike Action
              disLikeShop ({ commit,state },Shopid) {
              
                axios
                  .get('/account/shop/vote/'+Shopid.id+'-d',  {
                    headers: { Authorization: "Bearer " + state.isToken }
                  })
                  .then(r => r.data)
                  .then(shops => {


                    if (shops.sucess=='delete_vote') {
                      state.msg="<b>Yeay</b> We know that it was a mistake. " // Revoked Deslike
                    commit('ERRORS', [state.msg,'success'] )
                      
                    }else{
                      state.msg="<b>A Dislike</b> Tell us what's wrong whit this Store "  //Deslike
                      commit('ERRORS', [state.msg,'success'] )
                    }
                   
                    commit('DISlIKE_SHOP', [Shopid.id,shops.sucess])  
                   })
                   
              },


              //Create User
            RegisterUser ({ commit,state },userInfo) {

                return  axios
                  .post('/create/', {
                    email: userInfo.email,
                    password: userInfo.password,
                  })
                  .then(r =>  {

                    //Validation
                     if (typeof r.data.errors !== 'undefined' && Object.keys(r.data.errors).length > 0 ) {

                         //ErrorHandlers
                         //commit('ERRORS', r.data.errors)

                         state.msg="<b>Ops</b> Email already taken! Use another one."
                         commit('ERRORS', [state.msg,'error'] )


                     }else{
                        commit('ERRORS', null)
                        
                        state.msg="<b>Yeay</b> See you inside..."
                        commit('ERRORS', [state.msg,'success'] )
                        commit('REGISTER_USER',  r.data)

                     }
                   
             
                  }
                
                )
               
              },

              //Create Auth Aka Login
              AuthRequest ({ commit,state },userInfo) {
                return  axios
                  .post('/login/', {
                    email: userInfo.email,
                    password: userInfo.password,
                  })
                  .then(r =>  {
                    //Validation
                     if (typeof r.data.errors !== 'undefined' && Object.keys(r.data.errors).length > 0 ) {
                         //Error

                         state.msg="<b>Ops</b> The Email or Password doesn't match any account."
                         commit('ERRORS',[state.msg,'error'])
                     }else{
                        
                        commit("LOGIN",r.data);
                        commit("PROFILE",r.data.user); 
                        state.msg="<b>Yeay</b> Welcome To <strong>ShopiYa</strong>"
                        commit('ERRORS', [state.msg,'success'] )
                     }
                   
             
                  }
                
                )
               
              },


              


              LogOut({ commit,state }) {
                localStorage.removeItem("token");
                localStorage.removeItem("user");
                localStorage.clear();//Making sure :)

                state.msg="<b>Bye</b> Hope we can see you soon"
                commit('ERRORS', [state.msg,'success'] )
                
                commit('LOGOUT');
              },


              //Set out Notification
              KillNotifications({ commit }) {
                commit('KILL_NOTIF' )
              }




          },



          
         /********
          * 
          * 
          * 
          *
          ******* MUTATIONS ******
          * 
          * 
          * 
          * 
          * ****/

         mutations: {

            //Shops Near me Aka  :)
            GET_SHOPS (state, shops) {
                

             

              state.shops = shops.map(shop=> {


                //Limit lenght
                //ufirst only
                shop.address =shop.address.substring(0, 30) + "..." 
                shop.address = shop.address.toLowerCase()

                    
                return shop
              })
              },


              //@Filter Comp
              GET_FILTRED_SHOPS (state, shops){
                let length = 30;
                
                console.log(typeof shops !== 'undefined' )

                if (typeof shops !== 'undefined' && shops.length>0) {
                   state.shops = shops.map(shop=> {
                  //Limit lenght
                  //ufirst only
                  shop.address =shop.address.substring(0, length) + "..." 
                  shop.address = shop.address.toLowerCase()
                  return shop
                })
                }else{
                  state.shops=shops
                }
               
              },


              //Shops That Preferred on @Preferred Comp :)
              PREFERRED_SHOP (state, shops) {
                let length = 30;
                state.shops = shops.map(shop=> {
                  shop.address =shop.address.substring(0, length) + "..." 
                  shop.address = shop.address.toLowerCase()
                  return shop
                })
              
              },

           
          

            //My Preferred Shop @TakeOf from the Home
            LIKE_SHOP (state, likedShopId) {
             state.shops = state.shops.filter(shop=> {
                    return shop.id != likedShopId ;
               
            })

          },


            
          
            DISlIKE_SHOP(state, deslikesShop){


            state.shops = state.shops.map(shop=> {

                 if (shop.id == deslikesShop[0]  ) {
               

                      switch (deslikesShop[1]) {
                        case 'delete_vote' || 'update_vote':
                        shop.dislikes_count--
                        shop.vote_count--
                        shop.shops_i_hate =0
                        
                       
                      
                       
                        
                          break;

                          case 'new_vote':
                          shop.dislikes_count++
                          shop.vote_count++
                          shop.shops_i_hate =1

                            break;
                      
                      }
                    }
                    return shop
                  })

            },

            //User Registration :)
              REGISTER_USER (state,userInfo) {
              state.userInfo = userInfo
             },

           
                 
            //ONCF :)
            AUTH_REQUEST(state) {
                 state.loading = true;
                 
            },

            
          
            //Welcome again :)
            LOGIN(state,userAuth) {
                localStorage.setItem("token",userAuth.access_token)
                state.loading = false;
                state.isToken=localStorage.getItem("token") 
            },

            //Profile
            PROFILE(state,profile) {
              localStorage.setItem("user",profile.id)
              state.profileUser = localStorage.getItem("user");
            },

         

            //See You soon :)
            LOGOUT(state) {
               state.isToken = localStorage.getItem("token");
               localStorage.clear();
             },


              //Show NotifError
              ERRORS (state,error) {

                state.notification = error,
                state.iskillNotif = false
              },

              //Close NotifError
              KILL_NOTIF (state) {
                state.iskillNotif =true

              }

           
         },



          /********
          * 
          * 
          * 
          *
          ******* Getters ******
          * 
          * 
          * 
          * 
          * ****/

         getters:{

            loadShops:state=>{
                return state.shops;
            },



            likedShop:state=>{
                return state.likedShop;
            },

         

            registerUser:state=>{
               return state.userInfo;
            },

            Errors:state=>{
               
                return state.notification;
            },

            isKillNotifications:state=>{
              return state.iskillNotif;
           },

           


            isToken: state => {
                return state.isToken
               },

            profileUser: state => {
                return state.profileUser
               },

            isAuth: state => {
                return state.isToken != null
            }

         }






    })




  
  export default store