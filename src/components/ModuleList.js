import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const ModuleList = () => {
  const [modules, setModules] = useState([]);
  const [cohort, setCohort] = useState(null);
  const [cohortModules, setCohortModules] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:8000/api/module/');
        setModules(response.data);
        setLoading(false);
      } catch (error) {
        console.error(error);
        setError('Error fetching modules. Please try again later.');
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const fetchCohortModules = async () => {
      try {
        const response = await axios.get(`http://127.0.0.1:8000/api/module/?delivered_to=${cohort}`);
        setCohortModules(response.data);
        setLoading(false);
      } catch (error) {
        console.error(error);
        setError('Error fetching cohort modules. Please try again later');
        setLoading(false);
      }
    };

    if (cohort) {
      fetchCohortModules();
    } else {
      setCohortModules([]);
    }
  }, [cohort]);

  const handleCohortChange = (event) => {
    setCohort(event.target.value);
  };

  const moduleList = cohort ? cohortModules : modules;

  if (loading) {
    return <div>Loading modules...</div>;
  }

  if (error) {
    return <div className='mb-3 text-center text-bg-danger'>{error}</div>;
  }
  return (
    <div className="container mt-5">
      <h2>Modules</h2>
      <div className="mb-3">
        Filter by cohort:
        <select className="form-select ms-2" value={cohort} onChange={handleCohortChange}>
          <option value="">All cohorts</option>
          <option value="COMSCI1">COMSCI1</option>
          <option value="COMSCI2">COMSCI2</option>
          <option value="COMSCI3">COMSCI3</option>
          <option value="COMSCI4">COMSCI4</option>
          <option value="COMBUS1">COMBUS1</option>
          <option value="COMBUS2">COMBUS2</option>
          <option value="COMBUS3">COMBUS3</option>
          <option value="COMBUS4">COMBUS4</option>
          <option value="DS1">DS1</option>
          <option value="DS2">DS2</option>
          <option value="DS3">DS3</option>
          {/* Add other cohorts dynamically here */}
        </select>
      </div>
      <table className="table">
        <thead>
          <tr>
            <th>Module Code</th>
            <th>Module Name</th>
          </tr>
        </thead>
        <tbody>
          {moduleList.map((module) => (
            <tr key={module.code}>
              <td>
                <Link to={`/modules/${module.code}`}>
                  {module.code}
                </Link>
              </td>
              <td>{module.full_name}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ModuleList;
