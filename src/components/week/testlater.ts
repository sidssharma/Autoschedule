import "./week.css";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap/dist/js/bootstrap.js";
import AddTeacher from "./AddTeacher";
import { useState, useEffect } from "react";
import DaySchedule from "./DaySchedule.js";
import SchoolConfig from "./SchoolConfig.js";
// import ClassConstraint from "./ClassConstraint.js";
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
import SubjectConstraint from "./SubjectConstraint.js";
import './scheduleUtils.js';

export default function Week(props) {
    const [minMaxClassesPerSubject,setminMaxClassesPerSubject]=useState(new Map());
    function minMaxClassesPerSubjectfunc(k,v){
      setminMaxClassesPerSubject(minMaxClassesPerSubject.set(k,v))

    }
    useEffect(() => {
      minMaxClassesPerSubjectfunc('Math', { min: 1, max: 3 });
      minMaxClassesPerSubjectfunc('Science', { min: 4, max: 5 });
      minMaxClassesPerSubjectfunc('Hindi', { min: 4, max: 4 });
      minMaxClassesPerSubjectfunc('Music', { min: 1, max: 1 });
    }, []);
    
    // const minMaxClassesPerSubject = new Map();
    // minMaxClassesPerSubject.set('Math', { min: 1, max: 3 });
    // minMaxClassesPerSubject.set('English', { min: 1, max: 3 })
    
    // minMaxClassesPerSubject.set('Science', { min: 4, max: 5 });
    // minMaxClassesPerSubject.set('Hindi', { min: 4, max: 4 });
    // minMaxClassesPerSubject.set('Music', { min: 1, max: 1 });
    const [schTime, setSchTime] = useState([])
    const [sch2Time, setSchT2ime] = useState([])
    const [currentClass, setCurrentClass] = useState("3rd Grade")
    const [MondayGrade, setMondayGrade]= useState([])
    const [TuedayGrade, setTuesdayGrade]= useState([])
    const [WednesdayGrade, setWednesdayGrade]= useState([])
    const [ThursdayGrade, setThursdayGrade]= useState([])
    const [FridayGrade, setFridayGrade]= useState([])
    const [SaturdayGrade, setSaturdayGrade]= useState([])
    const [SundayGrade, setSundayGrade]= useState([])
    const [currAllSub, setcurrAllSub]= useState([])
    
    const [startHour, endHour, classDuration, lunchStartHour, lunchStartMinute, lunchDuration] = props.schoolConfigState
    setSchoolTimings(startHour,endHour,classDuration,lunchStartHour,lunchStartMinute,lunchDuration);
    const [teachers, setTeachers] = useState(props.teachers);
    const classSchedules = [
    new Classes("Nursery"),
    new Classes("KG First"),
    new Classes("KG Second")
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
  const[isSchoolConfigBox,setSchoolConfigBox] = useState(true)
  const[isSubjectConstraint, setSubjectConstraint]=useState(false)

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
    const periodMin = Math.min(...periodArray)-1
    const classesArray = teacherClasses.split(",").map((classesbyteacher)=> classesbyteacher.trim())
  
    if (teachers.some((teacher) => teacher.teacherName === teacherName)) {
      console.log("Teacher with the same name already exists.");
      alert("Teacher name already exists");
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
    console.log(schedule)
    
  
    const newTeacher = new Teacher(teacherName, subjectsArray, schedule,classesArray);
    teachers.forEach((teacher) => {

        teacher.timingNotAvailable = [];
      });
    const newTeachers = [...teachers, newTeacher];
    
    setSchT2ime(generateTimeSlots("Monday"))
    console.log(schTime)
    
    setTeachers(newTeachers);
    props.setTeachers(newTeachers);
    console.log("Teachers List for Scheduling:", newTeachers);
  
    const subjects = generateSubjectsList(newTeachers); // Use newTeachers for subjects generation
    // subjects.map((element)=>{
    //   const isElementtheir = currAllSub.find(ele=> ele ===element.name)
    //   if(!isElementtheir){
    //     console.log("not found and added")
    //     currAllSub.push(element.name)
    //     minMaxClassesPerSubject.set(element.name, { min: 4, max: 5 });

    //   }

    // })
  
    assignSubjectsToClasses(classSchedules, newTeachers, subjects, minMaxClassesPerSubject); // Use newTeachers for scheduling
  
    const singleGrade = classSchedules.find(classData => classData.className === currentClass);
    if (!singleGrade) {
      console.error("Class '1st Grade' not found in classSchedules.");
      return;
    }
    setMondayGrade(singleGrade.schedule["Monday"])
    console.log("see below")
    console.log(MondayGrade)
    setTuesdayGrade(singleGrade.schedule["Tuesday"])
    setWednesdayGrade(singleGrade.schedule["Wednesday"])
    setThursdayGrade(singleGrade.schedule["Thursday"])
    setFridayGrade(singleGrade.schedule["Friday"])
    setSaturdayGrade(singleGrade.schedule["Saturday"])
    setSundayGrade(singleGrade.schedule["Sunday"])
    const mondaySchedule = singleGrade.schedule["Monday"];
    if (mondaySchedule && mondaySchedule.length > 0) {
      const minStartTime = new Date(Math.min(...mondaySchedule.map(slot => slot.timeSlot.startTime)));
      const maxEndTime = new Date(Math.max(...mondaySchedule.map(slot => slot.timeSlot.endTime)));

      const updatedTimeSlots = generateTimeSlots("Monday").filter(slot => 
        slot.startTime >= minStartTime && slot.endTime <= maxEndTime
      );

      setSchTime(updatedTimeSlots);
    }
  }
  useEffect(() => {
    setSchTime(generateTimeSlots("Monday"));
  }, []);
  useEffect(() => {
    if (props.deleteTeacher) {
      refresh("1st Grade");
      props.setNewTeacher(false);
      console.log("worked");
      console.log(props.teachers)
    }
  }, [props.deleteTeacher]);

  function refresh(className2){
    console.log(teachers)
    const newTeach = props.teachers
    newTeach.forEach((teacher) => {

        teacher.timingNotAvailable = [];
      });
      
    const subjects = generateSubjectsList(newTeach);

    assignSubjectsToClasses(classSchedules, newTeach, subjects,minMaxClassesPerSubject);
    const singleGrade = classSchedules.find(classData => classData.className === className2);
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
  function changeClass(className2){
    setCurrentClass(className2)
    refresh(className2)
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
//   (props.deleteTeacher) ? (() => { refresh("1st Grade"); props.setNewTeacher(false); console.log("worked") })() : console.log("not worked");
  function changeSchoolConfig(configData){
    const [startHours, endHours, classDurations, lunchStartHours, lunchStartMinutes, lunchDurations] = configData
    props.setSchoolConfigState([startHours, endHours, classDurations, lunchStartHours, lunchStartMinutes, lunchDurations])
    setSchoolTimings(startHours, endHours, classDurations, lunchStartHours, lunchStartMinutes, lunchDurations);
    setSchT2ime(generateTimeSlots("Monday"))
    refresh("1st Grade")
    setSchoolConfigBox(!isSchoolConfigBox);
  }
  function cancelSchoolConfigBox(){
    setSchoolConfigBox(!isSchoolConfigBox);

  }
  function cancelSubjectConstraintBox(){
    setSubjectConstraint(!isSubjectConstraint);
    refresh("1st Grade")
    

  }
  function setSubConstraint(k,v){
    console.log("this function started")
    minMaxClassesPerSubjectfunc(k, v);
    console.log(minMaxClassesPerSubject)
    refresh("1st Grade")

  }
  
  return (
    <>
      <div className="d-flex flex-column">
        <TopMenu handleClick = {()=> handleClick()} cancelSubjectConstraintBox={cancelSubjectConstraintBox} currentClass={currentClass} changeClass={changeClass} changeSchoolConfig={changeSchoolConfig} cancelSchoolConfigBox={cancelSchoolConfigBox}/>
        <div className="classTable">
    
          <div className="classColumn">
            <div class="Heading">Periods</div>

            {
              sch2Time.map((element, index) => (
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
      {isSchoolConfigBox?<SchoolConfig cancelBox = {cancelSchoolConfigBox} changeSchoolConfig={changeSchoolConfig}/>:""}
      {isSubjectConstraint?<SubjectConstraint cancelSubjectConstraintBox={cancelSubjectConstraintBox} minMaxClassesPerSubject={minMaxClassesPerSubject} setSubConstraint={setSubConstraint}/>:""}
      {/* <SchoolConfig/> */}
    </>
  );
}
