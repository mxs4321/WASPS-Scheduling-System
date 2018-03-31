<?php
session_start(); // Starting Session

include '../env.php';
require_once "../db.class.php";
$db = new DB($host, $port, $name, $user, $pass); // From dbinfo.php
$delimiter = ",";

if ($_SERVER['REQUEST_METHOD'] === 'GET')
{
   switch ($_SESSION['user']['role'])
   {
      case "admin":
         $filename = "";
         $fetchSince = "";

         if (isset($_GET['filename'])) $filename = $_GET['filename'];
         if (isset($_GET['fetchSince'])) $fetchSince = $_GET['fetchSince'];

         switch ($_GET['info'])
         {
            case 'ride':
               if (isset($_GET['export']))
               {
                  exportRideToCSV($filename, $fetchSince);
               }
               else
               {
                  header('Content-Type: application/json');
                  echo json_encode($db->ride->getRides());
               }
               break;

            case 'driver':
               if (isset($_GET['export']))
               {
                  exportDriverToCSV($filename, $fetchSince);
               }
               else
               {
                  header('Content-Type: application/json');
                  echo json_encode($db->user->getDriverExportInfo());
               }
               break;

            case 'destination':
               if (isset($_GET['export']))
               {
                  exportDestinationToCSV($filename, $fetchSince);
               }
               else
               {
                  header('Content-Type: application/json');
                  echo json_encode($db->ride->getDestinationExportInfo());
               }
               break;

            case 'client':
               if (isset($_GET['export']))
               {
                  exportClientToCSV($filename, $fetchSince);
               }
               else
               {
                  header('Content-Type: application/json');
                  echo json_encode($db->user->getClientExportInfo());
               }
               break;

            default:
               http_response_code(400);
               echo json_encode(["err" => "Invalid arguments"]);
         }
         break;
      default:
         http_response_code(403);
         echo json_encode(["err" => "Could get requested resource"]);
         break;
   }
}

function exportClientToCSV($filename = "clients.csv", $fetchSince = "")
{
   header('Content-Type: application/csv; charset=UTF-8');
   header('Content-Disposition: attachment; filename="' .$filename .'";');
   global $db;
   global $delimiter;

   $columnNames = array("First Name", "Last Name", "Phone number", "Email Address", "Wants Email", "Wants SMS");
   $data = $db->user->getClientExportInfo($fetchSince);

   $f = fopen('php://output', 'w');

   fputcsv($f, $columnNames, $delimiter);
   foreach ($data as $line)
   {
      if ($line['wantsSMS'] == 1)
      {
         $line['wantsSMS'] = "yes";
      }
      else
      {
         $line['wantsSMS'] = "no";
      }

      if ($line['wantsEmail'] == 1)
      {
         $line['wantsEmail'] = "yes";
      }
      else
      {
         $line['wantsEmail'] = "no";
      }

      fputcsv($f, $line, $delimiter);
   }

   fpassthru($f);
   fclose($f);
}

function exportDestinationToCSV($filename = "destinations.csv", $fetchSince = "")
{
   header('Content-Type: application/csv; charset=UTF-8');
   header('Content-Disposition: attachment; filename="' .$filename .'";');
   global $db;
   global $delimiter;

   $columnNames = array("Destination Street Address", "Destination City", "Customer First Name", "Customer Last Name", "Appointment Endtime");
   $data = $db->ride->getDestinationExportInfo($fetchSince);

   $f = fopen('php://output', 'w');

   fputcsv($f, $columnNames, $delimiter);
   foreach ($data as $line)
   {
      fputcsv($f, $line, $delimiter);
   }

   fpassthru($f);
   fclose($f);
}

function exportDriverToCSV($filename = "drivers.csv", $fetchSince = "")
{
   header('Content-Type: application/csv; charset=UTF-8');
   header('Content-Disposition: attachment; filename="' .$filename .'";');
   global $db;
   global $delimiter;

   $columnNames = array("First Name", "Last Name", "Phone", "Email Address", "Wants Email", "Wants SMS", "Driver Schedule Monday",
      "Driver Schedule Tuesday", "Driver Schedule Wednesday", "Driver Schedule Thursday", "Driver Schedule Friday",
      "Driver Schedule Saturday", "Driver Schedule Sunday");
   $data = $db->user->getDriverExportInfo($fetchSince);

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

   // Add last driver in the list if there ever was one
   if (sizeof($data > 0))
   {
      unset($lastDriver['id']);
      unset($lastDriver['start']);
      unset($lastDriver['end']);
      unset($lastDriver['days']);
      $lastDriver['wantsSMS'] = $lastDriver['wantsSMS'] == 1 ? "Yes" : "No";
      $lastDriver['wantsEmail'] = $lastDriver['wantsEmail'] == 1 ? "Yes" : "No";
      fputcsv($f, $lastDriver, $delimiter);
   }

   fpassthru($f);
   fclose($f);
}

function exportRideToCSV($filename = "event_appointments.csv", $fetchSince = "")
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
   $data = $db->ride->getRides(0, PHP_INT_MAX, false, $fetchSince);
   $f = fopen('php://output', 'w');

   fputcsv($f, $columnNames, $delimiter);
   foreach ($data as $line)
   {
      unset($line['id']);
      unset($line['passengerID']);
      unset($line['driverID']);
      unset($line['CreatedTime']);
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