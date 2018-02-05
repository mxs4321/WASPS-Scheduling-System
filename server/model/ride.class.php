<?php
class RideModel
{
    public $id;
    public $userID;
    public $apptStart;
    public $apptEnd;
    public $numMiles;
    public $totalMinutes;
    public $pickupTime;
    public $wheelchareVan;
    public $status;
    public $pickupStreetAddress;
    public $pickupCity;
    public $apptStreetAddress;
    public $apptCity;
    public $created;
    public $modified;
}

class Ride
{
    private $dbh;

    public function __construct($dbh)
    {
        $this->dbh = $dbh;
    }

    public function findById($id)
    {
        try {
            $stmt = $this->dbh->prepare("SELECT * FROM ride WHERE id = :id");
            $stmt->execute([':id' => intval($id)]);
            $stmt->setFetchMode(PDO::FETCH_CLASS, "RideModel");
            return $stmt->fetch();
        } catch (PDOException $e) {
            echo $e->getMessage();
            die();
        }
    }

    public function getPage($page = 0, $numberPerPage = 10)
    {
        try {
            $stmt = $this->dbh->prepare("SELECT * FROM ride LIMIT :lim OFFSET :offset");
            $stmt->bindParam(':lim', intval($numberPerPage), PDO::PARAM_INT);
            $stmt->bindParam(':offset', intval($page * $numberPerPage), PDO::PARAM_INT);
            $stmt->execute();
            $stmt->setFetchMode(PDO::FETCH_CLASS, "RideModel");
            while ($ride = $stmt->fetch()) {
                $data[] = $ride;
            }
            return $data;
        } catch (PDOException $e) {
            echo $e->getMessage();
            die();
        }
    }

    public function create(
        $userID, $apptStart, $apptEnd, $pickupTime, $wheelchairVan, 
        $pickupStreetAddress, $pickupCity, $apptStreetAddress, $apptCity
    ) {

        $stmt = $this->dbh->prepare("INSERT INTO `wasps`.`Ride` (`userID`, `apptStart`, `apptEnd`,  `pickupTime`, `wheelchairVan`, `pickupStreetAddress`, `pickupCity`, `apptStreetAddress`, `apptCity`) VALUES (:userID, :apptStart, :apptEnd, :pickupTime, :wheelchairVan, :pickupStreetAddress, :pickupCity, :apptStreetAddress, :apptCity)");
        $stmt->bindParam(':userID', intval($userID), PDO::PARAM_INT);
        $stmt->bindParam(':apptStart', $apptStart, PDO::PARAM_STR);
        $stmt->bindParam(':apptEnd', $apptEnd, PDO::PARAM_STR);
        $stmt->bindParam(':pickupTime', $pickupTime, PDO::PARAM_STR);
        $stmt->bindParam(':wheelchairVan', $wheelchairVan, PDO::PARAM_BOOL);
        $stmt->bindParam(':pickupStreetAddress', $pickupStreetAddress, PDO::PARAM_STR);
        $stmt->bindParam(':pickupCity', $pickupCity, PDO::PARAM_STR);
        $stmt->bindParam(':apptStreetAddress', $apptStreetAddress, PDO::PARAM_STR);
        $stmt->bindParam(':apptCity', $apptCity, PDO::PARAM_STR);
        $stmt->execute();
        $stmt->setFetchMode(PDO::FETCH_CLASS, "RideModel");
    }
}
