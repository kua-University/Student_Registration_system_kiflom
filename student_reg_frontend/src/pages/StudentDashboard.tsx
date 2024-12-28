import React from 'react';
import { Link } from 'react-router-dom';

const StudentDashboard: React.FC = () => {
  return (
    <div>
      <h1>Student Dashboard</h1>
      <nav>
        <ul>
          <li><Link to="/add-courses">Add Courses</Link></li>
          <li><Link to="/view-grades">View Grades</Link></li>
          <li><Link to="/make-payments">Make Payments</Link></li>
        </ul>
      </nav>
    </div>
  );
};

export default StudentDashboard;