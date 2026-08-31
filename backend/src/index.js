const { app, sequelize } = require('./app');

const PORT = process.env.PORT || 4000;

async function start() {
  await sequelize.authenticate();
  // Do NOT call sequelize.sync() here; rely on migrations for schema management.
  console.log('Starting server; ensure migrations have been run (no runtime sync)');
  app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
  });
}

start().catch(err => { console.error('Failed to start', err); process.exit(1); });
