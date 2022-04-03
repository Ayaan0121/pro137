var SpeechRecognition=window.webkitSpeechRecognition;
var recognition=new SpeechRecognition();
status="";
input="";
objects=[];
var synth = window.speechSynthesis;
function setup() {
    canvas=createCanvas(470 ,370);
    canvas.center();
    video=createCapture(VIDEO);
    video.hide();
}

function start() {
    objectDetector= ml5.objectDetector('cocossd', modelLoaded);
    document.getElementById("status").innerHTML="Status : Detecting Objects";
    input= document.getElementById("lol").value;
    console.log(input);


}
function modelLoaded() {
    console.log('Model Loaded');
    status=true;
}

function gotResults(error , results) {
    console.log(results);
    objects=results;
}

function draw() {
    image(video , 0 , 0 ,470 ,370);
        if (status != "") {
          objectDetector.detect(video , gotResults)
            for (i = 0; i < objects.length; i++) {
            pc=Math.floor(objects[i].confidence * 100);
            label=objects[i].label;
            fill('#0000FF');
            text(label + " " + pc +"%" , objects[i].x + 3, objects[i].y + 10);

           
            noFill();
            stroke('#0000FF');
            rect( objects[i].x,  objects[i].y ,  objects[i].width ,  objects[i].height)
            if (input == label) {
                video.stop()
                document.getElementById("status").innerHTML="Mention Object Found";
                speak();
        }else{
            document.getElementById("status").innerHTML="Mention Not Object Found";   
        }
           
            }
        }

     
 } 

 function speak() {
    synth = window.speechSynthesis;
    speak_data ="Mentioned Object Found";
    utterThis = new SpeechSynthesisUtterance(speak_data);
    synth.speak(utterThis);
 }