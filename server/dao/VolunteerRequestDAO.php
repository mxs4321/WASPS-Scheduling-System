<?php
require_once __DIR__ . "/../model/VolunteerRequest.php";

class VolunteerRequestDAO
{
   private $dbh;

   public function __construct($dbh)
   {
      $this->dbh = $dbh;
   }

   function insertVolunteerRequest($timestamp, $userID)
   {
      try
      {
         $stmt = $this->dbh->prepare("INSERT INTO volunteerrequest (`timestamp`, `userID`) VALUES (:timestamp, :userID);");
         $stmt->bindParam(":timestamp", $timestamp);
         $stmt->bindParam(":userID", $userID, PDO::PARAM_INT);
         $stmt->execute();

         return $stmt->rowCount() . " row(s) inserted";
      }
      catch (PDOException $e)
      {
         echo $e->getMessage();
         die();
      }
   }

   function getVolunteerRequest($id)
   {
      try
      {
         $id = intval($id);

         $stmt = $this->dbh->prepare("SELECT `id`, `timestamp`, `userID` FROM volunteerrequest WHERE id = :id;");
         $stmt->bindParam(":id", $id, PDO::PARAM_INT);
         $stmt->execute();
         $stmt->setFetchMode(PDO::FETCH_CLASS, "VolunteerRequest");

         return $stmt->fetch()->getVolunteerRequestInfo();
      }
      catch (PDOException $e)
      {
         echo $e->getMessage();
         die();
      }
   }

   function getVolunteerRequests($page = 0, $numberPerPage = 10)
   {
      try
      {
         $numberPerPage = intval($numberPerPage);
         $offset = intval($page * $numberPerPage);

         $stmt = $this->dbh->prepare("SELECT `id`, `timestamp`, `userID` FROM volunteerrequest LIMIT :lim OFFSET :offset;");
         $stmt->bindParam(":lim", $numberPerPage, PDO::PARAM_INT);
         $stmt->bindParam(":offset", $offset, PDO::PARAM_INT);
         $stmt->execute();
         $stmt->setFetchMode(PDO::FETCH_CLASS, "VolunteerRequest");

         while ($volunteerRequest = $stmt->fetch())
         {
            $data[] = $volunteerRequest->getVolunteerRequestInfo();
         }

         return $data;
      }
      catch (PDOException $e)
      {
         echo $e->getMessage();
         die();
      }
   }

   function updateVolunteerRequest($id, $timestamp = "", $userID = "")
   {
      try
      {
         $id = intval($id);
         $userID = intval($userID);
         $setStr = "";

         if ($timestamp != "")    $setStr .= "`timestamp` = :timestamp";
         if ($userID != "")      $setStr .= ($setStr == "") ? "`userID` = :userID" : ", `userID` = :userID";

         $stmt = $this->dbh->prepare("UPDATE volunteerrequest SET {$setStr} WHERE id = :id;");
         $stmt->bindParam(":id", $id, PDO::PARAM_INT);
         if ($timestamp != "")     $stmt->bindParam(":timestamp", $timestamp);
         if ($userID != "")      $stmt->bindParam(":userID", $userID, PDO::PARAM_INT);
         $stmt->execute();

         return $stmt->rowCount() . " row(s) updated";
      }
      catch (PDOException $e)
      {
         echo $e->getMessage();
         die();
      }
   }

   function deleteVolunteerRequest($id)
   {
      try
      {
         $id = intval($id);

         $stmt = $this->dbh->prepare("DELETE FROM volunteerrequest WHERE id = :id");
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