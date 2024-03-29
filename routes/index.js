const express = require('express');
const router = express.Router();
const mysql = require('mysql');

const connection = mysql.createConnection({
  host: 'localhost',
  user: '[ユーザ名]',
  password: '[パスワード]',
  database: 'todo_app'
});

/**
 * 表示処理
 */
router.get('/', function (req, res, next) {
  connection.query(
      `select * from tasks;`,
      (error, results) => {
        console.log(error);
        console.log(results);

        taskList = [];

        jsonList = JSON.parse(JSON.stringify(results));
        console.log(jsonList)

        jsonList.forEach(function( value ) {
          taskList.push(value.content)
        });

        res.render('index', {
          title: 'ToDo App',
          todos: taskList,
        });
      }
  );
});

/**
 * 追加時処理
 */
router.post('/', function (req, res, next) {
  connection.connect((err) => {
    if (err) {
      console.log('error connecting: ' + err.stack);
      return
    }
    console.log('success');
  });
  const todo = req.body.add;
  connection.query(
      `insert into tasks (user_id, content) values (1, '${todo}');`,
      (error, results) => {
        console.log(error);
        res.redirect('/');
      }
  );
});

module.exports = router;