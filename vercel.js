{
  "version": 2,
  "name": "mflix-server",
  "builds": [
    {
      "src": "/api",
      "use": "@now/node"
    }
  ],
  "routes": [
    {
      "src": "/(.*)",
      "dest": "/"
    }
  ]
}
