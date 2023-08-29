import React, { useState, useEffect } from 'react';
import DegreeList from './DegreeList';

function DegreePage() {
  const [degrees, setDegrees] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch('http://127.0.0.1:8000/api/degree/');
      const data = await response.json();
      setDegrees(data);
    };

    fetchData();
  }, []);

  return (
    <div className="container">
      <div className="row mt-5">
        <div className="col-12">
          <h1 className="mb-4">Degrees</h1>
          <DegreeList degrees={degrees} />

        </div>
      </div>
    </div>
  );
}

export default DegreePage;
