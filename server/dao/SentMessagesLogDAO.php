<?php
require_once __DIR__ . "/../model/SentMessagesLog.php";

class SentMessagesLogDAO
{
   private $dbh;

   public function __construct($dbh)
   {
      $this->dbh = $dbh;
   }

   function insertSentMessagesLog($type = "", $message = "", $userID, $timestamp)
   {
      try
      {
         $stmt = $this->dbh->prepare("INSERT INTO sentmessageslog (`type`, `message`, `userID`, `timestamp`) VALUES (:type, :message, :userID, :timestamp);");
         $stmt->bindParam(":type", $type, PDO::PARAM_STR);
         $stmt->bindParam(":message", $message, PDO::PARAM_STR);
         $stmt->bindParam(":userID", $userID, PDO::PARAM_INT);
         $stmt->bindParam(":timestamp", $timestamp);
         $stmt->execute();

         return $stmt->rowCount() . " row(s) inserted";
      }
      catch (PDOException $e)
      {
         echo $e->getMessage();
         die();
      }
   }

   function getSentMessagesLog($id)
   {
      try
      {
         $id = intval($id);

         $stmt = $this->dbh->prepare("SELECT `id`, `type`, `message`, `userID`, `timestamp` FROM sentmessageslog WHERE id = :id;");
         $stmt->bindParam(":id", $id, PDO::PARAM_INT);
         $stmt->execute();
         $stmt->setFetchMode(PDO::FETCH_CLASS, "SentMessagesLog");

         return $stmt->fetch()->getSentMessagesLogInfo();
      }
      catch (PDOException $e)
      {
         echo $e->getMessage();
         die();
      }
   }

   function getSentMessagesLogs($page = 0, $numberPerPage = 10)
   {
      try
      {
         $numberPerPage = intval($numberPerPage);
         $offset = intval($page * $numberPerPage);

         $stmt = $this->dbh->prepare("SELECT `id`, `type`, `message`, `userID`, `timestamp` FROM sentmessageslog LIMIT :lim OFFSET :offset;");
         $stmt->bindParam(":lim", $numberPerPage, PDO::PARAM_INT);
         $stmt->bindParam(":offset", $offset, PDO::PARAM_INT);
         $stmt->execute();
         $stmt->setFetchMode(PDO::FETCH_CLASS, "SentMessagesLog");

         while ($sentMessagesLog = $stmt->fetch())
         {
            $data[] = $sentMessagesLog->getSentMessagesLogInfo();
         }

         return $data;
      }
      catch (PDOException $e)
      {
         echo $e->getMessage();
         die();
      }
   }

   function updateSentMessagesLog($id, $type = "", $message = "", $userID = "", $timestamp = "")
   {
      try
      {
         $id = intval($id);
         $type = strval($type);
         $message = strval($message);
         $userID = intval($userID);
         $setStr = "";

         if ($type != "")        $setStr .= "`type` = :type";
         if ($message!= "")      $setStr .= ($setStr == "") ? "`message` = :message" : ", `message` = :message";
         if ($userID != "")      $setStr .= ($setStr == "") ? "`userID` = :userID" : ", `userID` = :userID";
         if ($timestamp != "")   $setStr .= ($setStr == "") ? "`timestamp` = :timestamp" : ", `timestamp` = :timestamp";

         $stmt = $this->dbh->prepare("UPDATE sentmessageslog SET {$setStr} WHERE id = :id;");
         $stmt->bindParam(":id", $id, PDO::PARAM_INT);
         if ($type != "")     $stmt->bindParam(":type", $type, PDO::PARAM_STR);
         if ($message != "")     $stmt->bindParam(":message", $message, PDO::PARAM_STR);
         if ($userID != "")      $stmt->bindParam(":userID", $userID, PDO::PARAM_INT);
         if ($timestamp != "")   $stmt->bindParam(":timestamp, $timestamp");
         $stmt->execute();

         return $stmt->rowCount() . " row(s) updated";
      }
      catch (PDOException $e)
      {
         echo $e->getMessage();
         die();
      }
   }

   function deleteSentMessagesLog($id)
   {
      try
      {
         $id = intval($id);

         $stmt = $this->dbh->prepare("DELETE FROM sentmessageslog WHERE id = :id");
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