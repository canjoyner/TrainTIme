
// Initialize Firebase
  var config = {
    apiKey: "AIzaSyDPlpJnQdLHKKjFur30_Z6HDsHnKjCaZF8",
    authDomain: "traintime-ce91c.firebaseapp.com",
    databaseURL: "https://traintime-ce91c.firebaseio.com",
    projectId: "traintime-ce91c",
    storageBucket: "",
    messagingSenderId: "748718137177"
  };
    firebase.initializeApp(config);

    

var name = "";
var destination = "";
var time= 0;
var frequency = 0;

var database = firebase.database();
$("#submit").on("click", function(event){
	console.log("click me")
	event.preventDefault();
	name =$("#name").val().trim();
	destination =$("#destination").val().trim(); 
	time =$("#time").val().trim();
	frequency =$("#frequency").val().trim();
	
	database.ref().push({
		name:name,
		destination:destination,
		time:time,
		frequency:frequency,
		dateAdded: firebase.database.ServerValue.TIMESTAMP
	})
})





database.ref().on("child_added", function(childSnapshot) {
// console.log(childSnapshot.val().name);
	var workTime = childSnapshot.val().time;
	var workFrequency = childSnapshot.val().frequency;

	var workTimeCon = moment(workTime,"hh:mm").subtract(1,"years");
	var currentTime = moment();
	var elapse= moment().diff(moment(workTimeCon),"minutes");
	var remainder = elapse % workFrequency;

	var minUntilTrain = workFrequency%remainder;

	var nextTrain = moment().add(minUntilTrain,"minutes").format("hh:mm");
	console.log(minUntilTrain)
	 
	

		$("#list").append(
			"<div class='well'><span id='addName'> " + childSnapshot.val().name +
		        " </span><span id='addDestination'> " + childSnapshot.val().destination +
		        " </span><span id='nextTime'> " + nextTrain +
		        " </span><span id='addFrequency'> " + childSnapshot.val().frequency +
		        " </span><span id='nextTime'> " + minUntilTrain +
		        " </span></div>")
		;
})


