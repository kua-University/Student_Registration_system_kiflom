import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import { ThemeProvider } from "@/components/ThemeProvider"
import Home from '@/pages/Home'
import StudentSignUp from '@/pages/SignUp'
import StudentSignIn from '@/pages/SignIn' 
import AdminSignIn from '@/pages/Admin' 
import { Toaster } from '@/components/ui/toaster'
import StudentDashboard from '@/pages/StudentDashboard'; 
import PaymentSuccess from '@/pages/PaymentSuccess';
import MakePayments from '@/pages/MakePayments';
import AddCourse from '@/pages/AddCourse';
import AdminDashboard from '@/pages/AdminDashboard';
import EnrollCourse from '@/pages/EnrollCourse';

const App: React.FC = () => {
  return (
    <ThemeProvider defaultTheme="system" storageKey="vite-ui-theme">
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          {/* routes related to student */}
          <Route path="/student/signup" element={<StudentSignUp />} />
          <Route path="/student/signin" element={<StudentSignIn />} />
          <Route path="/student/dashboard" element={<StudentDashboard />} />
          <Route path="/student/enroll-courses" element={<EnrollCourse/>} />
          <Route path="/student/make-payments" element={<MakePayments/>} />
          <Route path="/student/payment-success" element={<PaymentSuccess/>} />

          {/* routes related to admin */}
          <Route path="/admin/signin" element={<AdminSignIn />} />
          <Route path="/admin/dashboard" element={<AdminDashboard />} />
          <Route path="/admin/add-courses" element={<AddCourse />} />
          <Route path="/admin/view-payments" element={<div>View Payments</div>} />
          <Route path="*" element={<div>404 Not Found</div>} />
        </Routes>
      </Router>
      <Toaster/>
    </ThemeProvider>
  );
};

export default App;