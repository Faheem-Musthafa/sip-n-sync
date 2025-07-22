import { useState } from 'react';
import { eventsService } from '../services/events';

interface RegistrationData {
  name: string;
  email: string;
  phone?: string;
  message?: string;
}

interface UseEventRegistrationReturn {
  register: (eventId: string, data: RegistrationData) => Promise<boolean>;
  loading: boolean;
  error: string | null;
  success: boolean;
  reset: () => void;
}

export function useEventRegistration(): UseEventRegistrationReturn {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const register = async (eventId: string, data: RegistrationData): Promise<boolean> => {
    try {
      setLoading(true);
      setError(null);
      setSuccess(false);

      // Validate data
      if (!data.name.trim()) {
        throw new Error('Name is required');
      }
      
      if (!data.email.trim()) {
        throw new Error('Email is required');
      }
      
      if (!isValidEmail(data.email)) {
        throw new Error('Please enter a valid email address');
      }

      const result = await eventsService.registerForEvent(eventId, {
        attendee: {
          name: data.name,
          email: data.email,
          phone: data.phone,
        },
        message: data.message,
      });
      
      if (result) {
        setSuccess(true);
        return true;
      } else {
        throw new Error('Registration failed');
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Registration failed';
      setError(errorMessage);
      return false;
    } finally {
      setLoading(false);
    }
  };

  const reset = () => {
    setLoading(false);
    setError(null);
    setSuccess(false);
  };

  return {
    register,
    loading,
    error,
    success,
    reset,
  };
}

function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}