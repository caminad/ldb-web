const targetURL = process.env.TARGET_URL || 'http://localhost:3000';

module.exports = {
  ci: {
    collect: {
      startServerCommand: 'npm start',
      url: [
        `${targetURL}`,
        `${targetURL}/stations`,
        `${targetURL}/stations/London_Euston`,
      ],
    },
    upload: {
      target: 'lhci',
      serverBaseUrl: 'https://kitibyte-lhci.herokuapp.com',
    },
  },
};
