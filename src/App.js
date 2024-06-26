import './App.css';
import Week from './components/week/week';
import Calendar from './components/calendar/calendar';
import TeachersList from './components/teachers/TeachersList';
import { useState, useEffect } from 'react';
import TopMenu from './components/week/TopMenu';
import TopBar from './TopBar/TopBar';

function App() {
  const [schoolConfigState, setSchoolConfigState] = useState([9, 14, 30, 11,30, 30]);
  const [teachers, setTeachers] = useState([]);
  // console.log("This is teachers"+ JSON.stringify(teachers[0]))
  const[deleteTeacher,setNewTeacher] = useState(false);
  
  function logall(){
    teachers.forEach((element)=>{
      // console.log(element.teacherName)
    })
  }
  useEffect(() => {
    document.title = "AUTOSCHEDULE"
    
 }, []);
  return (
    <div className='newBar'>
      <TopBar/>
    <div className="mainContainer">
      <div className="sideContainer">
      {/* <Calendar/> */}
      <TeachersList teachers = {teachers} setTeachers = {setTeachers} deleteTeacher={deleteTeacher} setNewTeacher={setNewTeacher}/>
      </div>
      
      <Week setTeachers={setTeachers} schoolConfigState = {schoolConfigState}setSchoolConfigState = {setSchoolConfigState} teachers = {teachers} logall = {logall} deleteTeacher={deleteTeacher} setNewTeacher={setNewTeacher}/>
      
    </div>
    </div>
  );
}

export default App;
