// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export const environment = {
  production: false,
  api_gateway_url: "https://gateway.minegames.com.br/player/1.0.0/",
  user_info_url: "https://gateway.minegames.com.br/userinfo",
  openid : {
    strictDiscoveryDocumentValidation : false,
    discovery_url : 'https://apim.minegame.com.br/oauth2/oidcdiscovery',
    issuer : 'https://apim.minegames.com.br/oauth2/token',
    loginUrl : "https://apim.minegames.com.br/oauth2/authorize",
    redirectUri : "http://players.minegames.com.br",
    clientId : "wbuZg5gO2xoIsifLnzfz0COQSQoa",
    scope : "openid",
    oidc : true
  },
  access_token: ""
};