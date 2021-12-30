import { Grid, Container, Typography } from '@mui/material';

import BlogLayout from 'layouts/BlogLayout';
import BlogPostCard from 'components/BlogPostCard';

import { getPostsByCategory, getAllCategoriesBySlug } from 'lib/api';

const Category = ({category}) => {
  return (
    <BlogLayout>
      <Container maxWidth={'xl'}>
        <Typography variant="h2" mt={3} mb={2}>{category.name}</Typography>

        <Grid container spacing={3}>
          { category.posts.edges.map(({node}, index) => (
            <BlogPostCard 
              key={node.slug} 
              post={node} 
              index={index} 
              size={[6,3]} 
              padding={[4,3]} 
              paddingLarge={[3,4.66]}
              latestPost={[0,1,2]}
            />
          ))}
        </Grid>
      </Container>
    </BlogLayout>
  );
};

export async function getStaticPaths() {
  const categories = await getAllCategoriesBySlug();

  const paths = categories.edges.map(({node}) => ({
    params: { category: node.slug },
  }));

  return { paths, fallback: true }
};

export async function getStaticProps({params}) {
    const data = await getPostsByCategory(params.category)
    
    return {
      props: { category: data.category }
    };
};

export default Category;

