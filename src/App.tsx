import { useState } from 'react';
import './App.css';

interface Course {
  id: number;
  courseName: string;
  day: string[];
  startTime: string;
  endTime: string;
}

function App() {
  const [courses, setCourses] = useState<Course[]>([]);
  const [courseName, setCourseName] = useState('');
  const [day, setDay] = useState<string[]>([]);
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');

  const addCourse = (e: any) => {
    e.preventDefault();

    if (startTime >= endTime) {
      alert('End time must be after start time');
      return;
    }

    const newCourse: Course = {
      id: Date.now(),
      courseName,
      day,
      startTime,
      endTime,
    };

    setCourses([...courses, newCourse]);

    setCourseName('');
    setDay([]);
    setStartTime('');
    setEndTime('');
  };

  const deleteCourse = (id: number) => {
    setCourses(courses.filter((course) => course.id !== id));

  };
  const handleDayChange = (selectDay: string) => {
    if (day.includes(selectDay)) {
      setDay(day.filter((d) => d !== selectDay));
    } else {
      setDay([...day, selectDay]);
    }
  };

  const formatTime =(time: string) => {
    const [hour, minute] = time.split(':');
    const date = new Date();

    date.setHours(Number(hour));
    date.setMinutes(Number(minute));

    return date.toLocaleTimeString("en-US", {
      hour:"numeric",
      minute:"2-digit",
      hour12:true,

    });
  }

  return (
    <>
      <section id="center">
        <h1>College Schedule Builder</h1>
        <p>Create and manage your weekly class schedule</p>
      </section>

      <div className="ticks"></div>

      <section id="next-steps">
        <div id="docs">
          <h2>Add a Course</h2>

          <form className="course-form" onSubmit={addCourse}>
            <input
              type="text"
              placeholder="Course Name"
              value={courseName}
              onChange={(e) => setCourseName(e.target.value)}
              required
            />

            <div className="days-container">
              {['Mon', 'Tue', 'Wed', 'Thu', 'Fri'].map((d) => (
                <label key={d}>
                  <input
                    type="checkbox"
                    checked={day.includes(d)}
                    onChange={() => handleDayChange(d)}
                  />
                  {d}
                </label>
              ))}
            </div>
            <input
              type="time"
              value={startTime}
              onChange={(e) => setStartTime(e.target.value)}
              required
            />

            <input
              type="time"
              value={endTime}
              onChange={(e) => setEndTime(e.target.value)}
              required
            />

            <button type="submit" className="add-btn">
              Add Course
            </button>
          </form>
        </div>

        <div id="social">
          <h2>My Schedule ({courses.length})</h2>

          {courses.length === 0 ? (
            <p>No courses added yet</p>
          ) : (
            <div className="course-list">
              {courses.map((course) => (
                <div className="course-card" key={course.id}>
                  <h3>{course.courseName}</h3>

                  <p>
                    <strong>Day:</strong> {course.day.join(", ")}
                  </p>

                  <p>
                    <strong>Time:</strong> {formatTime(course.startTime)} - {formatTime(course.endTime)}
                  </p>

                  <button
                    className="delete-btn"
                    onClick={() => deleteCourse(course.id)}
                  >
                    Delete
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      <div className="ticks"></div>
      <section id="spacer"></section>
    </>
  );
}

export default App;
        
        
        
        
        
        
        
        