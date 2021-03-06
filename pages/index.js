import { Grid, Container, Typography } from '@mui/material';

import BlogLayout from 'layouts/BlogLayout';
import BlogPostCard from 'components/BlogPostCard';

import menu from 'constans/menu';

import { getAllPosts } from 'lib/api';

const Home = ({ posts: { edges } }) => {
  return (
    <BlogLayout menu={menu} >
      <Container maxWidth={'xl'}>
        <Grid container spacing={3}>
        { edges.slice(0, 5).map(({node}, index) => (
            <BlogPostCard 
              key={node.slug} 
              post={node} 
              index={index} 
              size={[12,3]} 
              padding={[3,4]} 
              paddingLarge={[6,16]} 
              latestPost={[0,1,2,3,4]} 
            />
          ))}
        </Grid>
      </Container>

      <Container maxWidth={'xl'}>
        <Typography variant="h2" mt={5} mb={2}>Najnowsze</Typography>

        <Grid container spacing={3}>
          {edges.slice(5,20).map(({node}, index) => (
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

export async function getStaticProps() {
  const data = await getAllPosts();
  return {
    props: { posts: data }
  };
};

export default Home;