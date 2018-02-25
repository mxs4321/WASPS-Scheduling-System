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

    public function findById($id, $populate)
    {
        try {
            $stmt = $this->dbh->prepare("SELECT * FROM ride WHERE id = :id");
            $stmt->execute([':id' => intval($id)]);
            $stmt->setFetchMode(PDO::FETCH_CLASS, "Ride");
            $ride = $stmt->fetch();
            $ride = $ride->getRideInfo();

            if ($populate)
            {
               $this->populateIDs($ride);
            }

           return $ride;
        } catch (PDOException $e) {
            echo $e->getMessage();
            die();
        }
    }

    public function getRides($page = 0, $numberPerPage = 10, $populate = false)
    {
        try {
            $stmt = $this->dbh->prepare("SELECT * FROM ride LIMIT :lim OFFSET :offset");
            $lim = intval($numberPerPage);
            $offset = intval($page * $numberPerPage);
            $stmt->bindParam(':lim', $lim, PDO::PARAM_INT);
            $stmt->bindParam(':offset', $offset, PDO::PARAM_INT);
            $stmt->execute();
            $stmt->setFetchMode(PDO::FETCH_CLASS, "Ride");
            while ($ride = $stmt->fetch()) {
                $ride = $ride->getRideInfo();

                if ($populate)
                {
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
          $stmt = $this->dbh->prepare("SHOW columns FROM ride");
          $stmt->execute();

          while ($row = $stmt->fetch())
          {
             $data[] = $row['Field'];
          }

          return $data;
       }
       catch (PDOException $e)
       {
          echo $e->getMessage();
          die();
       }
    }

    public function insertRide(
       $passengerID, $apptStart, $apptEnd, $pickupTime, $wheelchairVan,
       $status, $pickupStreetAddress, $pickupCity, $apptStreetAddress, $apptCity, $created, $modified)
    {
       try
       {
          $passengerID = intval($passengerID);
          $wheelchairVan = boolval($wheelchairVan);
          $status = strval($status);
          $pickupStreetAddress = strval($pickupStreetAddress);
          $pickupCity = strval($pickupCity);
          $apptStreetAddress = strval($apptStreetAddress);
          $apptCity = strval($apptCity);

          $stmt = $this->dbh->prepare("INSERT INTO `wasps`.`ride` (`passengerID`, `apptStart`, `apptEnd`,  
              `pickupTime`, `wheelchairVan`, `status`, `pickupStreetAddress`, `pickupCity`, `apptStreetAddress`, `apptCity`,
              `created`, `modified`) VALUES (:passengerID, :apptStart, :apptEnd, :pickupTime, :wheelchairVan, 
              :status, :pickupStreetAddress, :pickupCity, :apptStreetAddress, :apptCity, :created, :modified)");
          $stmt->bindParam(':passengerID', intval($passengerID), PDO::PARAM_INT);
          $stmt->bindParam(':apptStart', $apptStart, PDO::PARAM_STR);
          $stmt->bindParam(':apptEnd', $apptEnd, PDO::PARAM_STR);
          $stmt->bindParam(':pickupTime', $pickupTime, PDO::PARAM_STR);
          $stmt->bindParam(':wheelchairVan', $wheelchairVan, PDO::PARAM_BOOL);
          $stmt->bindParam(':status', $status, PDO::PARAM_STR);
          $stmt->bindParam(':pickupStreetAddress', $pickupStreetAddress, PDO::PARAM_STR);
          $stmt->bindParam(':pickupCity', $pickupCity, PDO::PARAM_STR);
          $stmt->bindParam(':apptStreetAddress', $apptStreetAddress, PDO::PARAM_STR);
          $stmt->bindParam(':apptCity', $apptCity, PDO::PARAM_STR);
          $stmt->bindParam(':created', $created, PDO::PARAM_STR);
          $stmt->bindParam(':modified', $modified, PDO::PARAM_STR);
          $stmt->execute();

          return $stmt->rowCount() . " row(s) inserted";
       }
       catch (PDOException $e)
       {
          echo $e->getMessage();
          die();
       }
    }

    public function updateRide($id, $passengerID = "", $driverID = "", $apptStart = "", $apptEnd = "", $numMiles, $totalMinutes,
                               $pickupTime = "", $wheelchairVan = "", $status = "", $pickupStreetAddress = "", $pickupCity = "",
                               $apptStreetAddress = "", $apptCity = "", $created = "", $modified = "")
    {
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

          if ($passengerID != "")         $setStr .= "`passengerID` = :passengerID";
          if ($driverID != "")            $setStr .= ($setStr == "") ? "`driverID` = :driverID" : ", `driverID` = :driverID";
          if ($apptStart != "")           $setStr .= ($setStr == "") ? "`apptStart` = :apptStart" : ", `apptStart` = :apptStart";
          if ($apptEnd != "")             $setStr .= ($setStr == "") ? "`apptEnd` = :apptEnd" : ", `apptEnd` = :apptEnd";
          if ($numMiles != "")            $setStr .= ($setStr == "") ? "`numMiles` = :numMiles" : ", `numMiles` = :numMiles";
          if ($totalMinutes != "")        $setStr .= ($setStr == "") ? "`totalMinutes` = :totalMinutes" : ", `totalMinutes` = :totalMinutes";
          if ($pickupTime != "")          $setStr .= ($setStr == "") ? "`pickupTime` = :pickupTime" : ", `pickupTime` = :pickupTime";
          if ($wheelchairVan != "")       $setStr .= ($setStr == "") ? "`wheelchairVan` = :wheelchairVan" : ", `wheelchairVan` = :wheelchairVan";
          if ($status != "")              $setStr .= ($setStr == "") ? "`status` = :status" : ", `status` = :status";
          if ($pickupStreetAddress != "") $setStr .= ($setStr == "") ? "`pickupStreetAddress` = :pickupStreetAddress" : ", `pickupStreetAddress` = :pickupStreetAddress";
          if ($pickupCity != "")          $setStr .= ($setStr == "") ? "`pickupCity` = :pickupCity" : ", `pickupCity` = :pickupCity";
          if ($apptStreetAddress != "")   $setStr .= ($setStr == "") ? "`apptStreetAddress` = :apptStreetAddress" : ", `apptStreetAddress` = :apptStreetAddress";
          if ($apptCity != "")            $setStr .= ($setStr == "") ? "`apptCity` = :apptCity" : ", `apptCity` = :apptCity";
          if ($created != "")             $setStr .= ($setStr == "") ? "`created` = :created" : ", `created` = :created";
          if ($modified != "")            $setStr .= ($setStr == "") ? "`modified` = :modified" : ", `modified` = :modified";


          $stmt = $this->dbh->prepare("UPDATE ride SET {$setStr} WHERE id = :id;");
          $stmt->bindParam(":id", $id, PDO::PARAM_INT);
          if ($passengerID != "")         $stmt->bindParam(':passengerID', intval($passengerID), PDO::PARAM_INT);
          if ($driverID != "")            $stmt->bindParam(':driverID', intval($driverID), PDO::PARAM_INT);
          if ($apptStart != "")           $stmt->bindParam(':apptStart', $apptStart, PDO::PARAM_STR);
          if ($apptEnd != "")             $stmt->bindParam(':apptEnd', $apptEnd, PDO::PARAM_STR);
          if ($numMiles != "")            $stmt->bindParam(':numMiles', $numMiles);
          if ($totalMinutes != "")        $stmt->bindParam(':totalMinutes', $totalMinutes, PDO::PARAM_INT);
          if ($pickupTime != "")          $stmt->bindParam(':pickupTime', $pickupTime, PDO::PARAM_STR);
          if ($wheelchairVan != "")       $stmt->bindParam(':wheelchairVan', $wheelchairVan, PDO::PARAM_BOOL);
          if ($status != "")              $stmt->bindParam(':status', $status, PDO::PARAM_STR);
          if ($pickupStreetAddress != "") $stmt->bindParam(':pickupStreetAddress', $pickupStreetAddress, PDO::PARAM_STR);
          if ($pickupCity != "")          $stmt->bindParam(':pickupCity', $pickupCity, PDO::PARAM_STR);
          if ($apptStreetAddress != "")   $stmt->bindParam(':apptStreetAddress', $apptStreetAddress, PDO::PARAM_STR);
          if ($apptCity != "")            $stmt->bindParam(':apptCity', $apptCity, PDO::PARAM_STR);
          if ($created != "")             $stmt->bindParam(':created', $created, PDO::PARAM_STR);
          if ($modified != "")            $stmt->bindParam(':modified', $modified, PDO::PARAM_STR);
          $stmt->execute();

          return $stmt->rowCount() . " row(s) updated";
       }
       catch (PDOException $e)
       {
          echo $e->getMessage();
          die();
       }
    }

   function deleteRide($id)
   {
      try
      {
         $id = intval($id);

         $stmt = $this->dbh->prepare("DELETE FROM ride WHERE id = :id");
         $stmt->bindParam(":id", $id, PDO::PARAM_INT);
         $stmt->execute();

         return $stmt->rowCount() . " row(s) deleted";
      }
      catch (PDOException $e)
      {
         echo $e->getMessage();
         die();
      }
   }

   private function populateIDs(&$ride)
   {
      if ($ride['passengerID'] != null)
      {
         $stmt = $this->dbh->prepare("SELECT * FROM user WHERE id = :id");
         $stmt->execute([':id' => intval($ride['passengerID'])]);
         $stmt->setFetchMode(PDO::FETCH_CLASS, "User");
         $user = $stmt->fetch();
         $ride['passengerID'] = $user->getUserInfo();
         $ride['passenger'] = $ride['passengerID'];
         unset($ride['passengerID']);
      }

      if ($ride['driverID'] != null)
      {
         $stmt = $this->dbh->prepare("SELECT * FROM user WHERE id = :id");
         $stmt->execute([':id' => intval($ride['driverID'])]);
         $stmt->setFetchMode(PDO::FETCH_CLASS, "User");
         $user = $stmt->fetch();
         $ride['driverID'] = $user->getUserInfo();
         $ride['driver'] = $ride['driverID'];
         unset($ride['driverID']);
      }
   }
}
