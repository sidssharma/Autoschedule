import './week.css';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.js';
import AddTeacher from './AddTeacher';
import { useState } from 'react';
import { Teacher, Classes, schoolConfig, setSchoolTimings, assignSubjectsToClasses, generateTimeSlots, generateSubjectsList } from './automaticAlgo.js';

// import { schoolConfig } from './automaticAlgo';
// color palette
// 	background: #d5def5; 
// 	background: #8594e4; 
// 	background: #6643b5; 
// 	background: #430f58; 


export default function Week(){
    setSchoolTimings(9, 14, 30, 11, 60);
    const teachers = [
        new Teacher('Mr. Smith', ['Math', 'Science'], {
            Monday: generateTimeSlots('Monday').slice(0, 9),
            Tuesday: generateTimeSlots('Tuesday').slice(0, 9),
            Wednesday: generateTimeSlots('Wednesday').slice(0, 9),
            Thursday: generateTimeSlots('Thursday').slice(0, 9),
            Friday: generateTimeSlots('Friday').slice(0, 9),
            Saturday: generateTimeSlots('Saturday').slice(0, 9),
        }),
        new Teacher('Ms. Johnson', ['English', 'History'], {
            Monday: generateTimeSlots('Monday').slice(0, 9),
            Tuesday: generateTimeSlots('Tuesday').slice(0, 9),
            Wednesday: generateTimeSlots('Wednesday').slice(0, 9),
            Thursday: generateTimeSlots('Thursday').slice(0, 9),
            Friday: generateTimeSlots('Friday').slice(0, 9),
            Saturday: generateTimeSlots('Saturday').slice(0, 9),
        }),
        new Teacher('Ms. Davis', ['Geography'], {
            Monday: generateTimeSlots('Monday').slice(0, 9),
            Tuesday: generateTimeSlots('Tuesday').slice(0, 9),
            Wednesday: generateTimeSlots('Wednesday').slice(0, 9),
            Thursday: generateTimeSlots('Thursday').slice(0, 9),
            Friday: generateTimeSlots('Friday').slice(0, 9),
            Saturday: generateTimeSlots('Saturday').slice(0, 9),
        })
    ];
    const classSchedules = [
        new Classes('1st Grade'),
        new Classes('2nd Grade'),
        new Classes('3rd Grade'),
        new Classes('4th Grade'),
        new Classes('5th Grade'),
        new Classes('6th Grade'),
        new Classes('7th Grade'),
        new Classes('8th Grade')
    ];
    const subjects = generateSubjectsList(teachers);
    assignSubjectsToClasses(classSchedules, teachers, subjects);

    console.log(JSON.stringify(classSchedules, null, 2));
    console.log(subjects)
    const [isTeachboxActive, setTeachBox] = useState(false)
    function handleClick(){
        if(isTeachboxActive){
            setTeachBox(false)
        }else{
            setTeachBox(true)
        }
        
    }
    function handleClick2(teacherName, teacherSubjects, teacherWeekdays, teacherPeriod){
        if(isTeachboxActive){
            setTeachBox(false)
        }else{
            setTeachBox(true)
        }
        console.log("value")
    }
    return(
        <>
        <div className='d-flex flex-row-reverse filters'>
        <div class="btn-group filterButton">
                <button type="button" class="btn filterButton dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
                    Filter
                </button>
                <ul class="dropdown-menu">
                    <li><a class="dropdown-item" href="#" onClick={handleClick}>Add Teacher</a></li>
                    <li><a class="dropdown-item" href="#">Add Classes</a></li>
                    <li><a class="dropdown-item" href="#">Add Subjects</a></li>
                    <li><hr class="dropdown-divider"/></li>
                    <li><a class="dropdown-item" href="#">Refresh Schedule</a></li>
                </ul>
        </div>
        </div>
        {isTeachboxActive? <AddTeacher addTeacher={handleClick2}/>:""}

        </>
    );
}