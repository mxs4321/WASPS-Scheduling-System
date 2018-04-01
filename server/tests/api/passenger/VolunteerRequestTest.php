<?php

// use PHPUnit\Framework\TestCase;

// class PassengerVolunteerRequestTest extends TestCase
// {
//     private $http;
//     private $cookieJar;

//     public function setUp()
//     {
//         $this->cookieJar = new \GuzzleHttp\Cookie\CookieJar();
//         $this->http = new GuzzleHttp\Client(['base_uri' => 'localhost:8000', 'http_errors' => false]);
//         $this->http->request('POST', '/tests/setupTestDB.php');
//         $response = $this->http->request('POST', '/api/login.php', [
//             'json' => [
//                 'email' => 'passenger@websterwasps.com',
//                 'password' => 'passenger'
//             ],
//             'cookies' => $this->cookieJar
//         ]);
//     }

//     public function tearDown()
//     {
//         $this->http->request('DELETE', '/api/logout.php', ['cookies' => $this->cookieJar]);
//         $this->http = null;
//     }

//     public function testCreateVolunteerRequest() {
//         $response = $this->http->request('POST', '/api/volunteerRequests.php', ['cookies' => $this->cookieJar]);
//         $this->assertEquals(200, $response->getStatusCode());
//         $contentType = $response->getHeaders()["Content-Type"][0];
//         $this->assertEquals("application/json", $contentType);
//         $data = json_decode($response->getBody(true), true);
//         $this->assertEquals($data['userID'], 6);
//     }

// }