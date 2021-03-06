<?php
require_once __DIR__ . "/../model/Ride.php";
require_once __DIR__ . "/../model/User.php";

class RideDAO
{
    private $dbh;

    public function __construct($dbh)
    {
        $this->dbh = $dbh;
    }

    public function findById($id, $populate = false)
    {
        try {
            $stmt = $this->dbh->prepare("SELECT * FROM Ride WHERE id = :id");
            $stmt->execute([':id' => intval($id)]);
            $stmt->setFetchMode(PDO::FETCH_CLASS, "Ride");
            $ride = $stmt->fetch();
            $ride = $ride->getRideInfo();

            if ($populate) {
                $this->populateIDs($ride);
            }

            return $ride;
        } catch (PDOException $e) {
            echo $e->getMessage();
            die();
        }
    }

    public function getRides($page = 0, $numberPerPage = 10, $populate = false, $fetchSince = "")
    {
        try
        {
            $whereClause = "";
            if ($fetchSince != "") {
                $whereClause .= " WHERE CreatedTime > :fetchSince ";
            }

            $query = "SELECT * FROM Ride " . $whereClause . " LIMIT :lim OFFSET :offset";

            $stmt = $this->dbh->prepare($query);
            $lim = intval($numberPerPage);
            $offset = intval($page * $numberPerPage);
            if ($fetchSince != "") {
                $stmt->bindParam(':fetchSince', $fetchSince);
            }

            $stmt->bindParam(':lim', $lim, PDO::PARAM_INT);
            $stmt->bindParam(':offset', $offset, PDO::PARAM_INT);
            $stmt->execute();
            $stmt->setFetchMode(PDO::FETCH_CLASS, "Ride");
            while ($ride = $stmt->fetch()) {
                $ride = $ride->getRideInfo();
                if ($populate) {
                    $this->populateIDs($ride);
                }
                $data[] = $ride;
            }
            return $data;
        } catch (PDOException $e) {
            echo $e->getMessage();
            die();
        }
    }

    public function getRidesByDriverID($driverID, $page = 0, $numberPerPage = 10, $populate)
    {
        try {
            $stmt = $this->dbh->prepare("SELECT * FROM Ride WHERE driverID = :driverID LIMIT :lim OFFSET :offset");
            $lim = intval($numberPerPage);
            $offset = intval($page * $numberPerPage);
            $stmt->bindParam(':driverID', $driverID, PDO::PARAM_INT);
            $stmt->bindParam(':lim', $lim, PDO::PARAM_INT);
            $stmt->bindParam(':offset', $offset, PDO::PARAM_INT);
            $stmt->execute();
            $stmt->setFetchMode(PDO::FETCH_CLASS, "Ride");
            while ($ride = $stmt->fetch()) {
                $ride = $ride->getRideInfo();
                if ($populate) {
                    $this->populateIDs($ride);
                }
                $data[] = $ride;
            }
            return $data;
        } catch (PDOException $e) {
            echo $e->getMessage();
            die();
        }
    }

    public function getRidesByPassengerID($passengerID, $page = 0, $numberPerPage = 10, $populate)
    {
        try {
            $stmt = $this->dbh->prepare("SELECT * FROM Ride WHERE passengerID = :passengerID LIMIT :lim OFFSET :offset");
            $lim = intval($numberPerPage);
            $offset = intval($page * $numberPerPage);
            $stmt->bindParam(':passengerID', $passengerID, PDO::PARAM_INT);
            $stmt->bindParam(':lim', $lim, PDO::PARAM_INT);
            $stmt->bindParam(':offset', $offset, PDO::PARAM_INT);
            $stmt->execute();
            $stmt->setFetchMode(PDO::FETCH_CLASS, "Ride");
            while ($ride = $stmt->fetch()) {
                $ride = $ride->getRideInfo();
                if ($populate) {
                    $this->populateIDs($ride);
                }
                $data[] = $ride;
            }
            return $data;
        } catch (PDOException $e) {
            echo $e->getMessage();
            die();
        }
    }

    public function getRideColumnNames()
    {
        try
        {
            $stmt = $this->dbh->prepare("SHOW columns FROM Ride");
            $stmt->execute();

            while ($row = $stmt->fetch()) {
                if (strpos(strtolower($row['Field']), 'id') === false && strpos($row['Field'], 'CreatedTime') === false) {
                    $data[] = $row['Field'];
                }
            }

            return $data;
        } catch (PDOException $e) {
            echo $e->getMessage();
            die();
        }
    }

    public function getDestinationExportInfo($fetchSince = "")
    {
        try
        {
            $query = "SELECT apptStreetAddress, apptCity, User.firstName, User.lastName, apptEnd FROM Ride
                      LEFT JOIN User ON (User.id = Ride.passengerID)";
            if ($fetchSince != "") {
                $query .= " WHERE Ride.CreatedTime > :fetchSince";
            }

            $stmt = $this->dbh->prepare($query);
            if ($fetchSince != "") {
                $stmt->bindParam(':fetchSince', $fetchSince);
            }

            $stmt->execute();
            $stmt->setFetchMode(PDO::FETCH_ASSOC);
            $data = [];

            while ($row = $stmt->fetch()) {
                $data[] = $row;
            }

            return $data;
        } catch (PDOException $e) {
            echo $e->getMessage();
            die();
        }
    }

