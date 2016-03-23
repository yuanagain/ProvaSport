var Firebase = require("firebase");
/*Firbase data base Url with pre-set object types and accepting these defined JSON objects*/
Firebase = new Firebase("FirebaseURL/resource");
/*player object within Player class*/
class Trophy {
  var trophy = {
    "trophyid": -1,
    "name": "(string)",
    "description": "",
    "thumbnail": "",
  };
  constructor(trophyid) {
    let this.state.trophyid = trophyid; //might need to define getInitState
  }
  function load() {

  }
  function getName() {
    return
  }
  function getDescription() {}
  function getThumbnail() {
    return <Image >
  }
  function getThumbnail(style) {
    return <Image 'style'=style>
  }
}
