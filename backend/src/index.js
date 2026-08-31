const { app, sequelize } = require('./app');

const PORT = process.env.PORT || 4000;

let server;

async function start() {
  await sequelize.authenticate();
  // Do NOT call sequelize.sync() here; rely on migrations for schema management.
  console.log('Starting server; ensure migrations have been run (no runtime sync)');
  server = app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
  });
}

// Graceful restart/shutdown handlers so nodemon doesn't leave the port bound
process.once('SIGUSR2', () => {
  if (server) {
    server.close(() => {
      process.kill(process.pid, 'SIGUSR2');
    });
  } else {
    process.kill(process.pid, 'SIGUSR2');
  }
});

process.on('SIGINT', () => {
  if (server) {
    server.close(() => process.exit(0));
  } else {
    process.exit(0);
  }
});

process.on('SIGTERM', () => {
  if (server) {
    server.close(() => process.exit(0));
  } else {
    process.exit(0);
  }
});

start().catch(err => { console.error('Failed to start', err); process.exit(1); });
