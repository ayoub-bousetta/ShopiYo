<?php

namespace App\Http\Controllers\Account;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Auth;

use App\Shop;
use App\Vote;

class ShopsControllers extends Controller
{
    //

  
    function index(){

        $shops = Shop::all();
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


    
    function vote($id,$ud,Request $request){



        //Check if user is IN
        if (Auth::check()) {



       
        
        $data =[
            'id'=>$id,
            'ud'=>$ud
        ];

        $validator = Validator::make($data, [
            'id' => 'required|integer|exists:shops',
            'ud' => 'required|string|max:1', //u for Up, d for Down
            
        ]);


          

            //Check validation data
            if (!$validator->fails()) {
                # code...

                $vote = new Vote;
                
                $vote->shop_id = $id;
                $vote->user_id = Auth::user()->id;
                $vote->vote = ($ud == 'u') ? 1 : -1 ;

                dd($vote->save());

            }else{
                return response()->json(['errors'=>$validator->errors()]);
            }
      

         }else{

            //Not LogIn
            return response()->json(['errors'=>"You're not Conneceted"]);
         }

    }




     





}
