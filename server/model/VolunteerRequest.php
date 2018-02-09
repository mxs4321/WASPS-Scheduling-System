<?php

class VolunteerRequest
{
    private $id;
    private $timestamp;
    private $userID;

    public function getVolunteerRequestInfo()
    {
        return [
            "id" => $this->id,
            "timestamp" => $this->timestamp,
            "userID" => $this->userID,
        ];
    }
}
