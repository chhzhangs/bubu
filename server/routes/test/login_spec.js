
var frisby = require('frisby');
 
var URL = 'http://localhost:3000/';
var URL_AUTH = 'http://username:password@localhost:3000/';
 
frisby.globalSetup({ // globalSetup is for ALL requests 
  request: {
    headers: { 'X-Auth-Token': 'fa8426a0-8eaf-4d22-8e13-7c1b16a9370c' }
  }
});
 
// frisby.create('GET user johndoe')
//   .post(URL + 'login/',{user_id:"sxiong",password:"123456"})
//   .expectStatus(200)
//   // .expectJSON(
//   //   [{ id: 1,
//   //   user_id: 'sxiong',
//   //   password: '123456',
//   //   login_x: '11',
//   //   login_y: '22',
//   //   created_time: 111111111111111,
//   //   updated_time: 11111111111111}]
//   //   )
// .toss();

// frisby.create('GET user johndoe')
//   .post(URL + 'login/register/',{user_id:"sxiong@hust.edu.cn",password:"123456"})
//   .expectStatus(200)
//   // .expectJSON(
//   //   [{ id: 1,
//   //   user_id: 'sxiong',
//   //   password: '123456',
//   //   login_x: '11',
//   //   login_y: '22',
//   //   created_time: 111111111111111,
//   //   updated_time: 11111111111111}]
//   //   )
// .toss();

// frisby.create('GET user johndoe')
//   .post('https://api.cn.ronghub.com/user/getToken.json',{userId:"sxiong@hust.edu.cn"})
//   .expectStatus(200)
//   .expectJSON({userId: "sxiong@hust.edu.cn"})
// .toss();

frisby.create('GET user johndoe')
  .post(URL+'user/user_stars',{user_id:"sxiong@hust.edu.cn"})
  .expectStatus(200)
  // .expectJSON({userId: "sxiong@hust.edu.cn"})
.toss();

// frisby.create('GET user johndoe')
//   .post(URL + 'user/update/',{user_id:"sxiong@hust.edu.cn",prop_name:"qq",qq:"1752884841"})
//   .expectStatus(200)
//   // .expectJSON(
//   //   [{ id: 1,
//   //   user_id: 'sxiong',
//   //   password: '123456',
//   //   login_x: '11',
//   //   login_y: '22',
//   //   created_time: 111111111111111,
//   //   updated_time: 11111111111111}]
//   //   )
// .toss();

// frisby.create('GET user johndoe')
//   .post(URL + 'user/info/',{user_id:"sxiong@hust.edu.cn2"})
//   .expectStatus(200)
//   // .expectJSON(
//   //   [{ id: 1,
//   //   user_id: 'sxiong',
//   //   password: '123456',
//   //   login_x: '11',
//   //   login_y: '22',
//   //   created_time: 111111111111111,
//   //   updated_time: 11111111111111}]
//   //   )
// .toss();

// frisby.create('GET user johndoe')
//   .post(URL + 'user/replace/',{ id: 1,
//     user_id: 'sxiong',
//     nickname: 'sxiong22',
//     telephone: '15172418244',
//     email: '1752884841@qq.com',
//     qq: '1752884841',
//     sex: '难',
//     city: '武汉',
//     portrait: 'eeee',
//     user_star: 'eeee',
//     act_star: 'eeeeee',
//     created_time: 0,
//     updated_time: 0 })
//   .expectStatus(200)
//   // .expectJSON(
//   //   [{ id: 1,
//   //   user_id: 'sxiong',
//   //   password: '123456',
//   //   login_x: '11',
//   //   login_y: '22',
//   //   created_time: 111111111111111,
//   //   updated_time: 11111111111111}]
//   //   )
// .toss();

// frisby.create('GET user johndoe')
//   .post(URL + 'user/update_user_star/',{user_id:'sxiong',user_star:'zch'})
//   .expectStatus(200)
//   // .expectJSON(
//   //   [{ id: 1,
//   //   user_id: 'sxiong',
//   //   password: '123456',
//   //   login_x: '11',
//   //   login_y: '22',
//   //   created_time: 111111111111111,
//   //   updated_time: 11111111111111}]
//   //   )
// .toss();

// frisby.create('GET user johndoe')
//   .post(URL + 'user/update_act_star/',{user_id:'sxiong',act_star:'活动1'})
//   .expectStatus(200)
//   // .expectJSON(
//   //   [{ id: 1,
//   //   user_id: 'sxiong',
//   //   password: '123456',
//   //   login_x: '11',
//   //   login_y: '22',
//   //   created_time: 111111111111111,
//   //   updated_time: 11111111111111}]
//   //   )
// .toss();

// frisby.create('GET user johndoe')
//   .post(URL + 'login/check/',{user_id:'sxiong'})
//   .expectStatus(200)
// .toss();

// frisby.create('GET user johndoe')
//   .post(URL + 'user/sendMail/',{email:'sxiong@hust.edu.cn'})
//   .expectStatus(200)
// .toss();


