import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';

const CohortPage = () => {
  const [cohort, setCohort] = useState({});
  const [students, setStudent] = useState([]);
  const [modules, setModules] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const { id } = useParams();

  useEffect(() => {
    const fetchCohort = async () => {
      try {
        const result = await axios.get(`http://127.0.0.1:8000/api/cohort/${id}/`);
        setCohort(result.data);
        setLoading(false);
      } catch (error) {
        setLoading(false);
        setError(error.message);
      }
    };

    fetchCohort();
  }, [id]);

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const result = await axios.get(`http://127.0.0.1:8000/api/student/?cohort=${id}&format=json`);
        setStudent(result.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchStudents();
  }, [id]);

  useEffect(() => {
    const fetchModules = async () => {
      try {
        const result = await axios.get(`http://127.0.0.1:8000/api/module/?delivered_to=${id}`);
        setModules(result.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchModules();
  }, [id]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div className='mb-3 text-center'>Error: {error}</div>;
  }

  return (
    <div className="container mt-5">
      <h2 className="mb-3 text-center">{cohort.name}</h2>

      <h5 className="mb-5 mt-2 text-center">Students & Modules</h5>
      <div className="row">
        <div className="col">
          <table className="table">
            <thead>
              <tr>
                <th>Student Name</th>
                <th>Student ID</th>
              </tr>
            </thead>
            <tbody>
              {students.map((student) => (
                <tr key={student.student_id}>
                  <td>{student.first_name} {student.last_name}</td>

                  <td>{student.student_id}</td>
                  <td>

                  </td>
                  <Link to={`/students/${student.student_id}`}>
                      <button type="button" className="btn btn-light btn-sm">></button>
                    </Link>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        <div className="col">
          
          <table className="table">
            
            <thead>
              <tr>
                <th>Code</th>
                <th>Full Name</th>
              </tr>
            </thead>
            <tbody>
              {modules.map((module) => (
                <tr key={module.code}>
                  <td>{module.code}</td>
                  <td>{module.full_name}</td>
                  <Link to={`/modules/${module.code}`}>
                      <button type="button" className="btn btn-light btn-sm">></button>
                    </Link>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );}

export default CohortPage;