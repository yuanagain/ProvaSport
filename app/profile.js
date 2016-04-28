import React from 'react';
import Newsfeed from './newsfeed'

import _cvals from './constants/customvals'

var data = [
  {winner: 'James Smith', loser: 'Jen Johnson', result: 'beat', sport: 'tennis', date: 'April 20, 2016', score_a: '5 4 3 2 1', score_b: '1 2 3 4 5', pic_a: 'http://facebook.github.io/react/img/logo_og.png', pic_b: 'http://facebook.github.io/react/img/logo_og.png'},
  {winner: 'Johnny Jones', loser: 'Jackie Anderson', result: 'lost to', sport: 'squash',  date: 'April 18, 2016', score_a: '5 4 3 2 1', score_b: '1 2 3 4 5', pic_a: 'http://facebook.github.io/react/img/logo_og.png', pic_b: 'http://facebook.github.io/react/img/logo_og.png'},
  {winner: 'Josh Watson', loser: 'Jill Jameson', result: 'tied', sport: 'soccer', date: 'April 16, 2016', score_a: '5 4 3 2 1', score_b: '1 2 3 4 5', pic_a: 'http://facebook.github.io/react/img/logo_og.png', pic_b: 'http://facebook.github.io/react/img/logo_og.png'},
  {winner: 'Jessie Wang', loser: 'Joe Arnolds', result: 'beat', sport: 'tennis', date: 'April 10, 2016', score_a: '5 4 3 2 1', score_b: '1 2 3 4 5', pic_a: 'http://facebook.github.io/react/img/logo_og.png', pic_b: 'http://facebook.github.io/react/img/logo_og.png'},
  {winner: 'James Smith', loser: 'Jen Johnson', result: 'beat', sport: 'tennis', date: 'April 20, 2016', score_a: '5 4 3 2 1', score_b: '1 2 3 4 5', pic_a: 'http://facebook.github.io/react/img/logo_og.png', pic_b: 'http://facebook.github.io/react/img/logo_og.png'},
  {winner: 'Johnny Jones', loser: 'Jackie Anderson', result: 'lost to', sport: 'squash',  date: 'April 18, 2016', score_a: '5 4 3 2 1', score_b: '1 2 3 4 5', pic_a: 'http://facebook.github.io/react/img/logo_og.png', pic_b: 'http://facebook.github.io/react/img/logo_og.png'},
  {winner: 'Josh Watson', loser: 'Jill Jameson', result: 'tied', sport: 'soccer', date: 'April 16, 2016', score_a: '5 4 3 2 1', score_b: '1 2 3 4 5', pic_a: 'http://facebook.github.io/react/img/logo_og.png', pic_b: 'http://facebook.github.io/react/img/logo_og.png'},
  {winner: 'Jessie Wang', loser: 'Joe Arnolds', result: 'beat', sport: 'tennis', date: 'April 10, 2016', score_a: '5 4 3 2 1', score_b: '1 2 3 4 5', pic_a: 'http://facebook.github.io/react/img/logo_og.png', pic_b: 'http://facebook.github.io/react/img/logo_og.png'},
  {winner: 'James Smith', loser: 'Jen Johnson', result: 'beat', sport: 'tennis', date: 'April 20, 2016', score_a: '5 4 3 2 1', score_b: '1 2 3 4 5', pic_a: 'http://facebook.github.io/react/img/logo_og.png', pic_b: 'http://facebook.github.io/react/img/logo_og.png'},
  {winner: 'Johnny Jones', loser: 'Jackie Anderson', result: 'lost to', sport: 'squash',  date: 'April 18, 2016', score_a: '5 4 3 2 1', score_b: '1 2 3 4 5', pic_a: 'http://facebook.github.io/react/img/logo_og.png', pic_b: 'http://facebook.github.io/react/img/logo_og.png'},
  {winner: 'Josh Watson', loser: 'Jill Jameson', result: 'tied', sport: 'soccer', date: 'April 16, 2016', score_a: '5 4 3 2 1', score_b: '1 2 3 4 5', pic_a: 'http://facebook.github.io/react/img/logo_og.png', pic_b: 'http://facebook.github.io/react/img/logo_og.png'},
  {winner: 'Jessie Wang', loser: 'Joe Arnolds', result: 'beat', sport: 'tennis', date: 'April 10, 2016', score_a: '5 4 3 2 1', score_b: '1 2 3 4 5', pic_a: 'http://facebook.github.io/react/img/logo_og.png', pic_b: 'http://facebook.github.io/react/img/logo_og.png'},
];

