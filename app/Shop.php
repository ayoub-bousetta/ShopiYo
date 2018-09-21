<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use DB;
class Shop extends Model
{
    //

    protected $hidden  = ['created_at', 'updated_at'];



     /**
     * Has manyMedias
     */
    public function media()
    {
        return $this->hasMany('App\Media','shop_id');
    }


     /**
     * Has manyVotes
     */
    public function vote()
    {
        return $this->hasMany('App\Vote','shop_id');
    }



    /**
     * Has Total Votes likes and dislikes
     */
    public static function getTotalVotes($shopid)
    {   
        $Arrholder=[];
     

        $likes=DB::table('votes')->where(['shop_id'=>$shopid,'vote'=>1]);
        $dislikes=DB::table('votes')->where(['shop_id'=>$shopid,'vote'=>-1]);
        
        $Arrholder=['likes'=>$likes,'dislikes'=>$dislikes];


        return  $Arrholder;

    }

   
    /**
     * Get store By distance
     */

    public static function getByDistance($lat, $lng, $distance)
        {

            $calcd='6371 * (acos( cos( radians(' . $lat . ') ) * cos( radians( lat ) ) * cos( radians( lng ) - radians(' . $lng . ') ) + sin( radians(' . $lat .') ) * sin( radians(lat) ) ))' ;

            if ($distance == false) {
                //Home Page Without distance
                $results = DB::select(DB::raw('SELECT id,'.$calcd.' AS distance FROM shops ORDER BY distance') );

            }else{
                $results = DB::select(DB::raw('SELECT id,'.$calcd.' AS distance FROM shops  HAVING distance < ' . $distance . ' ORDER BY distance') );

            }

       
       
        return $results;
        }



}
