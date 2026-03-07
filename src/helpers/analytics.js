const GA_ID = import.meta.env.REACT_APP_GOOGLE_ANALYTICS;

const KEY = { consent: "consent", anon: "anon_id_v1" };

/* -------------------------- tiny utilities -------------------------- */
const hasGtag = () => typeof window !== "undefined" && typeof window.gtag === "function";
const g = (...args) => { if (hasGtag()) window.gtag(...args); };

const storage = {
  get: (k) => { try { return localStorage.getItem(k); } catch { return null; } },
  set: (k, v) => { try { localStorage.setItem(k, v); } catch { } },
  del: (k) => { try { localStorage.removeItem(k); } catch { } },
};

const uuidv4 = () => {
  if (typeof crypto?.randomUUID === "function") return crypto.randomUUID();
  const b = crypto?.getRandomValues?.(new Uint8Array(16)) || Array.from({ length: 16 }, () => Math.random() * 256 | 0);
  b[6] = (b[6] & 0x0f) | 0x40; b[8] = (b[8] & 0x3f) | 0x80;
  return [...b].map((n, i) => [4, 6, 8, 10].includes(i) ? `-${n.toString(16).padStart(2, "0")}` : n.toString(16).padStart(2, "0")).join("");
};

/* ----------------------------- identity ----------------------------- */
const Identity = {
  get() { return storage.get(KEY.anon); },
  ensure() {
    let id = this.get();
    if (!id) { id = uuidv4(); storage.set(KEY.anon, id); }
    return id;
  },
  clear() { storage.del(KEY.anon); },
};

/* ----------------------------- consent ------------------------------ */
export const Consent = {
  isGranted() { return storage.get(KEY.consent) === "accepted"; },
  accept() { storage.set(KEY.consent, "accepted"); },
  decline() { storage.set(KEY.consent, "declined"); },
};

/* ------------------------------ loader ------------------------------ */
let loadedPromise = null;
function loadGtag() {
  if (hasGtag()) return Promise.resolve();
  if (loadedPromise) return loadedPromise;

  loadedPromise = new Promise((resolve) => {
    window.dataLayer = window.dataLayer || [];
    window.gtag = function () { window.dataLayer.push(arguments); };

    const s = document.createElement("script");
    s.async = true;
    s.src = `https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(GA_ID)}`;
    s.onload = () => {
      g("js", new Date());
      // IMPORTANT: no automatic page_view (SPA-safe)
      g("config", GA_ID, { send_page_view: false, transport_type: "beacon" });
      resolve();
    };
    document.head.appendChild(s);
  });
  return loadedPromise;
}

/* ------------------------- user context (once) ----------------------- */
let userCtxApplied = false;
function applyUserContextOnce() {
  const anon = Identity.get();
  if (!anon || !hasGtag() || userCtxApplied) return;
  // GA4 user_id + a user property for easy reporting
  g("config", GA_ID, { user_id: anon, send_page_view: false });
  g("set", "user_properties", { anon_id: anon });
  userCtxApplied = true;
}

/* ------------------------------ API -------------------------------- */
export const Analytics = {
  /** Call on Accept: loads GA, sets consent, anon id, user context, fires first hits */
  async start() {
    Consent.accept();
    Identity.ensure();
    if (!GA_ID) return;

    await loadGtag();
    g("consent", "update", {
      ad_storage: "granted",
      analytics_storage: "granted",
      ad_user_data: "granted",
      ad_personalization: "granted",
    });

    applyUserContextOnce();
    this.sessionStart();
    this.pageview();
  },

  /** Optional toggle off */
  stop() {
    Consent.decline();
    Identity.clear();         // rotate anon id next time they accept
    userCtxApplied = false;
    if (hasGtag()) {
      g("consent", "update", {
        ad_storage: "denied",
        analytics_storage: "denied",
        ad_user_data: "denied",
        ad_personalization: "denied",
      });
    }
  },

  sessionStart() {
    if (!Consent.isGranted() || !hasGtag()) return;
    applyUserContextOnce();
    g("event", "session_start");
  },

  /** pageview with optional slug */
  pageview({ path, title, location, slug } = {}) {
    if (!Consent.isGranted() || !hasGtag()) return;
    applyUserContextOnce();
    g("event", "page_view", {
      page_title: title ?? document.title,
      page_location: location ?? window.location.href,
      page_path: path ?? (window.location.pathname + window.location.search),
      ...(slug ? { page_slug: slug } : {}),
    });
  },

  event(name, params = {}) {
    if (!Consent.isGranted() || !hasGtag()) return;
    applyUserContextOnce();
    g("event", name, params);
  },

  /** expose anon id (read-only) for debugging or UI */
  getAnonId() { return Identity.get(); },
};