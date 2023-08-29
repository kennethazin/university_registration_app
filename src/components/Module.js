import React, { useState, useEffect } from 'react';
import ModuleList from './ModuleList.js';
import { Link } from 'react-router-dom';
import axios from 'axios';

const Module = () => {
  const [modules, setModules] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const result = await axios.get('http://127.0.0.1:8000/api/module/');
      setModules(result.data);
    };
  
    fetchData();
  }, []);
  

  return (
    <div>
      <h1>Modules</h1>
      <ModuleList modules={modules} />
      <Link to="/modules/new">Create new module</Link>
    </div>
  );
};

export default Module;
