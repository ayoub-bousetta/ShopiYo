import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import VueAxios from 'vue-axios'
import Cookie from 'js-cookie'

Vue.use(Vuex)
Vue.use(VueAxios, axios)
Vue.axios.defaults.baseURL = `http://127.0.0.1:8000/api/`;



const store =  new Vuex.Store({

        state: {
            shops: [],
            likedShop:false,
            Dislike:false,
            DislikeAddRevok:false,
         
            userInfo:[],
            error:[],
            //User Status
            isToken: localStorage.getItem("token"),
         
         },


         actions: {
            loadShops ({ commit,state }) {
              axios
                .get('/shops', {
                    headers: { Authorization: "Bearer " + state.isToken }
                  })
                .then(r => r.data.shops)
                .then(shops => {
                    commit('GET_SHOPS', shops)
                 })
            },

            FilterShops ({ commit,state },distance) {
                axios
                  .get('/shops/'+distance, {
                      headers: { Authorization: "Bearer " + state.isToken }
                    })
                  .then(r => r.data)
                  .then(shops => {
                    console.log(shops)

                        //Validation
                     if (typeof shops.errors !== 'undefined' && Object.keys(shops.errors).length > 0 ) {
                        //Error
                     
                        commit('ERRORS', shops.errors)
                        commit('GET_FILTRED_SHOPS', shops.shops)
                    }else{
                       commit('ERRORS', null)
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
              
                console.log(state.isToken);
                axios
                  .get('/account/shop/vote/'+Shopid+'-u',  {
                    headers: { Authorization: "Bearer " + state.isToken }
                  })
                  .then(r => r.data)
                  .then(shops => {
                      commit('LIKE_Add_REVOKE')
                      commit('LIKE_SHOP', Shopid)
                   })
                   
              },

                //Dislike Action
              disLikeShop ({ commit,state },Shopid) {
              
                console.log(state.isToken);
                axios
                  .get('/account/shop/vote/'+Shopid+'-d',  {
                    headers: { Authorization: "Bearer " + state.isToken }
                  })
                  .then(r => r.data)
                  .then(shops => {

                    commit('DiSLIKE_Add_REVOKE')
                    commit('DISlIKE_SHOP', Shopid)
                  
                      
                   })
                   
              },


              
            RegisterUser ({ commit },userInfo) {

                return  axios
                  .post('/account/create/', {
                    email: userInfo.email,
                    password: userInfo.password,
                  })
                  .then(r =>  {

                    //Validation
                     if (typeof r.data.errors !== 'undefined' && Object.keys(r.data.errors).length > 0 ) {
                         //Error
                      
                         commit('ERRORS', r.data.errors)
                     }else{
                        commit('ERRORS', null)
                        commit('REGISTER_USER',  r.data)

                     }
                   
             
                  }
                
                )
               
              },


              AuthRequest ({ commit },userInfo) {
                //commit("AUTH_REQUEST"); //ONCF Train Show
                return  axios
                  .post('/account/login/', {
                    email: userInfo.email,
                    password: userInfo.password,
                  })
                  .then(r =>  {

                    //Validation
                     if (typeof r.data.errors !== 'undefined' && Object.keys(r.data.errors).length > 0 ) {
                         //Error
                         commit('ERRORS', r.data.errors)
                     }else{
                        
                        setTimeout(() => { //To show ONCF
                            
                            commit("LOGIN",r.data);  //Set Token
                            
                            resolve();
                          }, 1000);

                     }
                   
             
                  }
                
                )
               
              },


              


              LogOut({ commit }) {
                localStorage.removeItem("token");
                commit('LOGOUT');
              }


          },


         mutations: {

            //Shops Near me :)
            GET_SHOPS (state, shops) {
                state.shops = shops
              
              },

              GET_FILTRED_SHOPS (state, shops){
                state.shops = shops
              },


              //Shops That loved :)
              PREFERRED_SHOP (state, shops) {
                state.shops = shops
              
              },

              LIKE_Add_REVOKE(state){
                state.likedShop =!state.likedShop
                
            },
          

            //Shops That i like will be filtred 
            LIKE_SHOP (state, likedShopId) {
                

                if(state.likedShop == true){

                    state.shops = state.shops.filter(shop=> {
                        return shop.id != likedShopId ;
                      })

                }
                      
                      
                      
            },

            
            DiSLIKE_Add_REVOKE(state){
                state.DislikeAddRevok =!state.DislikeAddRevok
                
            },
            DISlIKE_SHOP(state, deslikesShop){

                state.shops = state.shops.map(shop=> {
                    if (shop.id == deslikesShop  ) {
                        if (state.DislikeAddRevok ==true) {
                            shop.dislikes_count++
                            

                        }else{
                            shop.dislikes_count--
                        }

                        
                    }
                    return shop
                  })



                  //console.log(result);


            },

            //User Registration :)
              REGISTER_USER (state,userInfo) {
              state.userInfo = userInfo
              state.errors = null
             },

           
                 
            //ONCF :)
            AUTH_REQUEST(state) {
                 state.loading = true;
                 
            },

          
            //Welcome again :)
            LOGIN(state,userAuth) {
               // state.isToken = true;
                state.loading = false;
                state.errors = null;
                state.isToken=localStorage.setItem("token",userAuth.access_token);
             
                       
            },

         

            //See You soon :)
            LOGOUT(state) {
               state.isToken = localStorage.removeItem("token");
             },


              ERRORS (state,error) {
                state.error = error
              }
           
         },

         getters:{

            loadShops:state=>{
                return state.shops;
            },



            likedShop:state=>{
                return state.likedShop;
            },

            dislikeShop:state=>{
                return state.DislikeAddRevok 
            },

            registerUser:state=>{
               return state.userInfo;
            },

            Errors:state=>{
               
                return state.error;
            },

            isToken: state => {
                return state.isToken
               },

            isAuth: state => {
                return state.isToken != null
            }

         }






    })




  
  export default store