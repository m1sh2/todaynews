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

$act = isset($_POST['act']) ? $_POST['act'] : $_GET['act'];

// echo json_encode([$_REQUEST, $act]);
// echo json_encode($_POST);
// echo $act;
// exit();

switch($act) {
  case 'getCategories':
    $result = $mysqli->query("SELECT * FROM categories WHERE publish = 1 ORDER BY title ASC");
    
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

  case 'runLogin':
    $data = json_decode(base64_decode($_REQUEST['data']));
    $result = $mysqli->query("INSERT INTO articles (title) VALUES ('" . $data->title . "')");
    
    // $rows = array();
    // while ($row = $result->fetch_assoc()) {
    //   array_push($rows, array(
    //       'id' => $row['id'],
    //       'title' => $row['title'],
    //       'publish' => $row['publish'],
    //       'url' => $row['url'],
    //       'subid' => $row['subid']
    //     )
    //   );
    // }
    echo json_encode([$result, 123, $data, $mysqli->insert_id]);
    break;

  case 'runSignup':
    $data = json_decode(base64_decode($_REQUEST['data']));
    $result = $mysqli->query("INSERT INTO users (email) VALUES ('" . $data->title . "')");
    
    // $rows = array();
    // while ($row = $result->fetch_assoc()) {
    //   array_push($rows, array(
    //       'id' => $row['id'],
    //       'title' => $row['title'],
    //       'publish' => $row['publish'],
    //       'url' => $row['url'],
    //       'subid' => $row['subid']
    //     )
    //   );
    // }
    echo json_encode([$result, 123, $data, $mysqli->insert_id]);
    break;

  case 'addArticle':
    $data = json_decode(base64_decode($_REQUEST['data']));
    $result = $mysqli->query("INSERT INTO articles (
      title,
      content,
      datecreated,
      publish
      ) VALUES (
      '" . $data->title . "',
      '" . $data->content . "',
      '" . date('Y-m-d H:i:s') . "',
      1
      )");
    
    // $rows = array();
    // while ($row = $result->fetch_assoc()) {
    //   array_push($rows, array(
    //       'id' => $row['id'],
    //       'title' => $row['title'],
    //       'publish' => $row['publish'],
    //       'url' => $row['url'],
    //       'subid' => $row['subid']
    //     )
    //   );
    // }
    echo json_encode([$result, 123, $data, $mysqli->insert_id]);
    break;

  case 'addUser':
    $data = json_decode(base64_decode($_REQUEST['data']));
    $code = crypt($data->email . strtotime(date('Y-m-d H:i:s')) . 'code', $data->password);
    $refresh = crypt($code, $data->password);
    $result = $mysqli->query("INSERT INTO users (
      code,
      refresh,
      datecreated,
      email,
      password
      ) VALUES (
      '" . $code . "',
      '" . $refresh . "',
      '" . date('Y-m-d H:i:s') . "',
      '" . $data->email . "',
      '" . crypt($data->password, $data->password) . "'
      )");
    
    // $rows = array();
    // while ($row = $result->fetch_assoc()) {
    //   array_push($rows, array(
    //       'id' => $row['id'],
    //       'title' => $row['title'],
    //       'publish' => $row['publish'],
    //       'url' => $row['url'],
    //       'subid' => $row['subid']
    //     )
    //   );
    // }
    echo json_encode($code . '/' . $refresh);
    break;

  case 'getArticles':
    $data = json_decode(base64_decode($_REQUEST['data']));
    $result = $mysqli->query("SELECT * FROM articles WHERE publish = 1 ORDER BY datecreated DESC");
    $rows = array();
    while ($row = $result->fetch_assoc()) {
      array_push($rows, array(
          'id' => $row['id'],
          'title' => $row['title'],
          'publish' => $row['publish'],
          'content' => $row['content'],
          'category' => $row['category'],
          'datecreated' => date('H:i d.m.y', strtotime($row['datecreated']))
        )
      );
    }
    echo json_encode($rows);
    break;

  case 'getUser':
    $data = json_decode(base64_decode($_REQUEST['data']));
    $result = $mysqli->query("SELECT * FROM articles WHERE publish = 1 ORDER BY datecreated DESC");
    $rows = array();
    while ($row = $result->fetch_assoc()) {
      array_push($rows, array(
          'id' => $row['id'],
          'title' => $row['title'],
          'publish' => $row['publish'],
          'content' => $row['content'],
          'category' => $row['category'],
          'datecreated' => date('H:i d.m.y', strtotime($row['datecreated']))
        )
      );
    }
    echo json_encode($rows);
    break;

  default:
    $request = key($_REQUEST);
    $request = explode('/', $request);
    echo json_encode([$request, 321]);
    break;
}

$mysqli->close();
?>