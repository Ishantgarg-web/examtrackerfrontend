'use client';

import { Header } from '@/components/header';
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

interface ProfileData {
  phoneNumber: string;
  workingStatus: string;
  bachelorDegree: string;
}

interface FormErrors {
  phoneNumber?: string;
  workingStatus?: string;
  bachelorDegree?: string;
}

export default function ProfilePage() {
  const router = useRouter();
  const { user, isAuthenticated, logout, refetchUser } = useAuth();

  const [profileData, setProfileData] = useState<ProfileData>({
    phoneNumber: '',
    workingStatus: '',
    bachelorDegree: '',
  });

  const [originalData, setOriginalData] = useState<ProfileData>({
    phoneNumber: '',
    workingStatus: '',
    bachelorDegree: '',
  });

  const [loading, setLoading] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [errors, setErrors] = useState<FormErrors>({});
  const [apiError, setApiError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  // Redirect if not authenticated
  useEffect(() => {
    if (!isAuthenticated) {
      router.push('/');
    }
  }, [isAuthenticated, router]);

  // Populate form with user data
  useEffect(() => {
    if (user) {
      const data = {
        phoneNumber: user.phoneNumber || '',
        workingStatus: user.workingStatus || '',
        bachelorDegree: user.bachelorDegree || '',
      };
      setProfileData(data);
      setOriginalData(data);
    }
  }, [user]);

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

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

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSave = async () => {
    if (!validateForm()) {
      return;
    }

    setLoading(true);
    setApiError(null);
    setSuccessMessage(null);

    try {
      await apiClient.updateProfile({
        username: user?.userName || '',
        phoneNumber: profileData.phoneNumber,
        workingStatus: profileData.workingStatus,
        bachelorDegree: profileData.bachelorDegree,
        timeZone: (user as any)?.timeZone || 'Asia/Kolkata',
      });

      await refetchUser();
      setOriginalData(profileData);
      setIsEditing(false);
      setSuccessMessage('Profile updated successfully');
      setTimeout(() => setSuccessMessage(null), 3000);
    } catch (err: any) {
      setApiError(
        err.message || 'Failed to update profile. Please try again.'
      );
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    setProfileData(originalData);
    setIsEditing(false);
    setErrors({});
    setApiError(null);
  };

  if (!isAuthenticated) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-background via-background to-secondary/5">
      <Header />

      {/* Main Content */}
      <main className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Page Header */}
        <div className="mb-12">
          <h1 className="text-4xl font-bold mb-2">Your Profile</h1>
          <p className="text-muted-foreground">
            Manage your profile information
          </p>
        </div>

        {/* Success Message */}
        {successMessage && (
          <div className="mb-6 p-4 bg-green-500/10 border border-green-500/20 rounded-lg">
            <p className="text-sm text-green-600 dark:text-green-400">
              {successMessage}
            </p>
          </div>
        )}

        {/* Error Message */}
        {apiError && (
          <div className="mb-6 p-4 bg-destructive/10 border border-destructive/20 rounded-lg">
            <p className="text-sm text-destructive">{apiError}</p>
          </div>
        )}

        {/* Profile Card */}
        <div className="border border-border/50 rounded-lg p-8 bg-card/50 backdrop-blur space-y-6">
          {/* Email (Non-editable) */}
          <div>
            <Label htmlFor="email" className="text-sm font-medium">
              Email Address (Read-only)
            </Label>
            <div className="mt-2 px-4 py-2 rounded-md border border-border/50 bg-muted/30 text-muted-foreground">
              {user?.userEmail}
            </div>
            <p className="text-xs text-muted-foreground mt-2">
              Your email cannot be changed
            </p>
          </div>

          {/* Full Name (Non-editable) */}
          <div>
            <Label htmlFor="username" className="text-sm font-medium">
              Full Name (Read-only)
            </Label>
            <div className="mt-2 px-4 py-2 rounded-md border border-border/50 bg-muted/30 text-muted-foreground">
              {user?.userName}
            </div>
          </div>

          {/* Phone Number */}
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
              disabled={!isEditing}
              className={errors.phoneNumber ? 'border-destructive' : ''}
            />
            {errors.phoneNumber && (
              <p className="text-xs text-destructive mt-1">
                {errors.phoneNumber}
              </p>
            )}
          </div>

          {/* Working Status */}
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
              disabled={!isEditing}
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

          {/* Bachelor's Degree */}
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
              disabled={!isEditing}
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

          {/* Action Buttons */}
          <div className="border-t border-border/50 pt-6 flex gap-3">
            {!isEditing ? (
              <Button
                onClick={() => setIsEditing(true)}
                size="lg"
                className="flex-1"
              >
                Edit Profile
              </Button>
            ) : (
              <>
                <Button
                  variant="outline"
                  onClick={handleCancel}
                  disabled={loading}
                  size="lg"
                  className="flex-1 bg-transparent"
                >
                  Cancel
                </Button>
                <Button
                  onClick={handleSave}
                  disabled={loading}
                  size="lg"
                  className="flex-1"
                >
                  {loading ? (
                    <>
                      <div className="w-4 h-4 border-2 border-primary-foreground border-t-transparent rounded-full animate-spin mr-2" />
                      Saving...
                    </>
                  ) : (
                    'Save Changes'
                  )}
                </Button>
              </>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
