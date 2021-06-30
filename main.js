sounding = "";
objects = [];
status = "";

function preload() {
    sounding = loadSound("babycry.mp3");
}

function setup() {
    canvas = createCanvas(640, 420);
    canvas.center();
    video = createCapture(VIDEO);
    video.size(640, 420);
    video.hide();
    objectDetector = ml5.objectDetector('cocossd', modelLoaded);
    document.getElementById("status").innerHTML = "Status : Detecting Baby";
}


function modelLoaded() {
    console.log("Model Loaded!");
    status = true;
}

function draw() {
    image(video, 0, 0, 640, 420);
    if (status != "") {
        objectDetector.detect(video, gotResult);
        for (i = 0; i < objects.length; i++) {
            document.getElementById("status").innerHTML = "Status : Baby Detected";
            fill("#FF0000");
            percent = floor(objects[i].confidence * 100);
            text(objects[i].label + " " + percent + "%", objects[i].x + 15, objects[i].y + 15)
            noFill();
            stroke("#FF0000");
            rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);
            if (objects[i].label == "person") {
                document.getElementById("number_of_obj").innerHTML = "Baby found";
                sounding.stop();
                console.log("Stoped");
            } else {
                document.getElementById("number_of_obj").innerHTML = "Baby not found";
                sounding.play();
                console.log("Playing");
            }
        }
        if (objects.length == 0) {
            document.getElementById("number_of_obj").innerHTML = "Baby not found";
            sounding.play();
            console.log("Playing");
        }
    }
}
