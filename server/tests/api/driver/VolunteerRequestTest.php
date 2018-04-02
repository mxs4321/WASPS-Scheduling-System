<?php

use PHPUnit\Framework\TestCase;

class DriverVolunteerRequestTest extends TestCase
{
    private $http;
    private $cookieJar;

    public function setUp()
    {
        $this->cookieJar = new \GuzzleHttp\Cookie\CookieJar();
        $this->http = new GuzzleHttp\Client(['base_uri' => 'localhost:8000', 'http_errors' => false]);
        $this->http->request('POST', '/tests/setupTestDB.php');
        $this->http->request('POST', '/api/auth.php', [
            'json' => [
                'email' => 'driver@websterwasps.com',
                'password' => 'driver',
            ],
            'cookies' => $this->cookieJar
        ]);
    }

    public function tearDown()
    {
        $this->http->request('DELETE', '/api/auth.php', ['cookies' => $this->cookieJar]);
        $this->http = null;
    }

    public function testCannotGetRidesReport()
    {
        $response = $this->http->request('GET', '/api/reports.php?info=ride', ['cookies' => $this->cookieJar]);
        $this->assertEquals(403, $response->getStatusCode());
    }

    public function testCannotGetDriverReport()
    {
        $response = $this->http->request('GET', '/api/reports.php?info=driver', ['cookies' => $this->cookieJar]);
        $this->assertEquals(403, $response->getStatusCode());
    }

    public function testCannotDownloadRidesReport()
    {
        $response = $this->http->request('GET', '/api/reports.php?info=ride&export=true', ['cookies' => $this->cookieJar]);
        $this->assertEquals(403, $response->getStatusCode());
    }

    public function testCannotDownloadInfoReport()
    {
        $response = $this->http->request('GET', '/api/reports.php?info=driver&export=true', ['cookies' => $this->cookieJar]);
        $this->assertEquals(403, $response->getStatusCode());
    }
}
