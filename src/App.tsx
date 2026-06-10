import { useState } from 'react'
import './App.css'

interface Courses {
  id: number;
  courseName: string;
  day: string;
  startTime: string;
  endTime: string;
}

function App() {
  const [courses, setCourses] = useState<Courses[]>([]);
  const [courseName, setCourseName] = useState("");
  const [day, setDay] = useState('Monday');
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");

  const addCourse = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (startTime >= endTime) {
      alert("end time must be after start time");
      return;
    }

    const newCourse: Courses = {
      id: Date.now(),
      courseName,
      day,
      startTime,
      endTime,
    };


    setCourses([...courses, newCourse]);

    setCourseName("");
    setDay("Monday");
    setStartTime("");
    setEndTime("");
  };

  const deleteCourse = (id: number) => {
    setCourses(courses.filter(course => course.id !== id));
  };

  return (
    <>
      <section id="center">
        <h1>College Schedule Builder</h1>
        <p>Create and manage your weekly class schedule</p>
        </section>

      <div className="ticks"></div>

      <section id ="next-steps">
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
            <select 
            value={day} 
            onChange={(e) => setDay(e.target.value)}>

              <option>Monday</option>
              <option>Tuesday</option>
              <option>Wednesday</option>
              <option>Thursday</option>
              <option>Friday</option>
              <option>Saturday</option>
              <option>Sunday</option>
            </select>
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

        <div id ="social">
          <h2>My Schedule ({courses.length})</h2>
          
          {courses.length === 0? (
            <p>No courses added yet</p>
          ) : (
            <div className="course-list">
              {courses.map((course) => (
                <div className="course-card" key={course.id}>
                  <h3>{course.courseName}</h3>
                  

                  <p>
                    <strong>Day:</strong> {course.day}
                  </p>

                  <p>
                    <strong>Time:</strong> {course.startTime} - {course.endTime}
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
        
        
        
        
        
        
        
        
        