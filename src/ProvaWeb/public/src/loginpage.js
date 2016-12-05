class LoginPage extends React.Component {
    constructor() {
      super();
    }

    render() {
      return (
        <div>
          <img src = "../assets/Logo.png"/>
          <h1>ProvaSport</h1>
          <h3>Visionary Statement</h3>
          <form>
            <input type="emai" name="email"/><br/>
            <input type="password" name="password"/><br/>
          </form>
          <a href="#">Forgot your password?</a><br/>
          <button>Submit</button><br/>
          <a href="#">New to ProvaSport? Sign up here!</a>
        </div>
      );
    }
}

ReactDOM.render(
  <LoginPage />,
  document.getElementById('content')
);

module.exports = LoginPage;