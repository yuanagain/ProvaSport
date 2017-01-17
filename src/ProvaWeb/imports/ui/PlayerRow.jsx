// TODO: Add onclick action to submit button, hook to back end
import React from 'react';
import {Popover, 
        Tooltip, 
        Modal, 
        Image,
        Button, 
        OverlayTrigger} 
        from 'react-bootstrap';

class PlayerRow extends React.Component {
    constructor() {
      super();
    }

    render() {
      return (
        <div style={styles.playerbrick}>
          <div style={styles.im_container}>
            <Image  circle
                    style={styles.im}
                    src={"http://www.proprofs.com/quiz-school/topic_images/p18lq7ediepl816p6s04171vo23.jpg"} />          
          </div>

          <div style={styles.text_container}>
            <text style={styles.name}>Player Name</text>
            <br></br>
            <text style={styles.detail_text}>Details about Player</text>
          </div>


          <div style={styles.im_container}>
            <img  style={styles.im}
                  src={"http://www.proprofs.com/quiz-school/topic_images/p18lq7ediepl816p6s04171vo23.jpg"} />
          </div>

          <div style={styles.text_container}>
            <text style={styles.name}>Player Name</text>
            <br></br>
            <text style={styles.detail_text}>Details about Player</text>
          </div>
        </div>
      );
    }
}

var styles = {
  playerbrick: {
    display: 'flex',
    height: 50,
    padding: 2,
    width: '100%',
    flexDirection: 'row',
    backgroundColor: 'red',
    color: 'white',
    alignItems: 'flex-start',

  },

  text_container: {
    height: 46,
    backgroundColor: 'green',
    flexDirection: 'column',
    alignItems: 'flex-start',
    justifyContent: 'flex-start'
  },
  im: {
    height: 46,
    width: 46,
    borderRadius: 1,
  },

  im_container: {
    height: 46,
    width: 46,
    backgroundColor: 'blue'
  },

  name: {
    fontSize: 12,
    fontColor: "#626771",
    margin: 0,
    padding: 0,
    textDecoration: 'none',
  },

  detail_text: {
    fontSize: 8,
    fontColor: "#626771",
    margin: 0,
    padding: 0,
    textDecoration: 'none',
  },

  left:{
    display: 'flex',
    alignSelf: 'center',
    justifyContent: 'space-between',
  },
  right: {
    justifyContent: 'center',
  },
  border: {
    borderWidth: 1,
    borderColor: 'black',
  },
  matchrow: {
    display: 'flex',
    flexDirection: 'row',
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
    alignSelf: 'flex-end',
    margin: 1
  },
  center: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
}

module.exports = PlayerRow;