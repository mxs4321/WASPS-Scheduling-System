<?php
include "user.class.php";
include "ride.class.php";
include "comment.class.php";
include "../dao/DriverAvailabilityDAO.php";
include "../dao/DriverAvailabilityExceptionDAO.php";

class DB {
    private $dbh;
    public $user;
    public $ride;
    public $comment;
    public $driverAvailabilityDAO;
    public $driverAvailabilityExceptionDAO;

    function __construct($host, $port, $name, $user, $pass) {
        try {
            $this->dbh = new PDO("mysql:host=$host;dbname=$name", $user, $pass);
            $this->dbh->setAttribute(PDO::ATTR_EMULATE_PREPARES, false);
            $this->dbh->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
            $this->user = new User($this->dbh);
            $this->ride = new Ride($this->dbh);
            $this->comment = new Comment($this->dbh);
            $this->driverAvailabilityDAO = new DriverAvailabilityDAO($this->dbh);
            $this->driverAvailabilityExceptionDAO = new DriverAvailabilityExceptionDAO($this->dbh);
        } catch(PDOException $e) {
            echo $e->getMessage();
            die();
        }
    } 
}