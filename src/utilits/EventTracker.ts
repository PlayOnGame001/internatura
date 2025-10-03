export interface AdEvent {
  type: string;
  timestamp: string;
  adUnit?: string;
  creativeId?: string;
  cpm?: number;
  extra?: Record<string, any>;
}

class EventTracker {
  private endpoint = '/api/statistics/event';
  private cache: AdEvent[] = [];
  private maxCacheSize = 20;
  private flushInterval = 5000;
  private timer: NodeJS.Timeout | null = null;
  private enabled = false;

  start() {
    if (this.enabled) return;
    this.enabled = true;
    this.timer = setInterval(() => this.flush(), this.flushInterval);
    window.addEventListener('beforeunload', () => this.flush(true));
  }

  stop() {
    if (!this.enabled) return;
    this.enabled = false;
    if (this.timer) clearInterval(this.timer);
    this.flush(true);
  }

  track(event: AdEvent) {
    if (!this.enabled) return;
    this.cache.push({ ...event, timestamp: new Date().toISOString() });
    if (this.cache.length >= this.maxCacheSize) {
      this.flush();
    }
  }

  private flush(forceBeacon = false) {
    if (!this.cache.length) return;
    const payload = JSON.stringify(this.cache);

    // Если страница закрывается, используем sendBeacon
    if (forceBeacon && navigator.sendBeacon) {
      const blob = new Blob([payload], { type: 'application/json' });
      navigator.sendBeacon(this.endpoint, blob);
    } else {
      fetch(this.endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: payload
      }).catch(console.error);
    }

    this.cache = [];
  }
}

export const tracker = new EventTracker();