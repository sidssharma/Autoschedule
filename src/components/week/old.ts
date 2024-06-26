import "./week.css";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap/dist/js/bootstrap.js";
import AddTeacher from "./AddTeacher";
import { useState, useEffect } from "react";
import DaySchedule from "./DaySchedule.js";
import {
  Teacher,
  Classes,
  schoolConfig,
  setSchoolTimings,
  assignSubjectsToClasses,
  generateTimeSlots,
  generateSubjectsList,
} from "./automaticAlgo.js";
import TopMenu from "./TopMenu.js";

export default function Week(props) {
    const [schTime, setSchTime] = useState([])
    const [schTime2, setSchTime] = useState([])
    const [currentClass, setCurrentClass] = useState("3rd Grade")
    const [MondayGrade, setMondayGrade]= useState([])
    const [TuedayGrade, setTuesdayGrade]= useState([])
    const [WednesdayGrade, setWednesdayGrade]= useState([])
    const [ThursdayGrade, setThursdayGrade]= useState([])
    const [FridayGrade, setFridayGrade]= useState([])
    const [SaturdayGrade, setSaturdayGrade]= useState([])
    const [SundayGrade, setSundayGrade]= useState([])
    setSchoolTimings(9, 14, 30, 11, 60);
    const [teachers, setTeachers] = useState(props.teachers);
    const classSchedules = [
    new Classes("1st Grade"),
    new Classes("2nd Grade"),
    new Classes("3rd Grade"),
    new Classes("4th Grade"),
    new Classes("5th Grade"),
    new Classes("6th Grade"),
    new Classes("7th Grade"),
    new Classes("8th Grade"),
  ];
  const [isTeachboxActive, setTeachBox] = useState(false);

  function handleClick() {
    setTeachBox(!isTeachboxActive);
  }

  function handleClick2(
    teacherName,
    teacherSubjects,
    teacherWeekdays,
    teacherPeriod,
    teacherClasses,
  ) {
    setTeachBox(!isTeachboxActive);
  
    const weekdaysArray = teacherWeekdays.split(",").map((day) => day.trim());
    const subjectsArray = teacherSubjects.split(",").map((subject) => subject.trim());
    const periodArray = teacherPeriod.split(",").map((period)=> period.trim());
    const periodMax = Math.max(...periodArray)
    const periodMin = Math.min(...periodArray)
    const classesArray = teacherClasses.split(",").map((classesbyteacher)=> classesbyteacher.trim())
  
    if (teachers.some((teacher) => teacher.teacherName === teacherName)) {
      console.log("Teacher with the same name already exists.");
      return;
    }
  
    const schedule = {
      Monday: weekdaysArray.includes("Monday") ? generateTimeSlots("Monday").slice(periodMin, periodMax) : [],
      Tuesday: weekdaysArray.includes("Tuesday") ? generateTimeSlots("Tuesday").slice(periodMin, periodMax) : [],
      Wednesday: weekdaysArray.includes("Wednesday") ? generateTimeSlots("Wednesday").slice(periodMin, periodMax) : [],
      Thursday: weekdaysArray.includes("Thursday") ? generateTimeSlots("Thursday").slice(periodMin, periodMax) : [],
      Friday: weekdaysArray.includes("Friday") ? generateTimeSlots("Friday").slice(periodMin, periodMax) : [],
      Saturday: weekdaysArray.includes("Saturday") ? generateTimeSlots("Saturday").slice(periodMin, periodMax) : [],
    };
    const defaultAvailableClasses = ["1st Grade", "2nd Grade", "3rd Grade", "4th Grade"];
  
    const newTeacher = new Teacher(teacherName, subjectsArray, schedule,classesArray);
    teachers.forEach((teacher) => {

        teacher.timingNotAvailable = [];
      });
    const newTeachers = [...teachers, newTeacher];
    
    // Logging for debugging
    console.log("Updated Teachers List:", newTeachers);
    console.log(generateTimeSlots("Monday"))
    setSchTime(generateTimeSlots("Monday"))
    console.log(schTime)
    
    setTeachers(newTeachers);
    props.setTeachers(newTeachers);
  
    // Ensure that newTeachers has the expected structure
    console.log("Teachers List for Scheduling:", newTeachers);
  
    const subjects = generateSubjectsList(newTeachers); // Use newTeachers for subjects generation
    // console.log("Generated Subjects List:", subjects);
  
    assignSubjectsToClasses(classSchedules, newTeachers, subjects); // Use newTeachers for scheduling
    // console.log(classSchedules)
  
    const singleGrade = classSchedules.find(classData => classData.className === currentClass);
    if (!singleGrade) {
      console.error("Class '1st Grade' not found in classSchedules.");
      return;
    }
  
    
    
    // const mondaySchedules = singleGrade.schedule["Monday"];

    // const daySchedule = generateTimeSlots("Monday").map(timeSlot => {
    // const matchingPeriod = mondaySchedules.find(period => {
    //     const periodStartTime = new Date(period.timeSlot.startTime);
    //     return periodStartTime.getHours() === timeSlot.startTime.getHours() && periodStartTime.getMinutes() === timeSlot.startTime.getMinutes();
    // });

    // if (matchingPeriod) {
    //     return mondaySchedules;
    // } else {
    //     return [];
    // }
    // });
    // console.log(daySchedule);
    // daySchedule.map((element, index)=> console.log(element[0]))
    setMondayGrade(singleGrade.schedule["Monday"])
    // setMondayGrade(daySchedule)
    console.log("see below")
    console.log(MondayGrade)
    setTuesdayGrade(singleGrade.schedule["Tuesday"])
    setWednesdayGrade(singleGrade.schedule["Wednesday"])
    setThursdayGrade(singleGrade.schedule["Thursday"])
    setFridayGrade(singleGrade.schedule["Friday"])
    setSaturdayGrade(singleGrade.schedule["Saturday"])
    setSundayGrade(singleGrade.schedule["Sunday"])
    // console.log(MondayGrade)
    // MondayGrade2.forEach(element=> console.log(element.subject))

    // console.log("Teachers2 for Testing:", teachers2);
    // console.log("Final Teachers List:", newTeachers);
    const mondaySchedule = singleGrade.schedule["Monday"];
    // console.log(mondaySchedule)
    if (mondaySchedule && mondaySchedule.length > 0) {
      const minStartTime = new Date(Math.min(...mondaySchedule.map(slot => slot.timeSlot.startTime)));
      const maxEndTime = new Date(Math.max(...mondaySchedule.map(slot => slot.timeSlot.endTime)));

      const updatedTimeSlots = generateTimeSlots("Monday").filter(slot => 
        slot.startTime >= minStartTime && slot.endTime <= maxEndTime
      );

      setSchTime(updatedTimeSlots);
    //   console.log(schTime)
    }
  }
  useEffect(() => {
    setSchTime(generateTimeSlots("Monday"));
  }, []);

  function refresh(){
    console.log(teachers)
    teachers.forEach((teacher) => {

        teacher.timingNotAvailable = [];
      });
    const subjects = generateSubjectsList(teachers);
    assignSubjectsToClasses(classSchedules, teachers, subjects);
    const singleGrade = classSchedules.find(classData => classData.className === currentClass);
    if (!singleGrade) {
      console.error("Class '1st Grade' not found in classSchedules.");
      return;
    }
    
  
    setMondayGrade(singleGrade.schedule["Monday"])
    
    setTuesdayGrade(singleGrade.schedule["Tuesday"])
    setWednesdayGrade(singleGrade.schedule["Wednesday"])
    setThursdayGrade(singleGrade.schedule["Thursday"])
    setFridayGrade(singleGrade.schedule["Friday"])
    setSaturdayGrade(singleGrade.schedule["Saturday"])
    setSundayGrade(singleGrade.schedule["Sunday"])
    // console.log(MondayGrade)
    // MondayGrade2.forEach(element=> console.log(element.subject))

    // console.log("Teachers2 for Testing:", teachers2);
    // console.log("Final Teachers List:", newTeachers);
    const mondaySchedule = singleGrade.schedule["Monday"];
    // console.log(mondaySchedule)
    if (mondaySchedule && mondaySchedule.length > 0) {
      const minStartTime = new Date(Math.min(...mondaySchedule.map(slot => slot.timeSlot.startTime)));
      const maxEndTime = new Date(Math.max(...mondaySchedule.map(slot => slot.timeSlot.endTime)));

      const updatedTimeSlots = generateTimeSlots("Monday").filter(slot => 
        slot.startTime >= minStartTime && slot.endTime <= maxEndTime
      );

      setSchTime(updatedTimeSlots);
    }
    
    console.log(classSchedules)

  }
  function changeClass(className){
    setCurrentClass(className)
    refresh()
  }
  function getDaySchedule(day) {
    switch (day) {
      case "Monday":
        return MondayGrade;
      case "Tuesday":
        return TuedayGrade;
      case "Wednesday":
        return WednesdayGrade;
      case "Thursday":
        return ThursdayGrade;
      case "Friday":
        return FridayGrade;
      case "Saturday":
        return SaturdayGrade;
      case "Sunday":
        return SundayGrade;
      default:
        return [];
    }
  }
  
  return (
    <>
      <div className="d-flex flex-column">
        <TopMenu handleClick = {()=> handleClick()} changeClass={changeClass}/>
        <div className="classTable">
    
          <div className="classColumn">
            <div class="Heading">Periods</div>

            {
              schTime.map((element, index) => (
                <div key={index} className="PeriodData">
                  <p>Period {index + 1}</p>
                  <p>{element.startTime.getHours()}:{element.startTime.getMinutes()} - {element.endTime.getHours()}:{element.endTime.getMinutes()}</p>
                </div>
              ))
            }
          </div>
          <DaySchedule dayName="Monday" dayGrade={MondayGrade}/>
          <DaySchedule dayName="Tuesday" dayGrade={TuedayGrade}/>
          <DaySchedule dayName="Wed" dayGrade={WednesdayGrade}/>
          <DaySchedule dayName="Thursday" dayGrade={ThursdayGrade}/>
          <DaySchedule dayName="Friday" dayGrade={FridayGrade}/>
          <DaySchedule dayName="Saturday" dayGrade={SaturdayGrade}/>
          
        </div>
      </div>
      {isTeachboxActive ? <AddTeacher addTeacher={handleClick2} cancelTeacher={handleClick} /> : ""}
    </>
  );
}
