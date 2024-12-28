import React, { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useToast } from "@/hooks/use-toast"
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { UserPlus, User, Mail, Phone, Calendar } from 'lucide-react'
import { Link } from 'react-router-dom'
import { ThemeToggle } from '@/components/ThemeToggle'

interface StudentData {
  userName: string
  password: string
  firstName: string
  middleName: string
  lastName: string
  gender: string
  email: string
  tele: string
  role: string
  DOB: string
}

export default function StudentSignUp() {
  const { toast } = useToast()
  const [studentData, setStudentData] = useState<StudentData>({
    userName: '',
    password: '',
    firstName: '',
    middleName: '',
    lastName: '',
    gender: '',
    email: '',
    tele: '',
    role: 'student',
    DOB: '',
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setStudentData(prevData => ({
      ...prevData,
      [name]: value
    }))
  }

  const handleGenderChange = (value: string) => {
    setStudentData(prevData => ({
      ...prevData,
      gender: value
    }))
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    try {
      const response = await fetch('/api1/users/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(studentData),
      })
      const data = await response.json()
      if (data.successfulRegistration) {
        toast({
          title: "Registration Successful",
          description: "Your account has been created.",
        })
      } else {
        toast({
          title: "Registration Failed",
          description: "There was an error creating your account.",
          variant: "destructive",
        })
      }
    } catch (error) {
      console.error('Error:', error)
      toast({
        title: "Registration Failed",
        description: "There was an error creating your account.",
        variant: "destructive",
      })
    }
  }

  return (
    <div className="flex flex-col min-h-screen">
      <header className="px-4 lg:px-6 h-14 flex items-center">
        <Link className="flex items-center justify-center" to="/">
          Home
          <span className="sr-only">EduPlatform</span>
        </Link>
        <nav className="ml-auto flex gap-4 sm:gap-6">
          <ThemeToggle />
        </nav>
        </header>
        <main className="flex-1 flex items-center justify-center">
        <Card className="w-full max-w-md mx-auto shadow-lg">
      <CardHeader className="space-y-1">
        <CardTitle className="text-2xl font-bold text-center">Join Our Campus</CardTitle>
        <CardDescription className="text-center">Enter your details to register as a student</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-4">
            <div className="relative">
              <Label htmlFor="userName" className="sr-only">Username</Label>
              <Input
                id="userName"
                name="userName"
                value={studentData.userName}
                onChange={handleChange}
                required
                className="pl-10 w-full"
                placeholder="Username"
              />
              <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
            </div>
            <div className="relative">
              <Label htmlFor="password" className="sr-only">Password</Label>
              <Input
                id="password"
                name="password"
                type="password"
                value={studentData.password}
                onChange={handleChange}
                required
                className="pl-10 w-full"
                placeholder="Password"
              />
              <UserPlus className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
            </div>
          </div>
          
          <div className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <Input
                id="firstName"
                name="firstName"
                value={studentData.firstName}
                onChange={handleChange}
                required
                className="w-full"
                placeholder="First Name"
              />
              <Input
                id="middleName"
                name="middleName"
                value={studentData.middleName}
                onChange={handleChange}
                className="w-full"
                placeholder="Middle Name"
              />
              <Input
                id="lastName"
                name="lastName"
                value={studentData.lastName}
                onChange={handleChange}
                required
                className="w-full"
                placeholder="Last Name"
              />
            </div>
            <Select onValueChange={handleGenderChange}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select gender" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="male">Male</SelectItem>
                <SelectItem value="female">Female</SelectItem> 
              </SelectContent>
            </Select>
          </div>
          
          <div className="space-y-4">
            <div className="relative">
              <Label htmlFor="email" className="sr-only">Email</Label>
              <Input
                id="email"
                name="email"
                type="email"
                value={studentData.email}
                onChange={handleChange}
                required
                className="pl-10 w-full"
                placeholder="Email"
              />
              <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
            </div>
            <div className="relative">
              <Label htmlFor="tele" className="sr-only">Telephone</Label>
              <Input
                id="tele"
                name="tele"
                value={studentData.tele}
                onChange={handleChange}
                required
                className="pl-10 w-full"
                placeholder="Telephone"
              />
              <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
            </div>
            <div className="relative">
              <Label htmlFor="DOB" className="sr-only">Date of Birth</Label>
              <Input
                id="DOB"
                name="DOB"
                type="date"
                value={studentData.DOB}
                onChange={handleChange}
                required
                className="pl-10 w-full"
              />
              <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
            </div>
          </div>
          
          <Button type="submit" className="w-full">
            <UserPlus className="mr-2 h-5 w-5" /> Register Now
          </Button>
        </form>
      </CardContent>
      <CardFooter className="flex justify-center">
        <p className="text-sm text-gray-500">
          Already have an account?{" "}
          <Link to="/student/signin" className="text-blue-500 hover:underline">
            Sign In
          </Link>
        </p>
     </CardFooter>
    </Card>

        </main>
        <footer className="px-4 lg:px-6 h-14 flex items-center justify-between">
        <p className="text-xs text-gray-500 dark:text-gray-400">© 2024 EduPlatform Inc. All rights reserved.</p>
        <nav className="sm:ml-auto flex gap-4 sm:gap-6">
          <Link className="text-xs hover:underline underline-offset-4" to="#">
            Terms of Service
          </Link>
          <Link className="text-xs hover:underline underline-offset-4" to="#">
            Privacy
          </Link>
        </nav>  
        </footer>
      </div>
      )
}

