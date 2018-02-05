<?php
class CommentModel {
    public $id;
    public $comment;
    public $created;
    public $modified;
    public $userID;
    public $rideID;
}

class Comment {
    private $dbh;

    function __construct($dbh) {
        $this->dbh = $dbh;
    }
}
