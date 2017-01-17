import React from 'react';
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
            <div className="col-sm-4"> 
              <img src="/images/ProfilePic.png" className="img-fluid img-circle"/>
            </div>
            <div className="col-sm-8"> 
              <div className="row"> 
                text
              </div>
              <div className="row">
                text2
              </div>
            </div>
          </div>
        </div>

    );
  }
});

export default ProfilePage;