<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\PotentialStudent;
use Illuminate\Support\Facades\Mail;
use App\Mail\UserJoined;
use App\Mail\JoiningRequestRecieved;

class PotentialStudentController extends Controller
{
    //

    public function storeDetails(Request $request){

        $details = $request->all();

        $potentialStudent = PotentialStudent::create(
            $details
        );

        $this->notifySiteOwner( $potentialStudent );

        $this->replyToPotentialStudent($potentialStudent);

    }

    public function notifySiteOwner($potentialStudent){

        Mail::to('elathetechnerd@gmail.com')
                ->send(new UserJoined($potentialStudent));
    }

    public function replyToPotentialStudent($potentialStudent){

        Mail::to($potentialStudent->email)
                ->send(new JoiningRequestRecieved($potentialStudent));

    }
}
