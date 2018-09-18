<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Vote extends Model
{
    
     /**
     * belongsToShop
     */
    public function shop()
    {
        return $this->belongsTo('App\Shop');
    }
}
