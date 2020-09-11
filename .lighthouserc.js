module.exports = {
  ci: {
    collect: {
      startServerCommand: 'npm start',
      url: [
        'http://localhost:3000',
        'http://localhost:3000/stations',
        'http://localhost:3000/stations/London_Euston',
      ],
    },
    upload: {
      target: 'lhci',
      serverBaseUrl: 'https://kitibyte-lhci.herokuapp.com',
    },
  },
};
