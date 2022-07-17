<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\WaitingList;

class WaitingListController extends Controller
{
    //

    public function storeDetails($request){

        $details = $request->all();

        $waiting_list = WaitingList::create(
            $details
        );
    }

    public function notifySiteOwner(){

        
    }
}
