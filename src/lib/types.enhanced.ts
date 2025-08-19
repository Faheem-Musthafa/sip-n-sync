// Base types
export type ID = string;
export type Timestamp = string;
export type Email = string;
export type PhoneNumber = string;
export type URL = string;

// Enums
export type EventCategory = 'Wellness' | 'Productivity' | 'Creativity' | 'Community' | 'Networking';
export type RegistrationStatus = 'pending' | 'confirmed' | 'cancelled';
export type UrgencyLevel = 'low' | 'medium' | 'high';
export type ContactMethod = 'email' | 'phone' | 'either';
export type FormStatus = 'idle' | 'loading' | 'success' | 'error';

// User-related types
export interface User {
  id: ID;
  name: string;
  email: Email;
  avatar?: URL;
  phone?: PhoneNumber;
  createdAt: Timestamp;
  updatedAt: Timestamp;
}

export interface Organizer {
  name: string;
  avatar?: URL;
}

export interface Attendee extends Pick<User, 'name' | 'email'> {
  phone?: PhoneNumber;
}

// Event-related types
export interface Event {
  id: ID;
  title: string;
  description: string;
  date: string;
  time: string;
  location: string;
  category: EventCategory;
  maxAttendees: number;
  currentAttendees: number;
  price: number;
  image: URL;
  featured: boolean;
  tags: string[];
  organizer: Organizer;
  createdAt: Timestamp;
  updatedAt: Timestamp;
}

export interface EventFilters {
  category?: EventCategory | 'All';
  search?: string;
  featured?: boolean;
  limit?: number;
}

export interface EventRegistration {
  id: ID;
  eventId: ID;
  attendee: Attendee;
  message?: string;
  paymentProofUrl?: URL;
  status: RegistrationStatus;
  registeredAt: Timestamp;
}

// Contact-related types
export interface ContactFormData {
  name: string;
  email: Email;
  phone: PhoneNumber;
  subject: string;
  message: string;
  category: string;
  urgency: UrgencyLevel;
  preferredContact: ContactMethod;
}

export interface ContactMethodItem {
  icon: React.ComponentType<{ size?: number; className?: string }>;
  title: string;
  value: string;
  description: string;
  action: string;
  href?: string;
}

// Testimonial types
export interface Testimonial {
  id: ID;
  name: string;
  role: string;
  company?: string;
  content: string;
  rating: number;
  avatar: URL;
  featured: boolean;
  createdAt: Timestamp;
}

// Hook return types
export interface UseEventsReturn {
  events: Event[];
  loading: boolean;
  error: string | null;
  filters: EventFilters;
  setFilters: (filters: Partial<EventFilters>) => void;
  refetch: () => Promise<void>;
}

// Component prop types
export interface BaseComponentProps {
  className?: string;
  children?: React.ReactNode;
}

export interface EventCardProps extends BaseComponentProps {
  event: Event;
  onRegister: (event: Event) => void;
}

export interface ModalProps extends BaseComponentProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
}

export interface ButtonProps extends BaseComponentProps {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  loading?: boolean;
  disabled?: boolean;
  type?: 'button' | 'submit' | 'reset';
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
}

// Form validation types
export interface ValidationRule<T = string> {
  required?: boolean;
  minLength?: number;
  maxLength?: number;
  pattern?: RegExp;
  custom?: (value: T) => string | undefined;
}

export interface FormField<T = string> {
  name: string;
  label: string;
  type: 'text' | 'email' | 'tel' | 'textarea' | 'select';
  placeholder?: string;
  options?: Array<{ label: string; value: T }>;
  validation?: ValidationRule<T>;
}

// Theme types
export interface ThemeColors {
  primary: string;
  secondary: string;
  accent: string;
  background: string;
  surface: string;
  text: string;
  muted: string;
  success: string;
  warning: string;
  error: string;
}

export interface Theme {
  colors: ThemeColors;
  spacing: Record<string, string>;
  typography: Record<string, string>;
  animations: Record<string, string>;
}
