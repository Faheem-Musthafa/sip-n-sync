// Quick test to see if events data is loading
import { eventsService } from './src/services/events.js';

async function testEvents() {
  try {
    console.log('Testing events service...');
    const events = await eventsService.getEvents();
    console.log('Events loaded:', events.length);
    console.log('First event:', events[0]);
  } catch (error) {
    console.error('Error loading events:', error);
  }
}

testEvents();
