import http from 'http';

function createProxy(port, defaultTargetRoute, versionName) {
  const server = http.createServer((clientReq, clientRes) => {
    let targetPath = clientReq.url;
    if (targetPath === '/' || targetPath === '') {
      targetPath = defaultTargetRoute;
    }

    const options = {
      hostname: '127.0.0.1',
      port: 3000,
      path: targetPath,
      method: clientReq.method,
      headers: {
        ...clientReq.headers,
        host: 'localhost:3000',
      },
    };

    const proxyReq = http.request(options, (proxyRes) => {
      clientRes.writeHead(proxyRes.statusCode, proxyRes.headers);
      proxyRes.pipe(clientRes, { end: true });
    });

    proxyReq.on('error', (err) => {
      console.error(`[${versionName} Port ${port} Error]:`, err.message);
      if (!clientRes.headersSent) {
        clientRes.writeHead(502, { 'Content-Type': 'text/plain; charset=utf-8' });
        clientRes.end(`Next.js dev server on port 3000 is still starting. Please refresh in a moment.`);
      }
    });

    clientReq.pipe(proxyReq, { end: true });
  });

  server.listen(port, '0.0.0.0', () => {
    console.log(`[ETLEGIS ${versionName}] running on http://localhost:${port}`);
  });

  return server;
}

// 1. Version 2.0 Baseline on Port 3001
createProxy(3001, '/v2', 'v2.0 (Классика)');

// 2. Version 2.5 (Heron AI 3D) on Port 3002
createProxy(3002, '/v2-5', 'v2.5 (Heron AI 3D)');
