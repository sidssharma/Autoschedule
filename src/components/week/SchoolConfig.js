import { useState } from "react";
import {Button, Form, InputGroup} from "react-bootstrap";
import Modal from "react-bootstrap/Modal";


export default function SchoolConfig(props) {
    const [SchoolStartTiming, setSchoolStartTiming]=useState(9)
    const [SchoolEndTiming, setSchoolEndTiming]=useState(14)
    const [ClassDurationTiming, setClassDurationTiming]=useState(30)
    const [LunchStartHoursTiming, setLunchStartHoursTiming]=useState(10)
    const [LunchStartMinTiming, setLunchStartMinTiming]=useState(30)
    const [LunchDuration, setLunchDuration]=useState(60)
    

    
  return (
    <>
      <Modal show={true} onHide={props.cancelBox} centered>
        <Modal.Header closeButton centered>
          <Modal.Title>Set School Start and End Hours</Modal.Title>
        </Modal.Header>

        <Modal.Body>
            <p>Modal body text goes here.</p>
            <InputGroup className="mb-3">
                <InputGroup.Text id="basic-addon1">Start Timing</InputGroup.Text>
                    <Form.Control
                    type="number"
                    placeholder="9"
                    aria-label="Username"
                    aria-describedby="basic-addon1"
                    value={SchoolStartTiming} onChange={(e)=>setSchoolStartTiming(Number(e.target.value))}
                    />
                <InputGroup.Text>00</InputGroup.Text>
            </InputGroup>
            <InputGroup className="mb-3">
                <InputGroup.Text id="basic-addon1">End Timing</InputGroup.Text>
                    <Form.Control
                    placeholder="14"
                    aria-label="Username"
                    type="number"
                    aria-describedby="basic-addon1"
                    value={SchoolEndTiming} onChange={(e)=>setSchoolEndTiming(Number(e.target.value))}
                    />
                <InputGroup.Text>00</InputGroup.Text>
            </InputGroup>
            <InputGroup className="mb-3">
                <InputGroup.Text id="basic-addon1">Class Duration</InputGroup.Text>
                    <Form.Control
                    placeholder="Add in minutes (default: 30 min.)"
                    aria-label="Username"
                    type="number"
                    value={ClassDurationTiming} onChange={(e)=>setClassDurationTiming(Number(e.target.value))}
                    aria-describedby="basic-addon1"
                    />
                <InputGroup.Text>minutes</InputGroup.Text>
            </InputGroup>
            <InputGroup className="mb-3">
                <InputGroup.Text id="basic-addon1">Lunch Start Timing Hours</InputGroup.Text>
                    <Form.Control
                    placeholder="11"
                    aria-label="Username"
                    type="number"
                    value={LunchStartHoursTiming} onChange={(e)=>setLunchStartHoursTiming(Number(e.target.value))}
                    aria-describedby="basic-addon1"
                    />
                <InputGroup.Text>00</InputGroup.Text>
            </InputGroup>
            <InputGroup className="mb-3">
                <InputGroup.Text id="basic-addon1">Lunch Start Timing Minutes</InputGroup.Text>
                    <Form.Control
                    placeholder="30"
                    aria-label="Username"
                    type="number"
                    value={LunchStartMinTiming} onChange={(e)=>setLunchStartMinTiming(Number(e.target.value))}
                    aria-describedby="basic-addon1"
                    />
                <InputGroup.Text>minutes</InputGroup.Text>
            </InputGroup>
            <InputGroup className="mb-3">
                <InputGroup.Text id="basic-addon1">Lunch Duration</InputGroup.Text>
                    <Form.Control
                    placeholder="30"
                    aria-label="Username"
                    type="number"
                    value={LunchDuration} onChange={(e)=>setLunchDuration(Number(e.target.value))}
                    aria-describedby="basic-addon1"
                    />
                <InputGroup.Text>minutes</InputGroup.Text>
            </InputGroup>
        </Modal.Body>

        <Modal.Footer>
          <Button variant="secondary" onClick={props.cancelBox}>Close</Button>
          <Button variant="primary" onClick={()=>{props.changeSchoolConfig([SchoolStartTiming,SchoolEndTiming,ClassDurationTiming,LunchStartHoursTiming,LunchStartMinTiming,LunchDuration]);
            console.log([Number(SchoolStartTiming),Number(SchoolEndTiming),Number(ClassDurationTiming),Number(LunchStartHoursTiming),Number(LunchStartMinTiming),Number(LunchDuration)])
          }
            }>Save changes</Button>
          {/* <Button variant="primary" onClick={()=>props.changeSchoolConfig([8, 14, 30, 10,30, 60])}>Save changes</Button> */}
        </Modal.Footer>
      </Modal>
    </>
  );
}
