(function(){
    emailjs.init("user_uRgqxkrM4dia9KLmJYU9C");
 })();

// TODO: Replace the following with your app's Firebase project configuration
// For Firebase JavaScript SDK v7.20.0 and later, `measurementId` is an optional field
//using firebase apps:sdkconfig in cmd
const firebaseConfig = {
    apiKey: "AIzaSyDVdcjQPnxo-6Z9A97-05hsgsCzDmBEDuI",
    authDomain: "theemeralddungeon.firebaseapp.com",
    databaseURL: "https://theemeralddungeon-default-rtdb.firebaseio.com", 
    projectId: "theemeralddungeon",
    storageBucket: "theemeralddungeon.appspot.com",
    messagingSenderId: "707974775258",
    appId: "1:707974775258:web:3e506bb1861a56fabc00e3",
    measurementId: "G-56CMGRV9EP"
  };
  
  // Initialize Firebase
 firebase.initializeApp(firebaseConfig);

function ShowAndHideDetail(message) {
    var x = document.getElementById("myDIV");
    if (x.style.display === "none") {
        x.style.display = "block";
    } else {
      //  x.style.display = "none";
    }
    x.innerHTML = message;
}

function ValidateContactForm() {
    var mistressName = document.getElementById("MistressName");
    var yourName = document.getElementById("YourName");
    var yourEmail = document.getElementById("YourEmail"); 
    var commDate = document.getElementById("CommencementDate"); 
    var location = document.getElementById("Location"); 

    if(mistressName.value === "" || yourName.value === "" || yourEmail.value === "" || commDate.value === "" || location.value === "" )
    {
        ShowAndHideDetail("One or more fields is empty. Pls fill all data.");
    }
    else{
        ShowAndHideDetail("Processing...");
        //let app = firebase.app();
        //var database = firebase.database();
        // firebase.database().ref('/path/to/ref').on('value', snapshot => { });

            // A post entry.
            var postData = {
            mistressName: mistressName.value,
            yourName: yourName.value,
            yourEmail: yourEmail.value,
            commDate: commDate.value,
            location: location.value
            };
          
            // Get a key for a new Post.
            var newPostKey = firebase.database().ref().child('posts').push().key;
          
            // Write the new post's data simultaneously in the posts list and the user's post list.
            var updates = {};
            updates['/posts/' + newPostKey] = postData;
          
        
         firebase.database().ref().update(updates
        /*firebase.database().ref('users/').set({
            mistressName: mistressName.value,
            yourName: yourName.value,
            commDate: commDate.value,
            location: location.value}*/
            , (error) => {
            if (error) {
              // The write failed...
        ShowAndHideDetail("Unable to submit your data. Pls check network and try again.");
            } 
            else 
            {
                // Data saved successfully!
                 ShowAndHideDetail("Your data has been successfully submitted");

                //send mail https://dashboard.emailjs.com/admin (oluwasegunababatunde)
                var templateParams = {
                    message: 'Mistress name : ' + mistressName.value + ', Your name : ' + yourName.value + ', Your Email Address : ' + yourEmail.value + ', Commencement Date : ' + commDate.value + ', Location of Choice : ' + location.value 
                };
                emailjs.send('service_w6d38xg', 'template_74s3fll', templateParams)
                    .then(function(response) {
                       console.log('SUCCESS!', response.status, response.text);
                       
                       mistressName.value="";
                       yourName.value = "";
                       commDate.value = "";
                       location.value = "";
                       yourEmail.value = "";
                    }, function(error) {
                       console.log('FAILED...', error);
                    });  
            }
          });          
    }
}
