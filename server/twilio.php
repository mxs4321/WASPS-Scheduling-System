<?php
    //require autoload file for twilio
    require __DIR__ . '/twilio-php-master/Twilio/autoload.php';
    //use the REST api to make requests
    use Twilio\Rest\Client;
    class TextDriver {
        //twilio information
        private $sid = 'ACea262116e95f713800419bb929fb7cb1';
        private $token = '9ce3a6c589d77a6ca15ca7a244f3f0c6';
        private $client = new Client($sid, $token);

        private $waspsPhoneNumber = '+16316511911';
        function sendMessage($message, $phone)
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
    }
?>