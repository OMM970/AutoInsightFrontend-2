import { useEffect, useState } from 'react';
import { useParams, useNavigate, Link as RouterLink } from 'react-router-dom';
import {
  Container,
  Box,
  Typography,
  Grid,
  Button,
  Breadcrumbs,
  Link,
  CircularProgress,
  Divider,
  Stack,
} from '@mui/material';
import {
  Gauge,
  Fuel,
  Settings2,
  User,
  MapPin,
  Calendar,
  Cpu,
  ArrowRight,
} from 'lucide-react';

import ImageGallery from '../components/details/ImageGallery';
import { getCarById } from '../services/vehicleService';
import { getDealerById } from '../services/dealerService';
import { formatINR, formatKm } from '../utils/format';
import { tokens } from '../theme';

export default function CarDetails() {
  const { carId } = useParams();
  const navigate = useNavigate();

  const [car, setCar] = useState(null);
  const [dealer, setDealer] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadCarDetails = async () => {
      try {
        setLoading(true);

        const vehicle = await getCarById(carId);

        if (!vehicle) {
          setCar(null);
          return;
        }

        setCar(vehicle);

        // Get dealer information
        if (vehicle.dealerId) {
          const dealerData = await getDealerById(vehicle.dealerId);
          setDealer(dealerData);
        }
      } catch (error) {
        console.error('Failed to load vehicle details:', error);
        setCar(null);
      } finally {
        setLoading(false);
      }
    };

    loadCarDetails();
  }, [carId]);

  if (loading) {
    return (
        <Box
            sx={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              py: 12,
            }}
        >
          <CircularProgress />
        </Box>
    );
  }

  if (!car) {
    return (
        <Container sx={{ py: 8, textAlign: 'center' }}>
          <Typography variant="h6">
            Vehicle not found.
          </Typography>
        </Container>
    );
  }

  const overview = [
    {
      label: 'Registration Year',
      value: car.year,
      icon: Calendar,
    },
    {
      label: 'Fuel Type',
      value: car.fuel,
      icon: Fuel,
    },
    {
      label: 'Transmission',
      value: car.transmission,
      icon: Settings2,
    },
    {
      label: 'Engine',
      value: car.engineSpec || 'Not specified',
      icon: Cpu,
    },
    {
      label: 'Mileage',
      value: formatKm(car.mileageKm),
      icon: Gauge,
    },
    {
      label: 'Owners',
      value: `${car.owners} owner${car.owners > 1 ? 's' : ''}`,
      icon: User,
    },
    {
      label: 'Location',
      value: car.location || 'Not specified',
      icon: MapPin,
    },
  ];

  return (
      <Box
          sx={{
            bgcolor: tokens.paper,
            minHeight: '80vh',
            py: { xs: 4, md: 6 },
          }}
      >
        <Container maxWidth="lg">

          {/* Breadcrumbs */}
          <Breadcrumbs sx={{ mb: 3 }}>
            <Link
                component={RouterLink}
                to="/dealers"
                underline="hover"
                color="text.secondary"
            >
              Find Dealers
            </Link>

            {dealer && (
                <Link
                    component={RouterLink}
                    to={`/dealers/${dealer.id}`}
                    underline="hover"
                    color="text.secondary"
                >
                  {dealer.name}
                </Link>
            )}

            <Typography color="text.primary">
              {car.brand} {car.model}
            </Typography>
          </Breadcrumbs>

          {/* Main vehicle section */}
          <Grid container spacing={4}>

            {/* Images */}
            <Grid item xs={12} md={7}>
              <ImageGallery images={car.images || []} />
            </Grid>

            {/* Vehicle information */}
            <Grid item xs={12} md={5}>

              <Typography
                  variant="h4"
                  sx={{
                    fontWeight: 700,
                    mb: 1,
                  }}
              >
                {car.brand} {car.model}
              </Typography>

              <Typography
                  variant="h6"
                  color="text.secondary"
                  sx={{ mb: 2 }}
              >
                {car.variant || 'Standard Variant'} · {car.year}
              </Typography>

              {/* Basic stats */}
              <Stack
                  direction="row"
                  spacing={2.5}
                  sx={{
                    mb: 3,
                    flexWrap: 'wrap',
                    rowGap: 1.5,
                  }}
              >
                <MiniStat
                    label="Year"
                    value={car.year}
                />

                <MiniStat
                    label="Mileage"
                    value={formatKm(car.mileageKm)}
                />

                <MiniStat
                    label="Owners"
                    value={car.owners}
                />

                <MiniStat
                    label="Fuel"
                    value={car.fuel}
                />

                <MiniStat
                    label="Transmission"
                    value={car.transmission}
                />
              </Stack>

              {/* Price */}
              <Typography
                  variant="h3"
                  sx={{
                    fontWeight: 700,
                    mb: 2,
                  }}
              >
                {formatINR(car.price)}
              </Typography>

              {/* Location */}
              <Box
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 1,
                    mb: 3,
                    color: tokens.textSecondary,
                  }}
              >
                <MapPin size={18} />

                <Typography variant="body2">
                  {car.location || 'Location not specified'}
                </Typography>
              </Box>

              {/* Actions */}
              <Stack spacing={1.5}>

                <Button
                    fullWidth
                    size="large"
                    variant="contained"
                    endIcon={<ArrowRight size={18} />}
                    onClick={() =>
                        navigate(`/cars/${car.inventoryId}/inspection`)
                    }
                >
                  View Vehicle Inspection
                </Button>

                <Button
                    fullWidth
                    size="large"
                    variant="outlined"
                    onClick={() =>
                        navigate(`/cars/${car.inventoryId}/ai-analysis`)
                    }
                >
                  See AI Analysis
                </Button>

                <Button
                    fullWidth
                    size="large"
                    variant="outlined"
                    onClick={() =>
                        navigate(`/cars/${car.inventoryId}/ownership-cost`)
                    }
                >
                  Estimate Ownership Cost
                </Button>

              </Stack>
            </Grid>
          </Grid>

          <Divider sx={{ my: 5 }} />

          {/* Vehicle Overview */}
          <Typography
              variant="h5"
              sx={{
                fontWeight: 700,
                mb: 2.5,
              }}
          >
            Vehicle Overview
          </Typography>

          <Grid
              container
              spacing={2}
              sx={{ mb: 5 }}
          >
            {overview.map((item) => {
              const Icon = item.icon;

              return (
                  <Grid
                      item
                      xs={6}
                      sm={4}
                      md={3}
                      key={item.label}
                  >
                    <Box
                        sx={{
                          bgcolor: tokens.paperRaised,
                          border: `1px solid ${tokens.line}`,
                          borderRadius: 2,
                          p: 2,
                          height: '100%',
                        }}
                    >
                      <Box
                          sx={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: 0.75,
                            mb: 0.75,
                          }}
                      >
                        <Icon
                            size={14}
                            color={tokens.textSecondary}
                        />

                        <Typography
                            variant="caption"
                            color="text.secondary"
                        >
                          {item.label}
                        </Typography>
                      </Box>

                      <Typography
                          variant="body1"
                          sx={{
                            fontWeight: 700,
                          }}
                      >
                        {item.value}
                      </Typography>
                    </Box>
                  </Grid>
              );
            })}
          </Grid>

          {/* Dealer Information */}
          {dealer && (
              <>
                <Typography
                    variant="h5"
                    sx={{
                      fontWeight: 700,
                      mb: 2.5,
                    }}
                >
                  Dealer Information
                </Typography>

                <Box
                    sx={{
                      bgcolor: tokens.paperRaised,
                      border: `1px solid ${tokens.line}`,
                      borderRadius: 2,
                      p: 3,
                      mb: 5,
                    }}
                >
                  <Typography
                      variant="h6"
                      sx={{ fontWeight: 700 }}
                  >
                    {dealer.name}
                  </Typography>

                  <Box
                      sx={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: 1,
                        mt: 1,
                        color: tokens.textSecondary,
                      }}
                  >
                    <MapPin size={16} />

                    <Typography variant="body2">
                      {dealer.area}, {dealer.city}
                    </Typography>
                  </Box>
                </Box>
              </>
          )}

        </Container>
      </Box>
  );
}

function MiniStat({ label, value }) {
  return (
      <Box>
        <Typography
            variant="caption"
            color="text.secondary"
            sx={{
              display: 'block',
            }}
        >
          {label}
        </Typography>

        <Typography
            variant="body2"
            sx={{
              fontWeight: 700,
            }}
        >
          {value}
        </Typography>
      </Box>
  );
}