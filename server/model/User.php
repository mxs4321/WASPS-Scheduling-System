<?php

class User
{
    private $id;
    private $firstName;
    private $lastName;
    private $userRole;
    private $phone;
    private $email;
    private $registered;
    private $lastLogin;
    private $wantsSMS;
    private $wantsEmails;

    public function getUserInfo()
    {
        return [
            "id" => $this->id,
            "firstName" => $this->firstName,
            "lastName" => $this->lastName,
            "userRole" => $this->userRole,
            "phone" => $this->phone,
            "email" => $this->email,
            "registered" => $this->registered,
            "lastLogin" => $this->lastLogin,
            "wantsSMS" => $this->wantsSMS,
            "wantsEmails" => $this->wantsEmails
        ];
    }
}
