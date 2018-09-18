<?php

namespace App\Http\Controllers\Account;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Auth;
use App\User;

class UsersControllers extends Controller
{

  

    public function __construct()
    {       

            
    }

    //Create User

    function store(Request $request){

     


        $validator = Validator::make($request->all(), [
            'email' => 'required|string|email|max:255|unique:users',
            'password' => 'required|string|min:6',
        ]);
   

     
       if ( !$validator->fails()) {
        $createUser=new User;
        $createUser->remember_token=0;
        $createUser->email=$request->input('email');
        $createUser->password= Hash::make($request->input('password'));
        $createUser->active= 1; //per default sould be 0 and wait for validation via email

      
        if ($createUser->save()) {
         
    return response()->json(compact('createUser'));


        }else{
           
            return response()->json(['errors'=>"Something went wrong we couldn't save it"]);

            
        }


       }

       else{
           
        return response()->json(['errors'=>$validator->errors()]);

        
    }
        





    }





      //Log User IN
      function logmein(Request $request){

      

       


        if (Auth::check()) {
            $user = Auth::user();
        
            return response()->json(compact('user'));
        }else{


            $email=$request->input('email');
            $password= $request->input('password');
           


            //Check if validate 

            $validator = Validator::make($request->all(), [
                'email' => 'required|string|email|max:255',
                'password' => 'required|string|min:6',
              
            
            ]);
            if ( !$validator->fails()) {

                //Attempt conenction / while user is active by default 

                $active = 1;

             $credentials=['email' => $email, 'password' => $password, 'active' => $active ];
             
            if (Auth::attempt($credentials)) {
            // Authentication passed...
            $user = Auth::user();
        
            return response()->json(compact('user'));
                }else{
                  
                    return response()->json(['errors'=>'Failed to connect']);

                }


            }else{

              
                  
                return response()->json(['errors'=>$validator->errors()]);

           

            }

             
            


        }

        
      

       

    }



    function logmeout(){

        
  
        if (Auth::check()) {
            Auth::logout();
            $this->flag=true;
            return response()->json(['Success'=>"You're now disconnected"]);

        }
        
    }



}
