import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Activity, LogIn, Zap, Waves } from "lucide-react";

const Index = () => {
  return (
    <div className="min-h-screen bg-[var(--gradient-bg)] flex items-center justify-center p-4">
      <div className="max-w-4xl mx-auto text-center space-y-8">
        {/* Hero Section */}
        <div className="space-y-4">
          <h1 className="text-5xl md:text-6xl font-bold bg-[var(--gradient-primary)] bg-clip-text text-transparent">
            Mosquito Frequency Control
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Experience an interactive audio simulation where your cursor becomes a mosquito, 
            and proximity controls the buzzing frequency in real-time.
          </p>
        </div>

        {/* Quick Start Card */}
        <Card className="shadow-[var(--shadow-card)] max-w-md mx-auto">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 justify-center">
              <Zap className="h-5 w-5 text-primary" />
              Quick Start
            </CardTitle>
            <CardDescription>
              Jump right into the simulation
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <Link to="/login">
              <Button className="w-full bg-[var(--gradient-primary)] hover:shadow-[var(--shadow-glow)] transition-all duration-300">
                <LogIn className="mr-2 h-4 w-4" />
                Get Started
              </Button>
            </Link>
            <Link to="/mosquito">
              <Button variant="outline" className="w-full">
                <Activity className="mr-2 h-4 w-4" />
                Direct to Simulation
              </Button>
            </Link>
          </CardContent>
        </Card>

        {/* Features Preview */}
        <div className="grid md:grid-cols-3 gap-6 max-w-3xl mx-auto">
          <Card className="shadow-[var(--shadow-card)] hover:shadow-[var(--shadow-frequency)] transition-shadow duration-300">
            <CardHeader>
              <div className="mx-auto w-12 h-12 rounded-full bg-[var(--gradient-primary)] flex items-center justify-center">
                <Activity className="h-6 w-6 text-primary-foreground" />
              </div>
              <CardTitle className="text-center">Real-time Audio</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground text-center">
                Dynamic frequency changes based on cursor proximity using Web Audio API
              </p>
            </CardContent>
          </Card>

          <Card className="shadow-[var(--shadow-card)] hover:shadow-[var(--shadow-frequency)] transition-shadow duration-300">
            <CardHeader>
              <div className="mx-auto w-12 h-12 rounded-full bg-[var(--gradient-frequency)] flex items-center justify-center">
                <Waves className="h-6 w-6 text-white" />
              </div>
              <CardTitle className="text-center">Custom Waveforms</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground text-center">
                Choose from multiple waveform types and frequency ranges
              </p>
            </CardContent>
          </Card>

          <Card className="shadow-[var(--shadow-card)] hover:shadow-[var(--shadow-frequency)] transition-shadow duration-300">
            <CardHeader>
              <div className="mx-auto w-12 h-12 rounded-full bg-[var(--gradient-primary)] flex items-center justify-center">
                <Zap className="h-6 w-6 text-primary-foreground" />
              </div>
              <CardTitle className="text-center">Interactive Zones</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground text-center">
                Visual detection zones with real-time distance and frequency feedback
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Footer */}
        <p className="text-sm text-muted-foreground">
          Built with React, Web Audio API, and modern web technologies
        </p>
      </div>
    </div>
  );
};

export default Index;
