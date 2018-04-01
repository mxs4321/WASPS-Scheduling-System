<?php

use PHPUnit\Framework\TestCase;

class PassengerAvailabilitiesTest extends TestCase
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
                'email' => 'passenger@websterwasps.com',
                'password' => 'passenger',
            ],
            'cookies' => $this->cookieJar,
        ]);
    }

    public function tearDown()
    {
        $this->http->request('DELETE', '/api/auth.php', ['cookies' => $this->cookieJar]);
        $this->http = null;
    }

    public function testCannotGetAvailablility()
    {
        $response = $this->http->request('GET', '/api/driverAvailabilities.php', ['cookies' => $this->cookieJar]);
        $this->assertEquals(403, $response->getStatusCode());
    }

    public function testCannotCreateAvailablility()
    {
        $response = $this->http->request('POST', '/api/driverAvailabilities.php', [
            'json' => [
                'start' => '07:00:00',
                'end' => '16:00:00',
                'days' => 'Mon,Tue,Wed,Thu,Fri',
            ],
            'cookies' => $this->cookieJar,
        ]);
        $this->assertEquals(403, $response->getStatusCode());
    }

    public function testCannotUpdateAvailablility()
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

    public function testCannotDeleteAvailablility()
    {
        $response = $this->http->request('DELETE', '/api/driverAvailabilities.php', ['cookies' => $this->cookieJar]);
        $this->assertEquals(403, $response->getStatusCode());
    }
}
