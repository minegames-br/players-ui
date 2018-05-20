export const environment = {
  production: true,
  api_gateway_url: "https://gateway.minegames.com.br/",
  openid : {
    strictDiscoveryDocumentValidation : false,
    issuer : 'https://apim.minegames.com.br/oauth2/token',
    loginUrl : "https://apim.minegames.com.br/oauth2/authorize",
    redirectUri : "http://players.minegames.com.br",
    clientId : "xdtnOFzaaxOPB651ocEQSmiwn9ca",
    scope : "openid",
    oidc : true
  },
  access_token: ""
};