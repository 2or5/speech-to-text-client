import { Component } from "react";
import { Toast } from "react-bootstrap";


export default class CreateNoteToast extends Component {
    render() {

        const toastCss = {
            position: 'fixed',
            top: '10px',
            right: '10px',
            zIndex: '1'
        };

        return (
            <div style={this.props.children.show ? toastCss : null}>
                <Toast className={`border text-white ${this.props.children.type === "success" ? "border-success bg-success" : "border-danger bg-danger"}`} show={this.props.children.show}>
                    <Toast.Header className={`text-white ${this.props.children.type === "success" ? "bg-success" : "bg-danger"}`} closeButton={false}>
                        <strong className="mr-auto">Success</strong>
                    </Toast.Header>
                    <Toast.Body>
                        {this.props.children.message}
                    </Toast.Body>
                </Toast>
            </div>
        );


    };
}