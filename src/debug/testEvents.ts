// Debug test for events service
import { eventsService } from '../services/events';

export async function testEventsService() {
  try {
    console.log('Testing events service...');
    const events = await eventsService.getEvents();
    console.log('Events loaded:', events.length);
    console.log('First event:', events[0]);
    return events;
  } catch (error) {
    console.error('Events service test failed:', error);
    throw error;
  }
}

// Test the service immediately
testEventsService().then(() => {
  console.log('Events service test completed successfully');
}).catch((err) => {
  console.error('Events service test failed:', err);
});
