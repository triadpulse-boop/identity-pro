import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Shield, Users, FileCheck, Lock, ArrowRight, CheckCircle, Clock, BarChart3 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Navbar } from "@/components/Navbar";
import { useToast } from "@/hooks/use-toast";

const Index = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [showLogin, setShowLogin] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (email && password) {
      toast({
        title: "Login Successful",
        description: "Welcome to AlgoCrat KYC Dashboard",
      });
      navigate("/dashboard");
    }
  };

  const stats = [
    { icon: CheckCircle, label: "Verified Users", value: "10,000+" },
    { icon: Clock, label: "Avg. Processing", value: "2.4 days" },
    { icon: BarChart3, label: "Success Rate", value: "95%" },
  ];

  const features = [
    {
      title: "Fast Verification",
      description: "Complete your KYC in just 5 simple steps",
      icon: CheckCircle,
    },
    {
      title: "Secure Processing",
      description: "Bank-grade encryption for all your documents",
      icon: Lock,
    },
    {
      title: "Real-time Updates",
      description: "Track your verification status in real-time",
      icon: Clock,
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5">
      <Navbar />

      <div className="container mx-auto px-4">
        {!showLogin ? (
          <>
            <div className="text-center py-20">
              <div className="inline-flex items-center justify-center w-24 h-24 rounded-2xl bg-gradient-to-br from-primary to-primary/70 mb-8 shadow-lg">
                <Shield className="w-12 h-12 text-primary-foreground" />
              </div>
              <h1 className="text-6xl font-bold mb-6 bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">
                AlgoCrat KYC
              </h1>
              <p className="text-2xl text-muted-foreground max-w-3xl mx-auto mb-12">
                Secure, Fast, and Reliable Know Your Customer Verification Platform
              </p>

              <div className="flex flex-wrap justify-center gap-4 mb-20">
                <Button size="lg" className="text-lg px-8" onClick={() => setShowLogin(true)}>
                  <Lock className="mr-2 h-5 w-5" />
                  Admin Login
                </Button>
                <Button size="lg" variant="outline" className="text-lg px-8" onClick={() => navigate("/user/kyc")}>
                  Start Verification
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto mb-20">
                {stats.map((stat, index) => (
                  <Card key={index} className="border-2">
                    <CardContent className="pt-6 text-center">
                      <stat.icon className="w-8 h-8 mx-auto mb-3 text-primary" />
                      <p className="text-3xl font-bold mb-1">{stat.value}</p>
                      <p className="text-sm text-muted-foreground">{stat.label}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>

            <div className="py-20 border-t">
              <h2 className="text-4xl font-bold text-center mb-12">Why Choose AlgoCrat?</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
                {features.map((feature, index) => (
                  <Card key={index} className="hover:shadow-xl transition-all hover:-translate-y-1">
                    <CardHeader>
                      <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
                        <feature.icon className="w-7 h-7 text-primary" />
                      </div>
                      <CardTitle className="text-xl">{feature.title}</CardTitle>
                      <CardDescription className="text-base">
                        {feature.description}
                      </CardDescription>
                    </CardHeader>
                  </Card>
                ))}
              </div>
            </div>

            <div className="py-20 border-t">
              <div className="max-w-5xl mx-auto">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                  <div>
                    <h2 className="text-4xl font-bold mb-6">Get Started Today</h2>
                    <p className="text-lg text-muted-foreground mb-6">
                      Join thousands of verified users who trust AlgoCrat for their KYC needs.
                    </p>
                    <ul className="space-y-3 mb-8">
                      <li className="flex items-center">
                        <CheckCircle className="w-5 h-5 text-success mr-3" />
                        <span>Quick 5-step verification process</span>
                      </li>
                      <li className="flex items-center">
                        <CheckCircle className="w-5 h-5 text-success mr-3" />
                        <span>Secure document storage</span>
                      </li>
                      <li className="flex items-center">
                        <CheckCircle className="w-5 h-5 text-success mr-3" />
                        <span>24/7 support available</span>
                      </li>
                    </ul>
                    <Button size="lg" onClick={() => navigate("/user/kyc")}>
                      Start Your Verification
                      <ArrowRight className="ml-2 h-5 w-5" />
                    </Button>
                  </div>
                  <Card className="p-8">
                    <CardHeader>
                      <CardTitle className="text-2xl">Admin Access</CardTitle>
                      <CardDescription>
                        Login to access the admin dashboard
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <Button className="w-full" size="lg" onClick={() => setShowLogin(true)}>
                        <Lock className="mr-2 h-5 w-5" />
                        Admin Login
                      </Button>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </div>
          </>
        ) : (
          <div className="flex items-center justify-center py-20">
            <Card className="w-full max-w-md">
              <CardHeader className="text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-xl bg-primary/10 mb-4 mx-auto">
                  <Lock className="w-8 h-8 text-primary" />
                </div>
                <CardTitle className="text-3xl">Admin Login</CardTitle>
                <CardDescription className="text-base">
                  Enter your credentials to access the dashboard
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleLogin} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="admin@algocrat.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
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
                      required
                    />
                  </div>
                  <Button type="submit" className="w-full" size="lg">
                    Login to Dashboard
                  </Button>
                  <Button
                    type="button"
                    variant="ghost"
                    className="w-full"
                    onClick={() => setShowLogin(false)}
                  >
                    Back to Home
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
};

export default Index;
