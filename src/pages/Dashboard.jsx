import { useMemo } from 'react';
import { useNavigate, Link as RouterLink } from 'react-router-dom';
import {
  Container, Box, Typography, Grid, Card, Button, Stack, CircularProgress, Chip,
} from '@mui/material';
import { Plus, Wallet, Wrench, TrendingUp, TrendingDown, Sparkles } from 'lucide-react';
import {
  LineChart, Line, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer, CartesianGrid,
} from 'recharts';
import { useAppContext } from '../context/AppContext';
import { getPrediction } from '../data/predictions';
import { formatINR, formatDate } from '../utils/format';
import { tokens } from '../theme';

export default function Dashboard() {
  const navigate = useNavigate();
  const { expenses, ownedCar, loading } = useAppContext();

  const prediction = ownedCar ? getPrediction(ownedCar.carId) : null;

  const chartData = useMemo(() => {
    if (!ownedCar || !prediction) return [];
    const purchase = new Date(ownedCar.purchaseDate);
    const monthsTotal = ownedCar.ownershipYears * 12;

    // predicted cumulative by month
    const predictedByMonth = {};
    let cumPred = 0;
    for (let m = 0; m <= monthsTotal; m += 3) {
      cumPred = prediction.timeline.filter((t) => t.month <= m).reduce((s, t) => s + t.cost, 0);
      predictedByMonth[m] = cumPred;
    }

    // actual cumulative by month (based on expense dates)
    const monthsSincePurchase = (dateStr) => {
      const d = new Date(dateStr);
      return Math.max(0, Math.round((d - purchase) / (1000 * 60 * 60 * 24 * 30)));
    };
    const sortedExpenses = [...expenses].sort((a, b) => new Date(a.date) - new Date(b.date));

    return Object.keys(predictedByMonth).map((mStr) => {
      const m = Number(mStr);
      const actual = sortedExpenses
        .filter((e) => monthsSincePurchase(e.date) <= m)
        .reduce((s, e) => s + Number(e.amount), 0);
      return { month: `M${m}`, Predicted: predictedByMonth[m], Actual: actual };
    });
  }, [ownedCar, prediction, expenses]);

  if (loading || !ownedCar) {
    return <Box sx={{ display: 'flex', justifyContent: 'center', py: 12 }}><CircularProgress /></Box>;
  }

  const totalActual = expenses.reduce((s, e) => s + Number(e.amount), 0);
  const predictedTotal = prediction.maintenanceByYear[ownedCar.ownershipYears] ?? prediction.maintenanceByYear[3];
  const remaining = Math.max(0, predictedTotal - totalActual);
  const belowEstimate = totalActual < predictedTotal * (0.4); // rough heuristic for messaging

  const nextEvent = prediction.timeline[0];

  return (
    <Box sx={{ bgcolor: tokens.paper, minHeight: '80vh', py: { xs: 4, md: 6 } }}>
      <Container maxWidth="lg">
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap', gap: 2, mb: 4 }}>
          <Box>
            <Typography variant="h4" sx={{ fontWeight: 700, mb: 0.5 }}>{ownedCar.nickname}</Typography>
            <Typography color="text.secondary">Purchased {formatDate(ownedCar.purchaseDate)} · {ownedCar.ownershipYears}-year ownership plan</Typography>
          </Box>
          <Button variant="contained" startIcon={<Plus size={18} />} onClick={() => navigate('/dashboard/add-expense')}>
            Add Expense
          </Button>
        </Box>

        <Grid container spacing={2.5} sx={{ mb: 4 }}>
          <Grid item xs={12} sm={6} md={3}>
            <SummaryCard icon={Wallet} label="Purchase Price" value={formatINR(ownedCar.purchasePrice)} />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <SummaryCard icon={TrendingUp} label={`Predicted ${ownedCar.ownershipYears}-Year Maintenance`} value={formatINR(predictedTotal)} />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <SummaryCard icon={Wrench} label="Actual Expenditure" value={formatINR(totalActual)} accent />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <SummaryCard icon={TrendingDown} label="Remaining Estimated Expenditure" value={formatINR(remaining)} />
          </Grid>
        </Grid>

        <Grid container spacing={3}>
          <Grid item xs={12} lg={7}>
            <Card sx={{ p: 3, mb: 3 }}>
              <Typography variant="subtitle1" sx={{ fontWeight: 700, mb: 2 }}>Predicted vs Actual</Typography>
              <ResponsiveContainer width="100%" height={280}>
                <LineChart data={chartData} margin={{ left: 0, right: 10, top: 10 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke={tokens.line} vertical={false} />
                  <XAxis dataKey="month" tick={{ fontSize: 12 }} axisLine={false} tickLine={false} />
                  <YAxis tick={{ fontSize: 12 }} axisLine={false} tickLine={false} tickFormatter={(v) => `₹${v / 1000}k`} />
                  <Tooltip formatter={(value) => formatINR(value)} />
                  <Legend />
                  <Line type="monotone" dataKey="Predicted" stroke={tokens.textFaint} strokeDasharray="5 4" strokeWidth={2} dot={false} />
                  <Line type="monotone" dataKey="Actual" stroke={tokens.amber} strokeWidth={2.5} dot={{ r: 3 }} />
                </LineChart>
              </ResponsiveContainer>
            </Card>

            <Card sx={{ p: 3 }}>
              <Typography variant="subtitle1" sx={{ fontWeight: 700, mb: 2 }}>Expense History</Typography>
              {expenses.length === 0 ? (
                <Typography color="text.secondary">No expenses logged yet. Add your first expense to start tracking.</Typography>
              ) : (
                <Stack spacing={0}>
                  {[...expenses].reverse().map((e) => (
                    <Box
                      key={e.id}
                      sx={{
                        display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                        py: 1.5, borderBottom: `1px solid ${tokens.line}`, '&:last-of-type': { borderBottom: 'none' },
                      }}
                    >
                      <Box>
                        <Typography variant="body2" sx={{ fontWeight: 700 }}>{e.category}</Typography>
                        <Typography variant="caption" color="text.secondary">{e.description}</Typography>
                      </Box>
                      <Box sx={{ textAlign: 'right' }}>
                        <Typography variant="body2" sx={{ fontWeight: 700 }}>{formatINR(e.amount)}</Typography>
                        <Typography variant="caption" color="text.secondary">{formatDate(e.date)}</Typography>
                      </Box>
                    </Box>
                  ))}
                </Stack>
              )}
            </Card>
          </Grid>

          <Grid item xs={12} lg={5}>
            <Card sx={{ p: 3, bgcolor: tokens.ink, color: '#fff' }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2.5 }}>
                <Sparkles size={18} color={tokens.amber} />
                <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>AI Forecast</Typography>
              </Box>

              <Typography variant="caption" sx={{ color: '#9BA1AE' }}>Next expected maintenance</Typography>
              <Typography variant="h6" sx={{ fontWeight: 700, mb: 2 }}>{nextEvent?.event ?? 'None scheduled'}</Typography>

              <Grid container spacing={2} sx={{ mb: 2.5 }}>
                <Grid item xs={6}>
                  <Typography variant="caption" sx={{ color: '#9BA1AE', display: 'block' }}>Estimated cost</Typography>
                  <Typography variant="body1" sx={{ fontWeight: 700 }}>
                    {formatINR(Math.round(nextEvent.cost * 0.85))}–{formatINR(Math.round(nextEvent.cost * 1.15))}
                  </Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography variant="caption" sx={{ color: '#9BA1AE', display: 'block' }}>Expected timeframe</Typography>
                  <Typography variant="body1" sx={{ fontWeight: 700 }}>Approximately {Math.max(1, Math.round(nextEvent.month / 3))} months</Typography>
                </Grid>
              </Grid>

              <Box sx={{ bgcolor: 'rgba(255,255,255,0.08)', borderRadius: 2, p: 2 }}>
                <Chip
                  label={belowEstimate ? 'On track' : 'Above estimate'}
                  size="small"
                  sx={{ bgcolor: belowEstimate ? '#1F4D33' : '#5C2A24', color: belowEstimate ? '#7FD8A0' : '#F0A79E', fontWeight: 700, mb: 1 }}
                />
                <Typography variant="body2" sx={{ color: '#D6D9E0' }}>
                  {belowEstimate
                    ? 'Your actual spending is currently below the original AI estimate.'
                    : 'Your actual spending is currently tracking close to or above the original AI estimate.'}
                </Typography>
              </Box>

              <Typography variant="caption" sx={{ color: '#6D7382', display: 'block', mt: 2 }}>
                Estimates are AI-generated and not guaranteed.
              </Typography>
            </Card>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}

function SummaryCard({ icon: Icon, label, value, accent }) {
  return (
    <Card sx={{ p: 2.5, height: '100%', bgcolor: accent ? tokens.ink : tokens.paperRaised, color: accent ? '#fff' : tokens.textPrimary }}>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
        <Icon size={16} color={accent ? tokens.amber : tokens.textSecondary} />
        <Typography variant="body2" sx={{ color: accent ? '#B9BEC9' : tokens.textSecondary, fontWeight: 600 }}>{label}</Typography>
      </Box>
      <Typography variant="h5" sx={{ fontWeight: 700 }}>{value}</Typography>
    </Card>
  );
}
