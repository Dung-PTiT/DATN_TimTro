export class AppConfig {
  public static COOKIE_TOKEN_NAME = "TimTroToken";
  public static COOKIE_TOKEN_EXPIRE_TIME = 864000000;
  public static PREFIX_URL = "http://localhost:8080";
  public static CONTEXT_URL = "";
  public static OAUTH2_REDIRECT_URI = "http://localhost:4200/oauth2/redirect";
  public static GOOGLE_AUTH_URL = encodeURI(AppConfig.PREFIX_URL + "/oauth2/authorize/google?redirect_uri=" + AppConfig.OAUTH2_REDIRECT_URI);
  public static FACEBOOK_AUTH_URL = encodeURI(AppConfig.PREFIX_URL+ '/oauth2/authorize/facebook?redirect_uri=' + AppConfig.OAUTH2_REDIRECT_URI);
}

