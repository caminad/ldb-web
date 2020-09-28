# Unofficial National Rail Live Departure Boards

View upcoming arrivals, departures, delays and cancellations for UK train stations. Built with [Next.js][0] and [Tailwind CSS][1], hosted on [Vercel][2]. Uses data from the [Live Departure Boards Web Service][3] via [kitibyte/ldb-graphql][4].

[0]: https://nextjs.org/
[1]: https://tailwindcss.com/
[2]: https://vercel.com/
[3]: https://realtime.nationalrail.co.uk/OpenLDBWS/
[4]: https://github.com/kitibyte/ldb-graphql

## Development

This project is configured with a [`devcontainer.json`][5] file to run using the VS Code [Remote - Containers][6] extension. Load the project and run `yarn dev` to start the development server on port 3000.

Cypress should be run **outside** of the development container with `yarn cypress open`.

[5]: https://code.visualstudio.com/docs/remote/devcontainerjson-reference
[6]: https://marketplace.visualstudio.com/items?itemName=ms-vscode-remote.remote-containers

## License

© 2020 David Jones. [MIT License](LICENSE).
