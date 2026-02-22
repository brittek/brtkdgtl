
type Handler = (payload: any) => Promise<void>;

const handlers: Record<string, Handler[]> = {
  'contact.received': [],
  'newsletter.pending': [],
};

export const on = (event: string, handler: Handler) => {
  if (!handlers[event]) handlers[event] = [];
  handlers[event].push(handler);
};

export const emit = async (event: string, payload: any) => {
  const jobs = (handlers[event] || []).map(async (h) => {
    try {
      await h(payload);
    } catch (err) {
      console.error(`Event ${event} handler failed:`, err);
    }
  });
  // In a real backend, this would be a background task / queue.
  return Promise.allSettled(jobs);
};
