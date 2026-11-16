// Strips CSI (colours, cursor moves) and OSC (titles, shell-integration markers) sequences
const ANSI_RE = /\x1b\[[0-9;?]*[A-Za-z]|\x1b\][^\x07\x1b]*(?:\x07|\x1b\\)/g;
const BUFFER_SIZE = 500;

/** Reads the stream until one of the patterns matches, returning capture group 1. */
export async function findPort(stream: AsyncIterable<string>, patterns: RegExp[]) {
  let buf = '';
  for await (const chunk of stream) {
    // Rolling buffer so a match split across chunks is still found
    buf = (buf + chunk.replace(ANSI_RE, '')).slice(-BUFFER_SIZE);
    const port = matchPort(buf, patterns);
    if (port) return port;
  }
}

function matchPort(text: string, patterns: RegExp[]) {
  for (const pattern of patterns) {
    const port = text.match(pattern)?.[1];
    if (port) return port;
  }
}
