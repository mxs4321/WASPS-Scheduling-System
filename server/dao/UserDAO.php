<?php 
require_once __DIR__ . "/../model/User.php";

class UserDAO {
    private $dbh;

    function __construct($dbh) {
        $this->dbh = $dbh;
    }

    function findById($id) {
        try {
            $stmt = $this->dbh->prepare("SELECT `id`, `firstName`, `lastName`, `phone`, `userRole`, `lastLogin`, `wantsSMS`, `wantsEmails`, `email`, `registered` FROM user WHERE id = :id");
            $stmt->execute([':id' => intval($id)]);
            $stmt->setFetchMode(PDO::FETCH_CLASS, "User");
            return $stmt->fetch();
        } catch (PDOException $e) {
            echo $e->getMessage();
            die();
        }
    }

    function findByName($name) {
        try {
            $isFullName = count(explode(' ', $name)) > 1;
            if ($isFullName) {
                $stmt = $this->dbh->prepare("SELECT * FROM user WHERE CONCAT(firstName, ' ', lastName) LIKE :fullname");
                $stmt->execute([':fullname' => "%$name%"]);
            } else {
                $stmt = $this->dbh->prepare("SELECT * FROM user WHERE firstName LIKE :firstName  OR lastName LIKE :lastName");
                $stmt->execute([':firstName' => "%$name%", ':lastName' => "%$name%"]);
            }
            $stmt->setFetchMode(PDO::FETCH_CLASS, "User");
            while ($user = $stmt->fetch()) {
                unset($user->password);
                $data[] = $user;
            }
            return $data;
        } catch (PDOException $e) {
            echo $e->getMessage();
            die();
        }
    }

    function getPage($page = 0, $numberPerPage = 10) {
        try {
            $stmt = $this->dbh->prepare("SELECT `id`, `firstName`, `lastName`, `phone`, `userRole`, `lastLogin`, `wantsSMS`, `wantsEmails`, `email`, `registered` FROM user LIMIT :lim OFFSET :offset");
            $stmt->bindParam(':lim', intval($numberPerPage), PDO::PARAM_INT);
            $stmt->bindParam(':offset', intval($page * $numberPerPage), PDO::PARAM_INT);
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

    function create($firstName, $lastName, $phone, $userRole, $lastLogin, $zip, $email, $password) {
        $stmt = $this->dbh->prepare("INSERT INTO `users` (`id`, `firstName`, `lastName`, `phone`, `userRole`, `lastLogin`, `wantsSMS`, `wantsEmails`, `email`, `password`) VALUES
        (:firstName, :lastName, 2035254837, '58 Werner Park', 'Rochester, Ny', 14620, 'csmith@g.rit.edu', '$2y$10$TDAwo5v.lcakEOL.ibMRK.G5oTGBPYEmQtMTvm/Bvn1pHsgUfu3r.');
        ");
        $stmt->bindParam(':lim', intval($numberPerPage), PDO::PARAM_INT);
        $stmt->bindParam(':offset', intval($page * $numberPerPage), PDO::PARAM_INT);
        $stmt->execute();
        $stmt->setFetchMode(PDO::FETCH_CLASS, "User");
    }

    function attemptLogin($method, $arg, $password) {
        try {
            if ($method === "email") {
                $stmt = $this->dbh->prepare("SELECT * FROM user WHERE email = :email");
                $stmt->execute([':email' => $arg]);
            } else {
                $stmt = $this->dbh->prepare("SELECT * FROM user WHERE phone = :phone");
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
            die();
        }
    }
}