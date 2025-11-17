import { useState } from 'react';
import { Plus, Users, CheckCircle, Clock, Star, Edit, Trash2 } from 'lucide-react';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { Badge } from './ui/badge';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { toast } from 'sonner';

export function AdminDashboard() {
  const [showNewTaskForm, setShowNewTaskForm] = useState(false);
  const [newTask, setNewTask] = useState({
    title: '',
    duration: '',
    date: '',
    location: '',
    spots: 0,
    description: '',
  });

  const tasks = [
    {
      id: 1,
      title: 'Food Distribution Support',
      date: '2025-11-05',
      duration: '2 hours',
      spots: 8,
      booked: 3,
      status: 'active',
    },
    {
      id: 2,
      title: 'Animal Shelter Care',
      date: '2025-11-06',
      duration: '3 hours',
      spots: 4,
      booked: 4,
      status: 'full',
    },
    {
      id: 3,
      title: 'Beach Cleanup Drive',
      date: '2025-10-28',
      duration: '2 hours',
      spots: 20,
      booked: 18,
      status: 'completed',
    },
  ];

  const volunteers = [
    {
      id: 1,
      name: 'Sarah Johnson',
      email: 'sarah@email.com',
      totalHours: 45,
      badge: 'silver',
      rating: 4.9,
      tasksCompleted: 12,
    },
    {
      id: 2,
      name: 'Michael Chen',
      email: 'michael@email.com',
      totalHours: 32,
      badge: 'silver',
      rating: 4.8,
      tasksCompleted: 9,
    },
    {
      id: 3,
      name: 'Emily Rodriguez',
      email: 'emily@email.com',
      totalHours: 67,
      badge: 'gold',
      rating: 5.0,
      tasksCompleted: 18,
    },
  ];

  const pendingBookings = [
    {
      id: 1,
      volunteer: 'Sarah Johnson',
      task: 'Food Distribution Support',
      date: '2025-11-05',
      status: 'pending',
    },
    {
      id: 2,
      volunteer: 'Michael Chen',
      task: 'Youth Tutoring Session',
      date: '2025-11-07',
      status: 'pending',
    },
  ];

  const handleCreateTask = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success('New task created successfully!');
    setShowNewTaskForm(false);
    setNewTask({
      title: '',
      duration: '',
      date: '',
      location: '',
      spots: 0,
      description: '',
    });
  };

  const handleApproveBooking = (id: number) => {
    toast.success('Booking approved!');
  };

  const handleRejectBooking = (id: number) => {
    toast.error('Booking rejected');
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-gray-900 mb-2">Admin Dashboard</h1>
            <p className="text-gray-600">Manage tasks, volunteers, and bookings</p>
          </div>
          <Button onClick={() => setShowNewTaskForm(!showNewTaskForm)}>
            <Plus className="w-5 h-5 mr-2" />
            New Task
          </Button>
        </div>

        {/* New Task Form */}
        {showNewTaskForm && (
          <Card className="p-6 mb-8">
            <h2 className="text-gray-900 mb-6">Create New Task</h2>
            <form onSubmit={handleCreateTask} className="space-y-4">
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="title">Task Title</Label>
                  <Input
                    id="title"
                    value={newTask.title}
                    onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="duration">Duration</Label>
                  <Input
                    id="duration"
                    placeholder="e.g., 2 hours"
                    value={newTask.duration}
                    onChange={(e) => setNewTask({ ...newTask, duration: e.target.value })}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="date">Date</Label>
                  <Input
                    id="date"
                    type="date"
                    value={newTask.date}
                    onChange={(e) => setNewTask({ ...newTask, date: e.target.value })}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="location">Location</Label>
                  <Input
                    id="location"
                    value={newTask.location}
                    onChange={(e) => setNewTask({ ...newTask, location: e.target.value })}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="spots">Available Spots</Label>
                  <Input
                    id="spots"
                    type="number"
                    min="1"
                    value={newTask.spots}
                    onChange={(e) => setNewTask({ ...newTask, spots: parseInt(e.target.value) })}
                    required
                  />
                </div>
              </div>
              <div>
                <Label htmlFor="description">Description</Label>
                <textarea
                  id="description"
                  rows={3}
                  value={newTask.description}
                  onChange={(e) => setNewTask({ ...newTask, description: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
              <div className="flex gap-4">
                <Button type="submit">Create Task</Button>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setShowNewTaskForm(false)}
                >
                  Cancel
                </Button>
              </div>
            </form>
          </Card>
        )}

        {/* Stats */}
        <div className="grid sm:grid-cols-4 gap-6 mb-8">
          <Card className="p-6">
            <div className="bg-blue-100 p-3 rounded-lg w-fit mb-4">
              <Clock className="w-6 h-6 text-blue-600" />
            </div>
            <div className="text-gray-900">{tasks.filter(t => t.status === 'active').length}</div>
            <p className="text-sm text-gray-600">Active Tasks</p>
          </Card>
          <Card className="p-6">
            <div className="bg-green-100 p-3 rounded-lg w-fit mb-4">
              <Users className="w-6 h-6 text-green-600" />
            </div>
            <div className="text-gray-900">{volunteers.length}</div>
            <p className="text-sm text-gray-600">Total Volunteers</p>
          </Card>
          <Card className="p-6">
            <div className="bg-yellow-100 p-3 rounded-lg w-fit mb-4">
              <CheckCircle className="w-6 h-6 text-yellow-600" />
            </div>
            <div className="text-gray-900">{pendingBookings.length}</div>
            <p className="text-sm text-gray-600">Pending Approvals</p>
          </Card>
          <Card className="p-6">
            <div className="bg-purple-100 p-3 rounded-lg w-fit mb-4">
              <Star className="w-6 h-6 text-purple-600" />
            </div>
            <div className="text-gray-900">{tasks.filter(t => t.status === 'completed').length}</div>
            <p className="text-sm text-gray-600">Completed Tasks</p>
          </Card>
        </div>

        {/* Tabs */}
        <Tabs defaultValue="tasks" className="w-full">
          <TabsList className="mb-6">
            <TabsTrigger value="tasks">Tasks</TabsTrigger>
            <TabsTrigger value="volunteers">Volunteers</TabsTrigger>
            <TabsTrigger value="bookings">Pending Bookings</TabsTrigger>
          </TabsList>

          {/* Tasks Tab */}
          <TabsContent value="tasks">
            <Card className="p-6">
              <h2 className="text-gray-900 mb-6">All Tasks</h2>
              <div className="space-y-4">
                {tasks.map((task) => (
                  <div
                    key={task.id}
                    className="flex items-center justify-between p-4 bg-gray-50 rounded-lg"
                  >
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="text-gray-900">{task.title}</h3>
                        <Badge
                          variant={
                            task.status === 'active'
                              ? 'default'
                              : task.status === 'full'
                              ? 'secondary'
                              : 'outline'
                          }
                        >
                          {task.status}
                        </Badge>
                      </div>
                      <div className="flex items-center gap-6 text-sm text-gray-600">
                        <span>{new Date(task.date).toLocaleDateString()}</span>
                        <span>{task.duration}</span>
                        <span>
                          {task.booked}/{task.spots} spots filled
                        </span>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Button variant="outline" size="sm">
                        <Edit className="w-4 h-4" />
                      </Button>
                      <Button variant="outline" size="sm">
                        <Trash2 className="w-4 h-4 text-red-600" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </TabsContent>

          {/* Volunteers Tab */}
          <TabsContent value="volunteers">
            <Card className="p-6">
              <h2 className="text-gray-900 mb-6">Registered Volunteers</h2>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-gray-200">
                      <th className="text-left py-3 px-4 text-gray-900">Name</th>
                      <th className="text-left py-3 px-4 text-gray-900">Email</th>
                      <th className="text-left py-3 px-4 text-gray-900">Hours</th>
                      <th className="text-left py-3 px-4 text-gray-900">Badge</th>
                      <th className="text-left py-3 px-4 text-gray-900">Rating</th>
                      <th className="text-left py-3 px-4 text-gray-900">Tasks</th>
                    </tr>
                  </thead>
                  <tbody>
                    {volunteers.map((volunteer) => (
                      <tr key={volunteer.id} className="border-b border-gray-100">
                        <td className="py-3 px-4 text-gray-900">{volunteer.name}</td>
                        <td className="py-3 px-4 text-gray-600">{volunteer.email}</td>
                        <td className="py-3 px-4 text-gray-900">{volunteer.totalHours}h</td>
                        <td className="py-3 px-4">
                          <Badge variant="secondary" className="capitalize">
                            {volunteer.badge}
                          </Badge>
                        </td>
                        <td className="py-3 px-4">
                          <div className="flex items-center gap-1">
                            <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                            <span className="text-gray-900">{volunteer.rating}</span>
                          </div>
                        </td>
                        <td className="py-3 px-4 text-gray-900">
                          {volunteer.tasksCompleted}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </Card>
          </TabsContent>

          {/* Bookings Tab */}
          <TabsContent value="bookings">
            <Card className="p-6">
              <h2 className="text-gray-900 mb-6">Pending Bookings</h2>
              <div className="space-y-4">
                {pendingBookings.map((booking) => (
                  <div
                    key={booking.id}
                    className="flex items-center justify-between p-4 bg-yellow-50 border border-yellow-200 rounded-lg"
                  >
                    <div>
                      <div className="text-gray-900 mb-1">{booking.volunteer}</div>
                      <div className="text-sm text-gray-600">
                        {booking.task} • {new Date(booking.date).toLocaleDateString()}
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Button
                        size="sm"
                        onClick={() => handleApproveBooking(booking.id)}
                      >
                        Approve
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleRejectBooking(booking.id)}
                      >
                        Reject
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
