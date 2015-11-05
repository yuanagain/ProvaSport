//
//  LoginViewController.swift
//  BlueAgent2
//
//  Created by W on 10/20/15.
//  Copyright © 2015 BlueAgent. All rights reserved.
//

import UIKit

class LoginViewController: UIViewController, UITextFieldDelegate {
    @IBOutlet weak var emailTextField: UITextField!
    
    @IBOutlet weak var passwordTextField: UITextField!
    
    @IBAction func forceLoginButtonPressed(sender: UIButton) {
        print("login button pressed")
        performSegueWithIdentifier("LoginSegue", sender: nil)
    }
    @IBAction func loginButtonPressed(sender: UIButton) {
        print("login button pressed")
        var success = true
        // validate email
        if (emailTextField.text == "") {
            success = false
            print("blank email")
            return
        }
        // validate password
        if (passwordTextField.text == "") {
            success = false
            print("invalid password")
            return
        }
        
        if (success) {
            loginWithEmail(emailTextField.text!, password: passwordTextField.text!)
            performSegueWithIdentifier("LoginSegue", sender: nil)
        }
    }
    
//    override func prepareForSegue(segue:(UIStoryboardSegue!), sender:AnyObject!)
//    {
//        if (segue.identifier == "LoginSegue")
//        {
//            print("segued")
//        }
//    }
    
    @IBAction func registerButtonPressed(sender: AnyObject) {
        print("register button pressed")
        var success = true
        // validate email
        if (emailTextField.text == "") {
            success = false
            print("blank email")
        }
        // validate password
        if (passwordTextField.text == "") {
            success = false
            print("invalid password")
        }
        
        if (success) {
            registerWithEmail(emailTextField.text!, password: passwordTextField.text!)
            performSegueWithIdentifier("LoginSegue", sender: nil)
        }
    }

    
    override func viewDidLoad() {
        super.viewDidLoad()
        // Do any additional setup after loading the view, typically from a nib.
        
        emailTextField.delegate = self
        passwordTextField.delegate = self
        
        var currentUser = PFUser.currentUser()
        if (currentUser != nil) {
            print("current user is non-nil")
            performSegueWithIdentifier("LoginSegue", sender: nil)
        } else {
            print("Current User IS Nil")
            // Show the signup or login screen
        }
        print("View Loaded Successfully")
    }
    // MARK: UITextFieldDelegate
    
    func textFieldShouldReturn(textField: UITextField) -> Bool {
        // Hide the keyboard.
        textField.resignFirstResponder()
        return true
    }
    //func textFieldDidEndEditing(textField: UITextField) {
        
    //}
    
    override func didReceiveMemoryWarning() {
        super.didReceiveMemoryWarning()
        // Dispose of any resources that can be recreated.
    }
    
    // MARK: LOGINS
    
    private func loginWithEmail(email:String, password:String) {
        PFUser.logInWithUsernameInBackground(email, password: password) {
            (user: PFUser?, error: NSError?) -> Void in
            if user != nil {
                // Do stuff after successful login.
                print("successful login")
            } else {
                // The login failed. Check error to see why.
                print("unsuccessful login")
            }
        }
    }
    
    private func registerWithEmail(email:String, password:String) {
        var user = PFUser()
        user.username = email
        user.password = password
        user.email = email
        // other fields can be set just like with PFObject
        user["phone"] = "415-392-0202"
        
        user.signUpInBackgroundWithBlock {
            (succeeded: Bool, error: NSError?) -> Void in
            if let error = error {
                let errorString = error.userInfo["error"] as! NSString
                // Show the errorString somewhere and let the user try again.
            } else {
                // Hooray! Let them use the app now.
            }
        }
    }


// ==== DEPRECATED ==== //

    private func loginWithFacebook() -> Void {
    let permissionArray = ["user_about_me", "uid", "email"]
    PFFacebookUtils.logInInBackgroundWithReadPermissions(permissionArray) { (user: PFUser?, error: NSError?) -> Void in
        guard let aUser = user else {
            print("Uh oh. The user cancelled the Facebook login.")
            return
        }
        
        if aUser.isNew {
            print("User signed up and logged in through Facebook!")
        } else {
            print("User logged in through Facebook!")
        }
        }
    }
}




