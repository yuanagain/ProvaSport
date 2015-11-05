//
//  AgentViewController.swift
//  BlueAgent2
//
//  Created by W on 11/2/15.
//  Copyright © 2015 BlueAgent. All rights reserved.
//

import UIKit

class AgentViewController: UIViewController {
    
    
    @IBOutlet weak var profileImageView: UIImageView!
    
    
    override func prepareForSegue(segue:(UIStoryboardSegue!), sender:AnyObject!)
        
    {
        if (segue.identifier == "feedContainer")
        {
            print("segued")
        }
    }
    
    
    
    override func viewDidLoad() {
        super.viewDidLoad()
        // Do any additional setup after loading the view, typically from a nib.
        var currentUser = PFUser.currentUser()
        if currentUser != nil {
            
            // performSegueWithIdentifier("loginSegue", sender: nil)
        } else {
            print("Current User Is Nil")
            // Show the signup or login screen
        }
    }
    
    override func didReceiveMemoryWarning() {
        super.didReceiveMemoryWarning()
        // Dispose of any resources that can be recreated.
    }
    
    
    
    func imagePickerController(picker: UIImagePickerController, didFinishPickingMediaWithInfo info: [String : AnyObject]) {
        // The info dictionary contains multiple representations of the image, and this uses the original.
        let selectedImage = info[UIImagePickerControllerOriginalImage] as! UIImage
        
        // Set photoImageView to display the selected image.
        profileImageView.image = selectedImage
        
        // Dismiss the picker.
        dismissViewControllerAnimated(true, completion: nil)
    }
}