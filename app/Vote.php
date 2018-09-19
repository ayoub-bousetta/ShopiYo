<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Vote extends Model
{
    protected $fillable = ['vote'];
     /**
     * belongsToShop
     */
    public function shop()
    {
        return $this->belongsTo('App\Shop');
    }




}
