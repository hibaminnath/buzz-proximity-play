import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "@/hooks/use-toast";
import Navigation from "@/components/Navigation";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      toast({
        title: "Error",
        description: "Please fill in all fields",
        variant: "destructive",
      });
      return;
    }
    
    toast({
      title: "Login Successful",
      description: "Welcome to Mosquito Frequency Control",
    });
    
    navigate("/mosquito");
  };

  return (
    <div className="min-h-screen bg-[var(--gradient-bg)] flex items-center justify-center p-4">
      <Navigation />
      
      <Card className="w-full max-w-md shadow-[var(--shadow-card)]">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-bold bg-[var(--gradient-primary)] bg-clip-text text-transparent">
            Mosquito Frequency Control
          </CardTitle>
          <CardDescription>
            Enter your credentials to access the simulation
          </CardDescription>
        </CardHeader>
        
        <CardContent>
          <form onSubmit={handleLogin} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email or Phone Number</Label>
              <Input
                id="email"
                type="text"
                placeholder="Enter your email or phone"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="transition-all duration-200 focus:shadow-[var(--shadow-frequency)]"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="transition-all duration-200 focus:shadow-[var(--shadow-frequency)]"
              />
            </div>
            
            <Button 
              type="submit" 
              className="w-full mt-6 bg-[var(--gradient-primary)] hover:shadow-[var(--shadow-glow)] transition-all duration-300"
            >
              Login
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default Login;