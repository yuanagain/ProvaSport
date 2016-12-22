var require = meteorInstall({"client":{"template.main.js":function(){

////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                        //
// client/template.main.js                                                                //
//                                                                                        //
////////////////////////////////////////////////////////////////////////////////////////////
                                                                                          //
                                                                                          // 1
Template.body.addContent((function() {                                                    // 2
  var view = this;                                                                        // 3
  return HTML.Raw('<div id="render-target"></div>');                                      // 4
}));                                                                                      // 5
Meteor.startup(Template.body.renderToDocument);                                           // 6
                                                                                          // 7
////////////////////////////////////////////////////////////////////////////////////////////

},"main.js":["react","meteor/meteor","react-dom","../imports/ui/loginpage.jsx",function(require,exports,module){

////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                        //
// client/main.js                                                                         //
//                                                                                        //
////////////////////////////////////////////////////////////////////////////////////////////
                                                                                          //
var React;module.import('react',{"default":function(v){React=v}});var Meteor;module.import('meteor/meteor',{"Meteor":function(v){Meteor=v}});var render;module.import('react-dom',{"render":function(v){render=v}});var LoginPage;module.import('../imports/ui/loginpage.jsx',{"default":function(v){LoginPage=v}});
                                                                                          // 2
                                                                                          // 3
                                                                                          //
                                                                                          // 5
                                                                                          //
Meteor.startup(function () {                                                              // 7
  render(React.createElement(LoginPage, null), document.getElementById('render-target'));
});                                                                                       // 9
////////////////////////////////////////////////////////////////////////////////////////////

}]},"imports":{"ui":{"loginpage.jsx":["babel-runtime/helpers/classCallCheck","babel-runtime/helpers/possibleConstructorReturn","babel-runtime/helpers/inherits","react",function(require,exports,module){

////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                        //
// imports/ui/loginpage.jsx                                                               //
//                                                                                        //
////////////////////////////////////////////////////////////////////////////////////////////
                                                                                          //
var _classCallCheck;module.import('babel-runtime/helpers/classCallCheck',{"default":function(v){_classCallCheck=v}});var _possibleConstructorReturn;module.import('babel-runtime/helpers/possibleConstructorReturn',{"default":function(v){_possibleConstructorReturn=v}});var _inherits;module.import('babel-runtime/helpers/inherits',{"default":function(v){_inherits=v}});var React;module.import('react',{"default":function(v){React=v}});
                                                                                          //
                                                                                          //
// TODO: Add onclick action to submit button, hook to back end                            // 1
                                                                                          // 2
                                                                                          //
var LoginPage = function (_React$Component) {                                             //
  _inherits(LoginPage, _React$Component);                                                 //
                                                                                          //
  function LoginPage() {                                                                  // 5
    _classCallCheck(this, LoginPage);                                                     // 5
                                                                                          //
    return _possibleConstructorReturn(this, _React$Component.call(this));                 // 5
  }                                                                                       // 7
                                                                                          //
  LoginPage.prototype.render = function () {                                              //
    function render() {                                                                   //
      return React.createElement(                                                         // 10
        'div',                                                                            // 11
        { className: 'container-fluid vertical-center' },                                 // 11
        React.createElement(                                                              // 12
          'div',                                                                          // 12
          { className: 'col-xs-12' },                                                     // 12
          React.createElement('img', { className: 'img-fluid center-block', alt: 'Responsive image', src: '/images/Logo.png' }),
          React.createElement(                                                            // 14
            'h1',                                                                         // 14
            { className: 'ProvaSport' },                                                  // 14
            'ProvaSport'                                                                  // 14
          ),                                                                              // 14
          React.createElement(                                                            // 15
            'h3',                                                                         // 15
            null,                                                                         // 15
            'Visionary Statement'                                                         // 15
          ),                                                                              // 15
          React.createElement(                                                            // 16
            'form',                                                                       // 16
            null,                                                                         // 16
            React.createElement('input', { type: 'emai', className: 'form-control', placeholder: 'Email', name: 'email' }),
            React.createElement('br', null),                                              // 17
            React.createElement('input', { type: 'password', className: 'form-control', placeholder: 'Password', name: 'password' })
          ),                                                                              // 16
          React.createElement(                                                            // 20
            'div',                                                                        // 20
            { className: 'link' },                                                        // 20
            React.createElement(                                                          // 21
              'a',                                                                        // 21
              { href: '#' },                                                              // 21
              'Forget your password?'                                                     // 21
            ),                                                                            // 21
            React.createElement('br', null),                                              // 21
            React.createElement('br', null)                                               // 21
          ),                                                                              // 20
          React.createElement(                                                            // 23
            'button',                                                                     // 23
            { className: 'btn btn-default', type: 'submit' },                             // 23
            'Sign In'                                                                     // 23
          ),                                                                              // 23
          React.createElement('br', null),                                                // 23
          React.createElement('br', null),                                                // 23
          React.createElement(                                                            // 24
            'div',                                                                        // 24
            { className: 'centerLink' },                                                  // 24
            React.createElement(                                                          // 25
              'a',                                                                        // 25
              { href: '#' },                                                              // 25
              'New to ProvaSport? Sign up here!'                                          // 25
            )                                                                             // 25
          )                                                                               // 24
        )                                                                                 // 12
      );                                                                                  // 11
    }                                                                                     // 30
                                                                                          //
    return render;                                                                        //
  }();                                                                                    //
                                                                                          //
  return LoginPage;                                                                       //
}(React.Component);                                                                       //
                                                                                          //
module.exports = LoginPage;                                                               // 33
////////////////////////////////////////////////////////////////////////////////////////////

}]}}},{"extensions":[".js",".json",".html",".jsx",".css"]});
require("./client/template.main.js");
require("./client/main.js");