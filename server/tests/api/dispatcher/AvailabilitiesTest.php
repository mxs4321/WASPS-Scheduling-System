<?php

use PHPUnit\Framework\TestCase;

class DispatcherAvailabilitiesTest extends TestCase
{
    private $http;
    private $cookieJar;

    public function setUp()
    {
        $this->cookieJar = new \GuzzleHttp\Cookie\CookieJar();
        $this->http = new GuzzleHttp\Client(['base_uri' => 'localhost:8000', 'http_errors' => false]);
        $this->http->request('POST', '/tests/setupTestDB.php');

        $response = $this->http->request('POST', '/api/auth.php', [
            'json' => [
                'email' => 'dispatcher@websterwasps.com',
                'password' => 'dispatcher'
            ],
            'cookies' => $this->cookieJar
        ]);
    }

    public function tearDown()
    {
        $this->http->request('DELETE', '/api/auth.php', ['cookies' => $this->cookieJar]);
        $this->http = null;
    }

    public function testGetAvailableDriver()
    {
        $response = $this->http->request('GET', '/api/driverAvailabilities.php?start=2018-01-01%2010:00:00&end=2018-03-01%2011:00:00', ['cookies' => $this->cookieJar]);
        $this->assertEquals(200, $response->getStatusCode());
        $contentType = $response->getHeaders()["Content-Type"][0];
        $this->assertEquals("application/json", $contentType);
        $data = json_decode($response->getBody(true), true);
        $this->assertEquals([
            'id' => 3,
            'firstName' => 'Main',
            'lastName' => 'Driver',
            'role' => 'driver',
            'phone' => '2035254835',
            'email' => 'driver@websterwasps.com',
            'registered' => '2018-01-01 00:00:00'
        ], $data[0]);
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

    public function testCannotUpdateDriverAvailability()
    {
        $response = $this->http->request('PUT', '/api/driverAvailabilities.php?id=1', [
            'json' => [
                'start' => '08:00:00',
                'end' => '17:00:00',
                'days' => 'Mon,Tue,Thu,Fri',
            ],
            'cookies' => $this->cookieJar,
        ]);
        $this->assertEquals(403, $response->getStatusCode());
    }

    public function testCannotDeleteDriverAvailability()
    {
        $response = $this->http->request('DELETE', '/api/driverAvailabilities.php?id=1', ['cookies' => $this->cookieJar]);
        $this->assertEquals(403, $response->getStatusCode());
    }
}