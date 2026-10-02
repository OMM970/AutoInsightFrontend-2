import { useEffect, useState } from 'react';
import { useParams, useNavigate, Link as RouterLink } from 'react-router-dom';
import {
  Container, Box, Typography, Grid, Card, Breadcrumbs, Link, CircularProgress,
  Button, Alert, LinearProgress, Stack,
} from '@mui/material';
import { Brain, ArrowRight, AlertTriangle, Sparkles, CheckCircle2 } from 'lucide-react';
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell, CartesianGrid,
} from 'recharts';
import { getCarById } from '../services/vehicleService';
import { getAIPrediction } from '../services/predictionService';
import { RiskChip } from '../components/common/Badges';
import { tokens } from '../theme';

const riskScore = { Low: 25, Medium: 60, High: 90 };
const riskColor = { Low: tokens.good, Medium: tokens.warn, High: tokens.attention };

export default function AIAnalysis() {
  const { carId } = useParams();
  const navigate = useNavigate();
  const [car, setCar] = useState(null);
  const [prediction, setPrediction] = useState(null);
  const [analyzing, setAnalyzing] = useState(true);

  useEffect(() => {
    setAnalyzing(true);
    setPrediction(null);
    getCarById(carId).then(setCar);
    getAIPrediction(carId).then((p) => {
      setPrediction(p);
      setAnalyzing(false);
    });
  }, [carId]);

  if (!car) return <Box sx={{ display: 'flex', justifyContent: 'center', py: 12 }}><CircularProgress /></Box>;

  const scoreColor = prediction && (prediction.overallCondition >= 70 ? tokens.good : prediction.overallCondition >= 45 ? tokens.warn : tokens.attention);
  const chartData = prediction?.risks.map((r) => ({ name: r.component, value: riskScore[r.level] || 30, level: r.level }));

  return (
    <Box sx={{ bgcolor: tokens.paper, minHeight: '80vh', py: { xs: 4, md: 6 } }}>
      <Container maxWidth="lg">
        <Breadcrumbs sx={{ mb: 2 }}>
          <Link component={RouterLink} to={`/cars/${carId}`} underline="hover" color="text.secondary">{car.brand} {car.model}</Link>
          <Typography color="text.primary">AI Analysis</Typography>
        </Breadcrumbs>

        {analyzing ? (
          <Card sx={{ p: { xs: 4, md: 8 }, textAlign: 'center' }}>
            <Box
              sx={{
                width: 64, height: 64, borderRadius: '50%', bgcolor: tokens.ink, display: 'flex',
                alignItems: 'center', justifyContent: 'center', mx: 'auto', mb: 3,
                animation: 'pulse 1.4s ease-in-out infinite',
                '@keyframes pulse': { '0%, 100%': { transform: 'scale(1)' }, '50%': { transform: 'scale(1.08)' } },
              }}
            >
              <Brain size={28} color={tokens.amber} />
            </Box>
            <Typography variant="h6" sx={{ fontWeight: 700, mb: 1 }}>Analyzing vehicle data…</Typography>
            <Typography color="text.secondary" sx={{ mb: 3 }}>
              Reviewing inspection results and service history for {car.brand} {car.model}.
            </Typography>
            <LinearProgress sx={{ maxWidth: 320, mx: 'auto', height: 6, borderRadius: 4, bgcolor: tokens.line, '& .MuiLinearProgress-bar': { bgcolor: tokens.amber } }} />
          </Card>
        ) : (
          <>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap', gap: 2, mb: 4 }}>
              <Box>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 0.5 }}>
                  <Sparkles size={20} color={tokens.amber} />
                  <Typography variant="h4" sx={{ fontWeight: 700 }}>AI Vehicle Assessment</Typography>
                </Box>
                <Typography color="text.secondary">{car.brand} {car.model} {car.variant} · {car.year}</Typography>
              </Box>
              <Card sx={{ px: 3, py: 2, textAlign: 'center', minWidth: 170 }}>
                <Typography variant="caption" color="text.secondary">Overall Condition</Typography>
                <Typography variant="h3" sx={{ fontWeight: 700, color: scoreColor }}>
                  {prediction.overallCondition}<Typography component="span" variant="h6" color="text.secondary"> /100</Typography>
                </Typography>
              </Card>
            </Box>

            <Grid container spacing={3}>
              <Grid item xs={12} md={5}>
                <Card sx={{ p: 2.5, height: '100%' }}>
                  <Typography variant="subtitle1" sx={{ fontWeight: 700, mb: 2 }}>Risk Categories</Typography>
                  <Stack spacing={1.5}>
                    {prediction.risks.map((r) => (
                      <Box key={r.component} sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <Typography variant="body2" sx={{ fontWeight: 600 }}>{r.component}</Typography>
                        <RiskChip level={r.level} />
                      </Box>
                    ))}
                  </Stack>
                </Card>
              </Grid>
              <Grid item xs={12} md={7}>
                <Card sx={{ p: 2.5, height: '100%' }}>
                  <Typography variant="subtitle1" sx={{ fontWeight: 700, mb: 2 }}>Component Risk Chart</Typography>
                  <ResponsiveContainer width="100%" height={240}>
                    <BarChart data={chartData} layout="vertical" margin={{ left: 10, right: 20 }}>
                      <CartesianGrid strokeDasharray="3 3" stroke={tokens.line} horizontal={false} />
                      <XAxis type="number" domain={[0, 100]} hide />
                      <YAxis type="category" dataKey="name" width={90} tick={{ fontSize: 13 }} axisLine={false} tickLine={false} />
                      <Tooltip formatter={(_, __, item) => [item.payload.level + ' Risk', item.payload.name]} />
                      <Bar dataKey="value" radius={[0, 6, 6, 0]} barSize={20}>
                        {chartData.map((d, i) => <Cell key={i} fill={riskColor[d.level]} />)}
                      </Bar>
                    </BarChart>
                  </ResponsiveContainer>
                </Card>
              </Grid>
            </Grid>

            <Card sx={{ p: 3, mt: 3 }}>
              <Typography variant="subtitle1" sx={{ fontWeight: 700, mb: 2 }}>AI Insights</Typography>
              <Stack spacing={1.5}>
                {prediction.insights.map((insight, i) => (
                  <Box key={i} sx={{ display: 'flex', gap: 1.25, alignItems: 'flex-start' }}>
                    {insight.toLowerCase().includes('no major') ? (
                      <CheckCircle2 size={17} color={tokens.good} style={{ marginTop: 2, flexShrink: 0 }} />
                    ) : (
                      <AlertTriangle size={17} color={tokens.warn} style={{ marginTop: 2, flexShrink: 0 }} />
                    )}
                    <Typography variant="body2">{insight}</Typography>
                  </Box>
                ))}
              </Stack>
            </Card>

            <Alert severity="warning" sx={{ mt: 3, bgcolor: tokens.amberSoft, color: tokens.textPrimary }}>
              These are AI-generated predictions and estimates based on available inspection data — not guarantees of future vehicle condition or cost.
            </Alert>

            <Box sx={{ mt: 4 }}>
              <Button size="large" variant="contained" endIcon={<ArrowRight size={18} />} onClick={() => navigate(`/cars/${carId}/ownership-cost`)}>
                Estimate Ownership Cost
              </Button>
            </Box>
          </>
        )}
      </Container>
    </Box>
  );
}
