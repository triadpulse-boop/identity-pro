import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft, User, Mail, Phone, Calendar, MapPin, FileText, CheckCircle, XCircle, Clock } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { mockKYCData, getStatusColor } from "@/lib/mockData";
import { Navbar } from "@/components/Navbar";

const KYCDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const record = mockKYCData.find((r) => r.id === id);

  const handleLogout = () => {
    navigate("/");
  };

  if (!record) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar isAuthenticated={true} userName="Admin User" onLogout={handleLogout} />
        <div className="flex items-center justify-center h-[calc(100vh-4rem)]">
          <div className="text-center">
            <h1 className="text-2xl font-bold mb-2">KYC Record Not Found</h1>
            <Button onClick={() => navigate("/dashboard")}>
              Back to Dashboard
            </Button>
          </div>
        </div>
      </div>
    );
  }

  const mockUserData = {
    firstName: record.userName.split(" ")[0],
    lastName: record.userName.split(" ")[1] || "",
    email: record.email,
    phone: "+91 98765 43210",
    dateOfBirth: "1990-05-15",
    permanentAddress: {
      street: "123 MG Road",
      city: "Bangalore",
      state: "Karnataka",
      zipCode: "560001",
      country: "India",
    },
    corporateAddress: {
      street: "456 Tech Park",
      city: "Bangalore",
      state: "Karnataka",
      zipCode: "560100",
      country: "India",
    },
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar isAuthenticated={true} userName="Admin User" onLogout={handleLogout} />

      <div className="container mx-auto p-4 md:p-8">
        <div className="max-w-6xl mx-auto space-y-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
            <Button
              variant="outline"
              size="icon"
              onClick={() => navigate("/dashboard")}
            >
              <ArrowLeft className="h-4 w-4" />
            </Button>
            <div className="flex-1">
              <h1 className="text-4xl font-bold">KYC Verification Details</h1>
              <p className="text-muted-foreground mt-1">Application ID: {record.id}</p>
            </div>
            <Badge className={getStatusColor(record.status)} variant="secondary">
              {record.status.replace("_", " ")}
            </Badge>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <Card className="lg:col-span-2 hover:shadow-lg transition-shadow">
              <CardHeader>
                <CardTitle>Personal Information</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="flex justify-center md:justify-start">
                    <div className="w-full max-w-[200px] aspect-square rounded-xl bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center shadow-inner">
                      <User className="w-24 h-24 text-primary" />
                    </div>
                  </div>
                  <div className="space-y-4">
                    <div className="flex items-start gap-3">
                      <User className="w-5 h-5 text-muted-foreground mt-0.5" />
                      <div className="flex-1">
                        <p className="text-sm text-muted-foreground">Full Name</p>
                        <p className="font-semibold text-lg">
                          {mockUserData.firstName} {mockUserData.lastName}
                        </p>
                      </div>
                    </div>
                    <Separator />
                    <div className="flex items-start gap-3">
                      <Mail className="w-5 h-5 text-muted-foreground mt-0.5" />
                      <div className="flex-1">
                        <p className="text-sm text-muted-foreground">Email Address</p>
                        <p className="font-medium">{mockUserData.email}</p>
                      </div>
                    </div>
                    <Separator />
                    <div className="flex items-start gap-3">
                      <Phone className="w-5 h-5 text-muted-foreground mt-0.5" />
                      <div className="flex-1">
                        <p className="text-sm text-muted-foreground">Phone Number</p>
                        <p className="font-medium">{mockUserData.phone}</p>
                      </div>
                    </div>
                    <Separator />
                    <div className="flex items-start gap-3">
                      <Calendar className="w-5 h-5 text-muted-foreground mt-0.5" />
                      <div className="flex-1">
                        <p className="text-sm text-muted-foreground">Date of Birth</p>
                        <p className="font-medium">{formatDate(mockUserData.dateOfBirth)}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <CardTitle>Application Status</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex items-center gap-3 p-3 rounded-lg bg-muted/50">
                    {record.status === "approved" && <CheckCircle className="h-5 w-5 text-success" />}
                    {record.status === "rejected" && <XCircle className="h-5 w-5 text-destructive" />}
                    {record.status === "under_review" && <Clock className="h-5 w-5 text-warning" />}
                    {record.status === "pending" && <Clock className="h-5 w-5 text-muted-foreground" />}
                    <div className="flex-1">
                      <p className="font-medium capitalize">{record.status.replace("_", " ")}</p>
                      <p className="text-xs text-muted-foreground">Current Status</p>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Completion</span>
                      <span className="font-medium">{record.completionPercentage}%</span>
                    </div>
                    <div className="w-full bg-muted rounded-full h-2">
                      <div
                        className="bg-primary h-2 rounded-full transition-all"
                        style={{ width: `${record.completionPercentage}%` }}
                      />
                    </div>
                  </div>

                  <Separator />

                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Submitted</span>
                      <span className="font-medium">{formatDate(record.submittedAt)}</span>
                    </div>
                    {record.reviewedAt && (
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Reviewed</span>
                        <span className="font-medium">{formatDate(record.reviewedAt)}</span>
                      </div>
                    )}
                  </div>
                </div>

                {record.status === "pending" && (
                  <div className="flex gap-2 pt-4">
                    <Button size="sm" className="flex-1">Approve</Button>
                    <Button size="sm" variant="destructive" className="flex-1">Reject</Button>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MapPin className="w-5 h-5" />
                  Permanent Address
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <p className="font-medium">{mockUserData.permanentAddress.street}</p>
                <p className="text-muted-foreground">
                  {mockUserData.permanentAddress.city}, {mockUserData.permanentAddress.state}
                </p>
                <p className="text-muted-foreground">{mockUserData.permanentAddress.zipCode}</p>
                <p className="text-muted-foreground">{mockUserData.permanentAddress.country}</p>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MapPin className="w-5 h-5" />
                  Corporate Address
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <p className="font-medium">{mockUserData.corporateAddress.street}</p>
                <p className="text-muted-foreground">
                  {mockUserData.corporateAddress.city}, {mockUserData.corporateAddress.state}
                </p>
                <p className="text-muted-foreground">{mockUserData.corporateAddress.zipCode}</p>
                <p className="text-muted-foreground">{mockUserData.corporateAddress.country}</p>
              </CardContent>
            </Card>
          </div>

          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="w-5 h-5" />
                Verification Documents
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="space-y-3">
                  <p className="font-semibold">Permanent Address Proof</p>
                  <p className="text-sm text-muted-foreground">Document Type: Aadhar Card</p>
                  <div className="w-full aspect-video bg-gradient-to-br from-muted to-muted/50 rounded-lg flex items-center justify-center border-2 border-dashed">
                    <FileText className="w-12 h-12 text-muted-foreground" />
                  </div>
                </div>
                <div className="space-y-3">
                  <p className="font-semibold">Corporate Address Proof</p>
                  <p className="text-sm text-muted-foreground">Document Type: Driving License</p>
                  <div className="w-full aspect-video bg-gradient-to-br from-muted to-muted/50 rounded-lg flex items-center justify-center border-2 border-dashed">
                    <FileText className="w-12 h-12 text-muted-foreground" />
                  </div>
                </div>
                <div className="space-y-3">
                  <p className="font-semibold">Liveness Verification</p>
                  <p className="text-sm text-muted-foreground">Live Selfie</p>
                  <div className="w-full aspect-video bg-gradient-to-br from-primary/20 to-accent/20 rounded-lg flex items-center justify-center border-2 border-dashed">
                    <User className="w-12 h-12 text-primary" />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <CardTitle>Timeline</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="flex gap-4">
                  <div className="flex flex-col items-center">
                    <div className="w-3 h-3 rounded-full bg-primary" />
                    {record.reviewedAt && <div className="w-0.5 h-full bg-border" />}
                  </div>
                  <div className="flex-1 pb-6">
                    <p className="font-semibold">Application Submitted</p>
                    <p className="text-sm text-muted-foreground">{formatDate(record.submittedAt)}</p>
                    <p className="text-xs text-muted-foreground mt-1">
                      KYC application submitted by {record.userName}
                    </p>
                  </div>
                </div>
                {record.reviewedAt && (
                  <div className="flex gap-4">
                    <div className="flex flex-col items-center">
                      <div className={`w-3 h-3 rounded-full ${record.status === "approved" ? "bg-success" : "bg-destructive"}`} />
                    </div>
                    <div className="flex-1">
                      <p className="font-semibold capitalize">Application {record.status}</p>
                      <p className="text-sm text-muted-foreground">{formatDate(record.reviewedAt)}</p>
                      <p className="text-xs text-muted-foreground mt-1">
                        Reviewed by Admin User
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default KYCDetail;
