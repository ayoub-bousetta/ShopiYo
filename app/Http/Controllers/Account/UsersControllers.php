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
            'expires_in' => auth()->factory()->getTTL() * 60
        ]);
    }



     



}
