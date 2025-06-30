// Log format inspired by the Squid docs
// See https://docs.trafficserver.apache.org/en/6.1.x/admin-guide/monitoring/logging/log-formats.en.html
export interface LogPayload {
  time?: number; // Time taken for the request in milliseconds
  ip?: string; // IP address of the client making the request
  status?: number | string; // HTTP status code or 'XXX' for errors
  method?: string; // HTTP method (GET, POST, etc.)
  url?: string; // Full URL of the request
  message?: string; // Optional message for additional context
}
