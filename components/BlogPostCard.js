import { alpha, styled } from '@mui/material/styles';
import { Link, Card, Grid, Avatar, Typography, CardContent } from '@mui/material';

import SvgIconStyle from 'components/SvgIconStyle';
import { formDate } from 'utils/helpers';

const CardMediaStyle = styled('div')({
  position: 'relative',
  paddingTop: 'calc(100% * 3 / 4)'
});

const TitleStyle = styled(Link)({
  overflow: 'hidden',
  WebkitLineClamp: 2,
  display: '-webkit-box',
  WebkitBoxOrient: 'vertical'
});

const LeadStyle = styled(Typography)(({ theme }) => ({
  height: 66,
  overflow: 'hidden',
  color: theme.palette.text.disabled, 
  display: 'block', 
  WebkitLineClamp: 3,
  display: '-webkit-box',
  WebkitBoxOrient: 'vertical'
}));

const AvatarStyle = styled(Avatar)(({ theme }) => ({
  zIndex: 9,
  width: 32,
  height: 32,
  position: 'absolute',
  left: theme.spacing(3),
  bottom: theme.spacing(-2)
}));

const InfoStyle = styled('div')(({ theme }) => ({
  display: 'flex',
  flexWrap: 'wrap',
  marginTop: theme.spacing(2),
  color: theme.palette.text.disabled
}));

const CoverImgStyle = styled('img')({
  top: 0,
  width: '100%',
  height: '100%',
  objectFit: 'cover',
  position: 'absolute'
});

const BlogPostCard = ({ post, index, padding, paddingLarge, size, latestPost }) => {
  const { title, excerpt, categories, slug, date, author } = post;
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
            src="avatar-shape.svg"
            sx={{
              width: 80,
              height: 36,
              zIndex: 9,
              bottom: -15,
              position: 'absolute',
              ...((latestPostLarge || latestPost) && { display: 'none' })
            }}
          />
          <AvatarStyle
            alt={author.node.name}
            src={author.node.avatar.url}
            sx={{
              ...((latestPostLarge || latestPost) && {
                zIndex: 9,
                top: 24,
                left: 24,
                width: 40,
                height: 40
              })
            }}
          />
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

          <Typography
            gutterBottom
            variant="caption"
            sx={{ color: 'text.disabled', display: 'block' }}
          >
            { formDate(date) }
          </Typography>

          <Typography variant="h2">
            <TitleStyle
              color="inherit"
              variant="subtitle2"
              underline="hover"
              href={`/${slug}`}
              sx={{
                ...(latestPostLarge && { typography: 'h4'}),
                ...((latestPostLarge || latestPost) && {
                  color: 'common.white'
                })
              }}
            >
              {title}
            </TitleStyle>
          </Typography>

          { (!latestPostLarge && !latestPost) && (
          <LeadStyle
            gutterBottom
            variant="subtitle2"
            component="h3"
            dangerouslySetInnerHTML={{ __html: excerpt }}
          >
          </LeadStyle>
          ) }

          <InfoStyle>
            { categories.edges.map(({node}, index) => (
              <Link 
                key={index}
                variant="caption"
                underline="hover"
                href={`/kategoria/${node.slug}`}
                sx={{
                  ml: index === 0 ? 0 : 1.5,
                  color: 'grey.500'
                }}
              >
                { node.name }
              </Link>
            )) }
          </InfoStyle>
          
        </CardContent>
      </Card>
    </Grid>
  );
};

export default BlogPostCard;