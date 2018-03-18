<?php
session_start(); // Starting Session

include '../env.php';
require_once "../db.class.php";
$db = new DB($host, $port, $name, $user, $pass); // From dbinfo.php
$delimiter = ",";

if ($_SERVER['REQUEST_METHOD'] === 'GET')
{
   if (isset($_GET['info']))
   {
      if ($_GET['info'] == 'ride')
      {
         if (isset($_GET['export'])) {
             exportRideToCSV(); 
        } else {
            header('Content-Type: application/json');
            echo json_encode($db->ride->getRides());
        }
      }
      else if ($_GET['info'] == 'driver')
      {
        if (isset($_GET['export'])) {
         exportDriverToCSV(); 
        } else {
            header('Content-Type: application/json');
            echo json_encode($db->user->getDriverExportInfo());
        }
      }
   }
}

function exportDriverToCSV($filename = "drivers.csv")
{
   header('Content-Type: application/csv; charset=UTF-8');
   header('Content-Disposition: attachment; filename="' .$filename .'";');
   global $db;
   global $delimiter;

   $columnNames = array("First Name", "Last Name", "Phone", "Email Address", "Wants Email", "Wants SMS", "Driver Schedule Monday",
      "Driver Schedule Tuesday", "Driver Schedule Wednesday", "Driver Schedule Thursday", "Driver Schedule Friday",
      "Driver Schedule Saturday", "Driver Schedule Sunday");
   $data = $db->user->getDriverExportInfo();

   $f = fopen('php://output', 'w');
   fputcsv($f, $columnNames, $delimiter);
   fputcsv($f, array());
   $lastDriverID = -1;
   $lastDriver = null;

   foreach ($data as $driver)
   {
      if ($lastDriverID == -1)
      {
         $lastDriverID = $driver['id'];
         $lastDriver = $driver;
      }

      if ($driver['id'] != $lastDriverID)
      {
         unset($lastDriver['id']);
         unset($lastDriver['start']);
         unset($lastDriver['end']);
         unset($lastDriver['days']);
         $lastDriver['wantsSMS'] = $lastDriver['wantsSMS'] == 1 ? "Yes" : "No";
         $lastDriver['wantsEmail'] = $lastDriver['wantsEmail'] == 1 ? "Yes" : "No";
         fputcsv($f, $lastDriver, $delimiter);

         $lastDriver = $driver;
         $lastDriverID = $driver['id'];
      }

      AddDriverSchedule($driver, $lastDriver);
   }

   fpassthru($f);
   fclose($f);
}

function exportRideToCSV($filename = "event_appointments.csv")
{
   header('Content-Type: application/csv; charset=UTF-8');
   header('Content-Disposition: attachment; filename="' .$filename .'";');
   global $db;
   global $delimiter;

   $columnNames = $db->ride->getRideColumnNames();
   /*$columnNames = array("Trip Date", "Trip Day", "Appt Time", "First Name", "Last Name", "Street Address, Town, Zip Code",
      "Phone with Area Code (xxx-xxx-xxxx", "Email Address", "Destination Street Address, Town, Zip Code", "Driver Name",
      "Medical Motors Wheelchair Van (yes or no)", "Driver - Notes", "Client - Notes", "Appointment Status",
      "Appointment - Total Miles", "Appointment - Total Hours");*/
   $data = $db->ride->getRides();
   $f = fopen('php://output', 'w');

   fputcsv($f, $columnNames, $delimiter);
   foreach ($data as $line)
   {
      fputcsv($f, $line, $delimiter);
   }

   fpassthru($f);
   fclose($f);
}

function AddDriverSchedule($driver, &$lastDriver)
{
   AddDriverDailySchedule($driver, $lastDriver, "mon");
   AddDriverDailySchedule($driver, $lastDriver, "tue");
   AddDriverDailySchedule($driver, $lastDriver, "wed");
   AddDriverDailySchedule($driver, $lastDriver, "thu");
   AddDriverDailySchedule($driver, $lastDriver, "fri");
   AddDriverDailySchedule($driver, $lastDriver, "sat");
   AddDriverDailySchedule($driver, $lastDriver, "sun");
}

function AddDriverDailySchedule($driver, &$lastDriver, $day)
{
   if (stripos($driver['days'], $day) !== false)
   {
      if (isset($lastDriver[$day]))
      {
         $lastDriver[$day] .= ", " .$driver['start'] ." - " .$driver['end'];
      }
      else
      {
         $lastDriver[$day] = $driver['start'] ." - " .$driver['end'];
      }
   }
}