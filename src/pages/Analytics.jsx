import React from "react";
import { AnalyticsDashboard } from "@quiet-ly/analytics/dashboard";

const endpoint = import.meta.env.VITE_QUIET_LY_ENDPOINT ?? "";
const appId = import.meta.env.VITE_QUIET_LY_APP_ID ?? "portfolio";

const Analytics = () => {
  if (!endpoint) {
    return (
      <div
        style={{
          padding: "4rem 2rem",
          textAlign: "center",
          fontFamily: "Raleway, sans-serif",
        }}
      >
        <p>
          Analytics endpoint not configured. Set{" "}
          <code>VITE_QUIET_LY_ENDPOINT</code> in your environment.
        </p>
      </div>
    );
  }

  return <AnalyticsDashboard endpoint={endpoint} appId={appId} />;
};

export default Analytics;
