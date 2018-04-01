<?php
include "vendor/autoload.php";
use Twilio\Rest\Client;
$dotenv = new Dotenv\Dotenv(__DIR__);
$dotenv->load();

class TextDriver
{
    public function sendMessage($message, $phone)
    {
        $client = new Client($_ENV['TWILIO_SID'], $_ENV['TWILIO_TOKEN']);
        //send a message
        $client->messages->create(
            $phone,
            [
                'from' => $_ENV['TWILIO_PHONE_NUMBER'],
                'body' => $message,
            ]
        );
    }
}
