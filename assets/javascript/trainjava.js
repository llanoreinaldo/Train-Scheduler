var train = {
    name: ['Trenton', 'Salem, Oregon', 'Philadelphia', 'Atlanta', 'Midnight Carriage', 'Sing Sing Caravan', 'Boston Bus', 'California Caravan', "Analben's Train"],
    destination: ['Trenton', 'Salem, Oregon', 'Philadelphia', 'Atlanta', 'Boston', 'San Francisco', 'Florida'],
    frequency: [25, 3600, 15, 45, 65, 6000, 25],
    nextArrival: ['05:35 PM', '01:39 PM', '05:35 PM', '05:53 PM', '05:50 PM', '01:25 PM', '05:28 PM'],
    minutes: [10,1154, 10, 28, 25, 4740, 3]
}

/*
$(document).ready(function () {
    var date_input = $('input[name="date"]'); //our date input has the name "date"
    var container = $('.bootstrap-iso form').length > 0 ? $('.bootstrap-iso form').parent() :
        "body";
    var options = {
        format: 'mm/dd/yyyy',
        container: container,
        todayHighlight: true,
        autoclose: true,
    };
    date_input.datepicker(options);
})
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

// Variables
// ================================================================================

// Get a reference to the database service
var database = firebase.database();



//https://homework7-6d711.firebaseio.com/