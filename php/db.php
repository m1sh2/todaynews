<?php
function q($query) {
  $DB = array(
    'LOC' => (object)array(
      'HOST' => 'localhost',
      'NAME' => 'infa',
      'USER' => 'root',
      'PASS' => ''
    ),
    'LIVE' => (object)array(

    )
  );

  $mysqli = new mysqli($DB[ENV]->HOST, $DB[ENV]->USER, $DB[ENV]->PASS, $DB[ENV]->NAME);

  if ($mysqli->connect_errno) {
    throw new Exception("Failed to connect to MySQL: (" . $mysqli->connect_errno . ") " . $mysqli->connect_error);
  }

  if (!$mysqli->set_charset("utf8")) {
    throw new Exception("Error loading character set utf8: %s\n", $mysqli->error);
    exit();
  } else {
    // printf("Current character set: %s\n", $mysqli->character_set_name());
  }
  // echo $query;
  $result = $mysqli->query($query);
  if (!$result) {
    echo $query;
    throw new Exception("Database Error [{$mysqli->errno}] {$mysqli->error}, (query: $query)");
  } else {
    return $result;
  }
  $mysqli->close();
}
?>
