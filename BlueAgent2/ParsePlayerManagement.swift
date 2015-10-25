//
//  ParsePlayerManagement.swift
//  BlueAgent2
//
//  Created by W on 10/23/15.
//  Copyright © 2015 BlueAgent. All rights reserved.
//

import Foundation


class parsePlayerController {
    var name = "name"
    var age = "age"
    
    
    func load() {
        
    }
    // array of tournaments
    
    // profile picture
    
    // load user data
    
    // User: profile picture
    //
    
    // update data
    
    // recursive, so you should not point to other players, just their username?
    
}

// Methods

// Update Stats

// =====================================

// TOURNAMENT



// =====================================

// SIGNUP: dummy
func myMethod() {
    var user = PFUser()
    user.username = "myUsername"
    user.password = "myPassword"
    user.email = "email@example.com"
    // other fields can be set just like with PFObject
    user["phone"] = "415-392-0202"
    
    user.signUpInBackgroundWithBlock {
        (succeeded: Bool, error: NSError?) -> Void in
        if let error = error {
            let errorString = error.userInfo?["error"] as? NSString
            // Show the errorString somewhere and let the user try again.
        } else {
            // Hooray! Let them use the app now.
        }
    }
}
