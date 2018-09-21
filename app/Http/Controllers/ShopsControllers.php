<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use  DB;
use App\Shop;
use App\Vote;
class ShopsControllers extends Controller
{
    //


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
  
                   $findshop=Shop::withCount('vote')->where(['id'=>$nearshop->id])->get();

               

           
                  
               
               if ($findshop->count()>0) {
                 

              //Likes and dislikes count
             $likesDes= Shop::getTotalVotes($nearshop->id);



              $findshop->map(function ($findshop) use ($nearshop,$likesDes) {
               $findshop['distance'] = $nearshop->distance;
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





}