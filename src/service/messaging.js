import MessagingAbly from './messaging/messaging_ably.js';

const key = process.env.VUE_APP_API_KEY;
export const messaging = new MessagingAbly(key);
