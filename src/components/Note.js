import React, { Component } from "react";
import AudioRecording from "./AudioRecording/AudioRecording";
import MicRecorder from 'mic-recorder-to-mp3';
const Mp3Recorder = new MicRecorder({ bitRate: 128 });

export default class Note extends Component {
    state = {
        isRecording: false,
        blobUrl: '',
        isBlocked: false,
    }

    componentDidMount() {
        navigator.getUserMedia({ audio: true },
            () => {
                console.log('Permission Granted');
                this.setState({ isBlocked: false });
            },
            () => {
                console.log('Permission Denied');
                this.setState({ isBlocked: true })
            },
        );
    }

    start = () => {
        if (this.state.isBlocked) {
          console.log('Permission Denied');
        } else {
          Mp3Recorder
            .start()
            .then(() => {
              this.setState({ isRecording: true });
            }).catch((e) => console.error(e));
        }
      };

      stop = () => {
        Mp3Recorder
          .stop()
          .getMp3()
          .then(async ([buffer, blob]) => {
            const blobURL = URL.createObjectURL(blob)
            const file = new File(buffer, 'audio.mp3', {
                type: blob.type,
                lastModified: Date.now()
              });
            let baseAudio = await this.audioToBase64(file);
            console.log("Base audio ====>", baseAudio)  
            this.setState({ blobURL, isRecording: false });
          }).catch((e) => console.log(e));
      };
      audioToBase64 = async(audioFile) =>{
        return new Promise((resolve, reject) =>{
            let reader = new FileReader();
            reader.onerror = reject;
            reader.onload = (e) => resolve(e.target.result);
            reader.readAsDataURL(audioFile);
        });
      }

    render() {
        return (
            <div><button className="h-16 w-16 rounded-full border-4 border-gray-400" onClick={this.start} disabled={this.state.isRecording}>
                record
            </button>
                <button className="h-16 w-16 rounded-full border-4 border-gray-400" onClick={this.stop} disabled={!this.state.isRecording}>
                    Stop
                </button>
                <audio src={this.state.blobURL} controls="controls" /></div>

        )
    }
}
