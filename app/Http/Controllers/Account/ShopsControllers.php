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

  
    function index(){

        $shops = Shop::all()->vote;
        $shops = Vote::with('shop')->where(['user_id'=> Auth::user()->id])->get();

        $votecount=$shops->vote->count();
        dd($votecount);

        return response()->json(compact('shops'));

    }


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
                'lat' => 'required|decimal',
                'lng' => 'required|decimal',



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
            'lat' => 'required|decimal',
            'lng' => 'required|decimal',



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
