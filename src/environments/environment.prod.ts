export const environment = {
  production: true,
  api_gateway_url: "https://gateway.minegames.com.br/player/1.0.0/",
  openid : {
    strictDiscoveryDocumentValidation : false,
    issuer : 'https://apim.minegames.com.br/oauth2/token',
    loginUrl : "https://apim.minegames.com.br/oauth2/authorize",
    redirectUri : "http://players.minegames.com.br",
    clientId : "wbuZg5gO2xoIsifLnzfz0COQSQoa",
    scope : "openid",
    oidc : true
  },
  access_token: ""
};