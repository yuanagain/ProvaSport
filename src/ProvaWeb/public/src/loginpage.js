// TODO: Add onclick action to submit button, hook to back end
class LoginPage extends React.Component {
    constructor() {
      super();
    }

    render() {
      return (
        <div className="container-fluid vertical-center">
          <div className='col-xs-12'>
            <img className="img-fluid center-block" alt="Responsive image" src = "../assets/Logo.png"/>
            <h1 className='ProvaSport'>ProvaSport</h1>
            <h3>Visionary Statement</h3>
            <form>
              <input type="emai" className="form-control" placeholder="Email" name="email"/><br/>
              <input type="password" className="form-control"placeholder="Password" name="password"/>
            </form>
            <div className="link">
              <a href="#">Forget your password?</a><br/><br/>
            </div>
            <button className="btn btn-default" type="submit">Sign In</button><br/><br/>
            <div className="centerLink">
              <a href="#">New to ProvaSport? Sign up here!</a>
            </div>
          </div>
        </div>
      );
    }
}

module.exports = LoginPage;