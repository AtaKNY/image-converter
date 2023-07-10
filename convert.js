const sharp = require('sharp');
const ffmpegInstaller = require("@ffmpeg-installer/ffmpeg");
const ffprobe = require("@ffprobe-installer/ffprobe");

const ffmpeg = require("fluent-ffmpeg")()
  .setFfprobePath(ffprobe.path)
  .setFfmpegPath(ffmpegInstaller.path);

const webpFilePath = '2.webp';
const mp4FilePath = 'output.mp4';
const gifPath = 'output.gif';


const convert = async () => {
    sharp(webpFilePath, { animated: true,limitInputPixels: false })
    .toFormat('gif')
    .resize(500, 500)
    .toFile(gifPath)
    .then(function(info) {
        console.log(info);
    }
    )
    .catch(function(err) {
        console.log(err);
    }
    );
}


const convert2 = async () => {
    ffmpeg
    .input(gifPath)
    .noAudio()
    .output(mp4FilePath)
    .on("end", () => {
      console.log("Finished");
    })
    .on("error", (e) => console.log(e))
    .run();
}


convert2();