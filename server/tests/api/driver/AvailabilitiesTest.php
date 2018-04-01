<?php

use PHPUnit\Framework\TestCase;

class DriverAvailabilitiesTest extends TestCase
{
    private $http;
    private $cookieJar;

    public function setUp()
    {
        $this->cookieJar = new \GuzzleHttp\Cookie\CookieJar();
        $this->http = new GuzzleHttp\Client(['base_uri' => 'localhost:8000', 'http_errors' => false]);
        $this->http->request('POST', '/tests/setupTestDB.php');

        $response = $this->http->request('POST', '/api/login.php', [
            'json' => [
                'email' => 'driver@websterwasps.com',
                'password' => 'driver'
            ],
            'cookies' => $this->cookieJar
        ]);
    }

    public function tearDown()
    {
        $this->http->request('DELETE', '/api/logout.php', ['cookies' => $this->cookieJar]);
        $this->http = null;
    }

    public function testGetDriverAvailablilityByDriverID()
    {
        $response = $this->http->request('GET', '/api/driverAvailabilities.php?driverID=3', ['cookies' => $this->cookieJar]);
        $this->assertEquals(200, $response->getStatusCode());
        $contentType = $response->getHeaders()["Content-Type"][0];
        $this->assertEquals("application/json", $contentType);
        $data = json_decode($response->getBody(true), true);
        $this->assertEquals([
            'id' => 1,
            'start' => '07:00:00',
            'end' => '16:00:00',
            'days' => 'Mon,Tue,Wed,Thu,Fri',
            'driverID' => 3
        ], $data[0]);
    }

    public function testCreatingDriverAvailability()
    {
        $response = $this->http->request('POST', '/api/driverAvailabilities.php', [
            'json' => [
                'start' => '07:00:00',
                'end' => '16:00:00',
                'days' => 'Mon,Tue,Wed,Thu,Fri'
            ],
            'cookies' => $this->cookieJar,
        ]);
        $this->assertEquals(201, $response->getStatusCode());
        $contentType = $response->getHeaders()["Content-Type"][0];
        $this->assertEquals("application/json", $contentType);
        $availability = json_decode($response->getBody(true), true);
        unset($availability["id"]);
        $this->assertEquals([
            'start' => '07:00:00',
            'end' => '16:00:00',
            'days' => 'Mon,Tue,Wed,Thu,Fri',
            'driverID' => 3,
        ], $availability);
    }

    public function testUpdateOwnAvailability()
    {
        $response = $this->http->request('PUT', '/api/driverAvailabilities.php?id=1', [
            'json' => [
                'start' => '08:00:00',
                'end' => '17:00:00',
                'days' => 'Mon,Tue,Thu,Fri',
            ],
            'cookies' => $this->cookieJar,
        ]);
        $this->assertEquals(201, $response->getStatusCode());
        $contentType = $response->getHeaders()["Content-Type"][0];
        $this->assertEquals("application/json", $contentType);
        $availability = json_decode($response->getBody(true), true);
        $this->assertEquals([
            'id' => 1,
            'start' => '08:00:00',
            'end' => '17:00:00',
            'days' => 'Mon,Tue,Thu,Fri',
            'driverID' => 3,
        ], $availability);
    }

    public function testCannotUpdateOthersAvailability()
    {
        $response = $this->http->request('PUT', '/api/driverAvailabilities.php?id=2', [
            'json' => [
                'start' => '07:00:00',
                'end' => '16:00:00',
                'days' => 'Mon,Tue,Wed,Thu,Fri'
            ],
            'cookies' => $this->cookieJar,
        ]);
        
        $this->assertEquals(403, $response->getStatusCode());
    }

    public function testCanDeleteOwnAvailability()
    {
        $response = $this->http->request('DELETE', '/api/driverAvailabilities.php?id=1', ['cookies' => $this->cookieJar]);
        $this->assertEquals(202, $response->getStatusCode());
    }

    public function testCannotDeleteOthersAvailability()
    {
        $response = $this->http->request('DELETE', '/api/driverAvailabilities.php?id=2', ['cookies' => $this->cookieJar]);
        $this->assertEquals(403, $response->getStatusCode());
    }
}

