'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/lib/auth-context';
import { apiClient } from '@/lib/api-client';
import { TaskCard } from '@/components/task-card';
import { StreakCelebrationModal } from '@/components/streak-celebration-modal';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

interface Task {
  taskId: string;
  taskTitle: string;
  isTaskCompleted: boolean;
  isEditable: boolean;
}

interface DayData {
  date: string;
  isDayComplete: boolean;
  tasks: Task[];
}

interface DashboardData {
  currentStreak: number;
  longestStreak: number;
  days: DayData[];
}

interface CelebrationState {
  show: boolean;
  currentStreak: number;
  longestStreak: number;
}

export default function DashboardPage() {
  const router = useRouter();
  const { user, isAuthenticated, hasExamSelected, logout, refetchUser } =
    useAuth();

  const [dashboardData, setDashboardData] = useState<DashboardData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [celebration, setCelebration] = useState<CelebrationState>({
    show: false,
    currentStreak: 0,
    longestStreak: 0,
  });
  const [completingTaskId, setCompletingTaskId] = useState<string | null>(null);

  // Redirect if not authenticated or exam not selected
  useEffect(() => {
    if (!isAuthenticated || !hasExamSelected) {
      router.push('/');
    }
  }, [isAuthenticated, hasExamSelected, router]);

  // Fetch dashboard data
  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await apiClient.getDashboard();
        setDashboardData(data);
      } catch (err: any) {
        setError(
          err.message || 'Failed to load dashboard. Please try again.'
        );
      } finally {
        setLoading(false);
      }
    };

    if (isAuthenticated && hasExamSelected) {
      fetchDashboard();
    }
  }, [isAuthenticated, hasExamSelected]);

  const handleCompleteTask = async (taskId: string) => {
    if (!dashboardData) return;

    setCompletingTaskId(taskId);
    try {
      const response = await apiClient.completeTask(taskId);

      // Update dashboard data with response
      setDashboardData((prev) => {
        if (!prev) return prev;
        return {
          ...prev,
          currentStreak: response.currentStreak,
          longestStreak: response.longestStreak,
          days: prev.days.map((day) => ({
            ...day,
            tasks: day.tasks.map((task) =>
              task.taskId === taskId
                ? { ...task, isTaskCompleted: true, isEditable: false }
                : task
            ),
            isDayComplete: response.dayCompleted
              ? true
              : day.isDayComplete,
          })),
        };
      });

      // Show celebration if day is completed
      if (response.dayCompleted) {
        setCelebration({
          show: true,
          currentStreak: response.currentStreak,
          longestStreak: response.longestStreak,
        });
      }

      await refetchUser();
    } catch (err: any) {
      setError(
        err.message || 'Failed to complete task. Please try again.'
      );
    } finally {
      setCompletingTaskId(null);
    }
  };

  const handleLogout = () => {
    logout();
    router.push('/');
  };

  // Format date for display
  const formatDate = (dateString: string): string => {
    const date = new Date(dateString);
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);

    if (date.toDateString() === today.toDateString()) {
      return 'Today';
    } else if (date.toDateString() === yesterday.toDateString()) {
      return 'Yesterday';
    } else {
      return date.toLocaleDateString('en-US', {
        weekday: 'short',
        month: 'short',
        day: 'numeric',
      });
    }
  };

  if (!isAuthenticated || !hasExamSelected) {
    return null;
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-muted-foreground">Loading your dashboard...</p>
        </div>
      </div>
    );
  }

  const exam = user?.exams[0];

  return (
    <div className="min-h-screen bg-gradient-to-b from-background via-background to-secondary/5">
      {/* Header */}
      <header className="border-b border-border/50 backdrop-blur-sm sticky top-0 z-50 bg-background/95">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              ExamReady
            </h1>
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm">
                {user?.username}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem disabled>
                {user?.email}
              </DropdownMenuItem>
              <DropdownMenuItem onClick={handleLogout}>
                Sign Out
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Error Message */}
        {error && (
          <div className="mb-6 p-4 bg-destructive/10 border border-destructive/20 rounded-lg">
            <p className="text-sm text-destructive">{error}</p>
          </div>
        )}

        {/* Stats Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {/* Exam Card */}
          <div className="border border-border/50 rounded-lg p-6 bg-card/50 backdrop-blur">
            <p className="text-sm text-muted-foreground mb-2">Target Exam</p>
            <h3 className="text-2xl font-bold">{exam?.examCode}</h3>
            <p className="text-xs text-muted-foreground mt-2">
              {exam?.attemptType === 'FIRST_TIME'
                ? 'First Attempt'
                : 'Retry Attempt'}
            </p>
          </div>

          {/* Current Streak Card */}
          <div className="border border-border/50 rounded-lg p-6 bg-card/50 backdrop-blur">
            <p className="text-sm text-muted-foreground mb-2">Current Streak</p>
            <div className="flex items-baseline gap-2">
              <h3 className="text-4xl font-bold text-primary">
                {dashboardData?.currentStreak || 0}
              </h3>
              <span className="text-2xl">🔥</span>
            </div>
            <p className="text-xs text-muted-foreground mt-2">
              Days in a row
            </p>
          </div>

          {/* Longest Streak Card */}
          <div className="border border-border/50 rounded-lg p-6 bg-card/50 backdrop-blur">
            <p className="text-sm text-muted-foreground mb-2">Longest Streak</p>
            <div className="flex items-baseline gap-2">
              <h3 className="text-4xl font-bold text-accent">
                {dashboardData?.longestStreak || 0}
              </h3>
              <span className="text-2xl">🏆</span>
            </div>
            <p className="text-xs text-muted-foreground mt-2">
              Personal record
            </p>
          </div>
        </div>

        {/* Tasks Section */}
        <div className="space-y-8">
          <h2 className="text-3xl font-bold">Your Tasks</h2>

          {dashboardData?.days.map((day) => (
            <div key={day.date} className="space-y-3">
              {/* Day Header */}
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold flex items-center gap-2">
                  {formatDate(day.date)}
                  {day.isDayComplete && (
                    <span className="text-lg" title="Day completed">
                      ✅
                    </span>
                  )}
                </h3>
                <p className="text-sm text-muted-foreground">
                  {day.date}
                </p>
              </div>

              {/* Tasks */}
              <div className="space-y-2">
                {day.tasks.length > 0 ? (
                  day.tasks.map((task) => (
                    <TaskCard
                      key={task.taskId}
                      taskId={task.taskId}
                      taskTitle={task.taskTitle}
                      isTaskCompleted={task.isTaskCompleted}
                      isEditable={task.isEditable}
                      onComplete={handleCompleteTask}
                      loading={completingTaskId === task.taskId}
                    />
                  ))
                ) : (
                  <p className="text-sm text-muted-foreground py-4">
                    No tasks for this day
                  </p>
                )}
              </div>

              {/* Divider */}
              {day !== dashboardData.days[dashboardData.days.length - 1] && (
                <div className="h-px bg-border/30 my-6" />
              )}
            </div>
          ))}
        </div>
      </main>

      {/* Streak Celebration Modal */}
      <StreakCelebrationModal
        isOpen={celebration.show}
        currentStreak={celebration.currentStreak}
        longestStreak={celebration.longestStreak}
        onClose={() =>
          setCelebration({ ...celebration, show: false })
        }
      />
    </div>
  );
}
