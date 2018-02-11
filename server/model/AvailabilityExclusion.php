<?php

class AvailabilityExclusion
{
   private $id;
   private $start;
   private $end;
   private $driverID;

   public  function  getAvailabilityExclusionInfo()
   {
      return [
        "id" => $this->id,
        "start" => $this->start,
        "end" => $this->end,
        "driverID" => $this->driverID
      ];
   }
}