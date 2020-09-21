module.exports = {
  ci: {
    collect: {
      startServerCommand: 'yarn start',
      url: [
        'http://localhost:3000',
        'http://localhost:3000/stations',
        'http://localhost:3000/stations/London_Euston',
      ],
    },
    upload: {
      target: 'temporary-public-storage',
    },
  },
};
