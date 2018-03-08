<?php
use PHPUnit\Framework\TestCase;

class UsersTest extends TestCase
{
   private $http;

   public function setUp()
   {
      $this->http = new GuzzleHttp\Client(['base_uri' => 'localhost:8000/api/']);
   }

   public function tearDown()
   {
      $this->http = null;
   }

   public function testGet()
   {
      $response = $this->http->request('GET', '/api/users.php');

      $this->assertEquals(200, $response->getStatusCode());

      $contentType = $response->getHeaders()["Content-Type"][0];
      $this->assertEquals("application/json", $contentType);
   }
}