<?php 
require_once __DIR__ . "/../model/User.php";

class UserDAO {
    private $dbh;

    function __construct($dbh) {
        $this->dbh = $dbh;
    }

    function findById($id) {
        try {
            $stmt = $this->dbh->prepare("SELECT `id`, `firstName`, `lastName`, `phone`, `role`, `lastLogin`, 
              `wantsSMS`, `wantsEmail`, `email`, `registered` FROM User WHERE id = :id");
            $stmt->execute([':id' => intval($id)]);
            $stmt->setFetchMode(PDO::FETCH_CLASS, "User");
            return $stmt->fetch()->getUserInfo();
        } catch (PDOException $e) {
            echo $e->getMessage();
            die();
        }
    }

    function findByName($name) {
        try {
            $isFullName = count(explode(' ', $name)) > 1;
            if ($isFullName) {
                $stmt = $this->dbh->prepare("SELECT * FROM User WHERE CONCAT(firstName, ' ', lastName) LIKE :fullname");
                $stmt->execute([':fullname' => "%$name%"]);
            } else {
                $stmt = $this->dbh->prepare("SELECT * FROM User WHERE firstName LIKE :firstName  OR lastName LIKE :lastName");
                $stmt->execute([':firstName' => "%$name%", ':lastName' => "%$name%"]);
            }
            $stmt->setFetchMode(PDO::FETCH_CLASS, "User");
            while ($user = $stmt->fetch()) {
                unset($user->password);
                $data[] = $user->getUserInfo();
            }
            return $data;
        } catch (PDOException $e) {
            echo $e->getMessage();
            die();
        }
    }

    function getUsers($page = 0, $numberPerPage = 10) {
        try {
            $stmt = $this->dbh->prepare("SELECT `id`, `firstName`, `lastName`, `phone`, `role`, `lastLogin`, `wantsSMS`, `wantsEmail`, `email`, `registered` FROM User LIMIT :lim OFFSET :offset");
            $lim = intval($numberPerPage);
            $offset = intval($page * $numberPerPage);
            $stmt->bindParam(':lim', $lim, PDO::PARAM_INT);
            $stmt->bindParam(':offset', $offset, PDO::PARAM_INT);
            $stmt->execute();
            $stmt->setFetchMode(PDO::FETCH_CLASS, "User");
            while ($user = $stmt->fetch()) {
                $data[] = $user->getUserInfo();
            }
            return $data;
        } catch (PDOException $e) {
            echo $e->getMessage();
            die();
        }
    }

   public function getDriverExportInfo($fetchSince = "")
   {
      try
      {
         $query = "SELECT user.id, firstName, lastName, phone, email, wantsSMS, wantsEmail, start, end, days FROM User
                      LEFT JOIN Availability ON (User.id = Availability.driverID)
                      WHERE role = 'driver'";
        //  if ($fetchSince != "") $query .= " AND User.CreatedTime > :fetchSince";
         $stmt = $this->dbh->prepare($query);
        //  if ($fetchSince != "") $stmt->bindParam('fetchSince', $fetchSince);
         $stmt->execute();
         $stmt->setFetchMode(PDO::FETCH_ASSOC);
         $data = [];

         while ($row = $stmt->fetch())
         {
            $data[] = $row;
         }

         return $data;
      }
      catch (PDOException $e)
      {
         echo $e->getMessage();
         die();
      }
    }

    public function getClientExportInfo($fetchSince = "")
    {
       try
       {
          $query = "SELECT firstName, lastName, phone, email, wantsEmail, wantsSMS
                      FROM User WHERE role = 'passenger'";
          if ($fetchSince != "") $query .= " AND user.CreatedTime > :fetchSince";
          $stmt = $this->dbh->prepare($query);
          if ($fetchSince != "") $stmt->bindParam('fetchSince', $fetchSince);
          $stmt->execute();
          $stmt->setFetchMode(PDO::FETCH_ASSOC);
          $data = [];

          while ($row = $stmt->fetch())
          {
             $data[] = $row;
          }

          return $data;
       }
       catch (PDOException $e)
       {
          echo $e->getMessage();
          die();
       }
    }

    function insertUser($password, $role, $firstName, $lastName, $phone, $email, $wantsSMS = true, $wantsEmail = true)
    {
        try
        {
           $password = password_hash($password, PASSWORD_BCRYPT);
           $role = strval($role);
           $firstName = strval($firstName);
           $phone = strval($phone);
           $email = strval($email);
           $wantsSMS = boolval($wantsSMS);
           $wantsEmail = boolval($wantsEmail);
           $this->dbh->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

           $stmt = $this->dbh->prepare("INSERT INTO User (`password`, `role`, `firstName`, `lastName`, `phone`, `email`, `wantsSMS`, `wantsEmail`) 
            VALUES (:pass, :userRole, :firstName, :lastName, :phone, :email, :wantsSMS, :wantsEmail);");
           $stmt->bindParam(':pass', $password, PDO::PARAM_STR);
           $stmt->bindParam(':userRole', $role, PDO::PARAM_STR);
           $stmt->bindParam(':firstName', $firstName, PDO::PARAM_STR);
           $stmt->bindParam(':lastName', $lastName, PDO::PARAM_STR);
           $stmt->bindParam(':phone', $phone, PDO::PARAM_STR);
           $stmt->bindParam(':email', $email, PDO::PARAM_STR);
           $stmt->bindParam(':wantsSMS', $wantsSMS, PDO::PARAM_INT);
           $stmt->bindParam(':wantsEmail', $wantsEmail, PDO::PARAM_INT);
           $stmt->execute();

           return $this->findById($this->dbh->lastInsertId());
        }
        catch (PDOException $e)
        {
           echo $e->getMessage();
           die();
        }
    }

    function updateUser($id, $password = "", $role = "", $firstName = "", $lastName = "", $phone = "", $email = "",
                        $registered = "", $lastLogin = "", $wantsSMS = "", $wantsEmail = "")
    {
         try
         {
            $id = intval($id);
            $password = strval($password);
            $role = strval($role);
            $firstName = strval($firstName);
            $lastName = strval($lastName);
            $phone = strval($phone);
            $email = strval($email);
            if ($wantsSMS !== "")   $wantsSMS = boolval($wantsSMS);
            if ($wantsEmail !== "") $wantsEmail = boolval($wantsEmail);
            $setStr = "";

            if ($password != "")    $setStr .= "`password` = :password";
            if ($role != "")        $setStr .= ($setStr == "") ? "`role` = :role" : ", `role` = :role";
            if ($firstName != "")   $setStr .= ($setStr == "") ? "`firstName` = :firstName" : ", `firstName` = :firstName";
            if ($lastName != "")    $setStr .= ($setStr == "") ? "`lastName` = :lastName" : ", `lastName` = :lastName";
            if ($phone != "")       $setStr .= ($setStr == "") ? "`phone` = :phone" : ", `phone` = :phone";
            if ($email != "")       $setStr .= ($setStr == "") ? "`email` = :email" : ", `email` = :email";
            if ($registered != "")  $setStr .= ($setStr == "") ? "`registered` = :registered" : ", `registered` = :registered";
            if ($lastLogin != "")   $setStr .= ($setStr == "") ? "`lastLogin` = :lastLogin" : ", `lastLogin` = :lastLogin";
            if ($wantsSMS !== "")   $setStr .= ($setStr == "") ? "`wantsSMS` = :wantsSMS" : ", `wantsSMS` = :wantsSMS";
            if ($wantsEmail !== "") $setStr .= ($setStr == "") ? "`wantsEmail` = :wantsEmail" : ", `wantsEmail` = :wantsEmail";

            $stmt = $this->dbh->prepare("UPDATE User SET {$setStr} WHERE id = :id;");
            $stmt->bindParam(":id", $id, PDO::PARAM_INT);
            if ($password != "")   $stmt->bindParam(":password", $password, PDO::PARAM_STR);
            if ($role != "")       $stmt->bindParam(":role", $role, PDO::PARAM_STR);
            if ($firstName != "")  $stmt->bindParam(":firstName", $firstName, PDO::PARAM_STR);
            if ($lastName != "")   $stmt->bindParam(":lastName", $lastName, PDO::PARAM_STR);
            if ($phone != "")      $stmt->bindParam(":phone", $phone, PDO::PARAM_STR);
            if ($email != "")      $stmt->bindParam(":email", $email, PDO::PARAM_STR);
            if ($registered != "") $stmt->bindParam(":registered", $registered, PDO::PARAM_STR);
            if ($lastLogin != "")  $stmt->bindParam(":lastLogin", $lastLogin, PDO::PARAM_STR);
            if ($wantsSMS !== "")   $stmt->bindParam(":wantsSMS", $wantsSMS, PDO::PARAM_INT);
            if ($wantsEmail !== "") $stmt->bindParam(":wantsEmail", $wantsEmail, PDO::PARAM_INT);
            $stmt->execute();

            return $this->findById($id);
         }
         catch (PDOException $e)
         {
            echo $e->getMessage();
            die();
         }
    }

    function deleteUser($id)
    {
       try
       {
          $id = intval($id);

          $stmt = $this->dbh->prepare("DELETE FROM User WHERE id = :id");
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

    function attemptLogin($method, $arg, $password) {
        try {
            if ($method === "email") {
                $stmt = $this->dbh->prepare("SELECT * FROM User WHERE email = :email");
                $stmt->execute([':email' => $arg]);
            } else {
                $stmt = $this->dbh->prepare("SELECT * FROM User WHERE phone = :phone");
                $stmt->execute([':phone' => $arg]);
            }

            $stmt->setFetchMode(PDO::FETCH_CLASS, "User");
            $user = $stmt->fetch();

            if (password_verify($password, $user->password)) {
                return $user->getUserInfo();
            } else {
                return null;
            }
        } catch (PDOException $e) {
            echo $e->getMessage();
            return null;
        }
    }
}