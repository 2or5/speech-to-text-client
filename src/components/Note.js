import React, { Component } from "react";
import AudioRecording from "./AudioRecording/AudioRecording";
import MicRecorder from "mic-recorder-to-mp3";
import axios from "axios";
import { Card, Form, Button } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faPlusSquare } from "@fortawesome/free-solid-svg-icons";
const Mp3Recorder = new MicRecorder({ bitRate: 128 });

export default class Note extends Component {

  state = {
    title: "",
    baseAudio: "",
  };

  constructor(props){
    super(props);
    this.state = this.state;
    this.noteChange = this.noteChange.bind(this);
    this.submitNote = this.submitNote.bind(this);
  }

  noteChange = event => {
    this.setState({
      [event.target.name]:event.target.value
    });
    event.preventDefault();
  }

  state = {
    isRecording: false,
    blobUrl: "",
    isBlocked: false,
  };
  
  submitNote = event => {
    event.preventDefault();

    const note = {
      userId:"651c61e6de1460284ddef65b",
      name: this.state.title,
      base64: this.state.baseAudio
    };

    axios.post("http://localhost:8080/notes/create-note", note).then(response => {
      if(response.data != null){
        this.setState({title:'', isRecording: false, blobURL:'', baseAudio:''});
        alert("Note Saved");
      }
    });
  }

  componentDidMount() {
    navigator.getUserMedia(
      { audio: true },
      () => {
        console.log("Permission Granted");
        this.setState({ isBlocked: false });
      },
      () => {
        console.log("Permission Denied");
        this.setState({ isBlocked: true });
      }
    );
  }

  start = () => {
    if (this.state.isBlocked) {
      console.log("Permission Denied");
    } else {
      Mp3Recorder.start()
        .then(() => {
          this.setState({ isRecording: true });
        })
        .catch((e) => console.error(e));
    }
  };

  stop = () => {
    Mp3Recorder.stop()
      .getMp3()
      .then(async ([buffer, blob]) => {
        const blobURL = URL.createObjectURL(blob);
        const file = new File(buffer, "audio.mp3", {
          type: blob.type,
          lastModified: Date.now(),
        });
        let baseAudio = await this.audioToBase64(file);
        console.log("Base audio ====>", baseAudio);
        this.setState({ blobURL, isRecording: false, baseAudio});
      })
      .catch((e) => console.log(e));
  };

  audioToBase64 = async (audioFile) => {
    return new Promise((resolve, reject) => {
      let reader = new FileReader();
      reader.onerror = reject;
      reader.onload = (e) => resolve(e.target.result);
      reader.readAsDataURL(audioFile);
    });
  };

  render() {
    return (
      <Card className={"border border-dark bg-dark text-white"} style={{ marginTop: '37px' }}>
        <Card.Header><FontAwesomeIcon icon={faPlusSquare}/> Add your notation</Card.Header>
        <Form onReset={this.resetNote} onSubmit={this.submitNote} id="noteFormId">
          <Card.Body>
            <Form.Group>
              <Form.Label>Title note</Form.Label>
              <Form.Control required
                type="test"
                name="title"
                value={this.state.title}
                onChange={this.noteChange}
                className={"bg-dark text-white"}
                placeholder="Here enter your note name"
              />
            </Form.Group>
            <Form.Group>
                <Button name="record"
                value={this.state.record}
                onChange={this.noteChange}
                  className="h-16 w-16 rounded-full border-4 border-gray-400"
                  onClick={this.start}
                  disabled={this.state.isRecording}
                >
                  Record
                </Button>
                <Button name="stopRecord"
                  className="h-16 w-16 rounded-full border-4 border-gray-400"
                  onClick={this.stop}
                  disabled={!this.state.isRecording}
                >
                  Stop
                </Button>
                <audio src={this.state.blobURL} controls="controls" />
            </Form.Group>
          </Card.Body>
          <Card.Footer>
            <Button size="sm" variant="success" type="submit">
              Submit
            </Button>
          </Card.Footer>
        </Form>
      </Card>
    );
  }
}
