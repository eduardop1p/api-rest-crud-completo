{
  "version": 2,
  "name": "mp",
  "builds": [
    {
      "src": "./api/index",
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
