// School Configurations
let startHour, endHour, classDuration, lunchStartHour, lunchStartMinute, lunchDuration;

export function setSchoolTimings(sH, eH, cD, lSH, lSM, lD) {
  startHour = sH;
  endHour = eH;
  classDuration = cD;
  lunchStartHour = lSH;
  lunchStartMinute = lSM;
  lunchDuration = lD;
}

export class Teacher {
  constructor(teacherName, subjects, availability, availableClasses) {
    this.teacherName = teacherName;
    this.subjects = subjects;
    this.availability = availability;
    this.availableClasses = availableClasses;
    this.timingNotAvailable = [];
  }

  isAvailable(day, startTime) {
    if (!this.availability[day] || this.availability[day].length === 0) {
      return false; // Teacher is not available on this day
    }// only change here can remove form if
    const unavailableTimes = this.timingNotAvailable.filter(
      (time) => time.day === day && time.startTime.getTime() === startTime.getTime()
    );
    return unavailableTimes.length === 0;
  }

  bookSlot(day, startTime) {
    this.timingNotAvailable.push({ day, startTime });
  }
}

export class Classes {
  constructor(className) {
    this.className = className;
    this.schedule = {
      Monday: [],
      Tuesday: [],
      Wednesday: [],
      Thursday: [],
      Friday: [],
      Saturday: [],
      Sunday: [],
    };
  }

  addSubject(day, timeSlot, subject, teacher) {
    this.schedule[day].push({ timeSlot, subject, teacher });
  }

  hasSubject(day, subject) {
    return this.schedule[day].some((scheduleItem) => scheduleItem.subject === subject);
  }
}

export function generateTimeSlots(day) {
  const timeSlots = [];
  const currentTime = new Date();
  currentTime.setHours(startHour);
  currentTime.setMinutes(0);
  currentTime.setSeconds(0);
  currentTime.setMilliseconds(0);

  while (currentTime.getHours() < endHour || (currentTime.getHours() === endHour && currentTime.getMinutes() === 0)) {
    const startTime = new Date(currentTime);

    const isLunchTime = (currentTime.getHours() === lunchStartHour && currentTime.getMinutes() === lunchStartMinute);

    if (isLunchTime) {
      currentTime.setMinutes(currentTime.getMinutes() + lunchDuration);
      continue;
    }

    currentTime.setMinutes(currentTime.getMinutes() + classDuration);
    const endTime = new Date(currentTime);

    if (endTime.getHours() > endHour || (endTime.getHours() === endHour && endTime.getMinutes() > 0)) {
      break;
    }

    if (!isLunchTime) {
      timeSlots.push({ day, startTime, endTime });
    }
  }

  return timeSlots;
}


export function generateSubjectsList(teachers) {
  const subjectsSet = new Set();
  teachers.forEach((teacher) => {
    teacher.subjects.forEach((subject) => {
      subjectsSet.add(subject);
    });
  });
  return Array.from(subjectsSet).map((subject) => ({
    name: subject,
    teachers: teachers.filter((teacher) => teacher.subjects.includes(subject)).map((teacher) => teacher.teacherName),
  }));
}

