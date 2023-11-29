import { faList } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, {Component} from "react";
import { Card, Table } from "react-bootstrap";

export default class NoteList extends Component {
        render () {
            return (
                <Card className="border border-dark bg-dark text-white">
                    <Card.Header><FontAwesomeIcon icon={faList}/> Your Notes</Card.Header>
                    <Card.Body>
                        <Table bordered hover striped variant="dark">
                            <thead>
                                <tr>
                                    <th>#</th>
                                    <th>Name</th>
                                    <th>Note</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr align="center">
                                    <td colSpan={6}>No Notes Avalible.</td>
                                </tr>
                            </tbody>
                        </Table>
                    </Card.Body>

                </Card>
            )
        }

}
