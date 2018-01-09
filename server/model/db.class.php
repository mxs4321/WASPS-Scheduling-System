<?php

class DB {
    private $dbh;

    function __construct($host, $port, $name, $user, $pass) {
        try {
            $this->dbh = new PDO("mysql:host=$host;dbname=$name", $user, $pass);
            $this->dbh->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
        } catch(PDOException $e) {
            echo $e->getMessage();
            die();
        }
    }

    function attemptLogin($email, $password) {
        try {
            include "user.class.php";
            $stmt = $this->dbh->prepare("SELECT * FROM users WHERE email = :email");
            $stmt->execute([':email' => $email]);
            $stmt->setFetchMode(PDO::FETCH_CLASS, "User");
            $user = $stmt->fetch();
            if (password_verify($password, $user->password)) {
                unset($user->password);
                return $user;
            } else {
                return null;
            }
        } catch (PDOException $e) {
            echo $e->getMessage();
            die();
        }
    }

    function getUser($id) {
        try {
            include "user.class.php";
            $stmt = $this->dbh->prepare("SELECT * FROM users WHERE id = :id");
            $stmt->execute([':id' => intval($id)]);
            $stmt->setFetchMode(PDO::FETCH_CLASS, "User");
            return $stmt->fetch();
        } catch (PDOException $e) {
            echo $e->getMessage();
            die();
        }
    }

    function getUsers($page = 0, $numberPerPage = 10) {
        try {
            include "user.class.php";
            $stmt = $this->dbh->prepare("SELECT * FROM users LIMIT :lim OFFSET :offset");
            $stmt->bindParam(':lim', intval($numberPerPage), PDO::PARAM_INT);
            $stmt->bindParam(':offset', intval($page * $numberPerPage), PDO::PARAM_INT);
            $stmt->execute();
            $stmt->setFetchMode(PDO::FETCH_CLASS, "User");
            while ($person = $stmt->fetch()) {
                $data[] = $person;
            }
            return $data;
        } catch (PDOException $e) {
            echo $e->getMessage();
            die();
        }
    }

    function createUser($firstName, $lastName, $phoneNumber, $address, $city, $zip, $email, $password) {
        include "user.class.php";
        $stmt = $this->dbh->prepare("INSERT INTO `users` (`firstName`, `lastName`, `phoneNumber`, `address`, `city`, `zip`, `email`, `password`) VALUES
        (:firstName, :lastName, 2035254837, '58 Werner Park', 'Rochester, Ny', 14620, 'csmith@g.rit.edu', '$2y$10$TDAwo5v.lcakEOL.ibMRK.G5oTGBPYEmQtMTvm/Bvn1pHsgUfu3r.');
        ");
        $stmt->bindParam(':lim', intval($numberPerPage), PDO::PARAM_INT);
        $stmt->bindParam(':offset', intval($page * $numberPerPage), PDO::PARAM_INT);
        $stmt->execute();
        $stmt->setFetchMode(PDO::FETCH_CLASS, "User");
    }
}