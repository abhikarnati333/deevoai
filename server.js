app.use((req, res, next) => {
  res.setHeader(
    'Content-Security-Policy',
    `default-src 'self';
     script-src 'self' 'unsafe-inline' 'unsafe-eval' https://*.clerk.dev https://*.clerk.accounts.dev;
     style-src 'self' 'unsafe-inline';
     img-src 'self' data: https://*.clerk.dev https://*.clerk.accounts.dev;
     frame-src 'self' https://*.clerk.dev https://*.clerk.accounts.dev;
     connect-src 'self' https://*.clerk.dev https://*.clerk.accounts.dev;`
  );
  next();
}); 