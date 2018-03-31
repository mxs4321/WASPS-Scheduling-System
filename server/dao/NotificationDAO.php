<?php
require_once __DIR__ . "/../model/Notification.php";

class NotificationDAO
{
   private $dbh;

   public function __construct($dbh)
   {
      $this->dbh = $dbh;
   }

   function insertNotification($type = "", $message = "", $userID, $timestamp)
   {
      try
      {
         $type = strval($type);
         $message = strval($message);
         $userID = intval($userID);

         $stmt = $this->dbh->prepare("INSERT INTO Notification (`type`, `message`, `userID`, `timestamp`) VALUES (:type, :message, :userID, :timestamp);");
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

   function getNotification($id)
   {
      try
      {
         $id = intval($id);

         $stmt = $this->dbh->prepare("SELECT `id`, `type`, `message`, `userID`, `timestamp` FROM Notification WHERE id = :id;");
         $stmt->bindParam(":id", $id, PDO::PARAM_INT);
         $stmt->execute();
         $stmt->setFetchMode(PDO::FETCH_CLASS, "Notification");

         return $stmt->fetch()->getNotificationInfo();
      }
      catch (PDOException $e)
      {
         echo $e->getMessage();
         die();
      }
   }

   function getNotificationForUser($id)
   {
      try
      {
         $id = intval($id);

         $stmt = $this->dbh->prepare("SELECT `id`, `type`, `message`, `userID`, `timestamp` FROM Notification WHERE userID = :id;");
         $stmt->bindParam(":id", $id, PDO::PARAM_INT);
         $stmt->execute();
         $stmt->setFetchMode(PDO::FETCH_CLASS, "Notification");
         $data = [];

         while ($notification = $stmt->fetch())
         {
            $data[] = $notification->getNotificationInfo();
         }

         return $data;
      }
      catch (PDOException $e)
      {
         echo $e->getMessage();
         die();
      }
   }

   function getNotifications($page = 0, $numberPerPage = 10)
   {
      try
      {
         $numberPerPage = intval($numberPerPage);
         $offset = intval($page * $numberPerPage);

         $stmt = $this->dbh->prepare("SELECT `id`, `type`, `message`, `userID`, `timestamp` FROM Notification LIMIT :lim OFFSET :offset;");
         $stmt->bindParam(":lim", $numberPerPage, PDO::PARAM_INT);
         $stmt->bindParam(":offset", $offset, PDO::PARAM_INT);
         $stmt->execute();
         $stmt->setFetchMode(PDO::FETCH_CLASS, "Notification");

         while ($sentMessagesLog = $stmt->fetch())
         {
            $data[] = $sentMessagesLog->getNotificationInfo();
         }

         return $data;
      }
      catch (PDOException $e)
      {
         echo $e->getMessage();
         die();
      }
   }

   function updateNotification($id, $type = "", $message = "", $userID = "", $timestamp = "")
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

         $stmt = $this->dbh->prepare("UPDATE Notification SET {$setStr} WHERE id = :id;");
         $stmt->bindParam(":id", $id, PDO::PARAM_INT);
         if ($type != "")     $stmt->bindParam(":type", $type, PDO::PARAM_STR);
         if ($message != "")     $stmt->bindParam(":message", $message, PDO::PARAM_STR);
         if ($userID != "")      $stmt->bindParam(":userID", $userID, PDO::PARAM_INT);
         if ($timestamp != "")   $stmt->bindParam(":timestamp", $timestamp);
         $stmt->execute();

         return $stmt->rowCount() . " row(s) updated";
      }
      catch (PDOException $e)
      {
         echo $e->getMessage();
         die();
      }
   }

   function deleteNotification($id)
   {
      try
      {
         $id = intval($id);

         $stmt = $this->dbh->prepare("DELETE FROM Notification WHERE id = :id");
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