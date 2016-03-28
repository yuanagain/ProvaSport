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
  /* Creates trophy object and loads a data from Firebase */
  constructor(trophyid) {
    let this.trophy.trophyid = trophyid; //might need to define getInitState
  }

  /*
   * Private method for the trophy class trying to load the JSON object from Firbase
   * into the trpophy object
   * Usage: this.load()
   */
  function load() {
    trophy = Firebase.get("/Trophy/"+ trophy.trophyid);
  }
  /*Usage: this.getName()
    Description: returns name of trophy object */
  function getName() {
    return trophy.name;
  }
  /*
   * Usage: this.getDescription()
   * Description: returns trophy's description text
   */
  function getDescription() {
    return trophy.description;
  }
  /* 
   * Usage: getThumbnail()
   * Description: returns trophy thumbnail as an Image tag
   */
  function getThumbnail() {
    var imgURL = trophy.thumbnail;
    return <Image src=imgURL />
  }
  /*
   * Usage: this.getThumbnail(string style)
   * Description: takes in a string representing the image's style and returns the
   * trophy's thumbnail with that style
   */
  function getThumbnail(style) {
    var imgURL = trophy.thumbnail;
    return <Image 'style'=style src=imgURL/>
  }
}
