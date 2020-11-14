
/*
//var userArray = JSON.parse(profileArray);
//console.log(profileArray);
let currentUser;

//alert("Loaded Users.kms");

var loginButton = document.getElementById('loginButton');
var registerButton = document.getElementById('registerButton');

function doesExist(newUser) {
  let doesExist = profileArray.forEach(item => {
    if (item.username === newUser.username) {
      return true;
    }
  })
}

function createUser(newUser){
  if(newUser.name == null || newUser.password == null){
    return null;
  }
  if (doesExist(newUser)){
    return null;
  }
  newUser.status = "offline";
  newUser.private = false;
  newUser.friendsList = [];
  newUser.games = [];
  newUser.gameHistory = [];
  newUser.totalPlayed = 0;
  newUser.totalWin = 0;
  newUser.totalLoss = 0;
  newUser.totalDraw = 0;

  profileArray.push(newUser)
  console.log("New user created.");
}

loginButton.onclick = function login() {
  var username = document.getElementById('uname');
  var password = document.getElementById('psw');
  var userFlag = false;
  var passFlag = false;
  console.log();("This is working.");
  if(profileArray.length != 0) {
    for (user in profileArray) {
      console.log("Executed.");
      if (user.username == username) {
        userFlag = true;
      }
      if (user.password == password) {
        passFlag = true;
      }
      if (userFlag && passFlag) {
        user.status = "online";
        currentUser = user;
        //export const currentUser;
        console.log("logged in as user " + username);
      }
    }
    if (passFlag == false && userFlag == true) {
      console.log("Incorrect Password");
    } else if(userFlag == false) {
      console.log("Username \"" + username + "\" not found.")
    }
  }
}
*/
