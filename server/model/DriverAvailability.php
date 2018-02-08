<?php

class DriverAvailability
{
    private $id;
    private $start;
    private $end;
    private $days;
    private $driverID;

    public function getDriverAvailabilityInfo()
    {
        return [
            "id" => $this->id,
            "start" => $this->start,
            "end" => $this->end,
            "days" => $this->days,
            "driverID" => $this->driverID,
        ];
    }
}
