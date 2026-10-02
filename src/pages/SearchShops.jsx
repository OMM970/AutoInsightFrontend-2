import { useEffect, useState } from 'react';
import {
  Container, Box, Typography, TextField, InputAdornment, MenuItem, Grid, Stack, CircularProgress,
} from '@mui/material';
import { Search as SearchIcon, MapPin } from 'lucide-react';
import DealerCard from '../components/dealers/DealerCard';
import SectionHeading from '../components/common/SectionHeading';
import { getDealers, getCities } from '../services/dealerService';
import { tokens } from '../theme';

export default function SearchShops() {
  const [query, setQuery] = useState('');
  const [city, setCity] = useState('');
  const [dealers, setDealers] = useState([]);
  const [loading, setLoading] = useState(true);
  const cities = getCities();

  useEffect(() => {
    setLoading(true);
    getDealers({ query, city }).then((res) => {
      setDealers(res);
      setLoading(false);
    });
  }, [query, city]);

  return (
    <Box sx={{ bgcolor: tokens.paper, minHeight: '80vh', py: { xs: 5, md: 7 } }}>
      <Container maxWidth="lg">
        <SectionHeading
          title="Find Used-Car Dealers"
          subtitle="Search verified dealers near you and browse their inventory with AI-backed condition data."
        />

        <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} sx={{ mb: 4 }}>
          <TextField
            fullWidth
            placeholder="Search by city, area, or dealer name"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            sx={{ bgcolor: tokens.paperRaised }}
            InputProps={{ startAdornment: <InputAdornment position="start"><SearchIcon size={18} /></InputAdornment> }}
          />
          <TextField
            select
            value={city}
            onChange={(e) => setCity(e.target.value)}
            sx={{ minWidth: { xs: '100%', sm: 220 }, bgcolor: tokens.paperRaised }}
            InputProps={{ startAdornment: <InputAdornment position="start"><MapPin size={18} /></InputAdornment> }}
          >
            <MenuItem value="">All locations</MenuItem>
            {cities.map((c) => <MenuItem key={c} value={c}>{c}</MenuItem>)}
          </TextField>
        </Stack>

        {loading ? (
          <Box sx={{ display: 'flex', justifyContent: 'center', py: 8 }}><CircularProgress /></Box>
        ) : dealers.length === 0 ? (
          <Box sx={{ textAlign: 'center', py: 8 }}>
            <Typography variant="h6" sx={{ mb: 1 }}>No dealers match your search</Typography>
            <Typography color="text.secondary">Try a different city or search term.</Typography>
          </Box>
        ) : (
          <Grid container spacing={2.5}>
            {dealers.map((d) => (
              <Grid item xs={12} key={d.id}>
                <DealerCard dealer={d} />
              </Grid>
            ))}
          </Grid>
        )}
      </Container>
    </Box>
  );
}
