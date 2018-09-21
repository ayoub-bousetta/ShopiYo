<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateShopsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('shops', function (Blueprint $table) {
            $table->increments('id');
            $table->char('name');
            $table->mediumText('address');
            $table->mediumInteger('lat'); //Intg because of value lenght... if you're sure you can use float(10.6)
            $table->mediumInteger('lng');
            $table->integer('likes_count')->default(0);
            $table->integer('dislikes_count')->default(0);

            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('shops');
    }
}
