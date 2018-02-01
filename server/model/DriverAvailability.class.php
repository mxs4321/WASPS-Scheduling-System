<?php

class DriverAvailability
{
   private $driverAvailabilityID;
   private $driverID;
   private $availableStart;
   private $availableEnd;

   public  function  getDriverAvailabilityInfo()
   {
      $array = array(
         "driverAvailabilityID" => $this->driverAvailabilityID,
         "driverID" => $this->driverID,
         "availableStart" => $this->availableStart,
         "availableEnd" => $this->availableEnd
      );

      return $array;
   }
}