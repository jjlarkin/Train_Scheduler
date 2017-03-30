/**
 *
 * Train Scheduler
 *
 *
 *
 */


var config = {
    apiKey: "AIzaSyBMOUKW0M-cqh_OKMXcZCX4ftjmiY3NZPY",
    authDomain: "jamestest1-86e31.firebaseapp.com",
    databaseURL: "https://jamestest1-86e31.firebaseio.com",
    storageBucket: "jamestest1-86e31.appspot.com",
    messagingSenderId: "1299912564"
};

firebase.initializeApp(config);

var database = firebase.database();

var train;
var destination = "";
var firstTrain = "00/00/0000";
// var firstTrainFormatted;
var frequency = 0;

$("#add-train").on("click", function(event) {
    event.preventDefault();

    train = $("#train-input").val().trim();
    destination = $("#destination-input").val().trim();
    firstTrain = moment(firebase.database.ServerValue.TIMESTAMP).format('MM/DD/YYYY');
    // firstTrainFormatted =
    // console.log('formatted ' +firstTrainFormatted)
    console.log('First Train ' +firstTrain);
    frequency = $("#frequency-input").val().trim();
    console.log('Train '+train);
    console.log('Destination '+destination);
    console.log('First Train '+ firstTrain);
    console.log('frequency '+frequency);
    database.ref().push({
        train: train,
        destination: destination,
        firstTrain: firstTrain,
        frequency: frequency
    });
    //empty fields
    $("#train-input").val("");
    $("#destination-input").val("");
    $("#frequency-input").val("");
}); // end on click submit

database.ref().on("child_added", function(childSnapshot) {

    // Log everything that's coming out of snapshot
    // console.log(childSnapshot.val().name);
    // console.log(childSnapshot.val().name);
    // console.log(childSnapshot.val().email);
    // console.log(childSnapshot.val().age);
    // console.log(childSnapshot.val().comment);
    // console.log(childSnapshot.val().joinDate);

    // full list of items to the well


    $("#train-display").append("<div class='well'><span id='train' class='col-xs-3'> " + childSnapshot.val().train +
        " </span><span id='destination'class='col-xs-2'> " + childSnapshot.val().destination +
        " </span><span id='first-train'class='col-xs-2'> " + childSnapshot.val().firstTrain +
        " </span><span id='monthly-rate'class='col-xs-2'> " + childSnapshot.val().frequency + " </span></div>");

    // Handle the errors
}, function(errorObject) {
    console.log("Errors handled: " + errorObject.code);
});

database.ref().orderByChild("firstTrain").limitToLast(1).on("child_added", function(snapshot) {

    // Change the HTML to reflect
    $("#name-display").html(snapshot.val().train);
    $("#email-display").html(snapshot.val().destination);
    $("#age-display").html(snapshot.val().firstTrain);
    $("#comment-display").html(snapshot.val().frequency);
});


