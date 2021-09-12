// More API functions here:
// https://github.com/googlecreativelab/teachablemachine-community/tree/master/libraries/pose

// the link to your model provided by Teachable Machine export panel
const URL = "https://teachablemachine.withgoogle.com/models/flmvFrw9F/";
let model, webcam, ctx, labelContainer, maxPredictions;

let jump = new KeyboardEvent("keydown", {
  key: "dot",
  keyCode: 110, // example values.
  code: "DotKey", // put everything you need in this object.
  which: 110,
  shiftKey: false, // you don't need to include values
  ctrlKey: false,  // if you aren't going to use them.
  metaKey: false   // these are here for example's sake.
});

async function init() {
  const modelURL = URL + "model.json";
  const metadataURL = URL + "metadata.json";

  // load the model and metadata
  // Refer to tmImage.loadFromFiles() in the API to support files from a file picker
  // Note: the pose library adds a tmPose object to your window (window.tmPose)
  model = await tmPose.load(modelURL, metadataURL);
  maxPredictions = model.getTotalClasses();

  // Convenience function to setup a webcam
  const width = 224;
  const height = 224;
  const flip = true; // whether to flip the webcam
  webcam = new tmPose.Webcam(width, height, flip); // width, height, flip
  await webcam.setup(); // request access to the webcam
  await webcam.play();
  window.requestAnimationFrame(loop);
  ring(2); // đang chạy
  // append/get elements to the DOM
  const canvas = document.getElementById("canvas");
  canvas.width = width; canvas.height = height;
  ctx = canvas.getContext("2d");
}

async function loop(timestamp) {
  webcam.update(); // update the webcam frame
  await predict();
  window.requestAnimationFrame(loop);
}

async function predict() {
  // Prediction #1: run input through posenet
  // estimatePose can take in an image, video or canvas html element
  const { pose, posenetOutput } = await model.estimatePose(webcam.canvas);
  // Prediction 2: run input through teachable machine classification model
  const prediction = await model.predict(posenetOutput);

  if (prediction[0].probability >= 0.5) {
    document.dispatchEvent(jump);
    ring(1); // đang nhảy
  } else {
    ring(2); // đang chạy
  }

  // finally draw the poses
  drawPose(pose);
}

function drawPose(pose) {
  if (webcam.canvas) {
    ctx.drawImage(webcam.canvas, 0, 0);
    // draw the keypoints and skeleton
    if (pose) {
      const minPartConfidence = 0.5;
      tmPose.drawKeypoints(pose.keypoints, minPartConfidence, ctx);
      tmPose.drawSkeleton(pose.keypoints, minPartConfidence, ctx);
    }
  }
}