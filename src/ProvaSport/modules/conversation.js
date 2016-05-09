//conversation.js
 var messagedb = require('firebase');
 messagedb = new Firebase('https://provamessenger.firebaseio.com/');

/* create a newMessage in an existing conversation
 * input message object with the form:
 {
       userid: player.userid,
       text: message.text,
       date: Date.now(),
 }
 * @returns true for successfull PUT in DB
 */
function newMessage(convoid, messageobj){
  var newmessage = messagedb.child(convoid).push();
  return new Promise(function(resolve, reject) {
    newmessage.set(messageobj, function(error) {
         if (error) {
          reject(false);
         }
         else {
          resolve(true);
         }
    });
  }).catch(function(error) {
      console.log(error);
  });
}
/*AFTER do this:
.then(function(value) {
  if (value) {
    this.MessagePage.setMessageStatus('Sent', rowID);
  }
  else {
    this._MessagePage.setMessageStatus('ErrorButton', rowID);
  }
})

************************ TESTING *****************************
newMessage("-KH7fNn7a7zMoME_j49W", {
  userid: 0,
  text: "Why hello There",
  date: Date.now(),
}).then(resp=>{console.log("saved message");})*/



/* create a newConversation in an existing conversation
 * input WelcomeMessage so messages aren't empty
 * @returns true for successfull PUT in DB
 */
function newConversation(){

  return new Promise(function(resolve, reject) {
    var newConvo = messagedb.push();
    newConvo.set({
      "WelcomeMessage" : {
        "date": 0,
        "text": "Hey there! thanks for using ProvaSport Messenger! good luck on your matches!",
        "userid": -1
      }
    }, function(error) {
       if (error) {
        reject();
       }
       else {
        resolve(newConvo.key());
       }
    });
  }).catch(function(error) {
      console.log("Error in newConversation(), conversation.js line: 53, " + error);
  });
}
/*
 * newConversation().then(resp=>{
 *   console.log("NEW CONVO");
 *   console.log(resp);
 * })
 */

/* get the messages associated with the convoid
 * @returns a message obj list.
 * @params: convoid - conversation id of messages grabbing
 *          playerid - view point of user grabbing conversation
 */
function getMessages(convoid, playerid) {
  return new Promise(function(resolve, reject) {
    var messagelist = [];
    //child added
    messagedb.child(convoid).orderByChild('date').once("value", function(snapshot) {

     	snapshot.forEach(function(childSnapshot) {
     		var text = childSnapshot.child("text").val();
     		var userid = String(childSnapshot.child("userid").val());
     		var date = childSnapshot.child("date").val();
     		var position = 'left';

     		if (userid === playerid) {
     			position = 'right';
     		}
     		var messagedata = {
     			"userid" : userid,
     			"text" : text,
     			"date" : date,
     			"position" : position,
     		};
   		  messagelist.push(messagedata);
  	   });
      resolve(messagelist);
    });
  }).catch(function(err) {
    console.log("Could Not Read Messages of convo "+ convoid + "\n Error: "+err);
  });
}


/* get the messages associated with the convoid
 * @returns a message obj list.
 * @params: convoid - conversation id of messages grabbing
 *          playerid - view point of user grabbing conversation
 */
function getMessagesLimited(convoid, playerid, limit = 1) {
  return new Promise(function(resolve, reject) {
    var messagelist = [];
    messagedb.child(convoid).orderByChild('date').limitToLast(limit).once("value", function(snapshot) {

     	snapshot.forEach(function(childSnapshot) {
     		var text = childSnapshot.child("text").val();
     		var userid = String(childSnapshot.child("userid").val());
     		var date = childSnapshot.child("date").val();
     		var position = 'left';

     		if (userid === playerid) {
     			position = 'right';
     		}
     		var messagedata = {
     			"userid" : userid,
     			"text" : text,
     			"date" : date,
     			"position" : position,
     		};
   		  messagelist.push(messagedata);
  	   });
      resolve(messagelist);
    });
  }).catch(function(err) {
    console.log("Could Not Read Messages of convo "+ convoid + "\n Error: "+err);
  });
}
/*
 * getMessagesLimited("-KH7fNn7a7zMoME_j49W", '0').then(list=>{
 *   console.log(list);
 * })
 */

var WelcomeMessage = {
  date: 0,
  text: "Hey there! thanks for using ProvaSport Messenger! good luck on your matches!",
  userid: -1
};

module.exports = {newMessage, newConversation, getMessages, getMessagesLimited};
