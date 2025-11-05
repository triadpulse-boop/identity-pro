import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { StepIndicator } from "@/components/StepIndicator";
import { FileUpload } from "@/components/FileUpload";
import { Progress } from "@/components/ui/progress";
import { Navbar } from "@/components/Navbar";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { KYCFormData } from "@/types/kyc";
import { useToast } from "@/hooks/use-toast";
import { ArrowLeft, ArrowRight, CheckCircle, Save } from "lucide-react";

const steps = [
  { number: 1, title: "Basic Info" },
  { number: 2, title: "Addresses" },
  { number: 3, title: "Documents" },
  { number: 4, title: "Liveness" },
  { number: 5, title: "Review" },
];

const UserKYC = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [currentStep, setCurrentStep] = useState(1);
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);
  const [formData, setFormData] = useState<KYCFormData>({
    userInfo: {
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      dateOfBirth: "",
    },
    permanentAddress: {
      street: "",
      city: "",
      state: "",
      zipCode: "",
      country: "",
    },
    corporateAddress: {
      street: "",
      city: "",
      state: "",
      zipCode: "",
      country: "",
    },
    permanentDocType: { type: "aadhar" },
    corporateDocType: { type: "aadhar" },
  });

  const calculateProgress = () => {
    return (currentStep / steps.length) * 100;
  };

  const handleNext = () => {
    if (currentStep < 5) {
      setCurrentStep(currentStep + 1);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const handleSaveDraft = () => {
    toast({
      title: "Draft Saved",
      description: "Your progress has been saved successfully.",
    });
  };

  const handleSubmit = () => {
    setShowConfirmDialog(false);
    toast({
      title: "KYC Submitted Successfully",
      description: "Your KYC application is now under review.",
    });
    navigate("/dashboard");
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <div className="container mx-auto p-4 md:p-8">
        <div className="max-w-4xl mx-auto">
          <div className="mb-8">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h1 className="text-4xl font-bold">KYC Verification</h1>
                <p className="text-muted-foreground mt-1">
                  Complete your verification in 5 simple steps
                </p>
              </div>
              <Button variant="outline" size="sm" onClick={handleSaveDraft}>
                <Save className="h-4 w-4 mr-2" />
                Save Draft
              </Button>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Progress</span>
                <span className="font-medium">{Math.round(calculateProgress())}%</span>
              </div>
              <Progress value={calculateProgress()} className="h-2" />
            </div>
          </div>

          <StepIndicator steps={steps} currentStep={currentStep} />

          <Card className="mt-8 hover:shadow-lg transition-shadow">
            <CardContent className="p-6 md:p-8">
              {currentStep === 1 && (
                <div className="space-y-6">
                  <div>
                    <h2 className="text-2xl font-semibold mb-2">Personal Information</h2>
                    <p className="text-muted-foreground">Please provide your basic details</p>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="firstName">First Name *</Label>
                      <Input
                        id="firstName"
                        value={formData.userInfo.firstName}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            userInfo: { ...formData.userInfo, firstName: e.target.value },
                          })
                        }
                        placeholder="Enter first name"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="lastName">Last Name *</Label>
                      <Input
                        id="lastName"
                        value={formData.userInfo.lastName}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            userInfo: { ...formData.userInfo, lastName: e.target.value },
                          })
                        }
                        placeholder="Enter last name"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email Address *</Label>
                      <Input
                        id="email"
                        type="email"
                        value={formData.userInfo.email}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            userInfo: { ...formData.userInfo, email: e.target.value },
                          })
                        }
                        placeholder="Enter email"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="phone">Phone Number *</Label>
                      <Input
                        id="phone"
                        value={formData.userInfo.phone}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            userInfo: { ...formData.userInfo, phone: e.target.value },
                          })
                        }
                        placeholder="Enter phone number"
                      />
                    </div>
                    <div className="space-y-2 md:col-span-2">
                      <Label htmlFor="dob">Date of Birth *</Label>
                      <Input
                        id="dob"
                        type="date"
                        value={formData.userInfo.dateOfBirth}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            userInfo: { ...formData.userInfo, dateOfBirth: e.target.value },
                          })
                        }
                      />
                    </div>
                  </div>
                  <FileUpload
                    label="Upload Photo *"
                    value={formData.userInfo.photo}
                    onChange={(file) =>
                      setFormData({
                        ...formData,
                        userInfo: { ...formData.userInfo, photo: file },
                      })
                    }
                  />
                </div>
              )}

              {currentStep === 2 && (
                <div className="space-y-8">
                  <div>
                    <h2 className="text-2xl font-semibold mb-4">Permanent Address</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2 md:col-span-2">
                        <Label>Street Address *</Label>
                        <Input
                          value={formData.permanentAddress.street}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              permanentAddress: { ...formData.permanentAddress, street: e.target.value },
                            })
                          }
                          placeholder="Enter street address"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label>City *</Label>
                        <Input
                          value={formData.permanentAddress.city}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              permanentAddress: { ...formData.permanentAddress, city: e.target.value },
                            })
                          }
                          placeholder="Enter city"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label>State *</Label>
                        <Input
                          value={formData.permanentAddress.state}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              permanentAddress: { ...formData.permanentAddress, state: e.target.value },
                            })
                          }
                          placeholder="Enter state"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label>ZIP Code *</Label>
                        <Input
                          value={formData.permanentAddress.zipCode}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              permanentAddress: { ...formData.permanentAddress, zipCode: e.target.value },
                            })
                          }
                          placeholder="Enter ZIP code"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label>Country *</Label>
                        <Input
                          value={formData.permanentAddress.country}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              permanentAddress: { ...formData.permanentAddress, country: e.target.value },
                            })
                          }
                          placeholder="Enter country"
                        />
                      </div>
                    </div>
                  </div>

                  <div>
                    <h2 className="text-2xl font-semibold mb-4">Corporate Address</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2 md:col-span-2">
                        <Label>Street Address *</Label>
                        <Input
                          value={formData.corporateAddress.street}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              corporateAddress: { ...formData.corporateAddress, street: e.target.value },
                            })
                          }
                          placeholder="Enter street address"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label>City *</Label>
                        <Input
                          value={formData.corporateAddress.city}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              corporateAddress: { ...formData.corporateAddress, city: e.target.value },
                            })
                          }
                          placeholder="Enter city"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label>State *</Label>
                        <Input
                          value={formData.corporateAddress.state}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              corporateAddress: { ...formData.corporateAddress, state: e.target.value },
                            })
                          }
                          placeholder="Enter state"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label>ZIP Code *</Label>
                        <Input
                          value={formData.corporateAddress.zipCode}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              corporateAddress: { ...formData.corporateAddress, zipCode: e.target.value },
                            })
                          }
                          placeholder="Enter ZIP code"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label>Country *</Label>
                        <Input
                          value={formData.corporateAddress.country}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              corporateAddress: { ...formData.corporateAddress, country: e.target.value },
                            })
                          }
                          placeholder="Enter country"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {currentStep === 3 && (
                <div className="space-y-8">
                  <div>
                    <h2 className="text-2xl font-semibold mb-2">Permanent Address Proof</h2>
                    <p className="text-muted-foreground mb-4">Upload your permanent address verification document</p>
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <Label>Document Type *</Label>
                        <Select
                          value={formData.permanentDocType.type}
                          onValueChange={(value: any) =>
                            setFormData({
                              ...formData,
                              permanentDocType: { ...formData.permanentDocType, type: value },
                            })
                          }
                        >
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="aadhar">Aadhar Card</SelectItem>
                            <SelectItem value="dl">Driving License</SelectItem>
                            <SelectItem value="passport">Passport</SelectItem>
                            <SelectItem value="voter_id">Voter ID</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <FileUpload
                        label="Upload Document *"
                        value={formData.permanentDocType.file}
                        onChange={(file) =>
                          setFormData({
                            ...formData,
                            permanentDocType: { ...formData.permanentDocType, file },
                          })
                        }
                      />
                    </div>
                  </div>

                  <div>
                    <h2 className="text-2xl font-semibold mb-2">Corporate Address Proof</h2>
                    <p className="text-muted-foreground mb-4">Upload your corporate address verification document</p>
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <Label>Document Type *</Label>
                        <Select
                          value={formData.corporateDocType.type}
                          onValueChange={(value: any) =>
                            setFormData({
                              ...formData,
                              corporateDocType: { ...formData.corporateDocType, type: value },
                            })
                          }
                        >
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="aadhar">Aadhar Card</SelectItem>
                            <SelectItem value="dl">Driving License</SelectItem>
                            <SelectItem value="passport">Passport</SelectItem>
                            <SelectItem value="voter_id">Voter ID</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <FileUpload
                        label="Upload Document *"
                        value={formData.corporateDocType.file}
                        onChange={(file) =>
                          setFormData({
                            ...formData,
                            corporateDocType: { ...formData.corporateDocType, file },
                          })
                        }
                      />
                    </div>
                  </div>
                </div>
              )}

              {currentStep === 4 && (
                <div className="space-y-6">
                  <div>
                    <h2 className="text-2xl font-semibold mb-2">Liveness Check</h2>
                    <p className="text-muted-foreground">
                      Take a selfie to verify your identity. Make sure your face is clearly visible.
                    </p>
                  </div>
                  <Card className="bg-muted/30">
                    <CardContent className="p-6">
                      <div className="space-y-4">
                        <div className="flex items-center gap-3">
                          <CheckCircle className="h-5 w-5 text-success flex-shrink-0" />
                          <span className="text-sm">Ensure good lighting</span>
                        </div>
                        <div className="flex items-center gap-3">
                          <CheckCircle className="h-5 w-5 text-success flex-shrink-0" />
                          <span className="text-sm">Remove any accessories that cover your face</span>
                        </div>
                        <div className="flex items-center gap-3">
                          <CheckCircle className="h-5 w-5 text-success flex-shrink-0" />
                          <span className="text-sm">Look directly at the camera</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                  <FileUpload
                    label="Capture Selfie *"
                    capture={true}
                    value={formData.livenessPhoto}
                    onChange={(file) => setFormData({ ...formData, livenessPhoto: file })}
                  />
                </div>
              )}

              {currentStep === 5 && (
                <div className="space-y-6">
                  <div>
                    <h2 className="text-2xl font-semibold mb-2">Review Your Information</h2>
                    <p className="text-muted-foreground">Please verify all details before submission</p>
                  </div>

                  <div className="space-y-4">
                    <Card>
                      <CardHeader>
                        <CardTitle className="text-lg">Personal Information</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <dl className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <dt className="text-sm text-muted-foreground">Name</dt>
                            <dd className="font-medium">
                              {formData.userInfo.firstName} {formData.userInfo.lastName}
                            </dd>
                          </div>
                          <div>
                            <dt className="text-sm text-muted-foreground">Email</dt>
                            <dd className="font-medium">{formData.userInfo.email}</dd>
                          </div>
                          <div>
                            <dt className="text-sm text-muted-foreground">Phone</dt>
                            <dd className="font-medium">{formData.userInfo.phone}</dd>
                          </div>
                          <div>
                            <dt className="text-sm text-muted-foreground">Date of Birth</dt>
                            <dd className="font-medium">{formData.userInfo.dateOfBirth}</dd>
                          </div>
                        </dl>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardHeader>
                        <CardTitle className="text-lg">Permanent Address</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="font-medium">{formData.permanentAddress.street}</p>
                        <p className="text-muted-foreground">
                          {formData.permanentAddress.city}, {formData.permanentAddress.state}{" "}
                          {formData.permanentAddress.zipCode}
                        </p>
                        <p className="text-muted-foreground">{formData.permanentAddress.country}</p>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardHeader>
                        <CardTitle className="text-lg">Corporate Address</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="font-medium">{formData.corporateAddress.street}</p>
                        <p className="text-muted-foreground">
                          {formData.corporateAddress.city}, {formData.corporateAddress.state}{" "}
                          {formData.corporateAddress.zipCode}
                        </p>
                        <p className="text-muted-foreground">{formData.corporateAddress.country}</p>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardHeader>
                        <CardTitle className="text-lg">Documents</CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-2">
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Permanent Address:</span>
                          <span className="font-medium capitalize">{formData.permanentDocType.type.replace("_", " ")}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Corporate Address:</span>
                          <span className="font-medium capitalize">{formData.corporateDocType.type.replace("_", " ")}</span>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              )}

              <div className="flex justify-between mt-8 pt-6 border-t">
                <Button variant="outline" onClick={handlePrevious} disabled={currentStep === 1}>
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Previous
                </Button>
                {currentStep < 5 ? (
                  <Button onClick={handleNext}>
                    Next
                    <ArrowRight className="h-4 w-4 ml-2" />
                  </Button>
                ) : (
                  <Button onClick={() => setShowConfirmDialog(true)}>
                    <CheckCircle className="h-4 w-4 mr-2" />
                    Submit Application
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      <Dialog open={showConfirmDialog} onOpenChange={setShowConfirmDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirm Submission</DialogTitle>
            <DialogDescription>
              Are you sure you want to submit your KYC application? Please review all the information carefully before submitting.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowConfirmDialog(false)}>
              Cancel
            </Button>
            <Button onClick={handleSubmit}>
              <CheckCircle className="h-4 w-4 mr-2" />
              Confirm & Submit
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default UserKYC;
