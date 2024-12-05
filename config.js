// config.js
const config = {
  MODE: process.env.NEXT_PUBLIC_MODE,
  BASE_URL: process.env.NEXT_PUBLIC_BASE_URL ?? 'http://103.167.89.145:8080',
  OA_ID: process.env.NEXT_PUBLIC_OA_ID,
  HOTLINE: process.env.NEXT_PUBLIC_HOTLINE,
  GMAIL: process.env.NEXT_PUBLIC_GMAIL,
  APP_ID: process.env.NEXT_PUBLIC_APP_ID,
  ZALO_MINI_APP_ID: process.env.NEXT_PUBLIC_ZALO_MINI_APP_ID,
  ORGANIZATION_ID: process.env.NEXT_PUBLIC_ORGANIZATION_ID,
  HOME_CONFIG_ID: process.env.NEXT_PUBLIC_HOME_CONFIG_ID,
};

export default config;
