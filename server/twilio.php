<?php
    //require autoload file for twilio
    require __DIR__ . '/twilio-php-master/Twilio/autoload.php';
    //use the REST api to make requests
    use Twilio\Rest\Client;

    //twilio information
    $sid = 'ACea262116e95f713800419bb929fb7cb1';
    $token = '9ce3a6c589d77a6ca15ca7a244f3f0c6';
    $client = new Client($sid, $token);

    //send a message
    $client ->messages->create(
        //replace with the number to send a message to
        '+19144178263',
        array(
            //the assigned twilio number
            'from' => '+16316511911',
            //Message of the text
            'body' => "This is a test text message"
             )
   );
   print "Message Sent";
?>