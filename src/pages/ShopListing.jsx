import { useEffect, useMemo, useState } from 'react';
import { useParams, Link as RouterLink } from 'react-router-dom';
import {
  Container, Box, Typography, Grid, TextField, MenuItem, Button, Breadcrumbs,
  Link, CircularProgress, Chip,
} from '@mui/material';
import { MapPin, Car as CarIcon } from 'lucide-react';
import FilterSidebar, { defaultFilters } from '../components/cars/FilterSidebar';
import CarCard from '../components/cars/CarCard';
import { getDealerById } from '../services/dealerService';
import { getCarsByDealer, filterCars, sortCars } from '../services/vehicleService';
import { tokens } from '../theme';

const PAGE_SIZE = 6;

const sortOptions = [
  { value: 'default', label: 'Recommended' },
  { value: 'priceLow', label: 'Price: Low to High' },
  { value: 'priceHigh', label: 'Price: High to Low' },
  { value: 'newest', label: 'Newest' },
  { value: 'lowestMileage', label: 'Lowest Mileage' },
  { value: 'lowestMaintenance', label: 'Lowest Estimated Maintenance' },
];

export default function ShopListing() {
  const { dealerId } = useParams();
  const [dealer, setDealer] = useState(null);
  const [cars, setCars] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState(defaultFilters);
  const [sortBy, setSortBy] = useState('default');
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);

  useEffect(() => {
    setLoading(true);
    Promise.all([getDealerById(dealerId), getCarsByDealer(dealerId)]).then(([d, c]) => {
      setDealer(d);
      setCars(c);
      setLoading(false);
    });
  }, [dealerId]);

  const filtered = useMemo(() => sortCars(filterCars(cars, filters), sortBy), [cars, filters, sortBy]);
  const visible = filtered.slice(0, visibleCount);

  if (loading) {
    return <Box sx={{ display: 'flex', justifyContent: 'center', py: 12 }}><CircularProgress /></Box>;
  }

  if (!dealer) {
    return (
      <Container maxWidth="lg" sx={{ py: 8, textAlign: 'center' }}>
        <Typography variant="h6">Dealer not found.</Typography>
      </Container>
    );
  }

  return (
    <Box sx={{ bgcolor: tokens.paper, minHeight: '80vh', py: { xs: 4, md: 6 } }}>
      <Container maxWidth="lg">
        <Breadcrumbs sx={{ mb: 2 }}>
          <Link component={RouterLink} to="/dealers" underline="hover" color="text.secondary">Find Dealers</Link>
          <Typography color="text.primary">{dealer.name}</Typography>
        </Breadcrumbs>

        <Box sx={{ mb: 4, display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: 2 }}>
          <Box>
            <Typography variant="h4" sx={{ fontWeight: 700, mb: 0.5 }}>{dealer.name}</Typography>
            <Box sx={{ display: 'flex', gap: 2, color: tokens.textSecondary, flexWrap: 'wrap' }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                <MapPin size={14} /><Typography variant="body2">{dealer.area}, {dealer.city}</Typography>
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                <CarIcon size={14} /><Typography variant="body2">{filtered.length} of {cars.length} cars available</Typography>
              </Box>
            </Box>
          </Box>
        </Box>

        <Grid container spacing={3}>
          <Grid item xs={12} md={3}>
            <FilterSidebar filters={filters} setFilters={(f) => { setFilters(f); setVisibleCount(PAGE_SIZE); }} onReset={() => setFilters(defaultFilters)} />
          </Grid>
          <Grid item xs={12} md={9}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2.5, flexWrap: 'wrap', gap: 1.5 }}>
              <ActiveFilterSummary filters={filters} />
              <TextField
                select size="small" value={sortBy} onChange={(e) => setSortBy(e.target.value)}
                sx={{ minWidth: 230, bgcolor: tokens.paperRaised }}
                label="Sort by"
              >
                {sortOptions.map((o) => <MenuItem key={o.value} value={o.value}>{o.label}</MenuItem>)}
              </TextField>
            </Box>

            {filtered.length === 0 ? (
              <Box sx={{ textAlign: 'center', py: 8, bgcolor: tokens.paperRaised, borderRadius: 2, border: `1px solid ${tokens.line}` }}>
                <Typography variant="h6" sx={{ mb: 1 }}>No cars match your filters</Typography>
                <Typography color="text.secondary">Try adjusting or resetting your filters.</Typography>
              </Box>
            ) : (
              <>
                <Grid container spacing={2.5}>
                  {visible.map((car) => (
                    <Grid item xs={12} sm={6} lg={4} key={car.id}>
                      <CarCard car={car} />
                    </Grid>
                  ))}
                </Grid>
                {visibleCount < filtered.length && (
                  <Box sx={{ textAlign: 'center', mt: 4 }}>
                    <Button variant="outlined" onClick={() => setVisibleCount((v) => v + PAGE_SIZE)}>
                      Load More Cars
                    </Button>
                  </Box>
                )}
              </>
            )}
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}

function ActiveFilterSummary({ filters }) {
  const count =
    filters.brands.length + filters.fuels.length + filters.transmissions.length +
    filters.mileageBuckets.length + filters.owners.length + filters.conditions.length +
    filters.maintenanceBuckets.length + (filters.priceMin ? 1 : 0) + (filters.priceMax ? 1 : 0);

  if (!count) return <Typography variant="body2" color="text.secondary">No filters applied</Typography>;
  return <Chip label={`${count} filter${count > 1 ? 's' : ''} applied`} size="small" sx={{ bgcolor: tokens.amberSoft, color: tokens.warn, fontWeight: 700 }} />;
}
