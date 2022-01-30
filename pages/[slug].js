import { alpha, styled } from '@mui/material/styles';
import { Container, Box, Avatar, Typography } from '@mui/material';
import { useRouter } from 'next/router';

import BlogLayout from 'layouts/BlogLayout';

import { getAllPostsWithSlug, getPost } from 'lib/api';

const Cover = styled(Box)(({ theme }) => ({
  borderRadius: theme.shape.borderRadiusMd,
  position: 'relative',
  zIndex: 0,
  overflow: 'hidden'
}));

const CoverMediaStyle = styled('div')({
  position: 'relative',
  paddingTop: 'calc(100% * 3 / 4)'
});

const AvatarStyle = styled(Avatar)(({ theme }) => ({
  zIndex: 9,
  width: 32,
  height: 32,
}));

const CoverImgStyle = styled('img')({
  top: 0,
  width: '100%',
  height: '100%',
  objectFit: 'cover',
  position: 'absolute',
});

const CoverContent = styled(Box)(({ theme }) => ({
  position: 'absolute',
  left: 0,
  bottom: 0,
  width: '100%',
  padding: theme.spacing(3),
}));

const Content = styled(Box)(({ theme }) => ({
  width: '100%',
  marginTop: theme.spacing(3),
}));

const SinglePage = ({post}) => {
  const { title, excerpt, content, categories, slug, date, author } = post;
  const cover = post.featuredImage.node.sourceUrl;
  const router = useRouter();

  if(!router.isFallback && !post?.slug) {
      return <p>Jakiś błąd!</p>;
  };

  return (
    <BlogLayout>
      <Container maxWidth={'xl'}>
        <Cover>
          <CoverMediaStyle
            sx={{
              pt: {
                xs: 'calc(100% * 4 / 3)',
                sm: 'calc(100% * 9 / 16)'
              },
              '&:after': {
                top: 0,
                content: "''",
                width: '100%',
                height: '100%',
                position: 'absolute',
                bgcolor: (theme) => alpha(theme.palette.grey[900], 0.72)
              }
            }}
          >
            <CoverImgStyle alt={title} src={cover} />
          </CoverMediaStyle>

          <CoverContent
            sx={{
              p: {
                xs: 3,
                sm: 4
              },
            }}
          >
            <AvatarStyle
              alt={author.node.name}
              src={author.node.avatar.url}
              sx={{
                zIndex: 9,
                width: {
                  xs: 40,
                  sm: 60,
                },
                height: {
                  xs: 40,
                  sm: 60,
                },
              }}
            />
            <Typography
              gutterBottom
              variant="body2"
              sx={{ color: 'text.disabled' }}
            >
              {author.node.name}
            </Typography>

            <Typography
              color="common.white"
              variant="h1"
              sx={{
                typography: 'h4'
              }}
            >
              {title}
            </Typography>
          </CoverContent>
        </Cover>

        <Box
          gutterBottom
          variant="subtitle2"
          component="h3"
          dangerouslySetInnerHTML={{ __html: excerpt }}
        >
        </Box>

        <Content
          variant="subtitle2"
          dangerouslySetInnerHTML={{ __html: content }}
          sx={{
            'figure': {
              my: 3
            },
            'h2, h3, h4, p': {
              my: 3,
            },
          }}
        >
        </Content>
      </Container>
    </BlogLayout>
  ) 
};

export async function getStaticPaths() {
  const posts = await getAllPostsWithSlug();

  const paths = posts.edges.map(({node}) => ({
    params: { slug: node.slug },
  }));

  return { paths, fallback: true }
};

export async function getStaticProps({params}) {
    const data = await getPost(params.slug)
  
    return {
      props: { post: data.post }
    };
};

export default SinglePage;