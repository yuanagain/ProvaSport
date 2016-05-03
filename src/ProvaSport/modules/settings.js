import * as User from '../modules/userdata'
/*
  SETINGS object
  acccess each field in the main app by calling:
  Settings.config.attribute
  represents what we support
  input data validation
 */
var config =
  {
    "sports": ['Tennis', 'Basketball', 'Soccer', 'Squash',
               'Badminton', 'Football', 'Baseball', 'Other', 'DodgeBall'],
    "teamCts": [2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,
    			20,21,22,23,24,25,26,27,28,29,30,31,32],

    "teamCts_rr": [2,3,4,5,6],
    "teamCts_elim": [2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,
    			20,21,22,23,24,25,26,27,28,29,30,31,32],
    "eventTypes": ["Elimination", "Round Robin"],
    "countries": ["USA", "Canada", "Mexico"]
};

module.exports = {config};
