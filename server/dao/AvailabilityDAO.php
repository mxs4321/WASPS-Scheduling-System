<?php
require_once __DIR__ . "/../model/Availability.php";

class AvailabilityDAO
{
   private $dbh;

   public function __construct($dbh)
   {
      $this->dbh = $dbh;
   }

   function insertAvailability($startTime, $endTime, $days, $driverID)
   {
      try
      {
         $driverID = intval($driverID);

         $stmt = $this->dbh->prepare("INSERT INTO availability (`start`, `end`, `days`, `driverID`) VALUES (:startTime, :endTime, :days, :driverID);");
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

   function getAvailabilityForDriver($driverID)
   {
      try
      {
         $stmt = $this->dbh->prepare("SELECT `id`, `start`, `end`, `days`, `driverID` FROM availability WHERE driverID = :id;");
         $stmt->bindParam(":id", $driverID, PDO::PARAM_INT);
         $stmt->execute();
         $stmt->setFetchMode(PDO::FETCH_CLASS, "Availability");
         while ($user = $stmt->fetch()) {
            unset($user->password);
            $data[] = $user->getAvailabilityInfo();
        }
        return $data;
      }
      catch (PDOException $e)
      {
         echo $e->getMessage();
         die();
      }
   }


   function updateAvailability($id, $startTime = "", $endTime = "", $days = "", $driverID = "")
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

         $stmt = $this->dbh->prepare("UPDATE availability SET {$setStr} WHERE id = :id;");
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

   function deleteAvailability($id)
   {
      try
      {
         $id = intval($id);

         $stmt = $this->dbh->prepare("DELETE FROM availability WHERE id = :id");
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


   function findAvailableDrivers($dayOfTheWeek, $timeOfDayStart, $timeOfDayEnd, $datetimeStart, $datetimeEnd)
   {
      try {
         $query = "SELECT user.id, user.firstName, user.lastName, user.phone, user.email FROM user 
           LEFT JOIN (availability) ON (user.id = availability.driverID) 
           LEFT JOIN (availabilityexclusion) ON (user.id = availabilityexclusion.driverID)
           WHERE user.role = 'driver'
             AND FIND_IN_SET(:dayOfTheWeek, availability.days)>0
             AND availability.start <= :timeOfDayStart AND availability.end >= :timeOfDayEnd
             AND (availabilityexclusion.id IS NULL OR availabilityexclusion.end < :datetimeStart OR availabilityexclusion.start > :datetimeEnd)";


         $stmt = $this->dbh->prepare($query);
         $stmt->bindParam(':dayOfTheWeek', $dayOfTheWeek);
         $stmt->bindParam(':timeOfDayStart', $timeOfDayStart);
         $stmt->bindParam(':timeOfDayEnd', $timeOfDayEnd);
         $stmt->bindParam(':datetimeStart', $datetimeStart);
         $stmt->bindParam(':datetimeEnd', $datetimeEnd);
         $stmt->execute();
         $stmt->setFetchMode(PDO::FETCH_CLASS, "User");
         while ($user = $stmt->fetch()) {
            $data[] = $user->getDriverContactInfo();
         }
         return $data;
      } catch (PDOException $e) {
         echo $e->getMessage();
         die();
      }
   }
}