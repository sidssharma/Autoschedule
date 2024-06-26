export class Teacher {
    constructor(teacherName, teacherSubjects, timingAvailable, timingNotAvailable = []) {
        this.teacherName = teacherName;
        this.teacherSubjects = teacherSubjects;
        this.timingAvailable = timingAvailable;
        this.timingNotAvailable = timingNotAvailable; // To hold the class scheduled in this time slot
    }

    isAvailable(day, startTime) {
        const availableSlots = this.timingAvailable[day] || [];
        return availableSlots.some(slot =>
            slot.startTime.getTime() === startTime.getTime() &&
            !this.timingNotAvailable.some(unavailableSlot =>
                unavailableSlot.day === day &&
                unavailableSlot.startTime.getTime() === startTime.getTime()
            )
        );
    }

    bookSlot(day, startTime) {
        this.timingNotAvailable.push({ day, startTime });
    }
}

class Classes {
    constructor(className) {
        this.className = className;
        this.schedule = {};
        ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'].forEach(day => {
            this.schedule[day] = [];
        });
    }

    addSubject(day, timeSlot, subject, teacher) {
        this.schedule[day].push({ timeSlot, subject, teacher });
    }

    hasSubject(day, subject) {
        return this.schedule[day].some(scheduleItem => scheduleItem.subject === subject);
    }
}

class ClassTimeSlot {
    constructor(day, startTime, endTime) {
        this.day = day;
        this.startTime = startTime;
        this.endTime = endTime;
        this.class = null; // To hold the class scheduled in this time slot
        this.teacherName = null;
    }
}

// Configuration object for school settings
const schoolConfig = {
    classDurationMinutes: 30,
    lunchBreakMinutes: 60,
    startTimeHours: 9,
    endTimeHours: 14,
    lunchTimeHours: 11
};

// Function to generate time slots for a day
export function generateTimeSlots(day) {
    const timeSlots = [];
    let currentTime = new Date();
    currentTime.setHours(schoolConfig.startTimeHours);
    currentTime.setMinutes(0);
    currentTime.setSeconds(0);
    currentTime.setMilliseconds(0);

    while (currentTime.getHours() < schoolConfig.endTimeHours) {
        if (currentTime.getHours() === schoolConfig.lunchTimeHours && currentTime.getMinutes() === 0) {
            const startTime = new Date(currentTime);
            const lunchEndTime = new Date(currentTime.getTime() + schoolConfig.lunchBreakMinutes * 60000);
            currentTime = lunchEndTime;
        } else {
            const startTime = new Date(currentTime);
            const endTime = new Date(currentTime.getTime() + schoolConfig.classDurationMinutes * 60000);
            timeSlots.push(new ClassTimeSlot(day, startTime, endTime));
            currentTime = endTime;
        }
    }

    return timeSlots;
}

// Function to add a teacher dynamically
function addTeacher(teachers, teacherName, teacherSubjects, timingAvailable) {
    teachers.push(new Teacher(teacherName, teacherSubjects, timingAvailable));
}

// Function to add a class dynamically
function addClass(classSchedules, className) {
    classSchedules.push(new Classes(className));
}

// Function to set school timings dynamically
function setSchoolTimings(startHour, endHour, classDuration, lunchStartHour, lunchDuration) {
    schoolConfig.startTimeHours = startHour;
    schoolConfig.endTimeHours = endHour;
    schoolConfig.classDurationMinutes = classDuration;
    schoolConfig.lunchTimeHours = lunchStartHour;
    schoolConfig.lunchBreakMinutes = lunchDuration;
}

// Example usage
const teachers = [];
const classSchedules = [];

setSchoolTimings(9, 14, 30, 11, 60); // Set school timings

// Adding teachers dynamically
addTeacher(teachers, 'Mr. Smith', ['Math', 'Science'], {
    Monday: generateTimeSlots('Monday').slice(0, 9),
    Tuesday: generateTimeSlots('Tuesday').slice(0, 9),
    Wednesday: generateTimeSlots('Wednesday').slice(0, 9),
    Thursday: generateTimeSlots('Thursday').slice(0, 9),
    Friday: generateTimeSlots('Friday').slice(0, 9),
    Saturday: generateTimeSlots('Saturday').slice(0, 9),
});

