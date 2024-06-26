import { useState, useEffect } from "react";
import { Modal, Button, Form, InputGroup } from 'react-bootstrap';

export default function SubjectConstraint(props) {
    const [maxValues, setMaxValues] = useState(new Map());
    const [minValues, setMinValues] = useState(new Map());
    const minMaxClassesPerSubject = props.minMaxClassesPerSubject;

    useEffect(() => {
        const initialMaxValues = new Map();
        const initialMinValues = new Map();
        minMaxClassesPerSubject.forEach((value, key) => {
            initialMaxValues.set(key, value.max);
            initialMinValues.set(key, value.min);
        });
        setMaxValues(initialMaxValues);
        setMinValues(initialMinValues);
    }, [minMaxClassesPerSubject]);

    function handleMaxChange(subject, value) {
        setMaxValues(new Map(maxValues.set(subject, value)));
    }

    function handleMinChange(subject, value) {
        setMinValues(new Map(minValues.set(subject, value)));
    }

    function isChanged(subject) {
        return maxValues.get(subject) !== minMaxClassesPerSubject.get(subject).max ||
            minValues.get(subject) !== minMaxClassesPerSubject.get(subject).min;
    }

    function handleConstraintChange(subject) {
        const updatedValue = {
            min: minValues.get(subject),
            max: maxValues.get(subject)
        };
        console.log(updatedValue)
        props.setSubConstraint(subject, updatedValue);
    }


    return (
        <>
            <Modal show={true} onHide={props.cancelSubjectConstraintBox} centered>
                <Modal.Header closeButton>
                    <Modal.Title>Change Subject Constraints</Modal.Title>
                </Modal.Header>

                <Modal.Body>
                    {
                        Array.from(minMaxClassesPerSubject.entries()).map(([subject, { min, max }]) => (
                            <InputGroup className="mb-3" key={subject}>
                                <InputGroup.Text>{subject}</InputGroup.Text>
                                <InputGroup.Text id="basic-addon1">Max</InputGroup.Text>
                                <Form.Control
                                    placeholder={max}
                                    aria-label="Max"
                                    aria-describedby="basic-addon1"
                                    type="number"
                                    value={maxValues.get(subject)}
                                    onChange={(e) => handleMaxChange(subject, e.target.value)}
                                />
                                <InputGroup.Text id="basic-addon1">Min</InputGroup.Text>
                                <Form.Control
                                    placeholder={min}
                                    aria-label="Min"
                                    aria-describedby="basic-addon1"
                                    type="number"
                                    value={minValues.get(subject)}
                                    onChange={(e) => handleMinChange(subject, e.target.value)}
                                />
                                <Button 
                                    variant="outline-secondary" 
                                    id="button-addon1" 
                                    onClick={() => handleConstraintChange(subject)}
                                    disabled={!isChanged(subject)}
                                >
                                    Change
                                </Button>
                            </InputGroup>
                        ))
                    }
                </Modal.Body>

                <Modal.Footer>
                    <Button variant="primary" onClick={props.cancelSubjectConstraintBox}>Close</Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}
