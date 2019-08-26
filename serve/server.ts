const express = require('express'),
  app = express(),
  server = require('http').createServer(app),
  io = require('socket.io').listen(server),
  session = require('express-session'),
  FileStore = require('session-file-store')(session),
  identityKey = 'skey',
  //用于保存用户信息的数组
  users = require('./user.ts').items;
  app.use(session({
    name: identityKey,
    secret: 'chyingp', // 用来对session id相关的cookie进行签名
    store: new FileStore(), // 本地存储session（文本文件，也可以选择其他store，比如redis的）
    saveUninitialized: false, // 是否自动保存未初始化的会话，建议false
    resave: false, // 是否每次都重新保存会话，建议false
    cookie: {
      maxAge: 10 * 1000 // 有效期，单位是毫秒
    }
  }));

  let findUser = function(name){
    return users.find(function(item){
      return item.name === name;
    });
  };
  
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
  //登陆接口  
  app.post('/api/login', function (req, res) {
    var sess = req.session;
    var user = findUser(req.body.name);
     
    if(user){
      req.session.regenerate(function(err) {
      if(err){
        return res.json({ret_code: 2, ret_msg: '登录失败'});        
      }
      req.session.loginUser = user.name;
        res.json({ret_code: 0, ret_msg: '登录成功'});              
      });
    }else{
      res.json({ret_code: 1, ret_msg: '账号或密码错误'});
    }
  });

io.sockets.on('connection', function (socket) {
  //创建用户链接
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
  console.log("服务器已启动在：3000端口", "http://localhost:3000")
});
