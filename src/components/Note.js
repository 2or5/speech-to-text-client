import React, { Component } from "react";
import AudioRecording from "./AudioRecording/AudioRecording";
import MicRecorder from "mic-recorder-to-mp3";
import axios from "axios";
import { Card, Form, Button } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPaperPlane,
  faPlus,
  faPlusSquare,
} from "@fortawesome/free-solid-svg-icons";
import CreateNoteToast from "./CreateNoteToast";
const Mp3Recorder = new MicRecorder({ bitRate: 128 });

export default class Note extends Component {
  state = {
    title: "",
    baseAudio: "",
  };

  constructor(props) {
    super(props);
    this.state = this.state;
    this.state.show = false;
    this.noteChange = this.noteChange.bind(this);
    this.submitNote = this.submitNote.bind(this);
  }

  noteChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    });
    event.preventDefault();
  };

  state = {
    isRecording: false,
    blobUrl: "",
    isBlocked: false,
  };

  submitNote = (event) => {
    event.preventDefault();

    const note = {
      userId: "65549678dcc07762fc7b5200",
      name: this.state.title,
      base64: this.state.baseAudio,
    };

    axios
      .post("http://localhost:8080/notes/create-note", note)
      .then((response) => {
        if (response.data != null) {
          this.setState({ show: true });
          setTimeout(() => this.setState({ show: false }), 6000);
        } else {
          this.setState({ show: false });
        }
      });
    this.setState({
      title: "",
      isRecording: false,
      blobURL: "",
      baseAudio: "",
    });
  };

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
        this.setState({ blobURL, isRecording: false, baseAudio });
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
      <div>
        <div style={{ display: this.state.show ? "block" : "none" }}>
          <CreateNoteToast
            children={{
              show: this.state.show,
              message: "Note Saved Successfully.",
              type: "success",
            }}
          />
        </div>
        <Card
          className={"border border-dark bg-dark text-white"}
          style={{ marginTop: "37px" }}
        >
          <Card.Header>
            <FontAwesomeIcon icon={faPlusSquare} /> Add your notation
          </Card.Header>
          <Form
            onReset={this.resetNote}
            onSubmit={this.submitNote}
            id="noteFormId"
          >
            <Card.Body>
              <Form.Group style={{ textAlign: "center" }}>
                <Form.Label style={{ marginBottom: "10px", display: "block" }}>
                  Title Note
                </Form.Label>
                <Form.Control
                  required
                  type="text"
                  name="title"
                  value={this.state.title}
                  onChange={this.noteChange}
                  className={"bg-dark text-white"}
                  style={{ width: "660px", height: "38px", margin: "auto" }}
                  placeholder="Here enter your note name"
                />
              </Form.Group>
              <Form.Group style={{ marginTop: "35px", textAlign: "center" }}>
                <audio
                  style={{ margin: "auto", display: "block", color: "black" }}
                  src={this.state.blobURL}
                  controls="controls"
                />
                <Button
                  name="record"
                  style={{
                    borderRadius: "45%",
                    marginTop: "25px",
                    width: "250px",
                    height: "50px",
                  }}
                  value={this.state.record}
                  onChange={this.noteChange}
                  variant="light"
                  onClick={this.start}
                  disabled={this.state.isRecording}
                >
                  Record
                </Button>
                <Button
                  name="stopRecord"
                  variant="light"
                  style={{
                    borderRadius: "45%",
                    marginTop: "25px",
                    width: "250px",
                    height: "50px",
                  }}
                  onClick={this.stop}
                  disabled={!this.state.isRecording}
                >
                  Stop
                </Button>
              </Form.Group>
            </Card.Body>
            <Card.Footer>
              <Button
                variant="light"
                type="submit"
                style={{
                  width: "150px",
                  height: "39px",
                  marginLeft: "auto",
                  display: "block",
                }}
              >
                <FontAwesomeIcon icon={faPaperPlane} /> Send
              </Button>
            </Card.Footer>
          </Form>
        </Card>
      </div>
    );
  }
}
