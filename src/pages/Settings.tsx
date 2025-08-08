import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "@/hooks/use-toast";
import Navigation from "@/components/Navigation";

interface AudioSettings {
  minFrequency: number;
  maxFrequency: number;
  waveType: OscillatorType;
}

const Settings = () => {
  const [settings, setSettings] = useState<AudioSettings>({
    minFrequency: 200,
    maxFrequency: 1000,
    waveType: 'sine'
  });

  useEffect(() => {
    // Load settings from localStorage
    const saved = localStorage.getItem('mosquito-settings');
    if (saved) {
      setSettings(JSON.parse(saved));
    }
  }, []);

  const handleSave = () => {
    // Validate settings
    if (settings.minFrequency >= settings.maxFrequency) {
      toast({
        title: "Invalid Settings",
        description: "Minimum frequency must be less than maximum frequency",
        variant: "destructive",
      });
      return;
    }

    if (settings.minFrequency < 50 || settings.maxFrequency > 2000) {
      toast({
        title: "Invalid Range",
        description: "Frequencies must be between 50Hz and 2000Hz",
        variant: "destructive",
      });
      return;
    }

    // Save to localStorage
    localStorage.setItem('mosquito-settings', JSON.stringify(settings));
    
    toast({
      title: "Settings Saved",
      description: "Your sound settings have been updated",
    });
  };

  const handleReset = () => {
    setSettings({
      minFrequency: 200,
      maxFrequency: 1000,
      waveType: 'sine'
    });
    
    toast({
      title: "Settings Reset",
      description: "Settings have been reset to defaults",
    });
  };

  return (
    <div className="min-h-screen bg-[var(--gradient-bg)] flex items-center justify-center p-4">
      <Navigation />
      
      <Card className="w-full max-w-lg shadow-[var(--shadow-card)]">
        <CardHeader>
          <CardTitle className="text-2xl font-bold bg-[var(--gradient-frequency)] bg-clip-text text-transparent">
            Sound Settings
          </CardTitle>
          <CardDescription>
            Configure the mosquito buzzing frequencies and waveform
          </CardDescription>
        </CardHeader>
        
        <CardContent className="space-y-6">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="minFreq">
                Minimum Frequency (Hz)
              </Label>
              <Input
                id="minFreq"
                type="number"
                min="50"
                max="1999"
                value={settings.minFrequency}
                onChange={(e) => setSettings(prev => ({
                  ...prev,
                  minFrequency: parseInt(e.target.value) || 200
                }))}
                className="transition-all duration-200 focus:shadow-[var(--shadow-frequency)]"
              />
              <p className="text-xs text-muted-foreground">
                Frequency when mosquito is far away
              </p>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="maxFreq">
                Maximum Frequency (Hz)
              </Label>
              <Input
                id="maxFreq"
                type="number"
                min="51"
                max="2000"
                value={settings.maxFrequency}
                onChange={(e) => setSettings(prev => ({
                  ...prev,
                  maxFrequency: parseInt(e.target.value) || 1000
                }))}
                className="transition-all duration-200 focus:shadow-[var(--shadow-frequency)]"
              />
              <p className="text-xs text-muted-foreground">
                Frequency when mosquito is close
              </p>
            </div>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="waveType">Sound Waveform</Label>
            <Select
              value={settings.waveType}
              onValueChange={(value: OscillatorType) => setSettings(prev => ({
                ...prev,
                waveType: value
              }))}
            >
              <SelectTrigger className="transition-all duration-200 focus:shadow-[var(--shadow-frequency)]">
                <SelectValue placeholder="Select waveform" />
              </SelectTrigger>
              <SelectContent className="bg-popover border border-border">
                <SelectItem value="sine">Sine (Smooth)</SelectItem>
                <SelectItem value="square">Square (Sharp)</SelectItem>
                <SelectItem value="triangle">Triangle (Mellow)</SelectItem>
                <SelectItem value="sawtooth">Sawtooth (Harsh)</SelectItem>
              </SelectContent>
            </Select>
            <p className="text-xs text-muted-foreground">
              Different waveforms create different buzzing sounds
            </p>
          </div>
          
          <div className="bg-muted p-4 rounded-lg">
            <h4 className="font-medium mb-2">Preview Range</h4>
            <p className="text-sm text-muted-foreground">
              Current range: {settings.minFrequency}Hz - {settings.maxFrequency}Hz
            </p>
            <p className="text-sm text-muted-foreground">
              Waveform: {settings.waveType}
            </p>
          </div>
          
          <div className="flex gap-3 pt-4">
            <Button 
              onClick={handleSave}
              className="flex-1 bg-[var(--gradient-primary)] hover:shadow-[var(--shadow-glow)] transition-all duration-300"
            >
              Save Settings
            </Button>
            <Button 
              onClick={handleReset}
              variant="outline"
              className="hover:bg-muted"
            >
              Reset
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Settings;