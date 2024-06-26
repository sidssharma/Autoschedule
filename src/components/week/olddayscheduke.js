import React from "react";
import { generateTimeSlots } from "./automaticAlgo";

export default function DaySchedule(props){
  const allSlots = generateTimeSlots("Monday");

  
    return(
        <div className="classColumn">
        <div class="Heading">{props.dayName}</div>
        
           {
            props.dayGrade.map((element, index) => (
              <div key={index} className="PeriodData"><p><b>{element.subject}</b></p><p>{element.teacher}</p><p>{element.timeSlot.startTime.getHours()}</p></div>
            
            ))
          }
        
      </div>
    );
}