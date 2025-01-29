import { Button } from "@/components/ui/button"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Link } from "react-router-dom"
function AdminDashboard() {
  return (
    <div className="flex flex-col items-center min-h-screen py-10 bg-gray-100 dark:bg-gray-900">
      <Card className="w-full">
        <CardHeader>
          <CardTitle className="text-center text-2xl font-bold">Admin Dashboard</CardTitle>
        </CardHeader>
        <CardContent>
          <nav className="flex flex-col space-y-4">
            <Button asChild variant="outline" className="w-full">
              <Link to="/admin/add-courses">Add Courses</Link>
            </Button>
            <Button asChild variant="outline" className="w-full">
              <Link to="/admin/view-payments">View Payments</Link>
            </Button>
            <Button asChild variant="outline" className="w-full">
              <Link to="/">signout</Link>
            </Button>
          </nav>
        </CardContent>
      </Card>
    </div>
  )
}

export default AdminDashboard