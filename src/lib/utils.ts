import { Event, ContactFormData } from './types.enhanced';

// Date utilities
export const formatDate = (dateString: string): string => {
  try {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  } catch (error) {
    console.error('Invalid date format:', dateString);
    return dateString;
  }
};

export const formatTime = (timeString: string): string => {
  try {
    const [hours, minutes] = timeString.split(':');
    const date = new Date();
    date.setHours(parseInt(hours, 10), parseInt(minutes, 10));
    return date.toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: '2-digit',
      hour12: true,
    });
  } catch (error) {
    console.error('Invalid time format:', timeString);
    return timeString;
  }
};

export const isEventUpcoming = (dateString: string): boolean => {
  try {
    const eventDate = new Date(dateString);
    const now = new Date();
    return eventDate > now;
  } catch (error) {
    console.error('Invalid date for comparison:', dateString);
    return false;
  }
};

export const getDaysUntilEvent = (dateString: string): number => {
  try {
    const eventDate = new Date(dateString);
    const now = new Date();
    const diffTime = eventDate.getTime() - now.getTime();
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  } catch (error) {
    console.error('Invalid date for calculation:', dateString);
    return 0;
  }
};

// String utilities
export const truncateText = (text: string, maxLength: number): string => {
  if (text.length <= maxLength) return text;
  return text.substring(0, maxLength).trim() + '...';
};

export const capitalizeFirst = (text: string): string => {
  if (!text) return '';
  return text.charAt(0).toUpperCase() + text.slice(1).toLowerCase();
};

export const slugify = (text: string): string => {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '');
};

// Number utilities
export const formatPrice = (price: number): string => {
  if (price === 0) return 'Free';
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
  }).format(price);
};

export const formatPercentage = (value: number, total: number): string => {
  if (total === 0) return '0%';
  const percentage = (value / total) * 100;
  return `${Math.round(percentage)}%`;
};

// Event utilities
export const isEventFull = (event: Event): boolean => {
  return event.currentAttendees >= event.maxAttendees;
};

export const getAvailableSpots = (event: Event): number => {
  return Math.max(0, event.maxAttendees - event.currentAttendees);
};

export const getEventStatus = (event: Event): 'upcoming' | 'full' | 'past' => {
  if (!isEventUpcoming(event.date)) return 'past';
  if (isEventFull(event)) return 'full';
  return 'upcoming';
};

// Validation utilities
export const isValidEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

export const isValidPhone = (phone: string): boolean => {
  const phoneRegex = /^[\+]?[1-9][\d]{0,15}$/;
  const cleaned = phone.replace(/[\s\-\(\)\.]/g, '');
  return phoneRegex.test(cleaned);
};

export const validateRequired = (value: string, fieldName: string): string | undefined => {
  if (!value || value.trim().length === 0) {
    return `${fieldName} is required`;
  }
  return undefined;
};

export const validateEmail = (email: string): string | undefined => {
  if (!email) return 'Email is required';
  if (!isValidEmail(email)) return 'Please enter a valid email address';
  return undefined;
};

export const validatePhone = (phone: string): string | undefined => {
  if (phone && !isValidPhone(phone)) {
    return 'Please enter a valid phone number';
  }
  return undefined;
};

export const validateContactForm = (data: ContactFormData): Record<string, string> => {
  const errors: Record<string, string> = {};

  const nameError = validateRequired(data.name, 'Name');
  if (nameError) errors.name = nameError;

  const emailError = validateEmail(data.email);
  if (emailError) errors.email = emailError;

  if (data.phone) {
    const phoneError = validatePhone(data.phone);
    if (phoneError) errors.phone = phoneError;
  }

  const messageError = validateRequired(data.message, 'Message');
  if (messageError) errors.message = messageError;

  return errors;
};

// URL and routing utilities
export const createMailtoUrl = (email: string, subject?: string, body?: string): string => {
  const params = new URLSearchParams();
  if (subject) params.append('subject', subject);
  if (body) params.append('body', body);
  
  const paramString = params.toString();
  return `mailto:${email}${paramString ? `?${paramString}` : ''}`;
};

export const createTelUrl = (phone: string): string => {
  const cleaned = phone.replace(/[^\d\+]/g, '');
  return `tel:${cleaned}`;
};

export const createGoogleMapsUrl = (address: string): string => {
  const encoded = encodeURIComponent(address);
  return `https://maps.google.com/?q=${encoded}`;
};

// Clipboard utilities
export const copyToClipboard = async (text: string): Promise<boolean> => {
  try {
    if (navigator.clipboard && window.isSecureContext) {
      await navigator.clipboard.writeText(text);
      return true;
    } else {
      // Fallback for older browsers or non-secure contexts
      const textArea = document.createElement('textarea');
      textArea.value = text;
      textArea.style.position = 'fixed';
      textArea.style.left = '-999999px';
      textArea.style.top = '-999999px';
      document.body.appendChild(textArea);
      textArea.focus();
      textArea.select();
      const success = document.execCommand('copy');
      textArea.remove();
      return success;
    }
  } catch (error) {
    console.error('Failed to copy text to clipboard:', error);
    return false;
  }
};

// Array utilities
export const groupBy = <T, K extends keyof T>(array: T[], key: K): Record<string, T[]> => {
  return array.reduce((groups, item) => {
    const group = String(item[key]);
    if (!groups[group]) {
      groups[group] = [];
    }
    groups[group].push(item);
    return groups;
  }, {} as Record<string, T[]>);
};

export const sortBy = <T>(array: T[], key: keyof T, direction: 'asc' | 'desc' = 'asc'): T[] => {
  return [...array].sort((a, b) => {
    const aVal = a[key];
    const bVal = b[key];
    
    if (aVal < bVal) return direction === 'asc' ? -1 : 1;
    if (aVal > bVal) return direction === 'asc' ? 1 : -1;
    return 0;
  });
};

export const filterBy = <T>(array: T[], predicate: (item: T) => boolean): T[] => {
  return array.filter(predicate);
};

// Debounce utility
export const debounce = <T extends (...args: any[]) => any>(
  func: T,
  wait: number
): ((...args: Parameters<T>) => void) => {
  let timeoutId: NodeJS.Timeout | undefined;
  
  return (...args: Parameters<T>) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => func(...args), wait);
  };
};

// Local storage utilities
export const storage = {
  set: <T>(key: string, value: T): void => {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.error('Failed to save to localStorage:', error);
    }
  },
  
  get: <T>(key: string): T | null => {
    try {
      const item = localStorage.getItem(key);
      return item ? JSON.parse(item) : null;
    } catch (error) {
      console.error('Failed to read from localStorage:', error);
      return null;
    }
  },
  
  remove: (key: string): void => {
    try {
      localStorage.removeItem(key);
    } catch (error) {
      console.error('Failed to remove from localStorage:', error);
    }
  },
  
  clear: (): void => {
    try {
      localStorage.clear();
    } catch (error) {
      console.error('Failed to clear localStorage:', error);
    }
  }
};

// Error handling utilities
export const createError = (message: string, code?: string, data?: any): Error => {
  const error = new Error(message) as any;
  if (code) error.code = code;
  if (data) error.data = data;
  return error;
};

export const handleAsyncError = async <T>(
  promise: Promise<T>,
  errorMessage?: string
): Promise<[T | null, Error | null]> => {
  try {
    const result = await promise;
    return [result, null];
  } catch (error) {
    const errorObj = error instanceof Error ? error : new Error(String(error));
    if (errorMessage) {
      errorObj.message = `${errorMessage}: ${errorObj.message}`;
    }
    return [null, errorObj];
  }
};
