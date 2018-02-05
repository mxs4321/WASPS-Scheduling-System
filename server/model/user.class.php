<?php
class UserModel {
    public $id;
    public $firstName;
    public $lastName;
    public $userRole;
    public $phone;
    public $email;
    public $registered;
    public $lastLogin;
    public $wantsSMS;
    public $wantsEmails;
}

class User {
    private $dbh;

    function __construct($dbh) {
        $this->dbh = $dbh;
    }

    function findById($id) {
        try {
            $stmt = $this->dbh->prepare("SELECT `id`, `firstName`, `lastName`, `phone`, `userRole`, `lastLogin`, `wantsSMS`, `wantsEmails`, `email`, `registered` FROM user WHERE id = :id");
            $stmt->execute([':id' => intval($id)]);
            $stmt->setFetchMode(PDO::FETCH_CLASS, "UserModel");
            return $stmt->fetch();
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
            $stmt->setFetchMode(PDO::FETCH_CLASS, "UserModel");
            while ($person = $stmt->fetch()) {
                $data[] = $person;
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
        $stmt->setFetchMode(PDO::FETCH_CLASS, "UserModel");
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
            $stmt->setFetchMode(PDO::FETCH_CLASS, "UserModel");
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
}
