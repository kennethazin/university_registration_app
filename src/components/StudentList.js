import React, { useState, useEffect } from 'react';

import axios from 'axios';
import { Container, Table, Pagination, Form } from 'react-bootstrap';

const StudentList = () => {
  const [students, setStudents] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');

  const PER_PAGE = 20;

  useEffect(() => {
    const fetchData = async () => {
      const result = await axios.get('http://127.0.0.1:8000/api/student/');
      setStudents(result.data);
    };

    fetchData();
  }, []);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
    setCurrentPage(1);
  };

  const filteredStudents = students.filter((student) =>
    student.first_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    student.last_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    student.student_id.toString().includes(searchQuery)
  );

  const totalStudents = filteredStudents.length;
  const lastStudentIndex = currentPage * PER_PAGE;
  const firstStudentIndex = lastStudentIndex - PER_PAGE;
  const displayedStudents = filteredStudents.slice(firstStudentIndex, lastStudentIndex);

  return (
    <Container className='my-4'>
    <div>
      <h2>All Students</h2>

      <div className="mb-3">
        <Form.Control
          type="text"
          placeholder="Search by name or ID"
          value={searchQuery}
          onChange={handleSearchChange}
        />
      </div>

      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Name</th>
            <th>Student ID</th>
            <th>Email</th>
          </tr>
        </thead>
        <tbody>
          {displayedStudents.map((student) => (
            <tr key={student.student_id} onClick={() => window.location.href=`/students/${student.student_id}`}>
              <td>{`${student.first_name} ${student.last_name}`}</td>
              <td>{student.student_id}</td>
              <td>{student.email}</td>
            </tr>
          ))}
        </tbody>
      </Table>

      <div className="d-flex justify-content-center">
        <Pagination>
          {Array.from({ length: Math.ceil(totalStudents / PER_PAGE) }, (_, index) => (
            <Pagination.Item key={index + 1} active={index + 1 === currentPage} onClick={() => handlePageChange(index + 1)}>
              {index + 1}
            </Pagination.Item>
          ))}
        </Pagination>
      </div>
    </div>
    </Container>
  );
};

export default StudentList;
