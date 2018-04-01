<?php
include "dao/UserDAO.php";
include "dao/RideDAO.php";
include "dao/AvailabilityDAO.php";
include "dao/AvailabilityExclusionDAO.php";
include "dao/VolunteerRequestDAO.php";
include "vendor/autoload.php";

$dotenv = new Dotenv\Dotenv(__DIR__);
$dotenv->load();

class DB {
    private $dbh;
    public $user;
    public $ride;
    public $availability;
    public $availabilityExclusion;
    public $volunteerRequest;
    public $notification;

    function __construct() {
        try {
            // Load from .env file
            // var_dump($_ENV);
            $host = $_ENV["MYSQL_HOST"] ?? "127.0.0.1";
            $port = $_ENV["MYSQL_PORT"] ?? "3306";
            $name = $_ENV["MYSQL_DATABASE_NAME"];
            $user = $_ENV["MYSQL_USER"];
            $pass = $_ENV["MYSQL_PASSWORD"];
            
            $this->dbh = new PDO("mysql:host=$host;dbname=$name", $user, $pass);
            $this->dbh->setAttribute(PDO::ATTR_EMULATE_PREPARES, false);
            $this->dbh->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
            $this->user = new UserDAO($this->dbh);
            $this->ride = new RideDAO($this->dbh);
            $this->availability = new AvailabilityDAO($this->dbh);
            $this->availabilityExclusion = new AvailabilityExclusionDAO($this->dbh);
            $this->volunteerRequest = new VolunteerRequestDAO($this->dbh);
        } catch(PDOException $e) {
            echo $e->getMessage();
            die();
        }
    } 
}