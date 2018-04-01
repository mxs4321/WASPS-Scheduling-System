<?php
include "vendor/autoload.php";

$dotenv = new Dotenv\Dotenv(__DIR__);
$dotenv->load();

$host = $_ENV["MYSQL_HOST"];
$port = $_ENV["MYSQL_PORT"];
$name = $_ENV["MYSQL_DATABASE_NAME"];
$user = $_ENV["MYSQL_USER"];
$pass = $_ENV["MYSQL_PASSWORD"];

$db = new PDO("mysql:host=$host;dbname=$name", $user, $pass);

$db->exec("SET foreign_key_checks = 0");
if ($result = $db->query("SHOW TABLES"))
{
   while ($row = $result->fetch())
   {
      $db->exec("DROP TABLE IF EXISTS " .$row[0]);
   }
}
$db->exec("SET foreign_key_checks = 1");
// TODO: Some type of production dump needs to be made.
$sql = file_get_contents("../database/fullDump.sql");
$db->exec($sql);