//cleanup.js
/* check the local data storage and see if there is a duplicate  */
/*
 *
 * Imports
 */
import * as User from '../modules/userdata'
import * as Player from '../modules/player'
import * as Team from '../modules/team'
import * as Tournament '../modules/tournament'
import * as Trophy from '../modules/trophy'
import * as Match from '../modules/match'


import Store from 'react-native-store';
const DB = {
  "user": User.default_user,
  "player": Player.default_player
}
