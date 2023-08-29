import React, { useState, useEffect } from 'react';

function StudentPage(props) {
  const [student, setStudent] = useState(null);
  const [grades, setGrades] = useState([]);

  useEffect(() => {
    const studentId = props.match.params.id;

    // Fetch student data
    fetch(`http://127.0.0.1:8000/api/student/${studentId}/`)
      .then(response => response.json())
      .then(data => setStudent(data))
      .catch(error => console.error(error));

    // Fetch grades data
    fetch(`http://127.0.0.1:8000/api/grade/?student=${studentId}`)
      .then(response => response.json())
      .then(data => setGrades(data))
      .catch(error => console.error(error));
  }, [props.match.params.id]);

  if (!student) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>{`${student.first_name} ${student.last_name}`}</h1>
      <p>Email: {student.email}</p>
      <p>Student ID: {student.student_id}</p>
      <h2>Grades</h2>
      <ul>
        {grades.map(grade => (
          <li key={grade.id}>
            Module: {grade.module}<br />
            CA Mark: {grade.ca_mark}<br />
            Exam Mark: {grade.exam_mark}<br />
            Total Grade: {grade.total_grade}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default StudentPage;
