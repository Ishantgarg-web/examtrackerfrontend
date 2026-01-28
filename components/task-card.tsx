'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';

interface TaskCardProps {
  taskId: string;
  taskTitle: string;
  isTaskCompleted: boolean;
  isEditable: boolean;
  onComplete: (taskId: string) => Promise<void>;
  loading?: boolean;
}

export function TaskCard({
  taskId,
  taskTitle,
  isTaskCompleted,
  isEditable,
  onComplete,
  loading = false,
}: TaskCardProps) {
  const [isLoading, setIsLoading] = useState(false);

  const handleComplete = async () => {
    if (!isEditable || isTaskCompleted) return;

    setIsLoading(true);
    try {
      await onComplete(taskId);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-between gap-4 p-4 rounded-lg border border-border/50 bg-card/30 hover:bg-card/50 transition-colors">
      <div className="flex items-start gap-3 flex-1">
        <div
          className={`w-5 h-5 rounded border-2 flex items-center justify-center flex-shrink-0 mt-0.5 transition-colors ${
            isTaskCompleted
              ? 'border-primary bg-primary'
              : 'border-border/50 bg-transparent'
          }`}
        >
          {isTaskCompleted && (
            <svg
              className="w-3 h-3 text-primary-foreground"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={3}
                d="M5 13l4 4L19 7"
              />
            </svg>
          )}
        </div>
        <div className="flex-1">
          <p
            className={`font-medium transition-colors ${
              isTaskCompleted
                ? 'text-muted-foreground line-through'
                : 'text-foreground'
            }`}
          >
            {taskTitle}
          </p>
          {!isEditable && isTaskCompleted && (
            <p className="text-xs text-muted-foreground mt-1">
              Completed (locked)
            </p>
          )}
          {!isEditable && !isTaskCompleted && (
            <p className="text-xs text-destructive mt-1">
              Missed
            </p>
          )}
        </div>
      </div>

      <Button
        onClick={handleComplete}
        disabled={!isEditable || isLoading || isTaskCompleted || loading}
        variant={isTaskCompleted ? 'default' : 'outline'}
        size="sm"
        className={`flex-shrink-0 ${
          isTaskCompleted
            ? 'bg-primary text-primary-foreground cursor-not-allowed'
            : ''
        }`}
      >
        {isLoading ? (
          <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
        ) : isTaskCompleted ? (
          'Done'
        ) : (
          'Mark Done'
        )}
      </Button>
    </div>
  );
}
