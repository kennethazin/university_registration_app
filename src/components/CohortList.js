import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const CohortList = () => {
  const [cohorts, setCohorts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await axios.get('http://127.0.0.1:8000/api/cohort/');
        setCohorts(result.data);
        setLoading(false);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    };

    fetchData();
  }, []);


  if (loading) {
    return
  }
  if (loading) {
    return <div>Loading cohorts...</div>;
  }

  if (error) {
    return <div className='mb-3 text-center text-bg-danger '>Error fetching cohorts: {error}</div>;
  }

  return (
    <div className="container mt-5">

    <div>
      <h1>Cohorts</h1>
      <table className="table">
        <thead>
          <tr>
            <th>Cohort Name</th>
          </tr>
        </thead>
        <tbody>
          {cohorts.map((cohort) => (
            <tr key={cohort.id}>
              <td>
                <Link to={`/cohorts/${cohort.id}`}>
                  {cohort.name}
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
    </div>

  );
};

export default CohortList;
