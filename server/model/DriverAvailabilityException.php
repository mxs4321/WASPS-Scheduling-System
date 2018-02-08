<?php

class DriverAvailabilityException
{
   private $id;
   private $start;
   private $end;
   private $driverID;

   public  function  getDriverAvailabilityExceptionInfo()
   {
      $array = array(
         "id" => $this->id,
         "start" => $this->start,
         "end" => $this->end,
         "driverID" => $this->driverID
      );

      return $array;
   }
}