import { Hono } from 'hono';
import { cors } from 'hono/cors';
import type { Env } from './types.ts';
import { adminApp } from './routes/admin.ts';
import { redirectApp } from './routes/redirect.ts';

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
  if (c.req.path.startsWith('/api/')) {
    return c.json({ error: err.message || 'Internal Server Error' }, 500);
  }
  return c.text('Internal Server Error: ' + err.message, 500);
});

// Global 404 Handler - ensure /api/* always returns JSON 404
app.notFound((c) => {
  if (c.req.path.startsWith('/api/')) {
    return c.json({ error: `Not Found: ${c.req.path}` }, 404);
  }
  return c.text('Not Found', 404);
});

export default app;
