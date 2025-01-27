import { Link } from 'react-router-dom'
import { Button } from "@/components/ui/button"
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card"
import { MoonIcon } from 'lucide-react'
import { ThemeToggle } from '@/components/ThemeToggle'

export default function Home() {
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
      <main className="flex-1">
        <section className="w-full">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center space-y-4 text-center">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none">
                  Welcome to Our Campus
                </h1>
                <p className="mx-auto max-w-[700px] text-gray-500 md:text-xl dark:text-gray-400">
                  Your gateway to seamless learning  administration. Choose your role to get started.
                </p>
              </div>
            </div>
            <div className="mx-auto grid  items-center gap-6 py-12 lg:grid-cols-2 lg:gap-10">
              <Card>
                <CardHeader>
                  <CardTitle>Student Access</CardTitle>
                </CardHeader>
                <CardContent>
                  <p>Access your courses, assignments, and progress tracking tools.</p>
                </CardContent>
                <CardFooter className="flex justify-between">
                  <Button asChild>
                    <Link to="/student/signup">Sign Up</Link>
                  </Button>
                  <Button variant="outline" asChild>
                    <Link to="/student/signin">Sign In</Link>
                  </Button>
                </CardFooter>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>Admin Portal</CardTitle>
                </CardHeader>
                <CardContent>
                  <p>Manage courses, students, and institutional resources efficiently.</p>
                </CardContent>
                <CardFooter className="flex justify-between">
                  <Button variant="outline" asChild>
                    <Link to="/admin/signin">Sign In</Link>
                  </Button>
                </CardFooter>
              </Card>
            </div>
          </div>
        </section>
      </main>
      <footer className="flex flex-col gap-2 sm:flex-row py-6 w-full shrink-0 items-center px-4 md:px-6 border-t">
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

