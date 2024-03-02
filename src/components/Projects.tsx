import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import Chip from '@mui/material/Chip';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Link from '@mui/material/Link';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import ChevronRightRoundedIcon from '@mui/icons-material/ChevronRightRounded';
import CircularProgress from '@mui/material/CircularProgress';
import { Divider, Pagination } from '@mui/material';

import { DocumentRenderer, DocumentRendererProps } from '@keystone-6/document-renderer';

import { useQuery, gql } from '@apollo/client';

const GET_PROJECTS = gql`
  query Query($orderBy: [ProjectOrderByInput!]!) {
    projects(orderBy: $orderBy) {
      id
      projectTitle
      shortDescription
      fullDescription
      projectImage {
        url
      }
      location
      icon
      date
    }
    siteConfig {
      projectsPreamble {
        document
      }
    }
  }
`;

interface Projects {
  id: string;
  projectTitle: string;
  shortDescription: string;
  fullDescription: string;
  projectImage: {
    url: string;
  };
  location: string;
  icon: string;
  date: string;
}

const projectsPerPage = 3;

export default function Projects() {
  const [selectedItemIndex, setSelectedItemIndex] = React.useState(0);
  const { data } = useQuery(GET_PROJECTS, {
    variables: {
      orderBy: [
        {
          date: 'desc',
        },
      ],
    },
  });
  const [projects, setProjects] = React.useState<Projects[]>([]);
  const [preamble, setPreamble] = React.useState<DocumentRendererProps['document']>();
  const [isLoaded, setIsLoaded] = React.useState(false);
  const [page, setPage] = React.useState(1);

  const handlePageChange = (event: React.ChangeEvent<unknown>, value: number) => {
    event.preventDefault();
    setPage(value);
  };

  const startIndex = (page - 1) * projectsPerPage;
  const endIndex = startIndex + projectsPerPage;

  React.useEffect(() => {
    if (data) {
      setProjects(data.projects);
      setPreamble(data.siteConfig.projectsPreamble.document);
      setIsLoaded(true);
    }
  }, [data]);

  const handleItemClick = (index: number) => {
    setSelectedItemIndex(startIndex + index);
  };

  const selectedFeature = projects[selectedItemIndex];

  return (
    <Container id='projects' sx={{ py: { xs: 8, sm: 16 } }}>
      {isLoaded ? (
        <Grid container spacing={6}>
          <Grid item xs={12} md={6}>
            <div>
              <Typography
                fontFamily='Times New Roman, serif'
                component='h2'
                variant='h4'
                color='text.primary'
                sx={{ textAlign: 'center' }}
              >
                Projekt
              </Typography>
              <Box sx={{ mb: { xs: 2, sm: 4 }, textAlign: { xs: 'center' } }}>
                {preamble && <DocumentRenderer document={preamble} />}
              </Box>
            </div>
            <Grid
              container
              item
              gap={1}
              sx={{
                display: { xs: 'auto', sm: 'none' },
                justifyContent: { xs: 'center' },
              }}
            >
              {projects.map(({ projectTitle }, index) => (
                <Chip
                  key={index}
                  label={projectTitle}
                  onClick={() => handleItemClick(index)}
                  sx={{
                    borderColor: (theme) => {
                      if (theme.palette.mode === 'light') {
                        return selectedItemIndex === index ? 'primary.light' : '';
                      }
                      return selectedItemIndex === index ? 'primary.light' : '';
                    },
                    background: (theme) => {
                      if (theme.palette.mode === 'light') {
                        return selectedItemIndex === index ? 'none' : '';
                      }
                      return selectedItemIndex === index ? 'none' : '';
                    },
                    backgroundColor: selectedItemIndex === index ? 'primary.main' : '',
                    '& .MuiChip-label': {
                      color: selectedItemIndex === index ? '#fff' : '',
                    },
                  }}
                />
              ))}
            </Grid>
            <Box
              component={Card}
              variant='outlined'
              sx={{
                display: { xs: 'auto', sm: 'none' },
                mt: 4,
              }}
            >
              <Box
                sx={{
                  backgroundImage: selectedFeature.projectImage
                    ? `url(${selectedFeature.projectImage.url})`
                    : '',
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                  minHeight: 200,
                  mb: 1,
                }}
              />
              <Box sx={{ px: 2, pb: 2 }}>
                <Typography color='text.primary' variant='body1' fontWeight='bold'>
                  {selectedFeature.projectTitle}
                </Typography>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                  <Typography>{selectedFeature.date}</Typography>
                  <Divider orientation='vertical' flexItem />
                  <Typography>{selectedFeature.location}</Typography>
                </Box>
                <Typography color='text.secondary' variant='body2' sx={{ my: 0.5 }}>
                  {selectedFeature.fullDescription}
                </Typography>
                <Link
                  color='primary'
                  variant='body2'
                  fontWeight='bold'
                  sx={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    '& > svg': { transition: '0.2s' },
                    '&:hover > svg': { transform: 'translateX(2px)' },
                  }}
                ></Link>
              </Box>
            </Box>

            <Stack
              direction='column'
              alignItems='flex-start'
              spacing={2}
              sx={{
                width: '100%',

                display: { xs: 'none', sm: 'flex' },
              }}
            >
              {projects
                .slice(startIndex, endIndex)
                .map(({ projectTitle, shortDescription }, index) => (
                  <Card
                    key={index}
                    component={Button}
                    onClick={() => handleItemClick(index)}
                    sx={{
                      p: 3,
                      height: 'fit-content',
                      width: '100%',
                      background: 'none',
                      backgroundColor:
                        selectedItemIndex === index ? 'action.selected' : undefined,
                      borderColor: (theme) => {
                        if (theme.palette.mode === 'light') {
                          return selectedItemIndex === index
                            ? 'primary.light'
                            : 'grey.200';
                        }
                        return selectedItemIndex === index ? 'primary.dark' : 'grey.800';
                      },
                    }}
                  >
                    <Box
                      sx={{
                        width: '100%',
                        display: 'flex',
                        flexDirection: { xs: 'column', md: 'row' },
                        alignItems: { xs: 'flex-start', md: 'center' },
                        textAlign: 'left',
                        gap: { xs: 0, md: 2.5 },
                      }}
                    >
                      <Box
                        sx={{
                          color: (theme) => {
                            if (theme.palette.mode === 'light') {
                              return selectedItemIndex === index
                                ? 'primary.main'
                                : 'grey.300';
                            }
                            return selectedItemIndex === index
                              ? 'primary.main'
                              : 'grey.700';
                          },
                        }}
                      ></Box>
                      <div>
                        <Typography
                          color='text.primary'
                          variant='body2'
                          fontWeight='bold'
                        >
                          {projectTitle}
                        </Typography>
                        <Typography
                          color='text.secondary'
                          variant='body2'
                          sx={{ my: 0.5 }}
                        >
                          {shortDescription}
                        </Typography>
                        <Link
                          color='primary'
                          variant='body2'
                          fontWeight='bold'
                          sx={{
                            display: 'inline-flex',
                            alignItems: 'center',
                            '& > svg': { transition: '0.2s' },
                            '&:hover > svg': { transform: 'translateX(2px)' },
                          }}
                          onClick={() => handleItemClick(index)}
                        >
                          <span>Läs mer</span>
                          <ChevronRightRoundedIcon
                            fontSize='small'
                            sx={{ mt: '1px', ml: '2px' }}
                          />
                        </Link>
                      </div>
                    </Box>
                  </Card>
                ))}
            </Stack>
            {projects.length > projectsPerPage && (
              <Box
                sx={{
                  width: '100%',
                  pt: 2,
                  display: { xs: 'none', md: 'flex' },
                }}
              >
                <Pagination
                  count={Math.ceil(projects.length / projectsPerPage)}
                  page={page}
                  onChange={handlePageChange}
                  variant='outlined'
                  shape='rounded'
                  sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    width: '100%',
                  }}
                />
              </Box>
            )}
          </Grid>

          <Grid
            item
            xs={12}
            md={6}
            sx={{ display: { xs: 'none', sm: 'flex' }, width: '100%' }}
          >
            <Card
              variant='outlined'
              sx={{
                height: { md: '570px' },
                width: '100%',
                display: { xs: 'none', sm: 'flex' },
                pointerEvents: 'none',
              }}
            >
              <Box>
                <Box
                  sx={{
                    mb: 1,
                    height: '300px',
                    lazyLoad: 'none',
                    backgroundImage: selectedFeature.projectImage
                      ? `url(${selectedFeature.projectImage.url})`
                      : '',
                    backgroundSize: 'cover',
                    backgroundRepeat: 'no-repeat',
                  }}
                />
                <Box sx={{ px: 2, pb: 2 }}>
                  <Typography component='h3' variant='h6'>
                    {selectedFeature.projectTitle}
                  </Typography>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                    <Typography>{selectedFeature.date}</Typography>
                    <Divider orientation='vertical' flexItem />
                    <Typography>{selectedFeature.location}</Typography>
                  </Box>
                  <Typography variant='body1' gutterBottom>
                    {selectedFeature.fullDescription}
                  </Typography>
                </Box>
              </Box>
            </Card>
          </Grid>
        </Grid>
      ) : (
        <Box display='flex' justifyContent='center' alignItems='center'>
          <CircularProgress />
        </Box>
      )}
    </Container>
  );
}
