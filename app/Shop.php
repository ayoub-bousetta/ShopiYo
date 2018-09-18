<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Shop extends Model
{
    //

    

     /**
     * Has manyMedias
     */
    public function media()
    {
        return $this->hasMany('App\Media');
    }


     /**
     * Has manyVotes
     */
    public function vote()
    {
        return $this->hasMany('App\Vote');
    }
}
