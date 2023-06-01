const fetchProducts = async () => {
  const shopifyStorefrontUrl = 'https://m-p-technical-test.myshopify.com/api/2023-01/graphql'; // Replace with your Shopify store URL and API version

  const query = `
    query {
      products(first: 10) { // Adjust the "first" argument to specify the number of products to retrieve
        edges {
          node {
            id
            title
            description
            variants(first: 5) { // Adjust the "first" argument to specify the number of variants per product to retrieve
              edges {
                node {
                  id
                  title
                  price
                }
              }
            }
          }
        }
      }
    }
  `;

  const response = await fetch(shopifyStorefrontUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-Shopify-Storefront-Access-Token': 'bc47fff02556a8e3426af638bcf634ac' // Replace with your Storefront API access token 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
    },
    body: JSON.stringify({ query })
  });

  const { data } = await response.json();

  // Process the fetched products
  const products = data.products.edges.map((edge) => {
    const { id, title, description, variants } = edge.node;
    const variantTitles = variants.edges.map((variant) => variant.node.title);

    return {
      id,
      title,
      description,
      variantTitles
    };
  });

  console.log(products); // Output the fetched products
};

fetchProducts();