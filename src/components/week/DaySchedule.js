import React from "react";
import { generateTimeSlots } from "./automaticAlgo";

export default function DaySchedule(props) {
  const allSlots = generateTimeSlots("Monday");

  return (
    <div className="classColumn">
      <div className="Heading">{props.dayName}</div>
      {allSlots.map((slot, index) => {
        // Find element with matching start time
        const matchingElement = props.dayGrade.find(element => {
          const startMatch = slot.startTime.getHours() === element.timeSlot.startTime.getHours() &&
            slot.startTime.getMinutes() === element.timeSlot.startTime.getMinutes();
          const endMatch = slot.endTime.getHours() === element.timeSlot.endTime.getHours() &&
            slot.endTime.getMinutes() === element.timeSlot.endTime.getMinutes();
          return startMatch && endMatch;
        });

        // If matching element found, display data; otherwise, display "Empty Slot"
        return (
          <div key={index} className="PeriodData">
            {matchingElement ? (
              <>
                <p><b>{matchingElement.subject}</b></p>
                <p>{matchingElement.teacher}</p>
              </>
            ) : (
              <p>-</p>
            )}
          </div>
        );
      })}
    </div>
  );
}
