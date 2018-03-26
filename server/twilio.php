<?php
    //require autoload file for twilio
    require __DIR__ . '/twilio-php-master/Twilio/autoload.php';
    //use the REST api to make requests
    use Twilio\Rest\Client;
    class TextDriver {
        //twilio information
        $sid = 'ACea262116e95f713800419bb929fb7cb1';
        $token = '9ce3a6c589d77a6ca15ca7a244f3f0c6';
        $client = new Client($sid, $token);

        $waspsPhoneNumber = '+16316511911';
        function sendMessage($name, $message, $phone)
        {
             //send a message
            $client ->messages->create(
                //replace with the number to send a message to
                $name,
                array(
                    //the assigned twilio number
                    'from' => $waspsPhoneNumber,
                    //Message of the text
                    'body' => $message
                    )
            );
        }
    print "Message Sent";
?>