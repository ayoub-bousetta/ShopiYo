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

Route::middleware('auth:api')->get('/user', function (Request $request) {
    return $request->user();
});


Route::get('/shops', 'ShopsControllers@index');
Route::put('/editshop','ShopsControllers@store');
Route::post('/addshop','ShopsControllers@store');



//Create User

$router->group(['namespace'=>'Account','prefix' => 'account'], function () use ($router) {
    $router->post('/create',['as'=>'create','uses'=>'UsersControllers@store']);
    $router->post('/login',['as'=>'login','uses'=>'UsersControllers@logmein']);
    $router->post('/logout',['as'=>'logout','uses'=>'UsersControllers@logmeout']);

    //Like/Dislike a shop (ud => Up or Down)
    $router->get('/vote/{id}-{ud}',['as'=>'votes','uses'=>'ShopsControllers@vote']);
   
});