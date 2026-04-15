/**
 * Thin wrapper around @quiet-ly/analytics.
 * Provides a backwards-compatible singleton API so existing
 * component imports (`Analytics.event`, `Analytics.pageview`) continue to
 * work without changes.
 */
import { Analytics as QuietlyAnalytics } from "@quiet-ly/analytics";

const endpoint = import.meta.env.VITE_QUIET_LY_ENDPOINT ?? "";
const appId = import.meta.env.VITE_QUIET_LY_APP_ID ?? "portfolio";

export const _analyticsInstance = new QuietlyAnalytics({
  endpoint,
  appId,
});

type EventParams = Record<string, unknown>;

export const Analytics = {
  /** Track a custom event */
  event(name: string, params: EventParams = {}) {
    _analyticsInstance.track(name, params);
  },

  /** Track a page view (called from App-level route handler) */
  pageview({ path, slug }: { path?: string; slug?: string | null } = {}) {
    const resolvedPath = path ?? window.location.pathname;
    _analyticsInstance.track("page_view", {
      path: resolvedPath,
      ...(slug ? { slug } : {}),
    });
  },
};
