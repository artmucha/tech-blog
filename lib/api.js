const API_URL = process.env.WORDPRESS_API_URL;

async function fetchAPI(query, { variables } = {}) {
  const headers = { 'Content-Type': 'application/json' };

  const res = await fetch('http://localhost/api', {
    method: 'POST',
    headers,
    body: JSON.stringify({
      query,
      variables,
    }),
  });

  const json = await res.json();
  if (json.errors) {
    console.error(json.errors);
    throw new Error('Failed to fetch API');
  };
  return json.data;
};

export async function getAllPosts() {
  const data = await fetchAPI(
      `query AllPosts {
        posts(first: 21, where: { orderby: { field: DATE, order: DESC}}) {
          edges {
            node {
              id
              title
              slug
              excerpt
              featuredImage {
                node {
                  sourceUrl
                }
              }
              categories {
                edges {
                  node {
                    slug
                    name
                    categoryId
                  }
                }
              }
            }
          }
        }
      }`
  );

  return data?.posts;
};

export async function getAllPostsWithSlug() {
  const data = await fetchAPI(
    `{
      posts(first: 30) {
        edges {
          node {
            slug
          }
        }
      }
    }`
  );
  return data?.posts;
};

export async function getPost(slug) {
  const data = await fetchAPI(
    `query PostBySlug($id: ID!, $idType: PostIdType!) {
      post(id: $id, idType: $idType) {
        title
        slug
        date
        content
        featuredImage {
          node {
            sourceUrl
          }
        }
        categories {
          edges {
            node {
              slug
              name
              categoryId
              posts {
                edges {
                  node {
                    slug
                    title
                    excerpt
                    featuredImage {
                      node {
                        sourceUrl
                      }
                    }
                  }
                }
              }
            }
          }
        }
        tags {
          edges {
            node {
              name
              posts {
                edges {
                  node {
                    title
                    slug
                    featuredImage {
                      node {
                        sourceUrl
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
    `,
    {
      variables: {
        id: slug,
        idType: 'SLUG'
      }
    }
  );

  return data;
};

export async function getAllCategoriesBySlug() {
  const data = await fetchAPI(
    `{
      categories {
        edges {
          node {
            slug
          }
        }
      }
    }`
  );
  return data?.categories;
};

export async function getPostsByCategory(slug) {
  const data = await fetchAPI(
    `query CategoryBySlug($id: ID!, $idType: CategoryIdType!) {
      category(id: $id, idType: $idType) {
        name
        slug
        description
        posts(first: 21) {
          edges {
            node {
              title
              slug
              excerpt
              featuredImage {
                node {
                  sourceUrl
                }
              }
              categories {
                edges {
                  node {
                    name
                    slug
                  }
                }
              }
            }
          }
        }
      }
    }
    `,
    {
      variables: {
        id: slug,
        idType: 'SLUG',
      }
    }
  );

  return data;
};