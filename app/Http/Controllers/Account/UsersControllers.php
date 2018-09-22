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
        $this->middleware('auth');
            
    }

  

      /**
     * Login And Execut respondWithToken() if true
     */
    function logmein(Request $request){

      

        dd(Auth::check());
 
 
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
              
 
             if ($token = Auth::attempt($credentials)) {
             // Authentication passed...
             $user = Auth::user();
             return $this->respondWithToken($token);
                 }else{
                   
                     return response()->json(['errors' => ['Wrong username/password combination.',401]]);
 
                 }
 
 
             }else{
 
               
                   
                 return response()->json(['errors'=>$validator->errors()]);
 
            
 
             }
 
              
             
 
 
         }
 
         
       
 
        
 
     }
 
 

     /**
     * Get the authenticated User.
     */
    public function me()
    {
        return response()->json(auth()->user());
    }




     /**
     * Logout And kill the Token
     */

    function logmeout(){

        
  
        if (Auth::check()) {

            
            Auth::logout();
            return response()->json(['Success'=>"You're now disconnected"]);

        }
        
    }


     /**
     * Refresh a token.
     */
    public function refresh()
    {
        return $this->respondWithToken(auth()->refresh());
    }




      /**
     * Get the token array structure.
     *
     */
    protected function respondWithToken($token)
    {
        return response()->json([
            'access_token' => $token,
            'token_type' => 'bearer',
            'expires_in' => auth()->factory()->getTTL() * 60,
            'user'=> Auth::user(),
        ]);
    }



     



}
