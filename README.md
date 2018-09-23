# ShopiYo
Laravel 5.7 & VueJs based - [See it live](http://shopiyo.aubbusta.com)

## Files for the challenge are located at /dist => [Index,+css+js files](https://github.com/ayoub-bousetta/ShopiYo/tree/master/dist)

### Getting Started

All Files are found on this repo separated as branches, so you can get whatever you like from the project. :high_brightness:


##### Static_Template -> (Aka the design)

Contain only basics elements that i needed to get an idea on the final project, that's why i use the <section> to separate parts for the final SPA project, Created from scratch all elements are available [here](https://github.com/ayoub-bousetta/ShopiYo/tree/Static_Template), so clone it and enjoy.

 
##### LaravelApi -> (Aka Back-end)

Simple Api based on [laravel framewor 5.7](https://laravel.com) and  [JWT-token](https://jwt-auth.readthedocs.io/en/develop/) lib  to get the token, the app is far from being finished but some parts are already developped like StoreAdd,UserProfile,LikeddislikeRevoke...also you can clone it and enjoy..


##### Master -> (Aka Front-end)

Vuejs is already implemented on Laravel but in this ^project i wanna separate everything 'As asked on the challenge.


The coding challenge is about implementing an app that lists shops nearby.

-> As a User, I can sign up using my email & password :heavy_check_mark: 

-> As a User, I can sign in using my email & password :heavy_check_mark: 

-> As a User, I can display the list of shops sorted by distance :heavy_check_mark: 

-> As a User, I can like a shop, so it can be added to my preferred shops :heavy_check_mark: 


Bonus point (those items are optional):

-> As a User, I can dislike a shop, so it won’t be displayed within “Nearby Shops” list during the next 2 hours :x:

-> As a User, I can display the list of preferred shops :heavy_check_mark: 

-> As a User, I can remove a shop from my preferred shops list :heavy_check_mark: 

Added Funcs

-> As a User you can filter on bouth sections (Shops & Pereferred) by distance (km) :heavy_check_mark: 

-> You can't like/Add if !Auth :heavy_check_mark: 

-> Likes count, dislikes count and votes count :heavy_check_mark: 

-> Full falsh notification (From scratch) :heavy_check_mark: 

-> Spinner on loading :heavy_check_mark: 

-> Like and dislike system fully functional ('new_vote' -> like or dislike, 'delete_vote' -> liked/disliked delete it ,'update_vote' ->liked it before and you dislike it now).

and much more that you can find on the code.

##### What about the  delete BONUS? :dizzy_face:

2 ways to do it: 

Perfect way: Create a table with user_id, shop_id, start_time, ended_time (ended_time will be auto calculated by adding 2h) after that it's server time (Real time database like firebase/ cron job script on server or a script on client side{not that cool})

Okey way: Using localstorage or Cookies and set time to 2 hours, but it can bypassed so easy by deleting theme from the browser.



### How to get/use files ?

i left all the files non-compiled and separated so you can Check, Clone and benefit from them, You can do that by Running using the npm



##### Template File

```
npm run dev -> to lauch 
```
```
npm run build -> to get the Dist file
```


##### Api


```
-> Clone file to your envirement

-> Create a database (.sql file on repo or use migration if you want empty tables) on your server and add it to .env

-> php artisan serve

-> if you are all set You can go directly to .../api/shops to see the stores

PS : If you are using localhost (make sure to change $request->ip on ShopsControllers both in Controllers and Account/controllers)

```


##### Front-end

```
npm run serve -> to lauch 
```
```
npm run build -> to get the Dist file
```

###### Live version 

-> [Client side](http://shopiyo.aubbusta.com)

-> [Server Side API](http://shopiyoapi.aubbusta.com/api/shops)


##### Idea from this

What i would like to do is use Gmaps to get shops by distance like in a 20km distance and if it got a vote add it to database in this case you can use Gmaps as source.

Info : Shops image is static tabel is set (Medias) so you can start from here and create it

######  Feel free,Because it's free

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details
