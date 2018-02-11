<?php
require_once __DIR__ . "/../model/AvailabilityExclusion.php";

class AvailabilityExclusionDAO
{
   private $dbh;

   public function __construct($dbh)
   {
      $this->dbh = $dbh;
   }

   function insertAvailabilityExclusion($startTime, $endTime, $driverID)
   {
      try
      {
         $driverID = intval($driverID);

         $stmt = $this->dbh->prepare("INSERT INTO availabilityexclusion (`start`, `end`, `driverID`) VALUES (:startTime, :endTime, :driverID);");
         $stmt->bindParam(":startTime", $startTime);
         $stmt->bindParam(":endTime", $endTime);
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

   function getAvailabilityExclusion($id)
   {
      try
      {
         $id = intval($id);

         $stmt = $this->dbh->prepare("SELECT `id`, `start`, `end`, `driverID` FROM availabilityexclusion WHERE id = :id;");
         $stmt->bindParam(":id", $id, PDO::PARAM_INT);
         $stmt->execute();
         $stmt->setFetchMode(PDO::FETCH_CLASS, "AvailabilityExclusion");

         return $stmt->fetch()->getAvailabilityExclusionInfo();
      }
      catch (PDOException $e)
      {
         echo $e->getMessage();
         die();
      }
   }

   function getAvailabilityExclusions($page = 0, $numberPerPage = 10)
   {
      try
      {
         $numberPerPage = intval($numberPerPage);
         $offset = intval($page * $numberPerPage);

         $stmt = $this->dbh->prepare("SELECT `id`, `start`, `end`, `driverID` FROM availabilityexclusion LIMIT :lim OFFSET :offset;");
         $stmt->bindParam(":lim", $numberPerPage, PDO::PARAM_INT);
         $stmt->bindParam(":offset", $offset, PDO::PARAM_INT);
         $stmt->execute();
         $stmt->setFetchMode(PDO::FETCH_CLASS, "AvailabilityExclusion");

         while ($driverAvailabilityException = $stmt->fetch())
         {
            $data[] = $driverAvailabilityException->getAvailabilityExclusionInfo();
         }

         return $data;
      }
      catch (PDOException $e)
      {
         echo $e->getMessage();
         die();
      }
   }

   function updateAvailabilityExclusion($id, $startTime = "", $endTime = "", $driverID = "")
   {
      try
      {
         $id = intval($id);
         $driverID = intval($driverID);
         $setStr = "";

         if ($startTime != "")    $setStr .= "`start` = :startTime";
         if ($endTime != "")      $setStr .= ($setStr == "") ? "`end` = :endTime" : ", `end` = :endTime";
         if ($driverID != "")     $setStr .= ($setStr == "") ? "`driverID` = :driverID" : ", `driverID` = :driverID";

         $stmt = $this->dbh->prepare("UPDATE availabilityexclusion SET {$setStr} WHERE id = :id;");
         $stmt->bindParam(":id", $id, PDO::PARAM_INT);
         if ($startTime != "")     $stmt->bindParam(":startTime", $startTime);
         if ($endTime!= "")        $stmt->bindParam(":endTime", $endTime);
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

   function deleteAvailabilityExclusion($id)
   {
      try
      {
         $id = intval($id);

         $stmt = $this->dbh->prepare("DELETE FROM availabilityexclusion WHERE id = :id");
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