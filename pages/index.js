import { Grid, Container, Typography } from '@mui/material';

import BlogLayout from 'layouts/BlogLayout';
import BlogPostCard from 'components/BlogPostCard';

import POSTS from 'constans/posts';

const Home = () => {
  return (
    <BlogLayout>
      <Container maxWidth={'xl'}>
        <Grid container spacing={3}>
          {POSTS.slice(0,5).map((post, index) => (
            <BlogPostCard 
              key={post.title} 
              post={post} 
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
        <Typography variant="h2" mt={3} mb={2}>Najnowsze</Typography>

        <Grid container spacing={3}>
          {POSTS.slice(5,20).map((post, index) => (
            <BlogPostCard 
              key={post.title} 
              post={post} 
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

export default Home;

