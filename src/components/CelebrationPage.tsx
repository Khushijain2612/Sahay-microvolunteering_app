import { useState } from 'react';
import { Cake, Calendar, Users, Heart, Gift, PartyPopper } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import {ImageWithFallback} from './Resources/ImageWithFallback'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './ui/select';
import { toast } from 'sonner';

interface CelebrationPageProps {
  onBookCelebration: (data: CelebrationBooking) => void;
}

export interface CelebrationBooking {
  eventType: string;
  date: string;
  ngo: string;
  people: number;
  name: string;
  message: string;
}

export function CelebrationPage({ onBookCelebration }: CelebrationPageProps) {
  const [formData, setFormData] = useState<CelebrationBooking>({
    eventType: '',
    date: '',
    ngo: '',
    people: 1,
    name: '',
    message: '',
  });

  const eventTypes = [
    { value: 'birthday', label: 'Birthday', icon: Cake },
    { value: 'anniversary', label: 'Anniversary', icon: Heart },
    { value: 'graduation', label: 'Graduation', icon: PartyPopper },
    { value: 'corporate', label: 'Corporate Event', icon: Users },
    { value: 'memorial', label: 'Memorial', icon: Gift },
  ];

  const ngos = [
    'City Food Bank',
    'Happy Paws Shelter',
    'Youth Mentorship',
    'Environmental Care',
    'Elder Care Network',
    'Green Spaces Initiative',
  ];

  const celebrationIdeas = [
    {
      title: 'Birthday Giving',
      description: 'Instead of gifts, celebrate with a volunteering session',
      image: 'https://images.unsplash.com/photo-1758691737584-a8f17fb34475?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0ZWFtd29yayUyMGNlbGVicmF0aW9ufGVufDF8fHx8MTc2MTY1NjY5M3ww&ixlib=rb-4.1.0&q=80&w=1080',
    },
    {
      title: 'Anniversary Impact',
      description: 'Mark your special day by making a difference together',
      image: 'https://images.unsplash.com/photo-1697665387559-253e7a645e96?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjaGFyaXR5JTIwZG9uYXRpb24lMjBoYW5kc3xlbnwxfHx8fDE3NjE2NTY2OTN8MA&ixlib=rb-4.1.0&q=80&w=1080',
    },
    {
      title: 'Corporate Volunteering',
      description: 'Build team spirit while giving back to the community',
      image: 'https://images.unsplash.com/photo-1582213782179-e0d53f98f2ca?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb21tdW5pdHklMjBzZXJ2aWNlfGVufDF8fHx8MTc2MTY1NjE2OXww&ixlib=rb-4.1.0&q=80&w=1080',
    },
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onBookCelebration(formData);
    toast.success('Celebration event booked successfully!');
    setFormData({
      eventType: '',
      date: '',
      ngo: '',
      people: 1,
      name: '',
      message: '',
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full mb-4">
            <PartyPopper className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-gray-900 mb-4">Celebrate with Purpose</h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Turn your special occasions into meaningful experiences. 
            Instead of traditional celebrations, make memories while making a difference.
          </p>
        </div>

        {/* Celebration Ideas */}
        <div className="grid md:grid-cols-3 gap-8 mb-12">
          {celebrationIdeas.map((idea, index) => (
            <div
              key={index}
              className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow"
            >
              <ImageWithFallback
                src={idea.image}
                alt={idea.title}
                className="w-full h-48 object-cover"
              />
              <div className="p-6">
                <h3 className="text-gray-900 mb-2">{idea.title}</h3>
                <p className="text-sm text-gray-600">{idea.description}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Booking Form */}
        <div className="max-w-3xl mx-auto">
          <div className="bg-white rounded-2xl shadow-lg p-8">
            <h2 className="text-gray-900 mb-6">Book Your Celebration Event</h2>

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Event Type */}
              <div>
                <Label htmlFor="eventType">Event Type *</Label>
                <Select
                    value={formData.eventType || ""} // ensure string, even if initially undefined
                    onValueChange={(value: string) =>
                      setFormData({ ...formData, eventType: value })
                    }
                    required
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select event type" />
                    </SelectTrigger>
                    <SelectContent>
                      {eventTypes.map((type) => (
                        <SelectItem key={type.value} value={type.value}>
                          {type.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
              </div>

              {/* Name */}
              <div>
                <Label htmlFor="name">Your Name *</Label>
                <Input
                  id="name"
                  type="text"
                  placeholder="Enter your name"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  required
                />
              </div>

              {/* Date and People */}
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="date">Event Date *</Label>
                  <Input
                    id="date"
                    type="date"
                    value={formData.date}
                    onChange={(e) =>
                      setFormData({ ...formData, date: e.target.value })
                    }
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="people">Number of People *</Label>
                  <Input
                    id="people"
                    type="number"
                    min="1"
                    max="50"
                    placeholder="How many people?"
                    value={formData.people}
                    onChange={(e) =>
                      setFormData({ ...formData, people: parseInt(e.target.value) })
                    }
                    required
                  />
                </div>
              </div>

              {/* NGO Selection */}
              <div>
                <Label htmlFor="ngo">Choose NGO Partner *</Label>
                <Select
                  value={formData.ngo || ""} // ensure string, even if undefined
                  onValueChange={(value: string) =>
                    setFormData({ ...formData, ngo: value })
                  }
                  required
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select NGO" />
                  </SelectTrigger>
                  <SelectContent>
                    {ngos.map((ngo) => (
                      <SelectItem key={ngo} value={ngo}>
                        {ngo}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

              </div>

              {/* Message */}
              <div>
                <Label htmlFor="message">Special Message (Optional)</Label>
                <textarea
                  id="message"
                  rows={4}
                  placeholder="Tell us why this celebration is special..."
                  value={formData.message}
                  onChange={(e) =>
                    setFormData({ ...formData, message: e.target.value })
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
              </div>

              <Button type="submit" size="lg" className="w-full bg-gradient-to-r cursor-pointer from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700">
                <PartyPopper className="mr-2 w-5 h-5" />
                Book Celebration Event
              </Button>
            </form>
          </div>

          {/* Info Cards */}
          <div className="grid sm:grid-cols-3 gap-6 mt-8">
            <div className="bg-white p-6 rounded-xl text-center shadow-sm">
              <Calendar className="w-8 h-8 text-purple-600 mx-auto mb-3" />
              <h3 className="text-gray-900 mb-2">Flexible Dates</h3>
              <p className="text-sm text-gray-600">Book weeks or months in advance</p>
            </div>
            <div className="bg-white p-6 rounded-xl text-center shadow-sm">
              <Users className="w-8 h-8 text-pink-600 mx-auto mb-3" />
              <h3 className="text-gray-900 mb-2">Group Activities</h3>
              <p className="text-sm text-gray-600">Perfect for teams and families</p>
            </div>
            <div className="bg-white p-6 rounded-xl text-center shadow-sm">
              <Gift className="w-8 h-8 text-blue-600 mx-auto mb-3" />
              <h3 className="text-gray-900 mb-2">Meaningful Impact</h3>
              <p className="text-sm text-gray-600">Create lasting memories</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
