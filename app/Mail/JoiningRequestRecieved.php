<?php
 
namespace App\Mail;
 
use App\PotentialStudent;
use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;
 
class JoiningRequestRecieved extends Mailable
{
    use Queueable, SerializesModels;
 
    /**
     * The order instance.
     *
     * @var \App\Models\Order
     */
    protected $potentialStudent;
 
    /**
     * Create a new message instance.
     *
     * @param  \App\Models\Order  $order
     * @return void
     */
    public function __construct(PotentialStudent $potentialStudent)
    {
        $this->potentialStudent = $potentialStudent;
    }
 
    /**
     * Build the message.
     *
     * @return $this
     */
    public function build()
    {
        return $this->view('emails.potential_students.email_recieved')
                    ->with([
                        'userEmail' => $this->potentialStudent->name,
                        'userName' => $this->potentialStudent->email,
                        'userMessage' => $this->potentialStudent->message,
                    ]);
    }
}