    public function insertRide(
        $passengerID, $apptStart, $apptEnd, $pickupTime, $wheelchairVan,
        $status, $pickupStreetAddress, $pickupCity, $apptStreetAddress, $apptCity, $driverID) {
        try
        {
            if (isset($driverID)) {
                $stmt = $this->dbh->prepare("INSERT INTO Ride 
                (`passengerID`, `apptStart`, `apptEnd`, `pickupTime`, `wheelchairVan`, `status`, `pickupStreetAddress`, `pickupCity`, `apptStreetAddress`, `apptCity`, `driverID`) 
                VALUES (:passengerID, :apptStart, :apptEnd, :pickupTime, :wheelchairVan, :status, :pickupStreetAddress, :pickupCity, :apptStreetAddress, :apptCity, :driverID)");
                $stmt->bindParam(':driverID', $driverID, PDO::PARAM_INT);
            } else {
                $stmt = $this->dbh->prepare("INSERT INTO Ride 
                (`passengerID`, `apptStart`, `apptEnd`, `pickupTime`, `wheelchairVan`, `status`, `pickupStreetAddress`, `pickupCity`, `apptStreetAddress`, `apptCity`) 
                VALUES (:passengerID, :apptStart, :apptEnd, :pickupTime, :wheelchairVan, :status, :pickupStreetAddress, :pickupCity, :apptStreetAddress, :apptCity)");
            }

            $stmt->bindParam(':passengerID', $passengerID, PDO::PARAM_INT);
            $stmt->bindParam(':apptStart', $apptStart, PDO::PARAM_STR);
            $stmt->bindParam(':apptEnd', $apptEnd, PDO::PARAM_STR);
            $stmt->bindParam(':pickupTime', $pickupTime, PDO::PARAM_STR);
            $stmt->bindParam(':wheelchairVan', $wheelchairVan, PDO::PARAM_INT);
            $stmt->bindParam(':status', $status, PDO::PARAM_STR);
            $stmt->bindParam(':pickupStreetAddress', $pickupStreetAddress, PDO::PARAM_STR);
            $stmt->bindParam(':pickupCity', $pickupCity, PDO::PARAM_STR);
            $stmt->bindParam(':apptStreetAddress', $apptStreetAddress, PDO::PARAM_STR);
            $stmt->bindParam(':apptCity', $apptCity, PDO::PARAM_STR);

            $stmt->execute();
            $id = $this->dbh->lastInsertId();
            return $this->findById($id, true);
        } catch (PDOException $e) {
            echo $e->getMessage();
            die();
        }
    }

    public function updateRide($id, $passengerID = "", $driverID = "", $apptStart = "", $apptEnd = "", $numMiles, $totalMinutes,
        $pickupTime = "", $wheelchairVan = "", $status = "", $pickupStreetAddress = "", $pickupCity = "",
        $apptStreetAddress = "", $apptCity = "") {
        try
        {
            $passengerID = intval($passengerID);
            $driverID = intval($driverID);
            $numMiles = floatval($numMiles);
            $totalMinutes = intval($totalMinutes);
            $wheelchairVan = boolval($wheelchairVan);
            $status = strval($status);
            $pickupStreetAddress = strval($pickupStreetAddress);
            $pickupCity = strval($pickupCity);
            $apptStreetAddress = strval($apptStreetAddress);
            $apptCity = strval($apptCity);
            $setStr = "";

            if ($passengerID != "") {
                $setStr .= "`passengerID` = :passengerID";
            }

            if ($driverID != "" || $driverID == -1) {
                $setStr .= ($setStr == "") ? "`driverID` = :driverID" : ", `driverID` = :driverID";
            }

            if ($apptStart != "") {
                $setStr .= ($setStr == "") ? "`apptStart` = :apptStart" : ", `apptStart` = :apptStart";
            }

            if ($apptEnd != "") {
                $setStr .= ($setStr == "") ? "`apptEnd` = :apptEnd" : ", `apptEnd` = :apptEnd";
            }

            if ($numMiles != "") {
                $setStr .= ($setStr == "") ? "`numMiles` = :numMiles" : ", `numMiles` = :numMiles";
            }

            if ($totalMinutes != "") {
                $setStr .= ($setStr == "") ? "`totalMinutes` = :totalMinutes" : ", `totalMinutes` = :totalMinutes";
            }

            if ($pickupTime != "") {
                $setStr .= ($setStr == "") ? "`pickupTime` = :pickupTime" : ", `pickupTime` = :pickupTime";
            }

            if ($wheelchairVan != "") {
                $setStr .= ($setStr == "") ? "`wheelchairVan` = :wheelchairVan" : ", `wheelchairVan` = :wheelchairVan";
            }

            if ($status != "") {
                $setStr .= ($setStr == "") ? "`status` = :status" : ", `status` = :status";
            }

            if ($pickupStreetAddress != "") {
                $setStr .= ($setStr == "") ? "`pickupStreetAddress` = :pickupStreetAddress" : ", `pickupStreetAddress` = :pickupStreetAddress";
            }

            if ($pickupCity != "") {
                $setStr .= ($setStr == "") ? "`pickupCity` = :pickupCity" : ", `pickupCity` = :pickupCity";
            }

            if ($apptStreetAddress != "") {
                $setStr .= ($setStr == "") ? "`apptStreetAddress` = :apptStreetAddress" : ", `apptStreetAddress` = :apptStreetAddress";
            }

            if ($apptCity != "") {
                $setStr .= ($setStr == "") ? "`apptCity` = :apptCity" : ", `apptCity` = :apptCity";
            }

            $stmt = $this->dbh->prepare("UPDATE Ride SET {$setStr} WHERE id = :id;");
            $stmt->bindParam(":id", $id, PDO::PARAM_INT);
            if ($passengerID != "") {
                $stmt->bindParam(':passengerID', $passengerID, PDO::PARAM_INT);
            }

            if ($driverID == -1) {
                $stmt->bindValue(':driverID', $d = null, PDO::PARAM_INT);
            } else if ($driverID != "") {
                $stmt->bindParam(':driverID', $driverID, PDO::PARAM_INT);
            }

            if ($apptStart != "") {
                $stmt->bindParam(':apptStart', $apptStart, PDO::PARAM_STR);
            }

            if ($apptEnd != "") {
                $stmt->bindParam(':apptEnd', $apptEnd, PDO::PARAM_STR);
            }

            if ($numMiles != "") {
                $stmt->bindParam(':numMiles', $numMiles);
            }

            if ($totalMinutes != "") {
                $stmt->bindParam(':totalMinutes', $totalMinutes, PDO::PARAM_INT);
            }

            if ($pickupTime != "") {
                $stmt->bindParam(':pickupTime', $pickupTime, PDO::PARAM_STR);
            }

            if ($wheelchairVan != "") {
                $stmt->bindParam(':wheelchairVan', $wheelchairVan, PDO::PARAM_INT);
            }

            if ($status != "") {
                $stmt->bindParam(':status', $status, PDO::PARAM_STR);
            }

            if ($pickupStreetAddress != "") {
                $stmt->bindParam(':pickupStreetAddress', $pickupStreetAddress, PDO::PARAM_STR);
            }

            if ($pickupCity != "") {
                $stmt->bindParam(':pickupCity', $pickupCity, PDO::PARAM_STR);
            }

            if ($apptStreetAddress != "") {
                $stmt->bindParam(':apptStreetAddress', $apptStreetAddress, PDO::PARAM_STR);
            }

            if ($apptCity != "") {
                $stmt->bindParam(':apptCity', $apptCity, PDO::PARAM_STR);
            }

            $stmt->execute();

            return $this->findById($id, true);
        } catch (PDOException $e) {
            echo $e->getMessage();
            die();
        }
    }

    public function deleteRide($id, $userID = "")
    {
        try
        {
            $id = intval($id);
            $query = "DELETE FROM Ride WHERE id = :id";

            if ($userID != "") {
                $userID = intval($userID);
                $query .= " AND userID = :userID";
            }

            $stmt = $this->dbh->prepare($query);
            $stmt->bindParam(":id", $id, PDO::PARAM_INT);
            if ($userID != "") {
                $stmt->bindParma(":userID", $userID, PDO::PARAM_INT);
            }
            $stmt->execute();

            return $stmt->rowCount() . " row(s) deleted";
        } catch (PDOException $e) {
            echo $e->getMessage();
            die();
        }
    }

    private function populateIDs(&$ride)
    {
        if ($ride['passengerID'] != null) {
            $stmt = $this->dbh->prepare("SELECT * FROM User WHERE id = :id");
            $stmt->execute([':id' => intval($ride['passengerID'])]);
            $stmt->setFetchMode(PDO::FETCH_CLASS, "User");
            $user = $stmt->fetch();
            $ride['passengerID'] = $user->getUserInfo();
            $ride['passenger'] = $ride['passengerID'];
            unset($ride['passengerID']);
        }

        if ($ride['driverID'] != null) {
            $stmt = $this->dbh->prepare("SELECT * FROM User WHERE id = :id");
            $stmt->execute([':id' => intval($ride['driverID'])]);
            $stmt->setFetchMode(PDO::FETCH_CLASS, "User");
            $user = $stmt->fetch();
            $ride['driverID'] = $user->getUserInfo();
            $ride['driver'] = $ride['driverID'];
            unset($ride['driverID']);
        }
    }
}
