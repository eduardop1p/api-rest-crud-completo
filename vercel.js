{
  "version": 2,
  "name": "api-mflix-app",
  "builds": [
    {
      "src": "index.js",
      "use": "@now/node-server"
    }
  ],
  "routes": [
    {
      "src": "/(.*)",
      "dest": "/index.js"
    }
  ]
}
