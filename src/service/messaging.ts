import MessagingAbly from './messaging/messaging_ably.js';

const key = import.meta.env.VITE_APP_ABLY_API_KEY;
export const messaging = new MessagingAbly(key);
