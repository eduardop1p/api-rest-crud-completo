{
  "version": 2,
  "name": "api-mflix-app",
  "builds": [
    {
      "src": "/dist/index.js",
      "use": "@vercel/node"
    }
  ],
  "routes": [
    {
      "src": "/(.*)",
      "dest": "/"
    }
  ]
}
