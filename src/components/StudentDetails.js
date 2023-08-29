import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';


const StudentDetails = () => {
  const { id } = useParams();
  const [student, setStudent] = useState(null);
  const [grades, setGrades] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const [studentResponse, gradesResponse] = await Promise.all([
        axios.get(`http://127.0.0.1:8000/api/student/${id}/`),
        axios.get(`http://127.0.0.1:8000/api/grade/?student=${id}`)
      ]);

      setStudent(studentResponse.data);

      const gradesWithModules = await Promise.all(
        gradesResponse.data.map(async (grade) => {
          const moduleCode = grade.module.split('/').filter(str => str !== '').pop(); // extract module code from URL
          return {
            ...grade,
            module: moduleCode
          };
        })
      );

      setGrades(gradesWithModules);
    };

    fetchData();
  }, [id]);

  return (
    <div className="container my-4">
      <div className="row">
        <div className="col-md-6">
          {student && (
            <div className="card">
              <div className="card-body">
                <h2 className="card-title">{student.first_name} {student.last_name}</h2>
                <p className="card-text mt-3"><strong>Email:</strong> {student.email}</p>
                <p className="card-text"><strong>Student ID:</strong> {student.student_id}</p>
              </div>
            </div>
          )}
        </div>
      </div>
      <div className="row mt-4">
        <div className="col-md-6">
          <h3 className="mb-3">Grades</h3>
          {grades.length > 0 ? (
            <table className="table">
              <thead>
                <tr>
                  <th scope="col">Module</th>
                  <th scope="col">Grade</th>
                </tr>
              </thead>
              <tbody>
                {grades.map((grade) => (
                  <tr key={grade.id}>
                    <td>{grade.module}</td>
                    <td>{grade.total_grade}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p>No grades available.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default StudentDetails;
