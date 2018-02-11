<?php
class Ride
{
    private $id;
    private $passengerID;
    private $driverID;
    private $apptStart;
    private $apptEnd;
    private $numMiles;
    private $totalMinutes;
    private $pickupTime;
    private $wheelchairVan;
    private $status;
    private $pickupStreetAddress;
    private $pickupCity;
    private $apptStreetAddress;
    private $apptCity;
    private $created;
    private $modified;

    public function getRideInfo()
    {
        return [
            "id" => $this->id,
            "userID" => $this->passengerID,
            "apptStart" => $this->apptStart,
            "apptEnd" => $this->apptEnd,
            "numMiles" => $this->numMiles,
            "totalMinutes" => $this->totalMinutes,
            "pickupTime" => $this->pickupTime,
            "wheelchairVan" => $this->wheelchairVan,
            "status" => $this->status,
            "pickupStreetAddress" => $this->pickupStreetAddress,
            "pickupCity" => $this->pickupCity,
            "apptStreetAddress" => $this->apptStreetAddress,
            "apptCity" => $this->apptCity,
            "created" => $this->created,
            "modified" => $this->modified,
        ];
    }
}
