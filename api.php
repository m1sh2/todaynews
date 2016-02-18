<?php
// $mysql_link = mysql_connect('datsko.mysql.ukraine.com.ua', 'datsko_todaynews', 'rvbef8vy');
$mysqli = new mysqli('datsko.mysql.ukraine.com.ua', 'datsko_todaynews', 'rvbef8vy', 'datsko_todaynews');

if ($mysqli->connect_errno) {
    echo "Failed to connect to MySQL: (" . $mysqli->connect_errno . ") " . $mysqli->connect_error;
}

if (!$mysqli->set_charset("utf8")) {
    printf("Error loading character set utf8: %s\n", $mysqli->error);
    exit();
} else {
    // printf("Current character set: %s\n", $mysqli->character_set_name());
}

/* return name of current default database */
// if ($result = $mysqli->query("SELECT DATABASE()")) {
//     $row = $result->fetch_row();
//     printf("Default database is %s.\n", $row[0]);
//     $result->close();
// }

/* change db to world db */
// $mysqli->select_db("datsko_todaynews");

/* return name of current default database */
// if ($result = $mysqli->query("SELECT DATABASE()")) {
//   $row = $result->fetch_row();
//   printf("Default database is %s.\n", $row[0]);
//   $result->close();
// }





switch($_REQUEST['act']) {
  case 'getCategories':
    $result = $mysqli->query("SELECT * FROM categories ORDER BY id ASC");
    
    $rows = array();
    while ($row = $result->fetch_assoc()) {
      array_push($rows, array(
          'id' => $row['id'],
          'title' => $row['title'],
          'publish' => $row['publish'],
          'url' => $row['url'],
          'subid' => $row['subid']
        )
      );
    }
    echo json_encode($rows);
    break;
  default:
    $request = key($_REQUEST);
    $request = explode('/', $request);
    echo json_encode($request);
    break;
}

$mysqli->close();
?>