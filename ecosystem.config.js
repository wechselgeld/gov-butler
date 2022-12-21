module.exports = {
  apps: [{
    name: 'oceanv-watcher',
    script: 'index.js',
    watch: true,
    ignore_watch: ['node_modules', 'ocean-v.sqlite', 'ocean-v.sqlite-journal'],
    env: {
      TZ: 'Europe/Amsterdam'
    }
  }]
};
