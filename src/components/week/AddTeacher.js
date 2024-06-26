import "./AddTeacher.css";
import { useState } from "react";
import { Modal, Button, Form } from 'react-bootstrap';

export default function AddTeacher(props) {
    const [teacherName, setTeacherName] = useState("John Cena");
    const [teacherSubjects, setTeacherSubjects] = useState("Math, Science");
    const [teacherWeekdays, setTeacherWeekdays] = useState("Monday, Tuesday, Wednesday, Thursday, Friday, Saturday");
    const [teacherPeriods, setTeacherPeriods] = useState("1, 9");
    const [teacherClasses, setTeacherClasses] = useState("1st Grade, 2nd Grade, 3rd Grade, 4th Grade, 5th Grade, 6th Grade, 7th Grade, 8th Grade");

    return (
        <Modal show={true} onHide={props.cancelTeacher} centered>
            <Modal.Header closeButton>
                <Modal.Title>Please add the following details</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form className="AddTeacherform">
                    <Form.Group controlId="formTeacherName">
                        <Form.Label>Teacher Name</Form.Label>
                        <Form.Control type="text" value={teacherName} onChange={(e) => setTeacherName(e.target.value)} />
                    </Form.Group>
                    <Form.Group controlId="formTeacherSubjects">
                        <Form.Label>Teacher Subjects</Form.Label>
                        <Form.Control type="text" value={teacherSubjects} onChange={(e) => setTeacherSubjects(e.target.value)} />
                    </Form.Group>
                    <Form.Group controlId="formTeacherWeekdays">
                        <Form.Label>Teacher Weekdays</Form.Label>
                        <Form.Control type="text" value={teacherWeekdays} onChange={(e) => setTeacherWeekdays(e.target.value)} />
                    </Form.Group>
                    <Form.Group controlId="formTeacherPeriods">
                        <Form.Label>Teacher Period Time(<i>Add Starting and End Period Numbers</i>)</Form.Label>
                        <Form.Control type="text" value={teacherPeriods} onChange={(e) => setTeacherPeriods(e.target.value)} />
                    </Form.Group>
                    <Form.Group controlId="formTeacherClasses">
                        <Form.Label>Teacher Classes Availability</Form.Label>
                        <Form.Control type="text" value={teacherClasses} onChange={(e) => setTeacherClasses(e.target.value)} />
                    </Form.Group>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={props.cancelTeacher}>Cancel</Button>
                <Button variant="primary" onClick={() => props.addTeacher(teacherName, teacherSubjects, teacherWeekdays, teacherPeriods, teacherClasses)}>Add Teacher</Button>
            </Modal.Footer>
        </Modal>
    );
}
