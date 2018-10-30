  // Initialize Firebase
  var config = {
    apiKey: "AIzaSyBCA1fjNR-uBmGh7gP4ZeN1luQ0cWueg1U",
    authDomain: "train-a9561.firebaseapp.com",
    databaseURL: "https://train-a9561.firebaseio.com",
    projectId: "train-a9561",
    storageBucket: "train-a9561.appspot.com",
    messagingSenderId: "618574763146"
  };
  firebase.initializeApp(config);


var dataRef = firebase.database();

    
    // Capture Button Click
    $("#add-train-btn").on("click", function(event) {
      event.preventDefault();

    
      // Code storing and retrieving the most recent user.
      // Don't forget to provide initial data to your Firebase database.
      var train = $("#train-input").val().trim();
      var destination = $("#destination-input").val().trim();
      var frequency = $("#frequency-input").val().trim();
      var time = $("#time-input").val().trim();
      //var next = $("#next-input").val().trim();
      //var minutesAway = $("#minutesAway-input").val().trim();
      //console.log(train , destination , time , frequency);
      var newTrain = {
         train: train,
         destination: destination,
         frequency: frequency,
         time: Date.now(), 
      }

      console.log('New train ====>', newTrain)
      // Code for the push
      dataRef.ref().push({
        train: train,
        destination: destination,
        frequency: frequency,
        time: Date.now(),
        //next: next,
        //dateAdded: firebase.database.ServerValue.TIMESTAMP
      });
    });

    // Firebase watcher + initial loader HINT: This code behaves similarly to .on("value")
    dataRef.ref().on("child_added" , function(childSnapshot) {

      // Log everything that's coming out of snapshot
      console.log("Snapshot response ===>", childSnapshot.val())
      // console.log(childSnapshot.val().train);
      // console.log(childSnapshot.val().destination);
      // console.log(childSnapshot.val().frequency);
      // console.log(childSnapshot.val().time);
      // console.log(childSnapshot.val().next);
      // console.log(childSnapshot.val().minutesAway);
      

      // full list of items to the well
      // $("#train-table").append("<div class='well'><span class='member-train'> " +
      //   childSnapshot.val().train +
      //   " </span><span class='member-destination'> " + childSnapshot.val().destination +
      //   " </span><span class='member-time'> " + 
      //   childSnapshot.val().frequency +
      //   " </span></div>"); +
      //   childSnapshot.val().time +
      //   " </span><span class='member-frequency'> " + 
      //   childSnapshot.val().next +
      //   " </span></div>"); +
      //   childSnapshot.val().minutesAway +
      //   " </span></div>");

      // Handle the errors
    });
    

    dataRef.ref().orderByChild("dateAdded").limitToLast(1).on("child_added", function(snapshot) {
      // Change the HTML 
      $("#train").text(snapshot.val().train);
      $("#destination").text(snapshot.val().destination);
      $("#frequency").text(snapshot.val().frequency);
      $("#time").text(snapshot.val().time);
      $("#next").text(snapshot.val().next);
      $("#minutesAway").text(snapshot.val().minutesAway);
      
    });
