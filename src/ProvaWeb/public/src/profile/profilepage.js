// Yuan Wang
// profilepage.js
// Copyright ProvaSport 2016

var React = require('react');
var ReactDOM = require('react-dom');

var ProfilePage = React.createClass({

  getInitialState: function() {
    return {data: []};
  },

  componentDidMount: function() {
    //this.loadCommentsFromServer();
    //setInterval(this.loadCommentsFromServer, this.props.pollInterval);
  },

  render: function() {
    return (
      
        <div className="container-fluid">
          <div className="row">
            <div className="col-sm-4"> {/* Picture and name*/}
              <img src="../../assets/ProfilePic.jpg" className="img-fluid img-circle"/>
            </div>
            <div className="col-sm-8"> {/*The stats and shit, quick game button*/}
              <div className="row"> {/*Stats and titles*/}
                text
              }
              </div>
              <div className="row"> {/*This row is for the quick game button according to mockup*/}
                text2
              }
              </div>
            </div>
          </div>
        </div>

    );
  }
});


var style_3 = {
  color: 'orange',
};

export default ProfilePage;
