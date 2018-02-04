<?php

class DriverDAO {
   private $dbh;

   function __construct($host, $port, $name, $user, $pass)
   {
      try {
         $this->dbh = new PDO("mysql:host=$host;dbname=$name", $user, $pass);
         $this->dbh->setAttribute(PDO::ATTR_EMULATE_PREPARES, false);
         $this->dbh->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
      } catch(PDOException $e) {
         echo $e->getMessage();
         die();
      }
   }

   function insertDriver($firstName, $lastName, $phone, $email, $requestStatus = false)
   {
      try
      {
         $firstName = strval($firstName);
         $lastName = strval($lastName);
         $phone = strval($phone);
         $email = strval($email);
         $requestStatus = boolval($requestStatus);

         $stmt = $this->dbh->prepare("INSERT INTO Driver (`firstName`, `lastName`, `phone`, `email`, `requestStatus`) VALUES (:firstName, :lastName, :phone, :email, :requestStatus);");
         $stmt->bindParam(":firstName", $firstName, PDO::PARAM_STR);
         $stmt->bindParam(":lastName", $lastName, PDO::PARAM_STR);
         $stmt->bindParam(":phone", $phone, PDO::PARAM_STR);
         $stmt->bindParam(":email", $email, PDO::PARAM_STR);
         $stmt->bindParam(":requestStatus", $requestStatus, PDO::PARAM_BOOL);
         $stmt->execute();

         return $stmt->rowCount() . " row(s) inserted";
      }
      catch (PDOException $e)
      {
         echo $e->getMessage();
         die();
      }
   }

   function getDriver($id)
   {
      try
      {
         include "../model/Driver.class.php";
         $id = intval($id);

         $stmt = $this->dbh->prepare("SELECT `firstName`, `lastName`, `phone`, `email`, `requestStatus` FROM Driver WHERE driverID = :id;");
         $stmt->bindParam(":id", $id, PDO::PARAM_INT);
         $stmt->execute();
         $stmt->setFetchMode(PDO::FETCH_CLASS, "Driver");

         return $stmt->fetch()->getDriverInfo();
      }
      catch (PDOException $e)
      {
         echo $e->getMessage();
         die();
      }
   }

   function getDrivers($page = 0, $numberPerPage = 10)
   {
      try
      {
         include "../model/Driver.class.php";
         $numberPerPage = intval($numberPerPage);
         $offset = intval($page * $numberPerPage);

         $stmt = $this->dbh->prepare("SELECT `firstName`, `lastName`, `phone`, `email`, `requestStatus` FROM Driver LIMIT :lim OFFSET :offset;");
         $stmt->bindParam(":lim", $numberPerPage, PDO::PARAM_INT);
         $stmt->bindParam(":offset", $offset, PDO::PARAM_INT);
         $stmt->execute();
         $stmt->setFetchMode(PDO::FETCH_CLASS, "Driver");

         while ($driver = $stmt->fetch())
         {
            $data[] = $driver->getDriverInfo();
         }

         return $data;
      }
      catch (PDOException $e)
      {
         echo $e->getMessage();
         die();
      }
   }

   function updateDriver($id, $firstName = "", $lastName = "", $phone = "", $email = "", $requestStatus = "")
   {
      try
      {
         $id = intval($id);
         $firstName = strval($firstName);
         $lastName = strval($lastName);
         $phone = strval($phone);
         $email = strval($email);
         $requestStatus = boolval($requestStatus);
         $setStr = "";

         if ($firstName != "")     $setStr .= "`firstName` = :firstName";
         if ($lastName != "")      $setStr .= ($setStr == "") ? "`lastName` = :lastName" : ", `lastName` = :lastName";
         if ($phone != "")         $setStr .= ($setStr == "") ? "`phone` = :phone" : ", `phone` = :phone";
         if ($email != "")         $setStr .= ($setStr == "") ? "`email` = :email" : ", `email` = :email";
         if ($requestStatus != "") $setStr .= ($setStr == "") ? "`requestStatus` = :requestStatus" : ", `requestStatus` = :requestStatus";

         $stmt = $this->dbh->prepare("UPDATE Driver SET {$setStr} WHERE driverID = :id;");
         $stmt->bindParam(":id", $id, PDO::PARAM_INT);
         if ($firstName != "")      $stmt->bindParam(":firstName", $firstName, PDO::PARAM_STR);
         if ($lastName!= "")        $stmt->bindParam(":lastName", $lastName, PDO::PARAM_STR);
         if ($phone != "")          $stmt->bindParam(":phone", $phone, PDO::PARAM_STR);
         if ($email != "")          $stmt->bindParam(":email", $email, PDO::PARAM_STR);
         if ($requestStatus != "")  $stmt->bindParam(":requestStatus", $requestStatus, PDO::PARAM_BOOL);
         $stmt->execute();

         return $stmt->rowCount() . " row(s) updated";
      }
      catch (PDOException $e)
      {
         echo $e->getMessage();
         die();
      }
   }

   function deleteDriver($id)
   {
      try
      {
         $id = intval($id);

         $stmt = $this->dbh->prepare("DELETE FROM Driver WHERE driverID = :id");
         $stmt->bindParam(":id", $id, PDO::PARAM_INT);
         $stmt->execute();

         return $stmt->rowCount() . " row(s) updated";
      }
      catch (PDOException $e)
      {
         echo $e->getMessage();
         die();
      }
   }
}