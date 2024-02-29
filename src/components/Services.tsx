import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import ConstructionRoundedIcon from '@mui/icons-material/ConstructionRounded';
import AddRoadIcon from '@mui/icons-material/AddRoad';
import GridViewIcon from '@mui/icons-material/GridView';
import WaterDamageIcon from '@mui/icons-material/WaterDamage';
import ApartmentIcon from '@mui/icons-material/Apartment';
import ForestIcon from '@mui/icons-material/Forest';

const items = [
  {
    icon: <AddRoadIcon />,
    title: 'Mark & Anläggning',
    description:
      'Utforska våra kvalitetstjänster för markarbete och anläggning, som skräddarsys för att möta dina behov och förvandla din utomhusmiljö.',
  },
  {
    icon: <ApartmentIcon />,
    title: 'Husgrunder',
    description:
      'Upplev enastående hållbarhet som överträffar förväntningarna med en varaktig investering.',
  },
  {
    icon: <GridViewIcon />,
    title: 'Plattsättning',
    description:
      'Integrera våra produkter i din vardag med en intuitiv och användarvänlig gränssnitt.',
  },
  {
    icon: <WaterDamageIcon />,
    title: 'VA-arbeten',
    description:
      'Håll dig steget före med funktioner som sätter nya standarder och bättre tillgodose dina föränderliga behov än resten.',
  },
  {
    icon: <ConstructionRoundedIcon />,
    title: 'Rivningsarbeten',
    description:
      'Räkna med vår responsiva kundsupport som erbjuder hjälp som sträcker sig bortom köpet.',
  },
  {
    icon: <ForestIcon />,
    title: 'Trädfällning',
    description:
      'Njut av en noggrant utformad produkt där små detaljer gör en betydande skillnad för din totala upplevelse.',
  },
];

export default function Services() {
  return (
    <Box
      id='services'
      sx={{
        pt: { xs: 4, sm: 12 },
        pb: { xs: 8, sm: 16 },
        color: 'white',
        bgcolor: '#06090a',
      }}
    >
      <Container
        sx={{
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
          <Typography component='h2' variant='h4'>
            Våra tjänster
          </Typography>
          <Typography variant='body1' sx={{ color: 'grey.400' }}>
            Vi erbjuder skräddarsydda lösningar för alla dina utomhusprojekt. Med vår
            erfarenhet och expertis kan vi hjälpa dig att skapa det perfekta
            utomhusutrymmet. <br />
            Kontakta oss idag för att ta reda på hur vi kan hjälpa dig!
          </Typography>
        </Box>
        <Grid container spacing={2.5}>
          {items.map((item, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <Stack
                direction='column'
                color='inherit'
                component={Card}
                spacing={1}
                useFlexGap
                sx={{
                  p: 3,
                  height: '100%',
                  border: '1px solid',
                  borderColor: 'grey.800',
                  background: 'transparent',
                  backgroundColor: 'grey.900',
                }}
              >
                <Box sx={{ opacity: '50%' }}>{item.icon}</Box>
                <div>
                  <Typography fontWeight='medium' gutterBottom>
                    {item.title}
                  </Typography>
                  <Typography variant='body2' sx={{ color: 'grey.400' }}>
                    {item.description}
                  </Typography>
                </div>
              </Stack>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
}
