import React from 'react';

function DegreeList(props) {
  const degrees = props.degrees;

  return (


      <table className="table mt-2">
        <thead>
          <tr>
            <th>Degree Code</th>
            <th>Degree Name</th>
          </tr>
        </thead>
        <tbody>
          {degrees.map((degree, index) => (
            <tr key={index}>
              <td>
                <a href={`/degrees/${degree.shortcode}`}>{degree.shortcode}</a>
              </td>
              <td>{degree.full_name}</td>
            </tr>
          ))}
        </tbody>
      </table>

  );
}

export default DegreeList;
