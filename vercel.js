{
  "version": 2,
  "name": "api-mflix-app",
  "builds": [
    {
      "src": "/api",
      "use": "@now/node"
    }
  ],
  "routes": [
    {
      "src": "/(.*)",
      "dest": "/api"
    }
  ]
}
