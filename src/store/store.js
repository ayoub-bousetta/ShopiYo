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
         
            profileUser:localStorage.getItem("user"),
            userInfo:[],
            error:[],
            //User Status
            isToken: localStorage.getItem("token")//localStorage.getItem("token"),
         
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
                     
                        commit('ERRORS', shops.errors)
                       commit('GET_FILTRED_SHOPS', shops.shops) // Remove data from view
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
              
               // console.log(state.isToken);
                axios
                  .get('/account/shop/vote/'+Shopid+'-u',  {
                    headers: { Authorization: "Bearer " + state.isToken }
                  })
                  .then(r => r.data)
                  .then(shops => {
                   
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

                    console.log(shops)
                   
                    

                   // commit('DiSLIKE_Add_REVOKE')
                    commit('DISlIKE_SHOP', [Shopid.id,shops.sucess])
                  
                      
                   })
                   
              },


              
            RegisterUser ({ commit },userInfo) {

                return  axios
                  .post('/create/', {
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
                  .post('/login/', {
                    email: userInfo.email,
                    password: userInfo.password,
                  })
                  .then(r =>  {

                    
                     

                    //Validation
                     if (typeof r.data.errors !== 'undefined' && Object.keys(r.data.errors).length > 0 ) {
                         //Error
                         commit('ERRORS', r.data.errors)
                     }else{
                        
                       commit("LOGIN",r.data);
                            

                            
                          commit("PROFILE",r.data.user); 
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
                

                let length = 30;

              state.shops = shops.map(shop=> {


                //Limit lenght
                //ufirst only
                shop.address =shop.address.substring(0, length) + "..." 
                shop.address = shop.address.toLowerCase()

                    
                return shop
              })


              



              
              },

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


              //Shops That loved :)
              PREFERRED_SHOP (state, shops) {
                let length = 30;

                state.shops = shops.map(shop=> {
  
  
                  //Limit lenght
                  //ufirst only
                  shop.address =shop.address.substring(0, length) + "..." 
                  shop.address = shop.address.toLowerCase()
  
                      
                  return shop
                })
              
              },

            //   LIKE_Add_REVOKE(state){
            //     state.likedShop =!state.likedShop
                
            // },
          

            //Shops That i like will be filtred 
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
                       

                        shop.shops_i_hate = shop.shops_i_hate.filter(function(item) { 
                          return item !== shop.id
                         })
                      
                        
                          break;

                          case 'new_vote':
                          shop.dislikes_count++
                          shop.vote_count++
                          //console.log(shop.shops_i_hate)
                          shop.shops_i_hate.push(shop.id);

                            break;
                      
                      }
                      
                      
     
                    }
                    return shop
                  })



                  console.log(state.shops)


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
                localStorage.setItem("token",userAuth.access_token)
              
                state.loading = false;
                state.errors = null;
                //state.isToken=localStorage.setItem("token", "JWT");
                
                state.isToken=localStorage.getItem("token")//localStorage.setItem("token",userAuth.access_token);
                    
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

         

            registerUser:state=>{
               return state.userInfo;
            },

            Errors:state=>{
               
                return state.error;
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