addTeacher(teachers, 'Ms. Johnson', ['English', 'History'], {
    Monday: generateTimeSlots('Monday').slice(0, 9),
    Tuesday: generateTimeSlots('Tuesday').slice(0, 9),
    Wednesday: generateTimeSlots('Wednesday').slice(0, 9),
    Thursday: generateTimeSlots('Thursday').slice(0, 9),
    Friday: generateTimeSlots('Friday').slice(0, 9),
    Saturday: generateTimeSlots('Saturday').slice(0, 9),
});
addTeacher(teachers, 'Ms. Davis', ['Geography'], {
    Monday: generateTimeSlots('Monday').slice(0, 9),
    Tuesday: generateTimeSlots('Tuesday').slice(0, 9),
    Wednesday: generateTimeSlots('Wednesday').slice(0, 9),
    Thursday: generateTimeSlots('Thursday').slice(0, 9),
    Friday: generateTimeSlots('Friday').slice(0, 9),
    Saturday: generateTimeSlots('Saturday').slice(0, 9),
});

// Adding classes dynamically
addClass(classSchedules, '1st Grade');
addClass(classSchedules, '2nd Grade');
addClass(classSchedules, '3rd Grade');
addClass(classSchedules, '4th Grade');
addClass(classSchedules, '5th Grade');
addClass(classSchedules, '6th Grade');
addClass(classSchedules, '7th Grade');
addClass(classSchedules, '8th Grade');

const subjects = [
    { name: 'Math', teacher: 'Mr. Smith' },
    { name: 'Science', teacher: 'Mr. Smith' },
    { name: 'English', teacher: 'Ms. Johnson' },
    { name: 'History', teacher: 'Ms. Johnson' },
    { name: 'Geography', teacher: 'Ms. Davis' },
    { name: 'Physics', teacher: 'Sid' },
    { name: 'Chemistry', teacher: 'Mr. Brown' },
    { name: 'Biology', teacher: 'Ms. Martinez' },
    { name: 'Art', teacher: 'Mr. Anderson' },
    { name: 'Music', teacher: 'Ms. Thomas' }
];

function assignSubjectsToClasses() {
    classSchedules.forEach(classSchedule => {
        const assignedSlots = new Set();

        ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'].forEach(day => {
            const timeSlots = generateTimeSlots(day);
            timeSlots.forEach(slot => {
                for (let subject of subjects) {
                    const teacher = teachers.find(t => t.teacherName === subject.teacher);
                    const slotIdentifier = `${day}-${slot.startTime.getTime()}`;
                    if (teacher &&
                        teacher.isAvailable(day, slot.startTime) &&
                        !assignedSlots.has(slotIdentifier) &&
                        !classSchedule.hasSubject(day, subject.name)) {

                        console.log(`Assigning ${subject.name} to ${classSchedule.className} on ${day} at ${slot.startTime}`);
                        classSchedule.addSubject(day, slot, subject.name, teacher.teacherName);
                        teacher.bookSlot(day, slot.startTime);
                        assignedSlots.add(slotIdentifier);
                        break; // Move to the next slot after assigning a subject
                    }
                }
            });
        });
    });

    // Check for unfilled slots and fill them with any available subject/teacher
    classSchedules.forEach(classSchedule => {
        ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'].forEach(day => {
            const timeSlots = generateTimeSlots(day);
            timeSlots.forEach(slot => {
                if (!classSchedule.schedule[day].some(s => s.timeSlot.startTime.getTime() === slot.startTime.getTime())) {
                    for (let subject of subjects) {
                        const teacher = teachers.find(t => t.teacherName === subject.teacher);
                        if (teacher && teacher.isAvailable(day, slot.startTime)) {
                            console.log(`Filling unfilled slot with ${subject.name} to ${classSchedule.className} on ${day} at ${slot.startTime}`);
                            classSchedule.addSubject(day, slot, subject.name, teacher.teacherName);
                            teacher.bookSlot(day, slot.startTime);
                            break; // Move to the next slot after filling
                        }
                    }
                }
            });
        });
    });
}

assignSubjectsToClasses();

console.log(JSON.stringify(classSchedules, null, 2));
