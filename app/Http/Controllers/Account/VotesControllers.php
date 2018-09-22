<?php

namespace App\Http\Controllers\Account;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Validator;

use Illuminate\Support\Facades\Auth;
use App\Vote;

class VotesControllers extends Controller
{
    //


    public function __construct()
    {
        $this->middleware('auth');
    }

  


      /**
     * Shops i judged
     *
     */
    function dislike(){


        $components = Vote::with('shop')->where(['user_id'=> Auth::user()->id])->get();
        return response()->json(compact('components'));

       

    }



    


      /**
     * Shops i Hate and i wanna remove now 
     *@Id => Base on id and user_id
     */
     public  function remove($id){


       
            $Vote = Vote::where(['user_id'=>Auth::user()->id,'id'=>$id]);
            
           $done=$Vote->delete();

            if ($done) {
                return response()->json(['success'=>"Done successfully"]);
            }else{
                return response()->json(['errors'=>"Something went wrong we couldn't delete it"]);
            }


     }


//Improvingvote system
     function vote($id,$ud,Request $request){



        //Check if user is IN
      
        $data =[
            'id'=>$id, //Shop id
            'ud'=>$ud //vote val
        ];

        $validator = Validator::make($data, [
            'id' => 'required|integer|exists:shops',
            'ud' => 'required|string|max:1', //u for Up, d for Down
            
        ]);


          

            //Check validation data
            if (!$validator->fails()) {
                # code...

                 # Check if already voted...
                $checkifalreadyvoted=Vote::where(['shop_id'=> $id,'user_id'=>Auth::user()->id])->first();

              
                if ($checkifalreadyvoted) {
                    $voteVal=($ud == 'u') ? 1 : -1; // So we can use to check
                    if ( $checkifalreadyvoted->vote !=  $voteVal) {
                        // Update
                        $checkifalreadyvoted->update([
                            'vote' => $voteVal
                        ]);

                        return response()->json(['sucess'=>"update_vote",$checkifalreadyvoted]);
                    }else{
                        // Delete

                        $this->remove($checkifalreadyvoted->id);
                        return response()->json(['sucess'=>"delete_vote"]);
                    }

                   
                   
                }else{

                    $vote = new Vote;
                    $vote->shop_id = $id;
                    $vote->user_id = Auth::user()->id;
                    $vote->vote = ($ud == 'u') ? 1 : -1 ;
    
                  $vote->save();

                  return response()->json(['sucess'=>"new_vote",$vote]);

                }

               

            }else{
                return response()->json(['errors'=>$validator->errors()]);
            }
      

       

    }







}