var Profile = React.createClass({
  render: function() {
    return (
      <div>
        <div className="profile" style={header}>
        </div>
        <div style={headerContents}>
          <div style={image}>
            <img src='http://facebook.github.io/react/img/logo_og.png' style={image}/>
          </div>
          <p style={name}> Jeremiah Jenkins </p>
        </div>
        <div style={content}>
          <InfoBlock/>
          <StatBlock/>
        </div>
        <div style={newsfeedContainer}>
          <p style={newsfeedTitle}> ACTIVITY </p>
          <Newsfeed data={data}/>
        </div>
      </div>
    );
  }
});

var InfoBlock = React.createClass({

  render: function() {
    return (
      <div style={infoBlock}>
        <p style={blockTitle}> PERSONAL INFO </p>
        <div style={info}>
          <InfoRow title="Location" contents="Princeton University"/>
          <InfoRow title="Sports" contents="SportBall, GameFrisbee"/>
          <InfoRow title="Availability" contents="24/7"/>
          <InfoRow title="Affiliations" contents="Princeton"/>
        </div>
      </div>
    );
  }
});

var StatBlock = React.createClass({

  render: function() {
    return (
      <div style={statBlock}>
        <p style={blockTitle}> STATS </p>
        <div style={stats}>
          <InfoRow title="Account" contents="$$$$"/>
          <InfoRow title="Experience" contents="Over 9000"/>
          <InfoRow title="Friends" contents="24"/>
          <InfoRow title="Trophies" contents="0 :("/>
        </div>
      </div>
    );
  }
});

var InfoRow = React.createClass({

  render: function() {
    return (
      <div style={infoRow}>
        <div style={rowTitle}>
          <p style={rowTitleText}> {this.props.title}</p>
        </div>
        <div style={rowContents}>
          <p style={rowContentsText}> {this.props.contents} </p>
        </div>
      </div>

    );
  }
});

var titleFontSize = 24;
var leftMargin = 35;

var header = {
  width: window.innerWidth,
  height: 125,
  backgroundColor: 'gray',
  position: 'relative',
  zIndex: -1,
  marginLeft: -60
};

var headerContents = {
  marginLeft: leftMargin,
  marginTop: -85,
  zIndex: 1,
}

var image = {
  width: 150,
  height: 150,
  borderRadius: 75,
  backgroundColor: 'black',
};

var name = {
  fontFamily: _cvals.mainfont,
  color: 'white',
  fontSize: 36,
  paddingLeft: 175,
  marginTop: -150,
};

var content = {
  marginTop: 100,
  marginLeft: leftMargin,
  display: 'block',
};

var infoBlock = {
  float: 'left',
  display: 'block',
}

var info = {
  width: 350,
  backgroundColor: _cvals.skbackground,
  float: 'left',
  paddingBottom: 15,
}

var statBlock = {
  display: 'inline-block',
  paddingLeft: 75,
}

var stats = {
  width: 350,
  backgroundColor: _cvals.skbackground,
  float: 'right',
  paddingBottom: 15,
}

var blockTitle = {
  fontColor: 'white',
  fontFamily: _cvals.mainfont,
  fontSize: titleFontSize,
  paddingBottom: 10,
}

var infoRow = {
  paddingBottom: 0,
  display: 'block',
  clear: 'both',
}

var rowTitle = {
  float: 'left',
  paddingRight: 10,
}

var rowTitleText = {
  fontFamily: _cvals.mainfont,
  fontSize: 18,
  paddingLeft: 20,
  fontWeight: 700
}

var rowContents = {
  float: 'left',
  paddingRight: 10,
}

var rowContentsText = {
  fontSize: 18,
  fontFamily: _cvals.mainfont,
}

var newsfeedContainer = {
  paddingLeft: 5,
  marginTop: 20,
}

var newsfeedTitle = {
  fontFamily: _cvals.mainfont,
  fontSize: titleFontSize,
  paddingLeft: leftMargin,
  paddingTop: 25,
}


//ReactDOM.render(
//  <Profile/>,
//  document.getElementById('profile_container')
//);
export default Profile;