<?php

use PHPUnit\Framework\TestCase;

class AdminReportsTest extends TestCase
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
                'email' => 'admin@websterwasps.com',
                'password' => 'admin',
            ],
            'cookies' => $this->cookieJar
        ]);
    }

    public function tearDown()
    {
        $this->http->request('DELETE', '/api/auth.php', ['cookies' => $this->cookieJar]);
        $this->http = null;
    }

    public function testGetRidesReport()
    {
        $response = $this->http->request('GET', '/api/reports.php?info=ride', ['cookies' => $this->cookieJar]);
        $this->assertEquals(200, $response->getStatusCode());
        $data = json_decode($response->getBody(true), true);
        $ride = $data[0];
        unset($ride["modified"]);
        $this->assertEquals([
            'id' => 1,
            'passengerID' => 4,
            'driverID' => 3,
            'apptStart' => "2018-04-23 09:00:00",
            'apptEnd' => "2018-04-23 10:00:00",
            "numMiles" => null,
            "totalMinutes" => null,
            "pickupTime" => "2018-04-23 10:00:00",
            "wheelchairVan" => 0,
            "status" => "Scheduled",
            "pickupStreetAddress" => "855 publishers parkway",
            "pickupCity" => "Webster",
            "apptStreetAddress" => "45 Webster Commons Blvd #201",
            "apptCity" => "Webster",
            "created" => "2018-02-01 08:00:00",
        ], $ride);
    }

    // TODO: There seems to be an issue with this.

     public function testGetDriverReport()
     {
         $response = $this->http->request('GET', '/api/reports.php?info=driver', ['cookies' => $this->cookieJar]);
         $this->assertEquals(200, $response->getStatusCode());
         $data = json_decode($response->getBody(true), true);
         $this->assertEquals([
             "id" => 3,
             "firstName" => "Main",
             "lastName" => "Driver",
             "phone" => "2035254835",
             "email" => "driver@websterwasps.com",
             "start" => "07:00:00",
             "end" => "16:00:00",
             "days" => "Mon,Tue,Wed,Thu,Fri",
         ], $data[0]);
     }

    public function testDownloadRidesReport()
    {
        $response = $this->http->request('GET', '/api/reports.php?info=ride&export=true', ['cookies' => $this->cookieJar]);
        $this->assertEquals(200, $response->getStatusCode());
        $contentType = $response->getHeaders()["Content-Type"][0];
        $this->assertEquals("application/csv; charset=UTF-8", $contentType);
    }

    public function testDownloadInfoReport()
    {
        $response = $this->http->request('GET', '/api/reports.php?info=driver&export=true', ['cookies' => $this->cookieJar]);
        $this->assertEquals(200, $response->getStatusCode());
        $contentType = $response->getHeaders()["Content-Type"][0];
        $this->assertEquals("application/csv; charset=UTF-8", $contentType);
    }
}
