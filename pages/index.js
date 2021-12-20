import { Grid, Container } from '@mui/material';

import BlogLayout from 'layouts/BlogLayout';
import BlogPostCard from 'components/BlogPostCard';

import POSTS from 'constans/posts';

const Home = () => {
  return (
    <BlogLayout>
      <Container>
        <Grid container spacing={3}>
          {POSTS.map((post, index) => (
            <BlogPostCard key={post.title} post={post} index={index} />
          ))}
        </Grid>
      </Container>
    </BlogLayout>
  );
};

export default Home;

