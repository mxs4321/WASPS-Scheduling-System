<?php

// use PHPUnit\Framework\TestCase;

// class DriverAvailabilitiesTest extends TestCase
// {
//     private $http;
//     private $cookieJar;

//     public function setUp()
//     {
//         $this->cookieJar = new \GuzzleHttp\Cookie\CookieJar();
//         $this->http = new GuzzleHttp\Client(['base_uri' => 'localhost:8000/api/', 'http_errors' => false]);
//         $this->http->request('POST', '/dbSetup.php');

//         $response = $this->http->request('POST', '/login.php', [
//             'json' => [
//                 'email' => 'admin@websterwasps.com',
//                 'password' => 'admin'
//             ],
//             'cookies' => $this->cookieJar
//         ]);
//     }

//     public function tearDown()
//     {
//         $this->http->request('DELETE', '/logout.php', ['cookies' => $this->cookieJar]);
//         $this->http = null;
//     }

//     // TODO: DriverAvilability doesn't seem to work right. The main driver should be Avilabile to drive on a monday at 10am
//     // public function testGetAvailableDriver()
//     // {
//     //     $response = $this->http->request('GET', '/api/driverAvailabilities.php?start=2018-01-01%2010:00:00&end=2018-03-01%2011:00:00', ['cookies' => $this->cookieJar]);
//     //     $this->assertEquals(200, $response->getStatusCode());
//     //     $contentType = $response->getHeaders()["Content-Type"][0];
//     //     $this->assertEquals("application/json", $contentType);
//     //     $data = json_decode($response->getBody(true), true);
//     //     $this->assertEquals([
//     //         'id' => 3,
//     //         'firstName' => 'Main',
//     //         'lastName' => 'Driver',
//     //         'role' => 'driver',
//     //         'phone' => '2035254835',
//     //         'email' => 'driver@websterwasps.com',
//     //         'registered' => '2018-01-01 00:00:00',
//     //         'lastLogin' => '2018-03-01 00:00:00',
//     //         'wantsSMS' => 1,
//     //         'wantsEmail' => 1
//     //     ], $data[0]);
//     // }
// }