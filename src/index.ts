import { Hono } from 'hono';
import { cors } from 'hono/cors';
import type { Env } from './types';
import { adminApp } from './routes/admin';
import { redirectApp } from './routes/redirect';

const app = new Hono<{ Bindings: Env }>();

// Enable CORS for API routes if needed
app.use('/api/*', cors());

// Mount Admin and API routes
app.route('/', adminApp);

// Mount Redirection routes
app.route('/', redirectApp);

// Global Error Handler
app.onError((err, c) => {
  console.error('[App Error]', err);
  return c.text('Internal Server Error: ' + err.message, 500);
});

export default app;
