{
  "version": 2,
  "name": "mflix-server",
  "builds": [
    {
      "src": "./api/index.js",
      "use": "@now/node-server"
    }
  ],
  "routes": [
    {
      "src": "/(.*)",
      "dest": "/api"
    }
  ]
}
