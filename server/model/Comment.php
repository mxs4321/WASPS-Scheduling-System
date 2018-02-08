<?php
class Comment
{
    private $id;
    private $comment;
    private $created;
    private $modified;
    private $userID;
    private $rideID;

    public function getCommentInfo()
    {
        return [
            "id" => $this->id,
            "comment" => $this->comment,
            "created" => $this->created,
            "modified" => $this->modified,
            "userID" => $this->userID,
            "rideID" => $this->rideID,
        ];
    }
}
