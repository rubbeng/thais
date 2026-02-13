/**
 * ZAPPY SHOPIFY CONFIGURATION
 * 
 * To get these credentials:
 * 1. Go to your Shopify Admin -> Settings -> Apps and sales channels
 * 2. Click 'Develop apps' -> 'Create an app'
 * 3. Under 'Configuration', enable 'Storefront API' scopes
 * 4. Install the app and copy the 'Storefront access token'
 */

export const SHOPIFY_CONFIG = {
  shopName: 'zappy-studio', // Your shop name (e.g., 'zappy-studio' for zappy-studio.myshopify.com)
  storefrontAccessToken: 'YOUR_STOREFRONT_ACCESS_TOKEN', // Paste your token here
  apiVersion: '2024-01',
};

export const getShopifyUrl = () => `https://${SHOPIFY_CONFIG.shopName}.myshopify.com/api/${SHOPIFY_CONFIG.apiVersion}/graphql.json`;
