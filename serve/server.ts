const express = require('express');
const  app = express();
const  server = require('http').createServer(app);
const  io = require('socket.io').listen(server);
const  bodyParser = require('body-parser');
let users = [];

  // 添加json解析
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({extended: false}));

  let kit = {
    //判断用户是否存在
    isHaveUser(user) {
      var flag = false;
      users.forEach(function (item) {
        if (item.name == user.name) {
          flag = true;
        }
      })
      return flag;
    },
    //删除某一用户
    delUser(id) {
      users.forEach(function (item, index) {
        if (item.id == id) {
          users.splice(index, 1);
        }
      })
    }
  }
  //
  // //登陆接口
  // app.post('/api/login', function (req, res, next) {
  //
  //   res.header("Access-Control-Allow-Origin", "*");
  //   res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  //   // 获取参数
  //   let query = req.body;
  //   let isUser = kit.isHaveUser(query.userName);
  //   if(isUser){
  //     return res.json({ret_code: 2, ret_msg: '该用户名已存在，请重新输入用户名'});
  //     next();
  //   }else{
  //     users.push(query.userName);
  //     res.json({ret_code: 1, ret_msg: '登录成功'});
  //     next();
  //   }
  // });

io.sockets.on('connection', function (socket) {
  console.log("1111用户已经连接上长链接了");
  socket.emit('open');  //通知客户端已连接
    //   //创建用户链接
  socket.on('login', (user)=> {
    if (kit.isHaveUser(user)) {
      console.log("登录失败！", user)
      socket.emit('loginFail', "登录失败,昵称已存在!");
    } else {
      socket.user = user;
      user.id = socket.id;
      user.address = socket.handshake.address;
      console.log("登录成功！", user)
      socket.emit('loginSuccess', user, users);
      users.push(user)
      socket.broadcast.emit('system', user, 'join');
    }
    ;
  });
  //用户注销链接
  socket.on('disconnect',()=> {
    if (socket.user != null) {
      kit.delUser(socket.id);
      console.log("用户退出！", socket.user)
      socket.broadcast.emit('system', socket.user, 'logout');
    }
  });
  //群发消息
  socket.on('groupMessage', function (msg, from) {
    //用户登录状态掉线，重置用户登录状态
    if (!socket.user) {
      from.id = socket.id;
      socket.user = from;
      users.push(from);
      socket.broadcast.emit('system', from, 'join');
      socket.emit('loginSuccess', from, []);
    }
    socket.broadcast.emit('groupMessage', socket.user, msg);
  });
  //发送私信
  socket.on('message', function (id, msg, from) {
    //用户登录状态掉线，重置用户登录状态
    if (!socket.user) {
      from.id = socket.id;
      socket.user = from;
      users.push(from);
      socket.broadcast.emit('system', from, 'join');
      socket.emit('loginSuccess', from, []);
    }
    socket.broadcast.to(id).emit('message', socket.user, msg);
  });
});
//启动服务器
server.listen(3000, function () {
  console.log("服务器已启动在：3000端口", "http://localhost:3000");
});
