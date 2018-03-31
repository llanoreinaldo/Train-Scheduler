var train = {
        name: ['Trenton', 'Salem, Oregon', 'Philadelphia', 'Atlanta', 'Midnight Carriage', 'Sing Sing Caravan', 'Boston Bus', 'California Caravan', "Analben's Train"],
        destination: ['Trenton', 'Salem, Oregon', 'Philadelphia', 'Atlanta', 'Boston', 'San Francisco', 'Florida'],
        frequency: [25, 3600, 15, 45, 65, 6000, 25],
        nextArrival: ['05:35 PM', '01:39 PM', '05:35 PM', '05:53 PM', '05:50 PM', '01:25 PM', '05:28 PM'],
        minutes: [10, 1154, 10, 28, 25, 4740, 3]
    },
    defaultApp = firebase.initializeApp(config),

    defaultDatabase = firebase.database();


/*<th scope="row">3</th>
      <td>Larry</td>
      <td>the Bird</td>
      <td>@twitter</td>
*/


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
//https://homework7-6d711.firebaseio.com/

// Variables
// ================================================================================

// Creates a variable to reference the database service
var database = firebase.database();

// connectionsRef references a specific location in our database.
// All of our connections will be stored in this directory.
var connectionsRef = database.ref("/connections");

// When the client's connection state changes...
var connectedRef = database.ref(".info/connected");


// When the client's connection state changes...
connectedRef.on("value", function (snap) {

    // If they are connected..
    if (snap.val()) {

        // Add user to the connections list.
        var con = connectionsRef.push(true);
        // Remove user from the connection list when they disconnect.
        con.onDisconnect().remove();
    }
});


// If any errors are experienced, log them to console.
// ------------------------------------
// Initial Values
var initialBid = 0;
var initialBidder = "No one :-(";
var highPrice = initialBid;
var highBidder = initialBidder;

// --------------------------------------------------------------
// At the initial load, get a snapshot of the current data.
database.ref("/bidderData").on("value", function (snapshot) {

    // If Firebase has a highPrice and highBidder stored (first case)
    if (snapshot.child("highBidder").exists() && snapshot.child("highPrice").exists()) {

        // Set the initial variables for highBidder equal to the stored values.
        highBidder = snapshot.val().highBidder;
        highPrice = parseInt(snapshot.val().highPrice);

        // Change the HTML to reflect the initial value
        $("#highest-bidder").text(snapshot.val().highBidder);
        $("#highest-price").text("$" + snapshot.val().highPrice);

        // Print the initial data to the console.
        console.log(snapshot.val().highBidder);
        console.log(snapshot.val().highPrice);
    }

    // Keep the initial variables for highBidder equal to the initial values
    else {

        // Change the HTML to reflect the initial value
        $("#highest-bidder").text(highBidder);
        $("#highest-price").text("$" + highPrice);
        // Print the initial data to the console.
        console.log("Current High Price");
        console.log(highBidder);
        console.log(highPrice);
    }

    // If any errors are experienced, log them to console.
}, function (errorObject) {
    console.log("The read failed: " + errorObject.code);
});



// --------------------------------------------------------------
// Whenever a user clicks the click button
$("#submit").on("click", function (event) {
    event.preventDefault();

    // Get the input values
    var name = $("#name").val().trim();
    var destination = $("#destination").val().trim();
    var time = parseInt($("#time").val().trim());
    var frequency = parseInt($("#frequency").val().trim());

    // Log the data values input by the user in the console
    console.log(name);
    console.log(destination);
    console.log(time);
    console.log(frequency);
    if (bidderPrice > highPrice) {

        // Save the train details in Firebase
        database.ref("/trainData").set({
            trainname: name,
            traindestination: destination,
            traintime: time,
            trainfrequency: frequency
        });

        // Log the new High Price
        console.log("New High Price!");
        console.log(nextArrival);
        console.log(minutesAway);

        // Store the new high price and bidder name as a local variable (could have also used the Firebase variable)
        highBidder = bidderName;
        highPrice = parseInt(bidderPrice);

        // Change the HTML to reflect the new high price and bidder
        $("#next-arrival").text(nextArrival);
        $("#minutes-away").text(minutesAway);
    }

});