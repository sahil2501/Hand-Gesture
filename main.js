prediction_1 = "";
prediction_2 = "";
Webcam.set({
    width:350,
    height:300,
    png:"png",
    png_quality:90
});
camera = document.getElementById("camera");
Webcam.attach("#camera");

function take_snapshot(){
    Webcam.snap(function(data_uri){
        document.getElementById("result").innerHTML = "<img id = 'camera_display' src = " + data_uri + ">";
    });
}
console.log("ml5.version", ml5.version);
classifier = ml5.imageClassifier("https://teachablemachine.withgoogle.com/models/1a1-2-4B_/model.json",modelLoaded);
function modelLoaded() {
    console.log("Model Loaded!");
}

function speak() {
    var synth = window.speechSynthesis;
    speak_data = "Predicter thinks you are saying " + prediction_1 + ". Or you are saying" + prediction_2 + ".";
    var utterThis = new SpeechSynthesisUtterance(speak_data);
    utterThis.rate = 0.5;
    synth.speak(utterThis);
}

function predict_gesture() {
    img = document.getElementById("camera_display");
    classifier.classify(img, gotResults);
}
function gotResults(error,results) {
    if (error) {
        console.error(error);
    }
    else {
        console.log(results);
        document.getElementById("result_emotion_name1").innerHTML = results[0].label;
        document.getElementById("result_emotion_name2").innerHTML = results[1].label;
        prediction_1 = results[0].label;
        prediction_2 = results[1].label;
        speak();
        if (results[0].label == "Bonjour") {
           document.getElementById("update_emoji").innerHTML = "&#128075";
        }
        if (results[0].label == "Victory") {
           document.getElementById("update_emoji").innerHTML = "&#9996";
        }
        if (results[0].label == "Nothing") {
           document.getElementById("update_emoji").innerHTML = "&#9994";
        }
        if (results[0].label == "Okay") {
           document.getElementById("update_emoji").innerHTML = "&#128076";
        }
    }
}


//https://teachablemachine.withgoogle.com/models/1a1-2-4B_/