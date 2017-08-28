import React, { Component } from 'react'
import { ref, firebaseAuth } from 'C:/Users/Duwan_000/Documents/GitHub/react-router-firebase-auth/src/config/constants'
import * as firebase from "firebase"

export default class ImageUpload extends Component {
  constructor(props) {
    super(props);
    this.state = {file: '', imagePreviewUrl: ''};
  }

  _handleSubmit(e) {
    e.preventDefault();
    const user = firebaseAuth().currentUser
    console.log(user.uid)

    //Get Element
    var uploader = document.getElementById("uploader")

    // Create a root reference
    var storageRef = firebase.storage().ref();

var file = this.state.file

    // Create the file metadata
var metadata = {
  contentType: 'image/jpeg'
};

// Upload file and metadata to the object 'images/mountains.jpg'
var uploadTask = storageRef.child('profilePics/' + file.name).put(file, metadata);

// Listen for state changes, errors, and completion of the upload.
uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED, // or 'state_changed'
  function(snapshot) {
    // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
    var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        uploader.value = percentage;
    console.log('Upload is ' + progress + '% done');
    switch (snapshot.state) {
      case firebase.storage.TaskState.PAUSED: // or 'paused'
        console.log('Upload is paused');
        break;
      case firebase.storage.TaskState.RUNNING: // or 'running'
        console.log('Upload is running');
        break;
    }
  }, function(error) {

  // A full list of error codes is available at
  // https://firebase.google.com/docs/storage/web/handle-errors
  switch (error.code) {
    case 'storage/unauthorized':
      // User doesn't have permission to access the object
      break;

    case 'storage/canceled':
      // User canceled the upload
      break;

    case 'storage/unknown':
      // Unknown error occurred, inspect error.serverResponse
      break;
  }
}, function() {
  // Upload completed successfully, now we can get the download URL
  var downloadURL = uploadTask.snapshot.downloadURL;
});


    //
    //

    // console.log( this.state.file.name)
    // //console.log(this.state.file)
    // var storageRef = firebase.storage().ref('prof_pics/'+ this.state.file.name)
    //
    // //Upload
    // var task = storageRef.put(this.state.file)

  //   //Update progress bar
  //   task.on('state_changed',
  //
  //     function progress(snapshot) {
  //       var percentage = (snapshot.bytesTransferred /
  //       snapshot.totalBytes) * 100;
  //       uploader.value = percentage;
  //       console.log(percentage)
  //     }
  //
  //   //  error(err){}
  //
  // //    complete(){}
  //
  // )

    //ref.child(`users/${user.uid}/personal-info`).update({profPic: this.state.file})

    console.log('handle uploading-', this.state.file);
  }

  _handleImageChange(e) {
    e.preventDefault();

    let reader = new FileReader();
    let file = e.target.files[0];

    reader.onloadend = () => {
      this.setState({
        file: file,
        imagePreviewUrl: reader.result
      });
    }

    reader.readAsDataURL(file)
  }

  render() {
    let {imagePreviewUrl} = this.state;
    let $imagePreview = null;
    if (imagePreviewUrl) {
      $imagePreview = (<img src={imagePreviewUrl} />);
    } else {
      $imagePreview = (<div className="previewText">Please select an Image for Preview</div>);
    }

    return (
      <div className="previewComponent">
        <form onSubmit={(e)=>this._handleSubmit(e)}>
          <input className="fileInput"
            type="file"
            onChange={(e)=>this._handleImageChange(e)} />
          <button className="submitButton"
            type="submit"
            onClick={(e)=>this._handleSubmit(e)}>Upload Image</button>
        </form>
        <progress value="0" max="100" id="uploader">0%</progress>
        <div className="imgPreview">
          {$imagePreview}
        </div>
      </div>
    )
  }
}
