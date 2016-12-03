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
            <input type="emai" name="email"/>
            <input type="password" name="password"/>
          </form>
          <a href="#">Forgot your password?</a>
          <button type="submit"/>
          <h1>New to ProvaSport? Sign up here!</h1>
        </div>
      );
    }
}

ReactDOM.render(
  <LoginPage />,
  document.getElementById('content')
);

module.exports = LoginPage;