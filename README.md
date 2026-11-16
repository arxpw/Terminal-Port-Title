# Terminal Port Title

Watches terminal output (via VS Code shell integration) and renames the terminal to `<port>` the first time a command prints the port it's listening on, e.g. `"port": "1234"` or Next.js / Vite's `Local: http://localhost:3000`.

## Install

```sh
npm install
npm run install-local
```

Then reload VS Code.

## Releasing

Bump `version` in `package.json`, then push a matching tag:

```sh
git tag v0.0.3
git push origin v0.0.3
```

The release workflow (`.github/workflows/release.yml`) builds the `.vsix` and attaches it to a GitHub release. Install a downloaded release with `code --install-extension terminal-port-title-<version>.vsix`.

## Settings

- `terminalPortTitle.patterns`: list of regexes to find the port, tried in order (capture group 1 is the port).
- `terminalPortTitle.format`: name template, supports `${folder}` and `${port}`.

## Notes

- Needs shell integration active in the terminal (default for zsh in VS Code).
- Only sees commands started after the extension activates.
