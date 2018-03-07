<?php
use PHPUnit\Framework\TestCase;

class LogoutTest extends TestCase
{
    private $http;

    public function setUp()
    {
        $this->http = new GuzzleHttp\Client(['base_uri' => 'localhost:8000', 'http_errors' => false]);
    }

    public function tearDown()
    {
        $this->http = null;
    }

    public function testGetShouldFail()
    {
        $response = $this->http->request('GET', 'logout.php');
        $this->assertEquals(405, $response->getStatusCode());
    }

    public function testDeleteShouldLogout()
    {
        $response = $this->http->request('DELETE', 'logout.php');
        $this->assertEquals(202, $response->getStatusCode());
    }
}
