<?php
include "dao/UserDAO.php";
include "dao/RideDAO.php";
include "dao/DriverAvailabilityDAO.php";
include "dao/DriverAvailabilityExceptionDAO.php";
include "dao/VolunteerRequestDAO.php";
include "dao/SentMessagesLogDAO.php";

class DB {
    private $dbh;
    public $user;
    public $ride;
    public $driverAvailability;
    public $driverAvailabilityException;
    public $volunteerRequest;
    public $sentMessagesLog;

    function __construct($host, $port, $name, $user, $pass) {
        try {
            $this->dbh = new PDO("mysql:host=$host;dbname=$name", $user, $pass);
            $this->dbh->setAttribute(PDO::ATTR_EMULATE_PREPARES, false);
            $this->dbh->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
            $this->user = new UserDAO($this->dbh);
            $this->ride = new RideDAO($this->dbh);
            $this->driverAvailability = new DriverAvailabilityDAO($this->dbh);
            $this->driverAvailabilityException = new DriverAvailabilityExceptionDAO($this->dbh);
            $this->volunteerRequest = new VolunteerRequestDAO($this->dbh);
            $this->sentMessagesLog = new SentMessagesLogDAO($this->dbh);
        } catch(PDOException $e) {
            echo $e->getMessage();
            die();
        }
    } 
}