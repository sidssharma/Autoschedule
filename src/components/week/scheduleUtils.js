// scheduleUtils.js

import { Teacher, assignSubjectsToClasses, generateTimeSlots, generateSubjectsList } from "./automaticAlgo.js";

export function handleClick2(
  teacherName,
  teacherSubjects,
  teacherWeekdays,
  teacherPeriod,
  teacherClasses,
  teachers,
  setTeachers,
  setSchT2ime,
  generateTimeSlots,
  minMaxClassesPerSubject,
  classSchedules,
  setMondayGrade,
  setTuesdayGrade,
  setWednesdayGrade,
  setThursdayGrade,
  setFridayGrade,
  setSaturdayGrade,
  setSundayGrade,
  currentClass
) {
  const weekdaysArray = teacherWeekdays.split(",").map((day) => day.trim());
  const subjectsArray = teacherSubjects.split(",").map((subject) => subject.trim());
  const periodArray = teacherPeriod.split(",").map((period) => period.trim());
  const periodMax = Math.max(...periodArray);
  const periodMin = Math.min(...periodArray) - 1;
  const classesArray = teacherClasses.split(",").map((classesbyteacher) => classesbyteacher.trim());

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

  console.log(schedule);

  const newTeacher = new Teacher(teacherName, subjectsArray, schedule, classesArray);
  teachers.forEach((teacher) => {
    teacher.timingNotAvailable = [];
  });
  const newTeachers = [...teachers, newTeacher];

  setSchT2ime(generateTimeSlots("Monday"));
  console.log(newTeachers);

  setTeachers(newTeachers);

  const subjects = generateSubjectsList(newTeachers);

  assignSubjectsToClasses(classSchedules, newTeachers, subjects, minMaxClassesPerSubject);

  const singleGrade = classSchedules.find((classData) => classData.className === currentClass);
  if (!singleGrade) {
    console.error("Class not found in classSchedules.");
    return;
  }

  setMondayGrade(singleGrade.schedule["Monday"]);
  setTuesdayGrade(singleGrade.schedule["Tuesday"]);
  setWednesdayGrade(singleGrade.schedule["Wednesday"]);
  setThursdayGrade(singleGrade.schedule["Thursday"]);
  setFridayGrade(singleGrade.schedule["Friday"]);
  setSaturdayGrade(singleGrade.schedule["Saturday"]);
  setSundayGrade(singleGrade.schedule["Sunday"]);
}

export function refresh(
  teachers,
  setTeachers,
  props,
  setMondayGrade,
  setTuesdayGrade,
  setWednesdayGrade,
  setThursdayGrade,
  setFridayGrade,
  setSaturdayGrade,
  setSundayGrade,
  classSchedules,
  generateSubjectsList,
  assignSubjectsToClasses,
  minMaxClassesPerSubject,
  generateTimeSlots,
  setSchTime
) {
  const newTeach = props.teachers;
  newTeach.forEach((teacher) => {
    teacher.timingNotAvailable = [];
  });

  const subjects = generateSubjectsList(newTeach);

  assignSubjectsToClasses(classSchedules, newTeach, subjects, minMaxClassesPerSubject);
  const singleGrade = classSchedules.find((classData) => classData.className === props.currentClass);
  if (!singleGrade) {
    console.error("Class not found in classSchedules.");
    return;
  }

  setMondayGrade(singleGrade.schedule["Monday"]);
  setTuesdayGrade(singleGrade.schedule["Tuesday"]);
  setWednesdayGrade(singleGrade.schedule["Wednesday"]);
  setThursdayGrade(singleGrade.schedule["Thursday"]);
  setFridayGrade(singleGrade.schedule["Friday"]);
  setSaturdayGrade(singleGrade.schedule["Saturday"]);
  setSundayGrade(singleGrade.schedule["Sunday"]);

  const mondaySchedule = singleGrade.schedule["Monday"];
  if (mondaySchedule && mondaySchedule.length > 0) {
    const minStartTime = new Date(Math.min(...mondaySchedule.map((slot) => slot.timeSlot.startTime)));
    const maxEndTime = new Date(Math.max(...mondaySchedule.map((slot) => slot.timeSlot.endTime)));

    const updatedTimeSlots = generateTimeSlots("Monday").filter(
      (slot) => slot.startTime >= minStartTime && slot.endTime <= maxEndTime
    );

    setSchTime(updatedTimeSlots);
  }

  console.log(classSchedules);
}
