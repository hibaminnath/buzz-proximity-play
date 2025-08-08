import { useState, useEffect, useRef, useCallback } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Navigation from "@/components/Navigation";

interface AudioSettings {
  minFrequency: number;
  maxFrequency: number;
  waveType: OscillatorType;
}

const MosquitoSimulation = () => {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [frequency, setFrequency] = useState(0);
  const [distance, setDistance] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const humanRef = useRef<HTMLDivElement>(null);
  const audioContextRef = useRef<AudioContext | null>(null);
  const oscillatorRef = useRef<OscillatorNode | null>(null);
  const gainNodeRef = useRef<GainNode | null>(null);

  // Get settings from localStorage or use defaults
  const getSettings = (): AudioSettings => {
    const saved = localStorage.getItem('mosquito-settings');
    return saved ? JSON.parse(saved) : {
      minFrequency: 200,
      maxFrequency: 1000,
      waveType: 'sine' as OscillatorType
    };
  };

  const settings = getSettings();

  const initAudio = useCallback(() => {
    if (!audioContextRef.current) {
      audioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)();
    }
    return audioContextRef.current;
  }, []);

  const playFrequency = useCallback((freq: number) => {
    const audioContext = initAudio();
    
    if (oscillatorRef.current) {
      oscillatorRef.current.stop();
      oscillatorRef.current.disconnect();
    }
    
    oscillatorRef.current = audioContext.createOscillator();
    gainNodeRef.current = audioContext.createGain();
    
    oscillatorRef.current.connect(gainNodeRef.current);
    gainNodeRef.current.connect(audioContext.destination);
    
    oscillatorRef.current.type = settings.waveType;
    oscillatorRef.current.frequency.setValueAtTime(freq, audioContext.currentTime);
    gainNodeRef.current.gain.setValueAtTime(0.1, audioContext.currentTime);
    
    oscillatorRef.current.start();
    setIsPlaying(true);
  }, [settings.waveType, initAudio]);

  const stopAudio = useCallback(() => {
    if (oscillatorRef.current) {
      oscillatorRef.current.stop();
      oscillatorRef.current.disconnect();
      oscillatorRef.current = null;
    }
    if (gainNodeRef.current) {
      gainNodeRef.current.disconnect();
      gainNodeRef.current = null;
    }
    setIsPlaying(false);
  }, []);

  const calculateFrequency = useCallback((dist: number) => {
    const maxDistance = 300; // Maximum detection distance
    const normalizedDistance = Math.min(dist, maxDistance) / maxDistance;
    // Closer = higher frequency (inverted)
    const freq = settings.maxFrequency - (normalizedDistance * (settings.maxFrequency - settings.minFrequency));
    return Math.round(freq);
  }, [settings.minFrequency, settings.maxFrequency]);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!humanRef.current) return;
      
      const rect = humanRef.current.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      
      const deltaX = e.clientX - centerX;
      const deltaY = e.clientY - centerY;
      const dist = Math.sqrt(deltaX * deltaX + deltaY * deltaY);
      
      setMousePos({ x: e.clientX, y: e.clientY });
      setDistance(Math.round(dist));
      
      const newFreq = calculateFrequency(dist);
      setFrequency(newFreq);
      
      // Play frequency if within detection range
      if (dist <= 300) {
        playFrequency(newFreq);
      } else {
        stopAudio();
      }
    };

    const handleMouseLeave = () => {
      stopAudio();
    };

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
      stopAudio();
      if (audioContextRef.current) {
        audioContextRef.current.close();
      }
    };
  }, [calculateFrequency, playFrequency, stopAudio]);

  return (
    <div className="min-h-screen bg-[var(--gradient-bg)] relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Large ambient blob - top left */}
        <div className="absolute -top-32 -left-32 w-96 h-96 bg-gradient-to-br from-primary/20 to-primary-glow/10 rounded-full blur-3xl animate-pulse"></div>
        
        {/* Medium biotech blob - bottom right */}
        <div className="absolute -bottom-20 -right-20 w-80 h-80 bg-gradient-to-tl from-secondary/15 to-accent/10 rounded-full blur-2xl animate-[pulse_3s_ease-in-out_infinite]"></div>
        
        {/* Small frequency indicator - top right */}
        <div className="absolute top-20 right-20 w-48 h-48 bg-gradient-to-br from-accent/20 to-transparent rounded-full blur-xl animate-[ping_4s_ease-in-out_infinite]"></div>
        
        {/* Subtle sci-fi glow - center left */}
        <div className="absolute top-1/2 -left-16 w-64 h-64 bg-gradient-to-r from-primary-glow/15 to-transparent rounded-full blur-2xl animate-[pulse_2.5s_ease-in-out_infinite]"></div>
        
        {/* Dynamic ripple effect */}
        <div className="absolute top-1/3 right-1/3 w-32 h-32 bg-gradient-radial from-accent/20 to-transparent rounded-full blur-lg animate-[ping_6s_ease-in-out_infinite]"></div>
      </div>
      
      <Navigation />
      
      {/* Instructions */}
      <div className="absolute top-20 left-4 z-10">
        <Card className="shadow-[var(--shadow-card)]">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Mosquito Simulation</CardTitle>
          </CardHeader>
          <CardContent className="pt-0 space-y-2">
            <p className="text-sm text-muted-foreground">
              Move your mouse – you're the mosquito.
            </p>
            <div className="flex flex-wrap gap-2">
              <Badge variant="outline">
                Distance: {distance}px
              </Badge>
              <Badge 
                variant={isPlaying ? "default" : "secondary"}
                className={isPlaying ? "bg-[var(--gradient-frequency)]" : ""}
              >
                Frequency: {frequency} Hz
              </Badge>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Human figure */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="relative">
          {/* Detection zone - dashed circle */}
          <div className="absolute inset-0 w-[600px] h-[600px] -translate-x-1/2 -translate-y-1/2 left-1/2 top-1/2 border-2 border-dashed border-primary/30 rounded-full animate-pulse"></div>
          
          {/* Inner detection zone */}
          <div className="absolute inset-0 w-[300px] h-[300px] -translate-x-1/2 -translate-y-1/2 left-1/2 top-1/2 border border-dashed border-primary/50 rounded-full"></div>
          
          {/* Human figure */}
          <div 
            ref={humanRef}
            className="w-20 h-20 bg-[var(--gradient-primary)] rounded-full shadow-[var(--shadow-glow)] flex items-center justify-center relative z-10"
          >
            <div className="text-2xl">🧑</div>
          </div>
          
          {/* Pulse effect when mosquito is close */}
          {distance <= 150 && (
            <div className="absolute inset-0 w-20 h-20 bg-primary/20 rounded-full animate-ping"></div>
          )}
        </div>
      </div>

      {/* Current mouse position indicator (mosquito) */}
      <div 
        className="fixed pointer-events-none z-20 transition-all duration-100"
        style={{ 
          left: mousePos.x - 8, 
          top: mousePos.y - 8,
          transform: `scale(${distance <= 300 ? 1.2 : 1})`,
        }}
      >
        <div className={`w-4 h-4 rounded-full ${distance <= 300 ? 'bg-warning animate-pulse' : 'bg-primary/70'} shadow-lg`}>
          <div className="text-xs">🦟</div>
        </div>
      </div>

      {/* Audio status indicator */}
      <div className="absolute bottom-4 right-4">
        <Card className="shadow-[var(--shadow-card)]">
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <div className={`w-3 h-3 rounded-full ${isPlaying ? 'bg-success animate-pulse' : 'bg-muted'}`}></div>
              <span className="text-sm">
                {isPlaying ? 'Buzzing Active' : 'No Buzz'}
              </span>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default MosquitoSimulation;