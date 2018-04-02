<?php

use PHPUnit\Framework\TestCase;

class AuthTest extends TestCase
{
    private $http;

    public function setUp()
    {
        $this->http = new GuzzleHttp\Client(['base_uri' => 'localhost:8000', 'http_errors' => false]);
        $this->http->request('GET', '/tests/setupTestDB.php');
    }

    public function tearDown()
    {
        $this->http = null;
    }

    public function testLoginToAdmin()
    {
        $response = $this->http->request('POST', '/api/auth.php', [
            'json' => [
                'email' => 'admin@websterwasps.com',
                'password' => 'admin',
            ],
        ]);
        $this->assertEquals(201, $response->getStatusCode());
        $contentType = $response->getHeaders()["Content-Type"][0];
        $this->assertEquals("application/json", $contentType);
        $data = json_decode($response->getBody(true), true);
        $this->assertEquals([
            'id' => 1,
            'firstName' => 'Super',
            'lastName' => 'Admin',
            'role' => 'admin',
            'phone' => '5852167829',
            'email' => 'admin@websterwasps.com',
            'registered' => '2018-01-01 00:00:00',
        ], $data);
    }

    public function testLoginToDispatcher()
    {
        $response = $this->http->request('POST', '/api/auth.php', [
            'json' => [
                'email' => 'dispatcher@websterwasps.com',
                'password' => 'dispatcher',
            ],
        ]);
        $this->assertEquals(201, $response->getStatusCode());
        $contentType = $response->getHeaders()["Content-Type"][0];
        $this->assertEquals("application/json", $contentType);
        $data = json_decode($response->getBody(true), true);
        $this->assertEquals([
            'id' => 2,
            'firstName' => 'Main',
            'lastName' => 'Dispatcher',
            'role' => 'dispatcher',
            'phone' => '5852167819',
            'email' => 'dispatcher@websterwasps.com',
            'registered' => '2018-01-01 00:00:00',
        ], $data);
    }

    public function testLoginToDriver()
    {
        $response = $this->http->request('POST', '/api/auth.php', [
            'json' => [
                'email' => 'driver@websterwasps.com',
                'password' => 'driver',
            ],
        ]);
        $this->assertEquals(201, $response->getStatusCode());
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
            'registered' => '2018-01-01 00:00:00',
        ], $data);
    }

    public function testLoginToPassenger()
    {
        $response = $this->http->request('POST', '/api/auth.php', [
            'json' => [
                'email' => 'passenger@websterwasps.com',
                'password' => 'passenger',
            ],
        ]);
        $this->assertEquals(201, $response->getStatusCode());
        $contentType = $response->getHeaders()["Content-Type"][0];
        $this->assertEquals("application/json", $contentType);
        $data = json_decode($response->getBody(true), true);
        $this->assertEquals([
            'id' => 4,
            'firstName' => 'Main',
            'lastName' => 'Passenger',
            'role' => 'passenger',
            'phone' => '2435254235',
            'email' => 'passenger@websterwasps.com',
            'registered' => '2018-01-01 00:00:00',
        ], $data);
    }

    public function testLoginWithPhoneNumber()
    {
        $response = $this->http->request('POST', '/api/auth.php', [
            'json' => [
                'phone' => '2435254235',
                'password' => 'passenger',
            ],
        ]);
        $this->assertEquals(201, $response->getStatusCode());
        $contentType = $response->getHeaders()["Content-Type"][0];
        $this->assertEquals("application/json", $contentType);
        $data = json_decode($response->getBody(true), true);
        $this->assertEquals([
            'id' => 4,
            'firstName' => 'Main',
            'lastName' => 'Passenger',
            'role' => 'passenger',
            'phone' => '2435254235',
            'email' => 'passenger@websterwasps.com',
            'registered' => '2018-01-01 00:00:00',
        ], $data);
    }

    public function testFailWithInvalidLogin()
    {
        $response = $this->http->request('POST', '/api/auth.php', [
            'json' => [
                'email' => 'na',
                'password' => 'na',
            ],
        ]);
        $this->assertEquals(401, $response->getStatusCode());
    }

    public function testDeleteShouldFailWithoutCookie()
    {
        $response = $this->http->request('DELETE', '/api/auth.php');
        $this->assertEquals(400, $response->getStatusCode());
    }

    public function testDeleteShouldLogout()
    {
        $cookieJar = new \GuzzleHttp\Cookie\CookieJar();
        $response = $this->http->request('POST', '/api/auth.php', [
            'json' => [
                'email' => 'passenger@websterwasps.com',
                'password' => 'passenger',
            ],
            'cookies' => $cookieJar,
        ]);
        $response = $this->http->request('DELETE', '/api/auth.php', ['cookies' => $cookieJar]);
        $this->assertEquals(202, $response->getStatusCode());
    }
}
