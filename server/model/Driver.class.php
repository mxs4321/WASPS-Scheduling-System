<?php

class Driver
{
   private $driverID;
   private $firstName;
   private $lastName;
   private $phone;
   private $email;
   private $requestStatus;

   public function getDriverID()
   {
      return $this->driverID;
   }

   public function getDriverInfo()
   {
      $array = array (
         "firstName" => $this->firstName,
         "lastName" => $this->lastName,
         "phone" => $this->phone,
         "email" => $this->email,
         "requestStatus" => $this->requestStatus
      );

      return $array;
   }
}