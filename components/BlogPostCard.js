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

const BlogPostCard = ({ post }) => {
  const { title, lead, cover, categories, slug, createdAt, author } = post;

  return (
    <Grid item xs={12} sm={6} md={3}>
      <Card sx={{ position: 'relative' }}>
        <CardMediaStyle>
          <SvgIconStyle
            color="paper"
            src="avatar-shape.svg"
            sx={{
              width: 80,
              height: 36,
              zIndex: 9,
              bottom: -15,
              position: 'absolute',
            }}
          />
          <AvatarStyle
            alt={author}
            src={author}
          />
          <CoverImgStyle alt={title} src={cover} />
        </CardMediaStyle>

        <CardContent
          sx={{
            pt: 4,
          }}
        >

          <Typography
            gutterBottom
            variant="caption"
            sx={{ color: 'text.disabled', display: 'block' }}
          >
            { formDate(createdAt) }
          </Typography>

          <Typography variant="h2">
            <TitleStyle
              color="inherit"
              variant="subtitle2"
              underline="hover"
              href={`/${slug}`}
            >
              {title}
            </TitleStyle>
          </Typography>

          <LeadStyle
            gutterBottom
            variant="subtitle2"
            component="h3"
            dangerouslySetInnerHTML={{ __html: lead }}
          >
          </LeadStyle>

          <InfoStyle>
            { categories.map((category, index) => (
              <Link 
                key={index}
                variant="caption"
                underline="hover"
                href={`/kategoria/${category.slug}`}
                sx={{
                  ml: index === 0 ? 0 : 1.5,
                  color: 'grey.500'
                }}
              >
                { category.name }
              </Link>
            )) }
          </InfoStyle>
          
        </CardContent>
      </Card>
    </Grid>
  );
};

export default BlogPostCard;