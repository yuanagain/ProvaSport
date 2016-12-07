// TODO: Add onclick action to submit button, hook to back end
class LoginPage extends React.Component {
    constructor() {
      super();
    }

    render() {
      return (
        <div className="container-fluid">
          <div className='col-sm-12'>
            <img src = "../assets/Logo.png"/>
            <h1 className='ProvaSport'>ProvaSport</h1>
            <h3>Visionary Statement</h3>
            <form>
              <input type="emai" name="email"/><br/>
              <input type="password" name="password"/><br/>
            </form>

          </div>
          <div className="col-sm-4 col-offset-8">
              <a href="#">Forgot your password?</a><br/>
          </div>
          <div className='col-sm-12'>
            <button className="btn btn-default">Submit</button><br/> 
          </div>
          <div className="col-sm-4 col-offset-8">
            <a href="#">New to ProvaSport? Sign up here!</a>
          </div>
        </div>
      );
    }
}

module.exports = LoginPage;