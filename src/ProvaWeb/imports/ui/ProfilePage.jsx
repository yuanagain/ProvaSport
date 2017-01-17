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
      
        <div className="container-fluid vertical-center" style={styles}>
          <div className="col-xs-12">
            <div className="row" stlye={topSection}>
              <div className="col-xs-4"> 
                <img src="/images/ProfilePic.jpg" className="profilePic img img-circle"/>
                Placeholder Name
              </div>
              <div className="col-xs-8"> 
                <div className="row"> 
                  <div className="col-xs-4">
                    <h5>16</h5>
                    <h5>Level</h5>
                  </div>
                  <div className="col-xs-4">
                    <h5>$36.4m</h5>
                    <h5>Net worth</h5>
                  </div>
                  <div className="col-xs-4">
                    <h5>Soccer</h5>
                    <h5>Sport</h5>
                  </div>
                </div>
                <div className="row">
                  <div className="col-xs-offset-1 col-xs-10">
                    <button type="button" className="btn btn-primary" style={buttonStlyes}>Quick Match</button>
                  </div>
                </div>
              </div>
            </div>

            <div className="row" style={gamificationStyles}>
              <br></br><br></br>
              <p>Gamifiction Aspect</p>
              <p>Avatar / Home Gym / Accomplishments</p>
            </div>
          
          <div className="actionsGrid">
            <table style={tableStyles}>
              <tbody>
                <tr>
                  <td style={border}>1</td>
                  <td style={border}>2</td>
                  <td style={border}>3</td>
                </tr>
                <tr>
                  <td style={border}>4</td>
                  <td style={border}>5</td>
                  <td style={border}>6</td>
                </tr>
              </tbody>
            </table>
          </div>

        </div>
      </div>

    );
  }
});

const topSection = {
  height: '25vh',
}

const tableStyles = {
  height: '42vh',
  width: "100%",
  border: '.3em solid #C5C5C5',
}

const border = {
    border: '.3em solid #C5C5C5',
}


const styles = {
  textAlign: 'center',
}

const buttonStlyes = {
  marginTop: '1.2em',
  marginBottom: '1.2em',
}

const gamificationStyles = {
  backgroundColor: '#B5E0F4',
  color: "#fff",
  height: '40vh',
  minHeight: '35vh',
}

export default ProfilePage;