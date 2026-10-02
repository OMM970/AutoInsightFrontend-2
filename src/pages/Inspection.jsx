  import { useEffect, useState } from 'react';
import { useParams, useNavigate, Link as RouterLink } from 'react-router-dom';
import {
  Container, Box, Typography, Grid, Card, Breadcrumbs, Link, CircularProgress,
  Button, Alert,
} from '@mui/material';
import { Cog, CircleGauge, Battery, Waves, Zap, ArrowRight, Info } from 'lucide-react';
import { getCarById } from '../services/vehicleService';
import { getInspectionReport } from '../services/inspectionService';
import { tokens } from '../theme';

export default function Inspection() {
  const { carId } = useParams();
  const navigate = useNavigate();
  const [car, setCar] = useState(null);
  const [report, setReport] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    Promise.all([getCarById(carId), getInspectionReport(carId)]).then(([c, r]) => {
      setCar(c);
      setReport(r);
      setLoading(false);
    });
  }, [carId]);

  if (loading) return <Box sx={{ display: 'flex', justifyContent: 'center', py: 12 }}><CircularProgress /></Box>;
  if (!car || !report) return <Container sx={{ py: 8, textAlign: 'center' }}><Typography variant="h6">Not found.</Typography></Container>;

  const scoreColor = report.overallScore >= 70 ? tokens.good : report.overallScore >= 45 ? tokens.warn : tokens.attention;

  return (
    <Box sx={{ bgcolor: tokens.paper, minHeight: '80vh', py: { xs: 4, md: 6 } }}>
      <Container maxWidth="lg">
        <Breadcrumbs sx={{ mb: 2 }}>
          <Link component={RouterLink} to={`/cars/${carId}`} underline="hover" color="text.secondary">{car.brand} {car.model}</Link>
          <Typography color="text.primary">Inspection</Typography>
        </Breadcrumbs>

        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap', gap: 2, mb: 4 }}>
          <Box>
            <Typography variant="h4" sx={{ fontWeight: 700, mb: 0.5 }}>Vehicle Inspection Report</Typography>
            <Typography color="text.secondary">{car.brand} {car.model} {car.variant} · {car.year}</Typography>
          </Box>
          <Card sx={{ px: 3, py: 2, textAlign: 'center', minWidth: 160 }}>
            <Typography variant="caption" color="text.secondary">Overall Inspection Score</Typography>
            <Typography variant="h3" sx={{ fontWeight: 700, color: scoreColor }}>{report.overallScore}</Typography>
          </Card>
        </Box>

        <Grid container spacing={2.5}>
          <InspectionSection icon={Cog} title="Engine" data={[
            ['Idle RPM', report.engine.rpmIdle],
            ['Coolant Temperature', report.engine.coolantTemp],
            ['Misfire Count', report.engine.misfireCount],
            ['Diagnostic Trouble Codes', report.engine.dtcCodes],
            ['Oil Leakage', report.engine.oilLeakage],
            ['Engine Noise', report.engine.engineNoise],
          ]} />
          <InspectionSection icon={CircleGauge} title="Brakes" data={[
            ['Front Brake Pad Life', report.brakes.frontPadLife],
            ['Rear Brake Pad Life', report.brakes.rearPadLife],
            ['Disc Condition', report.brakes.discCondition],
            ['Brake Fluid', report.brakes.brakeFluid],
          ]} />
          <InspectionSection icon={CircleGauge} title="Tyres" data={[
            ['Front Left', report.tyres.frontLeft],
            ['Front Right', report.tyres.frontRight],
            ['Rear Left', report.tyres.rearLeft],
            ['Rear Right', report.tyres.rearRight],
          ]} />
          <InspectionSection icon={Battery} title="Battery" data={[
            ['Battery Health', report.battery.health],
            ['Voltage', report.battery.voltage],
          ]} />
          <InspectionSection icon={Waves} title="Suspension" data={[
            ['Front Suspension', report.suspension.front],
            ['Rear Suspension', report.suspension.rear],
          ]} />
          <InspectionSection icon={Zap} title="Electrical" data={[
            ['Lights', report.electrical.lights],
            ['AC', report.electrical.ac],
            ['Infotainment', report.electrical.infotainment],
            ['Sensors', report.electrical.sensors],
          ]} />
        </Grid>

        <Alert icon={<Info size={18} />} severity="info" sx={{ mt: 4, bgcolor: '#EEF1F6', color: tokens.textPrimary }}>
          Inspection data is currently simulated. Real diagnostic/inspection data will be integrated later.
        </Alert>

        <Box sx={{ mt: 4 }}>
          <Button size="large" variant="contained" endIcon={<ArrowRight size={18} />} onClick={() => navigate(`/cars/${carId}/ai-analysis`)}>
            See AI Analysis
          </Button>
        </Box>
      </Container>
    </Box>
  );
}

function InspectionSection({ icon: Icon, title, data }) {
  return (
    <Grid item xs={12} sm={6} md={4}>
      <Card sx={{ p: 2.5, height: '100%' }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
          <Box sx={{ width: 32, height: 32, borderRadius: '8px', bgcolor: tokens.paper, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Icon size={16} color={tokens.steel} />
          </Box>
          <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>{title}</Typography>
        </Box>
        {data.map(([label, value]) => (
          <Box key={label} sx={{ display: 'flex', justifyContent: 'space-between', py: 0.75, borderBottom: `1px solid ${tokens.line}`, '&:last-of-type': { borderBottom: 'none' } }}>
            <Typography variant="body2" color="text.secondary">{label}</Typography>
            <Typography variant="body2" sx={{ fontWeight: 600, textAlign: 'right' }}>{value}</Typography>
          </Box>
        ))}
      </Card>
    </Grid>
  );
}
