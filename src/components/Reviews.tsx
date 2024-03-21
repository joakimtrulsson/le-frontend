import * as React from 'react';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Masonry from '@mui/lab/Masonry';
import CircularProgress from '@mui/material/CircularProgress';
import { useMediaQuery } from '@mui/material';
import { DocumentRenderer, DocumentRendererProps } from '@keystone-6/document-renderer';
import { Review } from '../types/';

import { useQuery } from '@apollo/client';
import { GET_REVIEWS } from '../graphql/queries';

export default function Reviews() {
  const isSmallScreen = useMediaQuery('(max-width:600px)');
  const columns = isSmallScreen ? 1 : 3;
  const [reviews, setReviews] = React.useState<Review[]>([]);
  const [preamble, setPreamble] = React.useState<DocumentRendererProps['document']>();
  const { loading, data } = useQuery(GET_REVIEWS, {
    variables: {
      orderBy: [
        {
          date: 'desc',
        },
      ],
    },
  });

  React.useEffect(() => {
    if (data) {
      setReviews(data.reviews);
      setPreamble(data.siteConfig.reviewsPreamble.document);
    }
  }, [data]);

  return (
    <Container
      id='reviews'
      sx={{
        pt: { xs: 4, sm: 12 },
        pb: { xs: 8, sm: 16 },
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: { xs: 3, sm: 6 },
      }}
    >
      <Box
        sx={{
          width: { sm: '100%', md: '60%' },
          textAlign: { sm: 'left', md: 'center' },
        }}
      >
        <Typography
          fontFamily='Times New Roman, serif'
          component='h2'
          variant='h4'
          color='text.primary'
          sx={{ textAlign: 'center' }}
        >
          Omdömen
        </Typography>
        <Box color='text.secondary' sx={{ mb: { xs: 2, sm: 4 } }}>
          {preamble && <DocumentRenderer document={preamble} />}
        </Box>
      </Box>
      <Masonry columns={columns} spacing={2}>
        {!loading ? (
          reviews.map((review, index) => (
            <Card key={index} sx={{ p: 1 }}>
              <CardContent>
                <Typography variant='body2' color='text.secondary'>
                  {review.reviewText}
                </Typography>
              </CardContent>
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  pr: 2,
                }}
              >
                <CardHeader
                  avatar={<Avatar>{review.reviewBy.charAt(0)}</Avatar>}
                  title={review.reviewBy}
                  subheader={`${review.location} | ${review.date}`}
                />
              </Box>
            </Card>
          ))
        ) : (
          <Box display='flex' justifyContent='center' alignItems='center'>
            <CircularProgress />
          </Box>
        )}
      </Masonry>
    </Container>
  );
}
