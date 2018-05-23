export const environment = {
  production: true,
  api_gateway_url: "https://gateway.minegames.com.br/player/1.0.0/",
  user_info_url: "https://identity.minegames.com.br/oauth2/userinfo",
  openid : {
    strictDiscoveryDocumentValidation : false,
    discovery_url : 'https://identity.minegames.com.br/oauth2/oidcdiscovery/.well-known/openid-configuration',
    issuer : 'https://identity.minegames.com.br/oauth2/token',
    loginUrl : "https://identity.minegames.com.br/oauth2/authorize",
    redirectUri : "http://players.minegames.com.br",
    clientId : "wrmmzq3f7Zw3c2iN528JgfmsKqca",
    scope : "openid profile",
    oidc : true
  },
  access_token: ""
};