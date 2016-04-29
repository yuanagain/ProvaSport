import * as User from '../modules/userdata'

var getSettings = function() {
  return (
  {
    "sports": ['Tennis', 'Basketball', 'Soccer', 'Squash',
               'Badminton', 'Football', 'Baseball', 'Other'],
    "teamCts": [2,3,4,5,6,7,8,9,10,11,12,13,14,15,16],
    "eventTypes": ["Elimination", "Round Robin"],
    "countries": ["USA", "Canada", "Mexico"]
  }
  )
};

module.exports = {getSettings};