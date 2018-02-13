<?php
include "dao/UserDAO.php";
include "dao/RideDAO.php";
include "dao/AvailabilityDAO.php";
include "dao/AvailabilityExclusionDAO.php";
include "dao/VolunteerRequestDAO.php";
include "dao/NotificationDAO.php";

class DB {
    private $dbh;
    public $user;
    public $ride;
    public $availability;
    public $availabilityExclusion;
    public $volunteerRequest;
    public $notification;

    function __construct($host, $port, $name, $user, $pass) {
        try {
            $this->dbh = new PDO("mysql:host=$host;dbname=$name", $user, $pass);
            $this->dbh->setAttribute(PDO::ATTR_EMULATE_PREPARES, false);
            $this->dbh->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
            $this->user = new UserDAO($this->dbh);
            $this->ride = new RideDAO($this->dbh);
            $this->availability = new AvailabilityDAO($this->dbh);
            $this->availabilityExclusion = new AvailabilityExclusionDAO($this->dbh);
            $this->volunteerRequest = new VolunteerRequestDAO($this->dbh);
            $this->notification = new NotificationDAO($this->dbh);
        } catch(PDOException $e) {
            echo $e->getMessage();
            die();
        }
    } 
}