import { alpha, styled } from '@mui/material/styles';
import { Card, Grid, Typography, CardContent } from '@mui/material';
import Link from 'next/link';

import { formDate } from 'utils/helpers';

const CardMediaStyle = styled('div')({
  position: 'relative',
  paddingTop: '50vh'
});

const TitleStyle = styled(Typography)({
  overflow: 'hidden',
  WebkitLineClamp: 2,
  display: '-webkit-box',
  WebkitBoxOrient: 'vertical'
});

const CoverImgStyle = styled('img')({
  top: 0,
  width: '100%',
  height: '100%',
  objectFit: 'cover',
  position: 'absolute'
});

const CarouselItem = ({ post }) => {
  const { title, cover, slug, createdAt } = post;

  return (
    <Grid item xs={12}>
      <Link href={slug}>
      <a>
        <Card>
          <CardMediaStyle
            sx={{
              '&:after': {
                top: 0,
                content: "''",
                width: '100%',
                height: '100%',
                position: 'absolute',
                bgcolor: (theme) => alpha(theme.palette.grey[900], 0.72)
              },
            }}
          >
            <CoverImgStyle alt={title} src={cover} />
          </CardMediaStyle>

          <CardContent
            sx={{
              pt: 4,
              bottom: 0,
              width: '100%',
              position: 'absolute',
            }}
          >
            <Typography
              gutterBottom
              variant="caption"
              sx={{ color: 'text.disabled', display: 'block' }}
            >
              { formDate(createdAt) }
            </Typography>

            <TitleStyle variant="h2" color='common.white'>
                {title}
            </TitleStyle>
          </CardContent>
        </Card>
        </a>     
      </Link>
    </Grid> 
  );
};

export { CarouselItem };