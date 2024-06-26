import "./TeachersList.css";
import editImage from './edit.png';
import deleteImage from './delete.png';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.js';
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import Button from 'react-bootstrap/Button';

export default function TeachersList(props) {
    var teachers = props.teachers;

    function deleteTeacher(takeIndex) {
        const updatedTeachers = teachers.filter((element, index) => index !== takeIndex);
        props.setTeachers(updatedTeachers);
        props.setNewTeacher(true);
    }

    return (
        <div className="cardContainer">
        <Card>
            <Card.Header>Teacher List</Card.Header>
            <ListGroup variant="flush">
                {
                    props.teachers.map((element, index) => (
                        <ListGroup.Item key={element.id} className="d-flex justify-content-between align-items-center">
                            {element.teacherName}
                            <Button variant="" size="sm" onClick={() => deleteTeacher(index)}>
                                <img src={deleteImage} alt="Delete" className="DeleteButtonIcon" />
                            </Button>
                        </ListGroup.Item>
                    ))
                }
            </ListGroup>
        </Card>
        </div>
    );
}
