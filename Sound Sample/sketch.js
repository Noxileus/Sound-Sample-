let startContext, samples, sampler, button1, button2, delTimeSlider, feedbackSlider, distSlider;

let dist = new Tone.Distortion(0).toDestination();
let del = new Tone.FeedbackDelay(0, 0).connect(dist);
del.wet.value = 0.5;

function preload(){
  //sampler = new Tone.Player("media/dog.mp3").toDestination()
  samples = new Tone.Players({
    drum: "media/drum.mp3",
    guitar: "media/guitar.mp3",
    melody: "media/melody.mp3", 
    space: "media/space.mp3"
  }).connect(del)
}

function setup() {
  createCanvas(400, 400);
  startContext = createButton("Start Audio Context");
  startContext.position(100,0);
  startContext.mousePressed(startAudioContext);
  button1 = createButton("Play Drum Sample");
  button1.position(10, 30);
  button2 = createButton("Play Guitar Sample");
  button2.position(200,30);
  button1.mousePressed(() => {samples.player("drum").start()});
  button2.mousePressed(() => samples.player("guitar").start());
  button3 = createButton("Play Space Music");
  button3.position(10,300);
  button3.mousePressed(() => {samples.player("space").start()});
  button4 = createButton("Play Melody Music");
  button4.position(200,300);
  button4.mousePressed(() => {samples.player("melody").start()});
  delTimeSlider = createSlider(0, 1, 0, 0.01)
  delTimeSlider.position(10,100);
  delTimeSlider.input(() => {del.delayTime.value = delTimeSlider.value()});
  feedbackSlider = createSlider(0, 0.99, 0, 0.01);
  feedbackSlider.position(200, 100);
  feedbackSlider.input(() => {del.feedback.value = feedbackSlider.value()});
  distSlider = createSlider(0, 10, 0, 0.01);
  distSlider.position(110, 200);
  distSlider.input(() => {dist.distortion = distSlider.value()});
}

function draw() {
  background(220);
  text("Delay Time: " + delTimeSlider.value(),15, 90);
  text("Feedback Amount: " + feedbackSlider.value(), 205, 90);
  text("Distortion Amount: " + distSlider.value(), 120, 190);
}
function startAudioContext(){
  if(Tone.context.state != 'running'){
    Tone.start();
    console.log("Audio Context Started");
  } else{
    console.log("Audio Context is already running");
  }
}