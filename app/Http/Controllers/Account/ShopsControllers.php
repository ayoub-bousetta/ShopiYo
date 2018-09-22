<?php

namespace App\Http\Controllers\Account;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Auth;

use App\Shop;

class ShopsControllers extends Controller
{
    //


    public function __construct()
    {       
        $this->middleware('auth');
            
    }


    function index(Request $request,$setdistance=null){


        $ip = geoip()->getLocation('41.250.158.62'); //$request->ip()); -> for dynamic on server
       
         $lat = $ip->lat;
         $lng =$ip->lon;

         //How far should be in KM Set or default
         if ($setdistance) {
            $distance =  $setdistance;
         }else{
            $distance = false;
         }
         
         

       



         $nearShops = Shop::getByDistance($lat, $lng, $distance);


         //Define shops array

         if (empty($nearShops)) {
           
            return response()->json(['errors'=>"No Shop could be find near to your location"]);

         }else{

            //Table Aka Shop holder
            $shops=[];
   
           foreach ($nearShops as $key => $nearshop) {
   
                if (Auth::check()) {

                    $shopids=[];

                    $userVotes=Vote::all()->where('user_id', Auth::user()->id)->where('vote', '=', 1);

                    if($userVotes->count() > 0){

                        foreach ($userVotes as $userVote) {
                            $shopids[]=$userVote->shop_id;
                        }

                        $findshop=Shop::withCount('vote')->where('id','=',$nearshop->id)->whereNotIn('id', $shopids)->get();
                    }else{

                        $findshop=Shop::withCount('vote')->where(['id'=>$nearshop->id])->get();
                    }

             

                }else{
                    $findshop=Shop::withCount('vote')->where(['id'=>$nearshop->id])->get();

                }

            
                   
                
                if ($findshop->count()>0) {
                  

               //Likes and dislikes count
              $likesDes= Shop::getTotalVotes($nearshop->id);



               $findshop->map(function ($findshop) use ($nearshop,$likesDes) {
                $findshop['distance'] =  round($nearshop->distance);
                $findshop['likes_count'] = $likesDes['likes']->count();
                $findshop['dislikes_count'] = $likesDes['dislikes']->count();

                return $findshop;

            });

            $findshop = json_decode($findshop);

            $shops[]=$findshop[0];
            }

           

            
           }
             
           
             return response()->json(compact('shops'));


         }

        
  
      }
  
    // function preferred(){

    //     $shops =  Shop::whereHas('vote', function ($query) {
    //         $query->where('user_id', '=', Auth::user()->id)->where('vote', '=',1);
    //     })->get();



     
    
    //     return response()->json(compact('shops'));

    // }


    function preferred($setdistance=null){


            
               


        $ip = geoip()->getLocation('41.250.158.62'); //$request->ip()); -> for dynamic on server
       
        $lat = $ip->lat;
        $lng =$ip->lon;

        //How far should be in KM Set or default
        if ($setdistance) {
           $distance =  $setdistance;
        }else{
           $distance = false;
        }
        
        

      



        $nearShops = Shop::getByDistance($lat, $lng, $distance);


        //Define shops array

        if (empty($nearShops)) {
          
           return response()->json(['errors'=>"No Shop could be find near to your location"]);

        }else{

           //Table Aka Shop holder
           $shops=[];
  
          foreach ($nearShops as $key => $nearshop) {
  
                   $findshop=Shop::whereHas('vote', function ($query) {
                    $query->where('user_id', '=', Auth::user()->id)->where('vote', '=',1);
                })->where(['id'=>$nearshop->id])->get();

               

           
                  
               
               if ($findshop->count()>0) {
                 

              //Likes and dislikes count
             $likesDes= Shop::getTotalVotes($nearshop->id);



              $findshop->map(function ($findshop) use ($nearshop,$likesDes) {
               $findshop['distance'] = round($nearshop->distance);
               $findshop['likes_count'] = $likesDes['likes']->count();
               $findshop['dislikes_count'] = $likesDes['dislikes']->count();

               return $findshop;

           });

           $findshop = json_decode($findshop);

           $shops[]=$findshop[0];
           }

          

           
          }
            
          
            return response()->json(compact('shops'));


        }

       


         }



    //Add Or Edit Shops  {Only /Admin}
    public function store(Request $request){

  

        if ( $request->method()=='PUT') {
            # Edit...
            $shop->name = $request->input('name');
            $shop->address = $request->input('address');
            $shop->lat = $request->input('lat');
            $shop->lng = $request->input('lng');



            $validator = Validator::make($request->all(), [
                'name' => 'required|string|max:255',
                'address' => 'required|string|max:255',
                //'lat' => 'required|regex:/^\d*(\.\d{10,8})?$/',
                //'lng' => 'required|regex:/^\d*(\.\d{11,8})?$/',



            ]);

            $id = $request->input('id');


            if ( !$validator->fails()) {
                $shop=Shop::findOrFail($id)->update($shop);

            

                if ($shop == true) {
                   
                return response()->json(compact('shop'));

                }else{
                   
                    return response()->json(['errors'=>"Something went wrong we couldn't update it"]);
                    
                }


            } else{
           
                return response()->json(['errors'=>$validator->errors()]);
        
                
            }

           

         



        } else {


        $shop = new Shop;

        $shop->name = $request->input('name');
        $shop->address = $request->input('address');
        $shop->lat = $request->input('lat');
        $shop->lng = $request->input('lng');


        $validator = Validator::make($request->all(), [
            'name' => 'required|string|max:255',
            'address' => 'required|string|max:255',
            //'lat' => 'required|regex:/^\d*(\.\d{10,8})?$/',
                //'lng' => 'required|regex:/^\d*(\.\d{11,8})?$/',



        ]);


        if ( !$validator->fails()) {
                    if ($shop->save()) {
                        
                        return response()->json(compact(['shop']));

                            }else{
                            
                                return response()->json(['errors'=>"Something went wrong we couldn't update it"]);
                                
                            }
                        } else{
           
                            return response()->json(['errors'=>$validator->errors()]);
                    
                            
                        }
            

    }

    }


    
   



     





}
