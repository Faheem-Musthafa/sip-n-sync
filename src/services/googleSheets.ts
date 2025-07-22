import { EventRegistration } from '../lib/types';

// Google Apps Script URL from deployment
const GOOGLE_SCRIPT_URL = 'https://script.google.com/macros/s/YOUR_ACTUAL_SCRIPT_ID/exec';

// Google Form URL (alternative method)
const GOOGLE_FORM_URL = 'https://docs.google.com/forms/d/e/YOUR_FORM_ID/formResponse';

/**
 * Submit registration data to Google Sheets via Google Apps Script
 * @param eventId - The ID of the event being registered for
 * @param registration - The registration data
 * @returns Promise<boolean> - Success status
 */
export async function submitToGoogleSheets(
  eventId: string,
  registration: Omit<EventRegistration, 'id' | 'eventId' | 'status' | 'registeredAt'>,
  eventTitle?: string
): Promise<boolean> {
  try {
    // Prepare data for Google Sheets
    // Use provided event title or set a default
    const finalEventTitle = eventTitle || 'Unknown Event';

    const data = {
      name: registration.attendee.name,
      email: registration.attendee.email,
      phone: registration.attendee.phone || '',
      eventId: eventId,
      eventChoice: finalEventTitle, // Use event title for better readability in sheets
      message: registration.message || '',
      timestamp: new Date().toISOString()
    };

    // Make the request to Google Apps Script
    const response = await fetch(GOOGLE_SCRIPT_URL, {
      method: 'POST',
      mode: 'no-cors', // This is important for CORS issues with Google Apps Script
      cache: 'no-cache',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    // Since 'no-cors' mode doesn't allow reading the response,
    // we assume success if no error is thrown
    return true;
  } catch (error) {
    console.error('Failed to submit to Google Sheets:', error);
    return false;
  }
}

/**
 * Alternative method: Submit registration data to Google Forms
 * @param formData - The form data to submit
 * @returns Promise<boolean> - Success status
 */
export async function submitToGoogleForm(formData: {
  name: string;
  email: string;
  eventChoice: string;
  message?: string;
}): Promise<boolean> {
  try {
    // Create form body with the correct entry IDs from your Google Form
    const formBody = new URLSearchParams({
      'entry.123456789': formData.name,        // Replace with actual field ID
      'entry.987654321': formData.email,       // Replace with actual field ID
      'entry.456789123': formData.eventChoice, // Replace with actual field ID
      'entry.789123456': formData.message || '', // Replace with actual field ID
    });

    // Submit the form
    const response = await fetch(GOOGLE_FORM_URL, {
      method: 'POST',
      mode: 'no-cors', // Important for CORS issues
      cache: 'no-cache',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: formBody.toString(),
    });

    // Since 'no-cors' mode doesn't allow reading the response,
    // we assume success if no error is thrown
    return true;
  } catch (error) {
    console.error('Failed to submit to Google Form:', error);
    return false;
  }
}