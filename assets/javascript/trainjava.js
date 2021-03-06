
  // Initialize Firebase
  var config = {
    apiKey: "AIzaSyAnj5CeVx-Xq3EhgIy32-B8Eow6it2QXbw",
    authDomain: "homework7-6d711.firebaseapp.com",
    databaseURL: "https://homework7-6d711.firebaseio.com",
    projectId: "homework7-6d711",
    storageBucket: "homework7-6d711.appspot.com",
    messagingSenderId: "610991110557"
  };

  firebase.initializeApp(config);
 
// 1. Link to Firebase
    var trainData = firebase.database(); //currently not sure it's working

    // Sets Initial variables for the database
    var trainName = ""
    var destination = ""
    var trainTimeInput = 'hh:mm A'
    var frequencyInput = 0


$(document).ready(function () {
    
    // 2. Button for adding Trains
    $("#submit").on("click", function () {

        // Grabs user inputs from text boxes and assign to variables
        var trainName = $("#trainName").val().trim();
        var destination = $("#destinationInput").val().trim();
        var trainTimeInput = moment($("#trainTimeInput").val().trim(), "HH:mm").subtract(1, "years").format("X");;
        var frequencyInput = $("#frequencyInput").val().trim();

        // Test for variables entered
        console.log(trainName);
        console.log(destination);
        console.log(trainTimeInput);
        console.log(frequencyInput);

        // Creates local "temporary" object for holding train data
        // Will push this to firebase
        var newTrain = {
            name: trainName,
            destination: destination,
            trainTime: trainTimeInput,
            frequency: frequencyInput,
        }

        // pushing trainInfo to Firebase
        trainData.ref().push(newTrain);

        // clear text-boxes
        $("#trainName").val("");
        $("#destinationInput").val("");
        $("#trainInput").val("");
        $("#frequencyInput").val("");

        // Prevents page from refreshing
        return false;
    });

    trainData.ref().on("child_added", function (childSnapshot, prevChildKey) {

        console.log(childSnapshot.val());

        // assign firebase variables to snapshots.
        var firebaseName = childSnapshot.val().name;
        var firebaseDestination = childSnapshot.val().destination;
        var firebaseTrainTimeInput = childSnapshot.val().trainTime;
        var firebaseFrequency = childSnapshot.val().frequency;
        var diffTime = moment().diff(moment.unix(firebaseTrainTimeInput), "minutes");
        var timeRemainder = moment().diff(moment.unix(firebaseTrainTimeInput), "minutes") % firebaseFrequency;
        var minutes = firebaseFrequency - timeRemainder;

        var nextTrainArrival = moment().add(minutes, "m").format("hh:mm A");

        // Test for correct times and info
        console.log(minutes);
        console.log(nextTrainArrival);
        console.log(moment().format("hh:mm A"));
        console.log(nextTrainArrival);
        console.log(moment().format("X"));

        // Append train info to table on page
        $("#trainTable > tbody").append("<tr><td>" + firebaseName + "</td><td>" + firebaseDestination + "</td><td>" + firebaseFrequency + " mins" + "</td><td>" + nextTrainArrival + "</td><td>" + minutes + "</td></tr>");

    });
});