<?php

class VolunteerRequest
{
   private $id;
   private $timestamp;
   private $userID;

   public  function  getVolunteerRequestInfo()
   {
      $array = array(
         "id" => $this->id,
         "timestamp" => $this->timestamp,
         "userID" => $this->userID
      );

      return $array;
   }
}