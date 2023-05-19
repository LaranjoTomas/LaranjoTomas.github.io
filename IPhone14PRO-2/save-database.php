<?php
// Retrieve the JSON data from the request body
$jsonData = file_get_contents('php://input');

// Specify the path to your JSON file
$databaseFile = './database.json';

// Write the JSON data to the file
file_put_contents($databaseFile, $jsonData);

// Return a response indicating the success or failure
if (file_exists($databaseFile)) {
  echo "Database saved successfully.";
} else {
  echo "Failed to save the database.";
}
?>
