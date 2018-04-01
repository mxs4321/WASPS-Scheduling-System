<?php

class User
{
    private $id;
    private $firstName;
    private $lastName;
    private $role;
    private $phone;
    private $email;
    private $registered;

    public function getUserInfo()
    {
        return [
            "id" => $this->id,
            "firstName" => $this->firstName,
            "lastName" => $this->lastName,
            "role" => $this->role,
            "phone" => $this->phone,
            "email" => $this->email,
            "registered" => $this->registered
        ];
    }

    public function getDriverContactInfo()
    {
      return [
         "id" => $this->id,
         "firstName" => $this->firstName,
         "lastName" => $this->lastName,
         "phone" => $this->phone,
         "email" => $this->email
      ];
    }
}
