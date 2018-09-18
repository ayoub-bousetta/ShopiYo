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


Route::get('/shops', 'ShopsControllers@index');
Route::put('/editshop','ShopsControllers@store');
Route::post('/addshop','ShopsControllers@store');



//Create User

$router->group(['namespace'=>'Account','prefix' => 'account','middleware' => 'api'], function () use ($router) {
    $router->post('create',['as'=>'create','uses'=>'UsersControllers@store']);
    $router->post('login',['as'=>'login','uses'=>'UsersControllers@logmein']);
    $router->post('logout',['as'=>'logout','uses'=>'UsersControllers@logmeout']);
    $router->post('refresh', ['as'=>'refresh','uses'=>'UsersControllers@refresh']);
    $router->post('me', ['as'=>'profile','uses'=>'UsersControllers@me']);

    //Like/Dislike a shop (ud => Up or Down)
    $router->get('/vote/{id}-{ud}',['as'=>'votes','uses'=>'ShopsControllers@vote']);



    /*
    *@VotesControllers
    */
     
    //My Liked Shops
    $router->get('/preferred',['as'=>'preferred','uses'=>'VotesControllers@preferred']);

    //Remove it from my Liked list
    $router->get('/remove',['as'=>'remove','uses'=>'VotesControllers@remove']);
     
   
});


