export default {
  server: {
    port: process.env.PORT || 4000,  // Use the correct port
    host: '0.0.0.0',  // Bind to all network interfaces
  },
  preview: {
    allowedHosts: ['blogbergenchrisreact.onrender.com', 'localhost'],  // Add allowed hosts
  },
  dev:{
    allowedHosts: ['blogbergenchrisreact.onrender.com', 'localhost'],  // Add allowed hosts
  }
};
