import { SHOPIFY_CONFIG, getShopifyUrl } from '../config';

/**
 * This service handles all communication with the Shopify Storefront API.
 * It uses GraphQL to fetch products and create checkouts.
 */

export async function shopifyFetch({ query, variables = {} }: { query: string; variables?: any }) {
  try {
    const response = await fetch(getShopifyUrl(), {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Shopify-Storefront-Access-Token': SHOPIFY_CONFIG.storefrontAccessToken,
      },
      body: JSON.stringify({ query, variables }),
    });

    return await response.json();
  } catch (error) {
    console.error('Error fetching from Shopify:', error);
    return null;
  }
}

// Example Query to fetch products
export const PRODUCTS_QUERY = `
  query getProducts($first: Int!) {
    products(first: $first) {
      edges {
        node {
          id
          title
          handle
          description
          priceRange {
            minVariantPrice {
              amount
              currencyCode
            }
          }
          images(first: 5) {
            edges {
              node {
                url
                altText
              }
            }
          }
        }
      }
    }
  }
`;

/**
 * Creates a Shopify Checkout URL for the items in the cart.
 * This is what happens when the user clicks "Checkout".
 */
export async function createCheckout(lineItems: any[]) {
  const mutation = `
    mutation checkoutCreate($input: CheckoutCreateInput!) {
      checkoutCreate(input: $input) {
        checkout {
          webUrl
        }
        checkoutUserErrors {
          code
          field
          message
        }
      }
    }
  `;

  const variables = {
    input: {
      lineItems: lineItems.map(item => ({
        variantId: item.variantId, // You'll need the Shopify Variant ID
        quantity: item.quantity,
        customAttributes: item.customImage ? [{ key: 'Custom Image', value: item.customImage }] : []
      }))
    }
  };

  const result = await shopifyFetch({ query: mutation, variables });
  return result?.data?.checkoutCreate?.checkout?.webUrl;
}
