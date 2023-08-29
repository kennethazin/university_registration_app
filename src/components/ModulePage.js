import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

const ModulePage = () => {
  const [moduleData, setModuleData] = useState({});
  const { id } = useParams();

  useEffect(() => {
    // Fetch module data
    fetch(`http://127.0.0.1:8000/api/module/${id}/?format=json`)
      .then((response) => response.json())
      .then((data) => setModuleData(data));

  }, );

  return (
    <div className="container mt-5 text-center">
      <h2 className="mb-3">{moduleData.full_name}</h2>
      <p><strong>Code:</strong> {moduleData.code}</p>
      <p><strong>CA Split:</strong> {moduleData.ca_split}</p>
    </div>
  );
};

export default ModulePage;
