import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, Link } from 'react-router-dom';
import { Table } from 'react-bootstrap';

function DegreeDetail() {
  const { id } = useParams();
  const [degree, setDegree] = useState([]);
  const [cohorts, setCohorts] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const [degreeResponse, cohortResponse] = await Promise.all([
        axios.get(`http://127.0.0.1:8000/api/degree/${id}/`),
        axios.get(`http://127.0.0.1:8000/api/cohort/?degree=${id}`)
      ]);

      setDegree(degreeResponse.data);
      setCohorts(cohortResponse.data);
    };

    fetchData();
  }, [id]);

  return (
    <div className="container mt-5">
      <h2>{degree.full_name}</h2>
      <p>{degree.shortcode}</p>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Cohort ID</th>
            <th>Year</th>
            <th>Name</th>
          </tr>
        </thead>
        <tbody>
          {cohorts.map(cohort => (
            <tr key={cohort.id}>
              <td>
                <Link to={`/cohorts/${cohort.id}`}>{cohort.id}</Link>
              </td>
              <td>{cohort.year}</td>
              <td>{cohort.name}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
}

export default DegreeDetail;
