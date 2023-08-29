import React, { useEffect, useState } from 'react';
import { Switch, Route, useRouteMatch } from 'react-router-dom';
import axios from 'axios';

import CohortList from './CohortList';
import CohortPage from './CohortPage';
import CohortForm from './CohortForm';

const Cohort = () => {
  const { path } = useRouteMatch();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [cohorts, setCohorts] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await axios.get('http://127.0.0.1:8000/api/cohort/');
        setCohorts(result.data);
        setLoading(false);
      } catch (error) {
        setLoading(false);
        setError(error.message);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      <Switch>
        <Route exact path={path}>
          <CohortList cohorts={cohorts} />
        </Route>
        <Route path={`${path}/create`} component={CohortForm} />
        <Route path={`${path}/:id`}>
          <CohortPage cohorts={cohorts} />
        </Route>
      </Switch>
    </div>
  );
};

export default Cohort;
