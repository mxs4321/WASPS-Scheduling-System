<?php

class EndUser
{
   private $endUserID;
   private $firstName;
   private $lastName;
   private $phone;
   private $email;

   public function getEndUserInfo()
   {
      $array = array(
         "endUserID" => $this->endUserID,
         "firstName" => $this->firstName,
         "lastName" => $this->lastName,
         "phone" => $this->phone,
         "email" => $this->email
      );

      return $array;
   }
}