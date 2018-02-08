<?php

class SentMessagesLog
{
   private $id;
   private $type;
   private $message;
   private $userID;
   private $timestamp;

   public  function  getSentMessagesLogInfo()
   {
      $array = array(
         "id" => $this->id,
         "type" => $this->type,
         "message" => $this->message,
         "userID" => $this->userID,
         "timestamp" => $this->timestamp
      );

      return $array;
   }
}