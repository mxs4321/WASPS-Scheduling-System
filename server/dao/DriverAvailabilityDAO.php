<?php
require_once __DIR__ . "/../model/DriverAvailability.php";

class DriverAvailabilityDAO
{
   private $dbh;

   public function __construct($dbh)
   {
      $this->dbh = $dbh;
   }

   function insertDriverAvailability($startTime, $endTime, $days, $driverID)
   {
      try
      {
         $stmt = $this->dbh->prepare("INSERT INTO driveravailability (`start`, `end`, `days`, `driverID`) VALUES (:startTime, :endTime, :days, :driverID);");
         $stmt->bindParam(":startTime", $startTime);
         $stmt->bindParam(":endTime", $endTime);
         $stmt->bindParam(":days", $days);
         $stmt->bindParam(":driverID", $driverID, PDO::PARAM_INT);
         $stmt->execute();

         return $stmt->rowCount() . " row(s) inserted";
      }
      catch (PDOException $e)
      {
         echo $e->getMessage();
         die();
      }
   }

   function getDriverAvailability($id)
   {
      try
      {
         $id = intval($id);

         $stmt = $this->dbh->prepare("SELECT `id`, `start`, `end`, `days`, `driverID` FROM driveravailability WHERE id = :id;");
         $stmt->bindParam(":id", $id, PDO::PARAM_INT);
         $stmt->execute();
         $stmt->setFetchMode(PDO::FETCH_CLASS, "DriverAvailability");

         return $stmt->fetch()->getDriverAvailabilityInfo();
      }
      catch (PDOException $e)
      {
         echo $e->getMessage();
         die();
      }
   }

   function getDriverAvailabilities($page = 0, $numberPerPage = 10)
   {
      try
      {
         $numberPerPage = intval($numberPerPage);
         $offset = intval($page * $numberPerPage);

         $stmt = $this->dbh->prepare("SELECT `id`, `start`, `end`, `days`, `driverID` FROM driveravailability LIMIT :lim OFFSET :offset;");
         $stmt->bindParam(":lim", $numberPerPage, PDO::PARAM_INT);
         $stmt->bindParam(":offset", $offset, PDO::PARAM_INT);
         $stmt->execute();
         $stmt->setFetchMode(PDO::FETCH_CLASS, "DriverAvailability");

         while ($driverAvailability = $stmt->fetch())
         {
            $data[] = $driverAvailability->getDriverAvailabilityInfo();
         }

         return $data;
      }
      catch (PDOException $e)
      {
         echo $e->getMessage();
         die();
      }
   }

   function updateDriverAvailability($id, $startTime = "", $endTime = "", $days = "", $driverID = "")
   {
      try
      {
         $id = intval($id);
         $driverID = intval($driverID);
         $setStr = "";

         if ($startTime != "")    $setStr .= "`start` = :startTime";
         if ($endTime != "")      $setStr .= ($setStr == "") ? "`end` = :endTime" : ", `end` = :endTime";
         if ($days != "")         $setStr .= ($setStr == "") ? "`days` = :days" : ", `days` = :days";
         if ($driverID != "")     $setStr .= ($setStr == "") ? "`driverID` = :driverID" : ", `driverID` = :driverID";

         $stmt = $this->dbh->prepare("UPDATE driveravailability SET {$setStr} WHERE id = :id;");
         $stmt->bindParam(":id", $id, PDO::PARAM_INT);
         if ($startTime != "")     $stmt->bindParam(":startTime", $startTime);
         if ($endTime!= "")        $stmt->bindParam(":endTime", $endTime);
         if ($days != "")          $stmt->bindParam(":days", $days);
         if ($driverID != "")      $stmt->bindParam(":driverID", $driverID, PDO::PARAM_INT);
         $stmt->execute();

         return $stmt->rowCount() . " row(s) updated";
      }
      catch (PDOException $e)
      {
         echo $e->getMessage();
         die();
      }
   }

   function deleteDriverAvailability($id)
   {
      try
      {
         $id = intval($id);

         $stmt = $this->dbh->prepare("DELETE FROM driveravailability WHERE id = :id");
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
}