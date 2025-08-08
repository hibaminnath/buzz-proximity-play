import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Activity, Volume2, Settings, Waves } from "lucide-react";
import Navigation from "@/components/Navigation";

const About = () => {
  const features = [
    {
      icon: Activity,
      title: "Real-time Simulation",
      description: "Your mouse cursor acts as a mosquito, with distance-based frequency changes"
    },
    {
      icon: Volume2,
      title: "Web Audio API",
      description: "High-quality audio synthesis using browser's native audio capabilities"
    },
    {
      icon: Settings,
      title: "Customizable Settings",
      description: "Adjust frequency ranges and waveform types to your preference"
    },
    {
      icon: Waves,
      title: "Dynamic Frequencies",
      description: "Closer proximity generates higher frequencies, simulating real mosquito behavior"
    }
  ];

  return (
    <div className="min-h-screen bg-[var(--gradient-bg)] p-4">
      <Navigation />
      
      <div className="max-w-4xl mx-auto pt-20 space-y-8">
        {/* Hero Section */}
        <Card className="shadow-[var(--shadow-card)]">
          <CardHeader className="text-center">
            <CardTitle className="text-3xl font-bold bg-[var(--gradient-primary)] bg-clip-text text-transparent mb-2">
              About the Mosquito Simulation
            </CardTitle>
            <CardDescription className="text-lg">
              An interactive audio-visual experiment exploring proximity-based frequency modulation
            </CardDescription>
          </CardHeader>
        </Card>

        {/* Main Concept */}
        <Card className="shadow-[var(--shadow-card)]">
          <CardHeader>
            <CardTitle className="text-xl">How It Works</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h3 className="font-semibold mb-2 text-primary">The Concept</h3>
                <p className="text-muted-foreground">
                  This simulation models the behavior of a mosquito approaching a human. 
                  Your mouse cursor represents the mosquito, while a fixed point at the center 
                  represents the human target.
                </p>
              </div>
              <div>
                <h3 className="font-semibold mb-2 text-secondary">The Science</h3>
                <p className="text-muted-foreground">
                  As the mosquito (cursor) gets closer to the human, the buzzing frequency 
                  increases, simulating the Doppler effect and the mosquito's wing beat frequency 
                  as it approaches its target.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 gap-6">
          {features.map((feature, index) => (
            <Card key={index} className="shadow-[var(--shadow-card)] hover:shadow-[var(--shadow-frequency)] transition-shadow duration-300">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-[var(--gradient-primary)]">
                    <feature.icon className="h-5 w-5 text-primary-foreground" />
                  </div>
                  <CardTitle className="text-lg">{feature.title}</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">{feature.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Technical Details */}
        <Card className="shadow-[var(--shadow-card)]">
          <CardHeader>
            <CardTitle>Technical Implementation</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <h4 className="font-semibold mb-2">Audio Technology</h4>
              <p className="text-muted-foreground mb-3">
                Built using the Web Audio API for real-time audio synthesis. The system creates 
                oscillator nodes with configurable waveforms and frequencies.
              </p>
              <div className="flex flex-wrap gap-2">
                <Badge variant="outline">Web Audio API</Badge>
                <Badge variant="outline">React</Badge>
                <Badge variant="outline">TypeScript</Badge>
                <Badge variant="outline">Tailwind CSS</Badge>
              </div>
            </div>
            
            <div>
              <h4 className="font-semibold mb-2">Frequency Calculation</h4>
              <p className="text-muted-foreground">
                The frequency is calculated using inverse distance mapping. As the cursor moves 
                closer to the center, the distance decreases and the frequency increases within 
                the configured range (default: 200Hz - 1000Hz).
              </p>
            </div>
            
            <div>
              <h4 className="font-semibold mb-2">Detection Zone</h4>
              <p className="text-muted-foreground">
                The simulation features a 300-pixel radius detection zone. Audio only plays 
                when the cursor is within this range, with visual indicators showing the 
                active zones.
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Future Enhancements */}
        <Card className="shadow-[var(--shadow-card)]">
          <CardHeader>
            <CardTitle>Potential Enhancements</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2 text-muted-foreground">
              <li>• Multiple mosquitoes simulation</li>
              <li>• Environmental audio effects</li>
              <li>• 3D spatial audio positioning</li>
              <li>• Data export and analysis tools</li>
              <li>• Supabase integration for user preferences</li>
              <li>• Real-time collaboration features</li>
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default About;