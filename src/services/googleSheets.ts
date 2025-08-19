import { EventRegistration } from '../lib/types.enhanced';

// Google Apps Script URL from deployment
// TODO: Replace with your actual deployed script URL
const GOOGLE_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbx779hpx2fztpEELRiTgbE5sey3bMszyVfFBF7bdw5ifQvrnqKowvMWA1bd6ucEuNgGqw/exec';
const INTERNAL_API_URL = '/api/registrations';

// Google Form URL (alternative method)
// TODO: Replace with your actual Google Form URL
const GOOGLE_FORM_URL = 'https://docs.google.com/forms/d/e/YOUR_FORM_ID/formResponse';

/**
 * Submit registration data to Google Sheets via Google Apps Script
 * @param eventId - The ID of the event being registered for
 * @param registration - The registration data
 * @param eventTitle - The event title for readability
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
      paymentProofUrl: registration.paymentProofUrl || '',
      timestamp: new Date().toISOString()
    };

    // Preferred: send to internal API (serverless) for secure Sheets write
    const resp = await fetch(INTERNAL_API_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });

    if (resp.ok) return true;

    // Fallback: attempt direct Apps Script (opaque response due to no-cors)
    await fetch(GOOGLE_SCRIPT_URL, {
      method: 'POST',
      mode: 'no-cors',
      cache: 'no-cache',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    return true;
  } catch (error) {
    console.error('Failed to submit to Google Sheets:', error);
    return false;
  }
}

/**
 * Helper to map form fields to Google Form entry IDs
 * @param formData - The form data to submit
 * @returns URLSearchParams
 */
function mapFormFields(formData: {
  name: string;
  email: string;
  eventChoice: string;
  message?: string;
}): URLSearchParams {
  return new URLSearchParams({
    'entry.123456789': formData.name,        // Replace with actual field ID
    'entry.987654321': formData.email,       // Replace with actual field ID
    'entry.456789123': formData.eventChoice, // Replace with actual field ID
    'entry.789123456': formData.message || '', // Replace with actual field ID
  });
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
    const formBody = mapFormFields(formData);

    // Submit the form
    await fetch(GOOGLE_FORM_URL, {
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