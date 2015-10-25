//
//  ViewController.swift
//  BlueAgent2
//
//  Created by W on 10/20/15.
//  Copyright © 2015 BlueAgent. All rights reserved.
//

import UIKit

class ViewController: UIViewController {
    
    override func viewDidLoad() {
        super.viewDidLoad()
        // Do any additional setup after loading the view, typically from a nib.
    }
    
    override func didReceiveMemoryWarning() {
        super.didReceiveMemoryWarning()
        // Dispose of any resources that can be recreated.
    }
    
    @IBAction func loginButtonTapped(sender: AnyObject) {
        self.loginWithFacebook()
    }
    
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

