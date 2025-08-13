# Google Sheets Integration Setup Guide

## Recommended: Vercel API + Google Sheets API (Service Account)

This approach keeps secrets off the client, returns proper JSON (no no-cors), and lets you validate/rate-limit.

1) Enable Google Sheets API
- Create a Google Cloud project and enable “Google Sheets API”.
- Create a Service Account. Generate a JSON key file.

2) Share your Sheet
- Create a spreadsheet (e.g., “Sip'n'Sync Event Registrations”).
- Add a tab named “Registrations” with columns like: Timestamp, EventId, EventTitle, Name, Email, Phone, Message.
- Share the sheet with the service account email as Editor.

3) Configure Vercel env vars
- GOOGLE_SERVICE_ACCOUNT_JSON: paste the JSON key (ensure private_key has proper \n escapes).
- SHEET_ID: your sheet ID (from the URL: docs.google.com/spreadsheets/d/<SHEET_ID>/edit).
- SHEET_TAB_NAME (optional): default “Registrations”.

4) API Route
- We added an API route at /api/registrations. It expects body:
  {
    name, email, phone?, eventId, eventTitle?, message?, timestamp?
  }
- It appends a row to the sheet.

5) Client wiring
- The client now posts to /api/registrations first, and falls back to Apps Script if needed.

Notes
- vercel.json was updated to preserve /api/* routes alongside SPA rewrites.
- For additional security, consider adding input validation and captcha verification inside the API route.

## Alternative: Using Google Apps Script (Simple)

### Step 1: Create a Google Sheet
1. Go to [Google Sheets](https://sheets.google.com)
2. Create a new spreadsheet
3. Name it "Sip'n'Sync Event Registrations"
4. Set up columns in the first row:
   - A1: Name
   - B1: Email
   - C1: Event Choice
   - D1: Message
   - E1: Timestamp

### Step 2: Create Google Apps Script
1. In your Google Sheet, go to `Extensions > Apps Script`
2. Replace the default code with this:

```javascript
function doPost(e) {
  try {
    // Get the active spreadsheet
    const sheet = SpreadsheetApp.getActiveSheet();
    
    // Parse the JSON data
    const data = JSON.parse(e.postData.contents);
    
    // Add the data to the sheet
    sheet.appendRow([
      data.name,
      data.email,
      data.eventChoice,
      data.message,
      data.timestamp
    ]);
    
    // Return success response
    return ContentService
      .createTextOutput(JSON.stringify({success: true}))
      .setMimeType(ContentService.MimeType.JSON);
      
  } catch (error) {
    // Return error response
    return ContentService
      .createTextOutput(JSON.stringify({success: false, error: error.toString()}))
      .setMimeType(ContentService.MimeType.JSON);
  }
}
```

### Step 3: Deploy the Script
1. Click `Deploy > New deployment`
2. Choose type: `Web app`
3. Execute as: `Me`
4. Who has access: `Anyone`
5. Click `Deploy`
6. Copy the Web app URL

### Step 4: Update Your Code
1. Open `src/services/googleSheets.ts`
2. Replace `YOUR_SCRIPT_ID` with your actual script URL:
```typescript
const GOOGLE_SCRIPT_URL = 'https://script.google.com/macros/s/YOUR_ACTUAL_SCRIPT_ID/exec';
```

## Method 2: Using Google Forms (Easier Alternative)

### Step 1: Create a Google Form
1. Go to [Google Forms](https://forms.google.com)
2. Create a new form with these fields:
   - Name (Short answer)
   - Email (Short answer)
   - Event Choice (Multiple choice or Dropdown)
   - Message (Paragraph)

### Step 2: Get Form Details
1. Click the three dots menu > "Get pre-filled link"
2. Fill out the form with sample data
3. Click "Get link"
4. Copy the URL and extract the form ID and field IDs

### Step 3: Update Your Code
1. In `src/services/googleSheets.ts`, use the `submitToGoogleForm` function
2. Replace the placeholders:
```typescript
const GOOGLE_FORM_URL = 'https://docs.google.com/forms/d/e/YOUR_FORM_ID/formResponse';

const formBody = new URLSearchParams({
  'entry.123456789': formData.name,        // Replace with actual field ID
  'entry.987654321': formData.email,       // Replace with actual field ID
  'entry.456789123': formData.eventChoice, // Replace with actual field ID
  'entry.789123456': formData.message,     // Replace with actual field ID
});
```

### Step 4: Update EventModal Component
In `src/components/EventModal.tsx`, change the import:
```typescript
import { submitToGoogleForm } from '../services/googleSheets';

// Then in handleSubmit, use:
const success = await submitToGoogleForm(submissionData);
```

## Testing
1. Fill out the event registration form on your website
2. Check your Google Sheet or Form responses
3. Verify the data appears correctly

## Troubleshooting
- **CORS Issues**: This is normal with Google Apps Script. The form will still work.
- **No Data Appearing**: Check your script permissions and deployment settings.
- **Form Not Submitting**: Verify your URLs and field IDs are correct.

## Security Notes
- Never expose sensitive API keys in frontend code
- Google Apps Script handles authentication automatically
- Form submissions are processed server-side by Google