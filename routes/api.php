<?php

use Illuminate\Http\Request;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

// Route::middleware('auth:api')->get('/user', function (Request $request) {
//     return $request->user();
// });






//Admin

$router->group(['namespace'=>'Admin','prefix' => 'admin','middleware' => 'api'], function () use ($router) {



    $router->post('/editshop','ShopsControllers@store');
    $router->post('/addshop','ShopsControllers@store');

});




//User

$router->group(['namespace'=>'Account','prefix' => 'account','middleware' => 'api'], function () use ($router) {
    $router->post('create',['as'=>'create','uses'=>'UsersControllers@store']);
    $router->post('login',['as'=>'login','uses'=>'UsersControllers@logmein']);
    $router->post('logout',['as'=>'logout','uses'=>'UsersControllers@logmeout']);
    $router->post('refresh', ['as'=>'refresh','uses'=>'UsersControllers@refresh']);
    $router->post('me', ['as'=>'profile','uses'=>'UsersControllers@me']);

 



    /*
    *@VotesControllers
    */

    //Like/Dislike a shop (ud => Up or Down) 
    $router->get('/shop/vote/{id}-{ud}',['as'=>'votes','uses'=>'VotesControllers@vote']);

    //My Liked Shops
    $router->get('/preferred',['as'=>'preferred','uses'=>'ShopsControllers@preferred']);

    //Remove it from my Liked list
    $router->delete('/preferred/remove/{id}',['as'=>'remove','uses'=>'VotesControllers@remove']);
     
   
});




//Jon Doe
Route::get('/shops/{distance?}', 'ShopsControllers@index');