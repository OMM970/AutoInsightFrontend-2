import { useNavigate } from 'react-router-dom';
import { Box, Container, Typography, Button, Grid, Card, Stack } from '@mui/material';
import { ShieldCheck, Brain, Wallet, Search, Car, Activity, TrendingUp, ClipboardList } from 'lucide-react';
import { tokens } from '../theme';

const features = [
  {
    icon: ShieldCheck,
    title: 'Vehicle Intelligence',
    desc: "Understand the vehicle's history and current condition before you commit — service records, ownership, and verified checks in one view.",
  },
  {
    icon: Brain,
    title: 'AI Predictions',
    desc: 'Our model reviews inspection data to predict which components may need attention, and roughly when.',
  },
  {
    icon: Wallet,
    title: 'Ownership Cost',
    desc: 'See what the car may actually cost you to own — not just to buy — over the years you plan to keep it.',
  },
];

const steps = [
  { icon: Search, label: 'Find a dealer' },
  { icon: Car, label: 'Choose a car' },
  { icon: Activity, label: 'Analyze the vehicle' },
  { icon: TrendingUp, label: 'See future costs' },
  { icon: ClipboardList, label: 'Track actual expenses' },
];

export default function Home() {
  const navigate = useNavigate();

  return (
    <Box>
      {/* Hero */}
      <Box sx={{ bgcolor: tokens.ink, color: '#fff', position: 'relative', overflow: 'hidden' }}>
        <Box
          sx={{
            position: 'absolute', inset: 0, opacity: 0.5,
            backgroundImage: `url(https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?q=80&w=1800&auto=format&fit=crop)`,
            backgroundSize: 'cover', backgroundPosition: 'center 65%',
          }}
        />
        <Box sx={{ position: 'absolute', inset: 0, background: `linear-gradient(90deg, ${tokens.ink} 15%, rgba(18,21,27,0.75) 55%, rgba(18,21,27,0.35) 100%)` }} />
        <Container maxWidth="lg" sx={{ position: 'relative', py: { xs: 10, md: 16 } }}>
          <Box sx={{ maxWidth: 640 }}>
            <Stack direction="row" spacing={1} alignItems="center" sx={{ mb: 3, color: tokens.amber }}>
              <Brain size={18} />
              <Typography variant="body2" sx={{ fontWeight: 700 }}>AI-powered ownership intelligence</Typography>
            </Stack>
            <Typography variant="h1" sx={{ fontSize: { xs: 38, md: 56 }, lineHeight: 1.08, mb: 3 }}>
              Know the car before you buy it.
            </Typography>
            <Typography variant="h6" sx={{ fontWeight: 400, color: '#C7CBD3', mb: 5, maxWidth: 520 }}>
              AI-powered vehicle inspection and ownership-cost intelligence for used-car buyers.
            </Typography>
            <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
              <Button
                size="large" variant="contained"
                onClick={() => navigate('/dealers')}
                sx={{ bgcolor: tokens.amber, color: tokens.ink, px: 3.5, py: 1.4, '&:hover': { bgcolor: '#C17F1F' } }}
              >
                Find a Car
              </Button>
              <Button
                size="large" variant="outlined"
                onClick={() => document.getElementById('how-it-works')?.scrollIntoView({ behavior: 'smooth' })}
                sx={{ borderColor: '#4A5164', color: '#fff', px: 3.5, py: 1.4, '&:hover': { borderColor: '#fff' } }}
              >
                How It Works
              </Button>
            </Stack>
          </Box>
        </Container>
      </Box>

      {/* Features */}
      <Container maxWidth="lg" sx={{ py: { xs: 8, md: 12 } }}>
        <Box sx={{ maxWidth: 560, mb: 6 }}>
          <Typography variant="h3" sx={{ fontSize: { xs: 28, md: 34 }, mb: 1.5 }}>
            Built to answer the question every buyer actually has
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Not "is this a good deal" — but "what will this car actually cost me after I buy it."
          </Typography>
        </Box>
        <Grid container spacing={3}>
          {features.map((f) => (
            <Grid item xs={12} md={4} key={f.title}>
              <Card sx={{ p: 3.5, height: '100%' }}>
                <Box
                  sx={{
                    width: 44, height: 44, borderRadius: '10px', bgcolor: tokens.paper,
                    display: 'flex', alignItems: 'center', justifyContent: 'center', mb: 2.5,
                  }}
                >
                  <f.icon size={22} color={tokens.steel} />
                </Box>
                <Typography variant="h6" sx={{ fontWeight: 700, mb: 1 }}>{f.title}</Typography>
                <Typography variant="body2" color="text.secondary">{f.desc}</Typography>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>

      {/* How it works */}
      <Box id="how-it-works" sx={{ bgcolor: tokens.paperRaised, borderTop: `1px solid ${tokens.line}`, borderBottom: `1px solid ${tokens.line}` }}>
        <Container maxWidth="lg" sx={{ py: { xs: 8, md: 10 } }}>
          <Typography variant="h3" sx={{ fontSize: { xs: 28, md: 34 }, mb: 6, textAlign: 'center' }}>
            How it works
          </Typography>
          <Grid container spacing={3}>
            {steps.map((s, i) => (
              <Grid item xs={6} sm={4} md={2.4} key={s.label}>
                <Box sx={{ textAlign: 'center' }}>
                  <Box
                    sx={{
                      width: 56, height: 56, borderRadius: '50%', bgcolor: tokens.ink, color: '#fff',
                      display: 'flex', alignItems: 'center', justifyContent: 'center', mx: 'auto', mb: 1.5,
                    }}
                  >
                    <s.icon size={24} color={tokens.amber} />
                  </Box>
                  <Typography variant="body2" sx={{ fontWeight: 700 }}>{i + 1}. {s.label}</Typography>
                </Box>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* CTA */}
      <Container maxWidth="lg" sx={{ py: { xs: 8, md: 10 }, textAlign: 'center' }}>
        <Typography variant="h4" sx={{ mb: 2 }}>Ready to see what a car will really cost you?</Typography>
        <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
          Browse verified dealers near you and get an AI-backed ownership estimate in minutes.
        </Typography>
        <Button size="large" variant="contained" onClick={() => navigate('/dealers')}>
          Find a Car
        </Button>
      </Container>
    </Box>
  );
}