export function assignSubjectsToClasses(classSchedules, teachers, subjects, minMaxClassesPerSubject, allowMultipleClassesPerDay = true, allowMultipleSubjectsPerDay = false) {
  const assignedSlots = new Set();
  const classesPerSubjectPerClass = new Map();
  
  classSchedules.forEach(classSchedule => {
    const className = classSchedule.className;
    if (!classesPerSubjectPerClass.has(className)) {
      classesPerSubjectPerClass.set(className, new Map());
    }
  });

  // First Pass: Assign subjects to available slots respecting minMaxClassesPerSubject
  classSchedules.forEach(classSchedule => {
    const className = classSchedule.className;

    ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'].forEach(day => {
      const subjectsAssignedToday = new Map();
      const teacherClassesCount = new Map();
      const timeSlots = generateTimeSlots(day);

      timeSlots.forEach(slot => {
        for (let subject of subjects) {
          const suitableTeachers = teachers.filter(t => t.subjects.includes(subject.name) && t.availableClasses.includes(className));
          for (let teacher of suitableTeachers) {
            const slotIdentifier = `${day}-${slot.startTime.getTime()}`;
            const teacherClassesToday = teacherClassesCount.get(teacher.teacherName) || 0;
            const subjectClassesToday = subjectsAssignedToday.get(subject.name) || 0;
            const canTeachMoreClasses = allowMultipleClassesPerDay || teacherClassesToday === 0;
            const canAssignMoreSubjects = allowMultipleSubjectsPerDay || subjectClassesToday === 0;

            const classesAssignedForSubject = classesPerSubjectPerClass.get(className).get(subject.name) || 0;
            const minClasses = minMaxClassesPerSubject.get(subject.name) ? minMaxClassesPerSubject.get(subject.name).min : 0;
            const maxClasses = minMaxClassesPerSubject.get(subject.name) ? minMaxClassesPerSubject.get(subject.name).max : Infinity;

            if (
              teacher.isAvailable(day, slot.startTime) &&
              !assignedSlots.has(slotIdentifier) &&
              !classSchedule.hasSubject(day, subject.name) &&
              canTeachMoreClasses &&
              canAssignMoreSubjects &&
              classesAssignedForSubject < maxClasses // Ensure it doesn't exceed max classes
            ) {
              classSchedule.addSubject(day, slot, subject.name, teacher.teacherName);
              teacher.bookSlot(day, slot.startTime);
              assignedSlots.add(slotIdentifier);
              subjectsAssignedToday.set(subject.name, subjectClassesToday + 1);
              teacherClassesCount.set(teacher.teacherName, teacherClassesToday + 1);

              classesPerSubjectPerClass.get(className).set(subject.name, classesAssignedForSubject + 1);
              break;
            }
          }
        }
      });
    });
  });

  // Second Pass: Fill remaining slots while respecting minMaxClassesPerSubject
  classSchedules.forEach(classSchedule => {
    const className = classSchedule.className;

    ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'].forEach(day => {
      const subjectsAssignedToday = new Map(
        classSchedule.schedule[day].map(scheduleItem => [scheduleItem.subject, 1])
      );
      const teacherClassesCount = new Map(
        classSchedule.schedule[day].map(scheduleItem => [scheduleItem.teacher, 1])
      );
      const timeSlots = generateTimeSlots(day);

      timeSlots.forEach(slot => {
        if (!classSchedule.schedule[day].some(s => s.timeSlot.startTime.getTime() === slot.startTime.getTime())) {
          for (let subject of subjects) {
            const suitableTeachers = teachers.filter(t => t.subjects.includes(subject.name) && t.availableClasses.includes(className));
            for (let teacher of suitableTeachers) {
              const teacherClassesToday = teacherClassesCount.get(teacher.teacherName) || 0;
              const subjectClassesToday = subjectsAssignedToday.get(subject.name) || 0;
              const canTeachMoreClasses = allowMultipleClassesPerDay || teacherClassesToday === 0;
              const canAssignMoreSubjects = allowMultipleSubjectsPerDay || subjectClassesToday === 0;

              const classesAssignedForSubject = classesPerSubjectPerClass.get(className).get(subject.name) || 0;
              const minClasses = minMaxClassesPerSubject.get(subject.name) ? minMaxClassesPerSubject.get(subject.name).min : 0;
              const maxClasses = minMaxClassesPerSubject.get(subject.name) ? minMaxClassesPerSubject.get(subject.name).max : Infinity;

              if (
                teacher.isAvailable(day, slot.startTime) &&
                canTeachMoreClasses &&
                canAssignMoreSubjects &&
                classesAssignedForSubject < maxClasses && // Ensure it doesn't exceed max classes
                (classesAssignedForSubject < minClasses || assignedSlots.has(`${day}-${slot.startTime.getTime()}`)) // Ensure it respects min classes or fills available slots
              ) {
                classSchedule.addSubject(day, slot, subject.name, teacher.teacherName);
                teacher.bookSlot(day, slot.startTime);
                assignedSlots.add(`${day}-${slot.startTime.getTime()}`);
                subjectsAssignedToday.set(subject.name, subjectClassesToday + 1);
                teacherClassesCount.set(teacher.teacherName, teacherClassesToday + 1);

                classesPerSubjectPerClass.get(className).set(subject.name, classesAssignedForSubject + 1);
                break;
              }
            }
          }
        }
      });
    });
  });

  console.log(classSchedules);
}
