<?php

use PHPUnit\Framework\TestCase;

class DriverRidesTest extends TestCase
{
    private $http;
    private $cookieJar;

    public function setUp()
    {
        $this->cookieJar = new \GuzzleHttp\Cookie\CookieJar();
        $this->http = new GuzzleHttp\Client(['base_uri' => 'localhost:8000/api/', 'http_errors' => false]);
        $this->http->request('POST', '/setupTestDB.php');
        $this->http->request('POST', '/login.php', [
            'json' => [
                'email' => 'driver@websterwasps.com',
                'password' => 'driver',
            ],
            'cookies' => $this->cookieJar,
        ]);
    }

    public function tearDown()
    {
        $this->http->request('DELETE', '/logout.php', ['cookies' => $this->cookieJar]);
        $this->http = null;
    }

    public function testGetRidesForDriver()
    {
        $response = $this->http->request('GET', '/api/rides.php', ['cookies' => $this->cookieJar]);
        $this->assertEquals(200, $response->getStatusCode());
        $rides = json_decode($response->getBody(true), true);
        $ride = $rides[0];
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

        foreach ($rides as $ride) {
            $this->assertEquals($ride['driverID'], 3);
        }
    }

    public function testGetRidesPopulate()
    {
        $response = $this->http->request('GET', '/api/rides.php?populate=true', ['cookies' => $this->cookieJar]);
        $this->assertEquals(200, $response->getStatusCode());
        $data = json_decode($response->getBody(true), true);
        $ride = $data[0];
        unset($ride["modified"]);
        $this->assertEquals([
            'id' => 1,
            'passenger' => [
                'id' => 4,
                'firstName' => 'Main',
                'lastName' => 'Passenger',
                'role' => 'passenger',
                'phone' => '2435254235',
                'email' => 'passenger@websterwasps.com',
                'registered' => '2018-01-01 00:00:00',
                'lastLogin' => '2018-03-01 00:00:00',
                'wantsSMS' => 1,
                'wantsEmail' => 1,
            ],
            'driver' => [
                'id' => 3,
                'firstName' => 'Main',
                'lastName' => 'Driver',
                'role' => 'driver',
                'phone' => '2035254835',
                'email' => 'driver@websterwasps.com',
                'registered' => '2018-01-01 00:00:00',
                'lastLogin' => '2018-03-01 00:00:00',
                'wantsSMS' => 1,
                'wantsEmail' => 1,
            ],
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

    public function testDriverCannotCreateRide()
    {
        $response = $this->http->request('POST', '/api/rides.php', [
            'json' => [
                "passengerID" => "4",
                "apptStart" => "2018-04-05 08:11",
                "apptEnd" => "2018-04-05 09:11",
                "pickupTime" => "2018-04-05 09:11",
                "pickupStreetAddress" => "476 Monroe Avenue",
                "pickupCity" => "Rochester",
                "apptStreetAddress" => "584 Monroe Avenue",
                "apptCity" => "Rochester",
                "wheelchairVan" => false,
            ],
            'cookies' => $this->cookieJar,
        ]);
        $this->assertEquals(403, $response->getStatusCode());
    }

    public function testDriverCanAcceptRide()
    {
        $response = $this->http->request('PUT', '/api/rides.php?id=2', [
            'json' => ["status" => "Scheduled"],
            'cookies' => $this->cookieJar,
        ]);

        $this->assertEquals(201, $response->getStatusCode());
        $ride = json_decode($response->getBody(true), true);
        unset($ride["modified"]);
        unset($ride["created"]);

        $this->assertEquals([
            "id" => 2,
            "passenger" => [
                'id' => 4,
                'firstName' => 'Main',
                'lastName' => 'Passenger',
                'role' => 'passenger',
                'phone' => '2435254235',
                'email' => 'passenger@websterwasps.com',
                'registered' => '2018-01-01 00:00:00',
                'lastLogin' => '2018-03-01 00:00:00',
                'wantsSMS' => 1,
                'wantsEmail' => 1,
            ],
            "driver" => [
                'id' => 3,
                'firstName' => 'Main',
                'lastName' => 'Driver',
                'role' => 'driver',
                'phone' => '2035254835',
                'email' => 'driver@websterwasps.com',
                'registered' => '2018-01-01 00:00:00',
                'lastLogin' => '2018-03-01 00:00:00',
                'wantsSMS' => 1,
                'wantsEmail' => 1,
            ],
            'apptStart' => '2018-04-25 09:00:00',
            'apptEnd' => '2018-04-25 10:00:00',
            'pickupTime' => '2018-04-25 10:00:00',
            'pickupStreetAddress' => '746 Newberry Ln',
            'pickupCity' => 'Webster',
            'apptStreetAddress' => '55 North Ave B',
            'apptCity' => 'Webster',
            "wheelchairVan" => 0,
            'numMiles' => null,
            'totalMinutes' => null,
            'status' => 'Scheduled',
        ], $ride);
    }

    public function testDriverCanDeclineRide()
    {
        $response = $this->http->request('PUT', '/api/rides.php?id=2', [
            'json' => ["status" => "Unverified"],
            'cookies' => $this->cookieJar,
        ]);

        $this->assertEquals(201, $response->getStatusCode());
        $ride = json_decode($response->getBody(true), true);
        unset($ride["modified"]);
        unset($ride["created"]);

        $this->assertEquals([
            "id" => 2,
            "passenger" => [
                'id' => 4,
                'firstName' => 'Main',
                'lastName' => 'Passenger',
                'role' => 'passenger',
                'phone' => '2435254235',
                'email' => 'passenger@websterwasps.com',
                'registered' => '2018-01-01 00:00:00',
                'lastLogin' => '2018-03-01 00:00:00',
                'wantsSMS' => 1,
                'wantsEmail' => 1,
            ],
            "driverID" => null,
            'apptStart' => '2018-04-25 09:00:00',
            'apptEnd' => '2018-04-25 10:00:00',
            'pickupTime' => '2018-04-25 10:00:00',
            'pickupStreetAddress' => '746 Newberry Ln',
            'pickupCity' => 'Webster',
            'apptStreetAddress' => '55 North Ave B',
            'apptCity' => 'Webster',
            "wheelchairVan" => 0,
            'numMiles' => null,
            'totalMinutes' => null,
            'status' => 'Unverified',
        ], $ride);
    }

    public function testCannotCancelRide()
    {
        $response = $this->http->request('PUT', '/api/rides.php?id=1', [
            'json' => [
                "status" => "Canceled",
            ],
            'cookies' => $this->cookieJar,
        ]);

        $this->assertEquals(201, $response->getStatusCode());
    }
}
