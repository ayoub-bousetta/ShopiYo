<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Shop;

class ShopsControllers extends Controller
{
    //

    public function __construct()
    {       

            //Set a default value to false
            $flag=false;
    }

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


            $id = $request->input('id');


            $shop=Shop::findOrFail($id)->update($shop);

            

                if ($shop == true) {
                    $flag=true;
            return response()->json(compact(['shop','flag']));

                }else{
                   
                    return response()->json(compact(['flag']));
                    
                }

         



        } else {


        $shop = new Shop;

        $shop->name = $request->input('name');
        $shop->address = $request->input('address');
        $shop->lat = $request->input('lat');
        $shop->lng = $request->input('lng');



        if ($shop->save()) {
                    $flag=true;
            return response()->json(compact(['shop','flag']));

                }else{
                   
                    return response()->json(compact(['flag']));
                    
                }

    }

    }


    
    function vote($id,$ud){


        dd($ud);

        $shop=Shop::findOrFail($id);


        $shop=compact('shop');
      

        return response()->json(compact('shop'));

    }





}
