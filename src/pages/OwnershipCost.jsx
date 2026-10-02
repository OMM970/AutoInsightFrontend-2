import { useEffect, useState } from 'react';
import { useParams, useNavigate, Link as RouterLink } from 'react-router-dom';
import {
  Container, Box, Typography, Grid, Card, Breadcrumbs, Link, CircularProgress,
  Button, ButtonGroup, Stack, Divider,
} from '@mui/material';
import { ArrowRight, Wallet, Wrench, CalendarClock } from 'lucide-react';
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid,
} from 'recharts';
import { getCarById } from '../services/vehicleService';
import { getOwnershipCost } from '../services/predictionService';
import { formatINR } from '../utils/format';
import { tokens } from '../theme';

const PERIODS = [1, 3, 5];

export default function OwnershipCost() {
  const { carId } = useParams();
  const navigate = useNavigate();
  const [car, setCar] = useState(null);
  const [years, setYears] = useState(3);
  const [cost, setCost] = useState(null);

  useEffect(() => {
    getCarById(carId).then((c) => {
      setCar(c);
      if (c) setCost(getOwnershipCost(carId, years, c.price));
    });
  }, [carId]);

  useEffect(() => {
    if (car) setCost(getOwnershipCost(carId, years, car.price));
  }, [years, car, carId]);

  if (!car) return <Box sx={{ display: 'flex', justifyContent: 'center', py: 12 }}><CircularProgress /></Box>;

  const chartData = cost.timeline.map((t) => ({ label: `M${t.month}`, cost: t.cost, event: t.event }));

  return (
    <Box sx={{ bgcolor: tokens.paper, minHeight: '80vh', py: { xs: 4, md: 6 } }}>
      <Container maxWidth="lg">
        <Breadcrumbs sx={{ mb: 2 }}>
          <Link component={RouterLink} to={`/cars/${carId}`} underline="hover" color="text.secondary">{car.brand} {car.model}</Link>
          <Typography color="text.primary">Ownership Cost</Typography>
        </Breadcrumbs>

        <Typography variant="h4" sx={{ fontWeight: 700, mb: 0.5 }}>Ownership Cost Calculator</Typography>
        <Typography color="text.secondary" sx={{ mb: 4 }}>{car.brand} {car.model} {car.variant} · {car.year}</Typography>

        <Card sx={{ p: 3, mb: 4 }}>
          <Typography variant="subtitle1" sx={{ fontWeight: 700, mb: 2 }}>How long do you plan to keep this car?</Typography>
          <ButtonGroup variant="outlined" sx={{ mb: 0 }}>
            {PERIODS.map((y) => (
              <Button
                key={y}
                onClick={() => setYears(y)}
                variant={years === y ? 'contained' : 'outlined'}
                sx={{ px: 3 }}
              >
                {y} Year{y > 1 ? 's' : ''}
              </Button>
            ))}
          </ButtonGroup>
        </Card>

        <Grid container spacing={2.5} sx={{ mb: 4 }}>
          <Grid item xs={12} sm={4}>
            <SummaryCard icon={Wallet} label="Purchase Price" value={formatINR(cost.purchasePrice)} />
          </Grid>
          <Grid item xs={12} sm={4}>
            <SummaryCard icon={Wrench} label={`Expected Maintenance (${years}y)`} value={formatINR(cost.expectedMaintenance)} />
          </Grid>
          <Grid item xs={12} sm={4}>
            <SummaryCard icon={CalendarClock} label="Expected Total" value={formatINR(cost.expectedTotal)} accent />
          </Grid>
        </Grid>

        <Card sx={{ p: 3, mb: 4 }}>
          <Typography variant="subtitle1" sx={{ fontWeight: 700, mb: 2 }}>Expenditure Timeline</Typography>
          <ResponsiveContainer width="100%" height={280}>
            <BarChart data={chartData} margin={{ left: 0, right: 10, top: 10 }}>
              <CartesianGrid strokeDasharray="3 3" stroke={tokens.line} vertical={false} />
              <XAxis dataKey="label" tick={{ fontSize: 12 }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 12 }} axisLine={false} tickLine={false} tickFormatter={(v) => `₹${v / 1000}k`} />
              <Tooltip
                formatter={(value, _, item) => [formatINR(value), item.payload.event]}
                labelFormatter={(label) => `Month ${label.replace('M', '')}`}
              />
              <Bar dataKey="cost" fill={tokens.steel} radius={[6, 6, 0, 0]} barSize={28} />
            </BarChart>
          </ResponsiveContainer>

          <Divider sx={{ my: 3 }} />

          <Stack spacing={1.5}>
            {cost.timeline.map((t, i) => (
              <Box key={i} sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                  <Box sx={{ width: 8, height: 8, borderRadius: '50%', bgcolor: tokens.amber, flexShrink: 0 }} />
                  <Typography variant="body2">
                    <b>Month {t.month}</b> · {t.event}
                  </Typography>
                </Box>
                <Typography variant="body2" sx={{ fontWeight: 700 }}>{formatINR(t.cost)}</Typography>
              </Box>
            ))}
          </Stack>
        </Card>

        <Button size="large" variant="contained" endIcon={<ArrowRight size={18} />} onClick={() => navigate('/dashboard')}>
          Go to My Dashboard
        </Button>
      </Container>
    </Box>
  );
}

function SummaryCard({ icon: Icon, label, value, accent }) {
  return (
    <Card sx={{ p: 2.5, bgcolor: accent ? tokens.ink : tokens.paperRaised, color: accent ? '#fff' : tokens.textPrimary, height: '100%' }}>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
        <Icon size={16} color={accent ? tokens.amber : tokens.textSecondary} />
        <Typography variant="body2" sx={{ color: accent ? '#B9BEC9' : tokens.textSecondary, fontWeight: 600 }}>{label}</Typography>
      </Box>
      <Typography variant="h5" sx={{ fontWeight: 700 }}>{value}</Typography>
    </Card>
  );
}
