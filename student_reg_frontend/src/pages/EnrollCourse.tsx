import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";

interface Course {
  id: number;
  title: string;
  courseCode: string;
  creditHour: number;
}

const EnrollCourse: React.FC = () => {
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await fetch('/api3/courses/all');
        if (!response.ok) {
          throw new Error('Failed to fetch courses');
        }
        const data = await response.json();
        setCourses(data.data);
        setLoading(false);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch courses');
        setLoading(false);
      }
    };

    fetchCourses();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[80vh]">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center min-h-[80vh]">
        <p className="text-destructive">{error}</p>
      </div>
    );
  }

  return (
    <div className="container py-8 text-white">
      <h1 className="text-3xl font-bold text-center mb-8">Available Courses</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {courses.map((course) => (
          <Card key={course.id} className="flex flex-col h-full hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
            <CardHeader>
              <CardTitle>{course.title}</CardTitle>
              <CardDescription>{course.courseCode}</CardDescription>
            </CardHeader>
            <CardContent className="flex-grow">
              <p className="mt-2 text-sm text-muted-foreground">Credits: {course.creditHour}</p>
            </CardContent>
            <CardFooter className="flex gap-2">
              <Button variant="default">
                Enroll Now
              </Button>
              <Button variant="outline">
                Learn More
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default EnrollCourse;