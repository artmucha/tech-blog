import { Link as NextLink } from 'next/link';

import { alpha, styled } from '@mui/material/styles';
import { Link, Card, Grid, Avatar, Typography, CardContent } from '@mui/material';

import SvgIconStyle from 'components/SvgIconStyle';

const CardMediaStyle = styled('div')({
  position: 'relative',
  paddingTop: 'calc(100% * 3 / 4)'
});

const TitleStyle = styled(Link)({
  height: 44,
  overflow: 'hidden',
  WebkitLineClamp: 2,
  display: '-webkit-box',
  WebkitBoxOrient: 'vertical'
});

const AvatarStyle = styled(Avatar)(({ theme }) => ({
  zIndex: 9,
  width: 32,
  height: 32,
  position: 'absolute',
  left: theme.spacing(3),
  bottom: theme.spacing(-2)
}));

const CoverImgStyle = styled('img')({
  top: 0,
  width: '100%',
  height: '100%',
  objectFit: 'cover',
  position: 'absolute'
});

const BlogPostCard = ({ post, index, padding, paddingLarge, size, latestPost }) => {
  const { title, excerpt, categories, slug, date,  } = post;
  const cover = post.featuredImage.node.sourceUrl;
  const latestPostLarge = index === 0;
  latestPost = latestPost.includes(index);

  return (
    <Grid item xs={12} sm={latestPostLarge ? 12 : 6} md={latestPostLarge ? size[0] : size[1]}>
      <Card sx={{ position: 'relative' }}>
        <CardMediaStyle
          sx={{
            ...((latestPostLarge || latestPost) && {
              pt: `calc(100% * ${padding[0]} / ${padding[1]})`,
              '&:after': {
                top: 0,
                content: "''",
                width: '100%',
                height: '100%',
                position: 'absolute',
                bgcolor: (theme) => alpha(theme.palette.grey[900], 0.72)
              }
            }),
            ...(latestPostLarge && {
              pt: {
                xs: 'calc(100% * 4 / 3)',
                sm: `calc(100% * ${paddingLarge[0]} / ${paddingLarge[1]})`,
              }
            })
          }}
        >
          <SvgIconStyle
            color="paper"
            src="vercel.svg"
            sx={{
              width: 80,
              height: 36,
              zIndex: 9,
              bottom: -15,
              position: 'absolute',
              ...((latestPostLarge || latestPost) && { display: 'none' })
            }}
          />
          {/* <AvatarStyle
            alt={author.name}
            src={author.avatarUrl}
            sx={{
              ...((latestPostLarge || latestPost) && {
                zIndex: 9,
                top: 24,
                left: 24,
                width: 40,
                height: 40
              })
            }}
          /> */}

          <CoverImgStyle alt={title} src={cover} />
        </CardMediaStyle>

        <CardContent
          sx={{
            pt: 4,
            ...((latestPostLarge || latestPost) && {
              bottom: 0,
              width: '100%',
              position: 'absolute'
            })
          }}
        >
          {/* <Typography
            gutterBottom
            variant="caption"
            sx={{ color: 'text.disabled', display: 'block' }}
          >
            {author.name}
          </Typography> */}
          <Typography
            gutterBottom
            variant="caption"
            sx={{ color: 'text.disabled', display: 'block' }}
          >
            {/* {createdAt} */}
          </Typography>

          <TitleStyle
            color="inherit"
            variant="subtitle2"
            underline="hover"
            component={NextLink}
            href={`/${slug}`}
            sx={{
              ...(latestPostLarge && { typography: 'h5', height: 60 }),
              ...((latestPostLarge || latestPost) && {
                color: 'common.white'
              })
            }}
          >
            {title}
          </TitleStyle>
          { (!latestPostLarge && !latestPost) && (
          <Typography
            gutterBottom
            variant="subtitle2"
            sx={{ color: 'text.disabled', display: 'block' }}
          >
            {excerpt}
          </Typography>
          ) }
        </CardContent>
      </Card>
    </Grid>
  );
};

export default BlogPostCard;