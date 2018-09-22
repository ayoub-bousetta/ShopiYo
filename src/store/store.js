import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import VueAxios from 'vue-axios'

Vue.use(Vuex)
Vue.use(VueAxios, axios)
Vue.axios.defaults.baseURL = `http://127.0.0.1:8000/api/`;



const store =  new Vuex.Store({

        state: {
            shops: [],
            likedShop:false,
            Dislike:false,
            Msg:'',
            iskillNotif:false,
         
            profileUser:localStorage.getItem("user"),
            userInfo:[],

            msgType:[],
            notification:[],
            
            //User Status
            isToken: localStorage.getItem("token")
         
         },


         actions: {
            loadShops ({ commit,state }) {


              //for both Auth and non
             return axios
                .get('/shops', {
                    headers: { Authorization: "Bearer " + state.isToken }
                  })
                .then(r => r.data.shops)
                .then(shops => {

                  if (!state.isToken) {

                    state.msg="Welcome To ShopiYa, login and start the Like journey"
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
                     
                        
                    state.msg="Oh_No! Nothing yet... "
                    commit('ERRORS', [state.msg,'error'] )
                         commit('GET_FILTRED_SHOPS', shops.shops) // Remove data from view
                    }else{

                      state.msg="Oh_Yeay! Finally we found something... "
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
                    
                    state.msg="Yeay! Shop added successfully to your preferred.. "
                    commit('ERRORS', [state.msg,'success'] )


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
                      state.msg="Yeay! We know that it was a mistake. " // Revoked Deslike
                    commit('ERRORS', [state.msg,'success'] )
                      
                    }else{
                      state.msg="Oh_No! A Dislike, tell us what's wrong "  //Deslike
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

                         state.msg="Ops! Email already taken!"
                         commit('ERRORS', [state.msg,'error'] )


                     }else{
                        commit('ERRORS', null)
                        
                        state.msg="Yes! See you inside..."
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

                         state.msg="The Email or Password that you've entered doesn't match any account."
                         commit('ERRORS',[state.msg,'error'])
                     }else{
                        
                        commit("LOGIN",r.data);
                        commit("PROFILE",r.data.user); 
                        state.msg="Yeay! Welcome To ShopiYa"
                        commit('ERRORS', [state.msg,'success'] )
                     }
                   
             
                  }
                
                )
               
              },


              


              LogOut({ commit,state }) {
                localStorage.removeItem("token");
                localStorage.removeItem("user");
                localStorage.clear();//Making sure :)

                state.msg="Bye! We will love to see you soon"
                commit('ERRORS', [state.msg,'success'] )
                
                commit('LOGOUT');
              },


              //Set out Notification
              KillNotifications({ commit }) {
                commit('KILL_NOTIF' )
              }




          },


         mutations: {

            //Shops Near me Aka  :)
            GET_SHOPS (state, shops) {
                

             let length = 30;

              state.shops = shops.map(shop=> {


                //Limit lenght
                //ufirst only
                shop.address =shop.address.substring(0, length) + "..." 
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
                       
                        //Deslike Detector
                        if (shop.shops_i_hate.lenght >0) {
                          shop.shops_i_hate = shop.shops_i_hate.filter(function(item) { 
                            return item !== shop.id
                           })
                        
                          
                        }
                       
                        
                          break;

                          case 'new_vote':
                          shop.dislikes_count++
                          shop.vote_count++

                          shop.shops_i_hate.push(shop.id);

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