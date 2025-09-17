export default {
  server: {
    port: process.env.PORT || 10000,  // Use PORT env var if set, otherwise use 10000
    host: '0.0.0.0'                  // Bind to all network interfaces (required for cloud platforms)
  }
};
