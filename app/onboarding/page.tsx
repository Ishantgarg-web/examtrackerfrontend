'use client';

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { apiClient } from '@/lib/api-client';
import { useAuth } from '@/lib/auth-context';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';


const WORKING_STATUSES = ['WORKING', 'STUDENT', 'UNEMPLOYED'];
const BACHELOR_DEGREES = ['BTECH', 'BCA', 'BE', 'BCOM', 'BA', 'BSC', 'OTHER'];
const TIMEZONES = [
  'Asia/Kolkata',
];

interface ProfileData {
  username: string;
  phoneNumber: string;
  workingStatus: string;
  bachelorDegree: string;
  timeZone: string;
}

interface FormErrors {
  username?: string;
  phoneNumber?: string;
  workingStatus?: string;
  bachelorDegree?: string;
  timeZone?: string;
}

const isProfileComplete = (user: any) => {
  return Boolean(
    user?.userName?.trim() &&
      user?.phoneNumber?.length === 10 &&
      user?.workingStatus &&
      user?.bachelorDegree
  );
};

const hasSelectedExam = (user: any) => {
  return (
    Array.isArray(user?.exams) &&
    user.exams.length > 0 &&
    user.exams.some((ex: any) => ex?.examId || ex?.examCode)
  );
};

export default function OnboardingPage() {
  const router = useRouter();
  const { user, refetchUser } = useAuth();

  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [showExamConfirm, setShowExamConfirm] = useState(false);
  const [errors, setErrors] = useState<FormErrors>({});
  const [apiError, setApiError] = useState<string | null>(null);

  const [profileData, setProfileData] = useState<ProfileData>({
    username: user?.userName || '',
    phoneNumber: user?.phoneNumber || '',
    workingStatus: user?.workingStatus || '',
    bachelorDegree: user?.bachelorDegree || '',
    timeZone: (user as { timeZone?: string })?.timeZone || 'Asia/Kolkata',
  });

  useEffect(() => {
    if (!user) return;

    // hydrate form once
    setProfileData({
      username: user.userName || '',
      phoneNumber: user.phoneNumber || '',
      workingStatus: user.workingStatus || '',
      bachelorDegree: user.bachelorDegree || '',
      timeZone: (user as { timeZone?: string }).timeZone || 'Asia/Kolkata',
    });

    if (!isProfileComplete(user)) {
      setStep(1);
      return;
    }

    if (!hasSelectedExam(user)) {
      setStep(2);
      return;
    }

    router.push('/dashboard');
  }, [user, router]);

  const validateProfileForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (!profileData.username.trim()) {
      newErrors.username = 'Username is required';
    } else if (profileData.username.length < 2) {
      newErrors.username = 'Username must be at least 2 characters';
    }

    if (!profileData.phoneNumber.trim()) {
      newErrors.phoneNumber = 'Phone number is required';
    } else if (!/^[0-9]{10}$/.test(profileData.phoneNumber.replace(/\D/g, ''))) {
      newErrors.phoneNumber = 'Phone number must be 10 digits';
    }

    if (!profileData.workingStatus) {
      newErrors.workingStatus = 'Please select your working status';
    }

    if (!profileData.bachelorDegree) {
      newErrors.bachelorDegree = 'Please select your degree';
    }

    if (!profileData.timeZone) {
      newErrors.timeZone = 'Please select your timezone';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleProfileSubmit = async () => {
    if (!validateProfileForm()) {
      return;
    }

    setLoading(true);
    setApiError(null);

    try {
      await apiClient.updateProfile(profileData);
      await refetchUser();
      // Move to exam selection step after successful profile save
      setStep(2);
    } catch (err: any) {
      setApiError(
        err.message || 'Failed to update profile. Please try again.'
      );
    } finally {
      setLoading(false);
    }
  };

  const handleExamSelect = () => {
    setShowExamConfirm(true);
  };

  const handleExamConfirm = async () => {
    setLoading(true);
    setApiError(null);

    try {
      await apiClient.selectExam({
        examCode: 'CAT',
        attemptType: 'FIRST_TIME',
      });
      await refetchUser();
      router.push('/dashboard');
    } catch (err: any) {
      setApiError(err.message || 'Failed to select exam. Please try again.');
    } finally {
      setLoading(false);
      setShowExamConfirm(false);
    }
  };

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-muted-foreground">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-background via-background to-secondary/5 py-12">
      <div className="max-w-2xl mx-auto px-4">
        {/* Header */}
        <div className="mb-12">
          <h1 className="text-4xl font-bold mb-2">Complete Your Profile</h1>
          <p className="text-muted-foreground">
            {step === 1
              ? 'Step 1: Tell us about yourself'
              : 'Step 2: Select your exam'}
          </p>
        </div>

        {/* Progress Bar */}
        <div className="flex gap-2 mb-12">
          <div
            className={`h-1 flex-1 rounded-full transition-colors ${
              step >= 1 ? 'bg-primary' : 'bg-border'
            }`}
          />
          <div
            className={`h-1 flex-1 rounded-full transition-colors ${
              step >= 2 ? 'bg-primary' : 'bg-border'
            }`}
          />
        </div>

        {/* Error Message */}
        {apiError && (
          <div className="mb-6 p-4 bg-destructive/10 border border-destructive/20 rounded-lg">
            <p className="text-sm text-destructive">{apiError}</p>
          </div>
        )}

        {/* Step 1: Profile Form */}
        {step === 1 && (
          <div className="border border-border/50 rounded-lg p-8 bg-card/50 backdrop-blur space-y-6">
            <div className="space-y-4">
              <div>
                <Label htmlFor="email" className="text-sm font-medium">
                  Email Address (Read-only)
                </Label>
                <div className="mt-2 px-4 py-2 rounded-md border border-border/50 bg-muted/30 text-muted-foreground">
                  {user.userEmail}
                </div>
                <p className="text-xs text-muted-foreground mt-2">
                  Your email cannot be changed
                </p>
              </div>

              <div>
                <Label htmlFor="username" className="text-sm font-medium">
                  Full Name
                </Label>
                <Input
                  id="username"
                  placeholder="Enter your full name"
                  value={profileData.username}
                  onChange={(e) => {
                    setProfileData({
                      ...profileData,
                      username: e.target.value,
                    });
                    if (errors.username)
                      setErrors({ ...errors, username: undefined });
                  }}
                  className={errors.username ? 'border-destructive' : ''}
                />
                {errors.username && (
                  <p className="text-xs text-destructive mt-1">
                    {errors.username}
                  </p>
                )}
              </div>

              <div>
                <Label htmlFor="phone" className="text-sm font-medium">
                  Phone Number (10 digits)
                </Label>
                <Input
                  id="phone"
                  placeholder="9876543210"
                  value={profileData.phoneNumber}
                  onChange={(e) => {
                    const val = e.target.value.replace(/\D/g, '');
                    setProfileData({
                      ...profileData,
                      phoneNumber: val.slice(0, 10),
                    });
                    if (errors.phoneNumber)
                      setErrors({ ...errors, phoneNumber: undefined });
                  }}
                  className={errors.phoneNumber ? 'border-destructive' : ''}
                />
                {errors.phoneNumber && (
                  <p className="text-xs text-destructive mt-1">
                    {errors.phoneNumber}
                  </p>
                )}
              </div>

              <div>
                <Label htmlFor="status" className="text-sm font-medium">
                  Working Status
                </Label>
                <Select
                  value={profileData.workingStatus}
                  onValueChange={(value) => {
                    setProfileData({
                      ...profileData,
                      workingStatus: value,
                    });
                    if (errors.workingStatus)
                      setErrors({ ...errors, workingStatus: undefined });
                  }}
                >
                  <SelectTrigger
                    id="status"
                    className={errors.workingStatus ? 'border-destructive' : ''}
                  >
                    <SelectValue placeholder="Select your status" />
                  </SelectTrigger>
                  <SelectContent>
                    {WORKING_STATUSES.map((status) => (
                      <SelectItem key={status} value={status}>
                        {status.charAt(0) + status.slice(1).toLowerCase()}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {errors.workingStatus && (
                  <p className="text-xs text-destructive mt-1">
                    {errors.workingStatus}
                  </p>
                )}
              </div>

              <div>
                <Label htmlFor="degree" className="text-sm font-medium">
                  Bachelor's Degree
                </Label>
                <Select
                  value={profileData.bachelorDegree}
                  onValueChange={(value) => {
                    setProfileData({
                      ...profileData,
                      bachelorDegree: value,
                    });
                    if (errors.bachelorDegree)
                      setErrors({ ...errors, bachelorDegree: undefined });
                  }}
                >
                  <SelectTrigger
                    id="degree"
                    className={errors.bachelorDegree ? 'border-destructive' : ''}
                  >
                    <SelectValue placeholder="Select your degree" />
                  </SelectTrigger>
                  <SelectContent>
                    {BACHELOR_DEGREES.map((degree) => (
                      <SelectItem key={degree} value={degree}>
                        {degree}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {errors.bachelorDegree && (
                  <p className="text-xs text-destructive mt-1">
                    {errors.bachelorDegree}
                  </p>
                )}
              </div>

              <div>
                <Label htmlFor="timezone" className="text-sm font-medium">
                  Timezone
                </Label>
                <Select
                  value={profileData.timeZone}
                  onValueChange={(value) => {
                    setProfileData({
                      ...profileData,
                      timeZone: value,
                    });
                    if (errors.timeZone)
                      setErrors({ ...errors, timeZone: undefined });
                  }}
                >
                  <SelectTrigger
                    id="timezone"
                    className={errors.timeZone ? 'border-destructive' : ''}
                  >
                    <SelectValue placeholder="Select your timezone" />
                  </SelectTrigger>
                  <SelectContent>
                    {TIMEZONES.map((tz) => (
                      <SelectItem key={tz} value={tz}>
                        {tz}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {errors.timeZone && (
                  <p className="text-xs text-destructive mt-1">
                    {errors.timeZone}
                  </p>
                )}
              </div>
            </div>

            <Button
              onClick={handleProfileSubmit}
              disabled={loading}
              size="lg"
              className="w-full"
            >
              {loading ? (
                <>
                  <div className="w-4 h-4 border-2 border-primary-foreground border-t-transparent rounded-full animate-spin mr-2" />
                  Saving...
                </>
              ) : (
                'Continue to Exam Selection'
              )}
            </Button>
          </div>
        )}

        {/* Step 2: Exam Selection */}
        {step === 2 && (
          <div className="border border-border/50 rounded-lg p-8 bg-card/50 backdrop-blur space-y-6">
            <div className="space-y-4">
              <h2 className="text-2xl font-semibold">Select Your Exam</h2>
              <p className="text-muted-foreground">
                Choose your target competitive exam. This selection will personalize your preparation path.
              </p>

              <div className="mt-6 space-y-4">
                <button
                  onClick={handleExamSelect}
                  className="w-full border-2 border-border rounded-lg p-6 text-left hover:border-primary hover:bg-primary/5 transition-all group"
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="text-lg font-semibold group-hover:text-primary transition-colors">
                        CAT (Common Admission Test)
                      </h3>
                      <p className="text-sm text-muted-foreground mt-2">
                        For admission to IIMs and other premier management institutes
                      </p>
                      <div className="mt-4 flex items-center gap-2">
                        <span className="inline-block px-3 py-1 bg-primary/10 text-primary text-xs rounded-full">
                          Most Popular
                        </span>
                      </div>
                    </div>
                    <div className="text-2xl">📚</div>
                  </div>
                </button>

                <div className="text-center text-sm text-muted-foreground py-4">
                  <p>More exams coming soon</p>
                </div>
              </div>
            </div>

            <div className="border-t border-border/50 pt-6">
              <p className="text-xs text-muted-foreground mb-4">
                ⚠️ <strong>Important:</strong> Once you select an exam, it cannot be changed. Make sure you've selected the correct exam.
              </p>
              <div className="flex gap-3">
                <Button
                  variant="outline"
                  onClick={() => setStep(1)}
                  disabled={loading}
                  size="lg"
                  className="flex-1"
                >
                  Back
                </Button>
              </div>
            </div>
          </div>
        )}

        {/* Exam Confirmation Dialog */}
        <AlertDialog open={showExamConfirm} onOpenChange={setShowExamConfirm}>
          <AlertDialogContent>
            <AlertDialogTitle>Confirm Exam Selection</AlertDialogTitle>
            <AlertDialogDescription>
              Once you select CAT as your exam, this selection cannot be changed later. Are you sure you want to continue?
            </AlertDialogDescription>
            <div className="flex gap-3">
              <AlertDialogCancel disabled={loading}>
                Cancel
              </AlertDialogCancel>
              <AlertDialogAction
                onClick={handleExamConfirm}
                disabled={loading}
                className="bg-primary text-primary-foreground hover:bg-primary/90"
              >
                {loading ? (
                  <>
                    <div className="w-4 h-4 border-2 border-primary-foreground border-t-transparent rounded-full animate-spin mr-2" />
                    Confirming...
                  </>
                ) : (
                  'Confirm & Continue'
                )}
              </AlertDialogAction>
            </div>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </div>
  );
}
