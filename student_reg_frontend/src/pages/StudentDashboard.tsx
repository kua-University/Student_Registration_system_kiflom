import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

const StudentDashboard: React.FC = () => {
  return (
    <div className="flex flex-col items-center min-h-screen py-10 bg-gray-100 dark:bg-gray-900">
      <Card className="w-full max-w-3xl">
        <CardHeader>
          <CardTitle className="text-center text-2xl font-bold">Student Dashboard</CardTitle>
        </CardHeader>
        <CardContent>
          <nav className="flex flex-col space-y-4">
            <Button asChild variant="outline" className="w-full">
              <Link to="/add-courses">Add Courses</Link>
            </Button>
            <Button asChild variant="outline" className="w-full">
              <Link to="/view-grades">View Grades</Link>
            </Button>
            <Button asChild variant="outline" className="w-full">
              <Link to="/make-payments">Make Payments</Link>
            </Button>
          </nav>
        </CardContent>
      </Card>
    </div>
  );
};

export default StudentDashboard;