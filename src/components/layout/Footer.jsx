import { Box, Container, Typography, Grid, Link } from '@mui/material';
import { tokens } from '../../theme';

export default function Footer() {
  return (
    <Box component="footer" sx={{ bgcolor: tokens.ink, color: '#B9BEC9', mt: 8 }}>
      <Container maxWidth="lg" sx={{ py: 6 }}>
        <Grid container spacing={4}>
          <Grid item xs={12} md={4}>
            <Typography sx={{ fontFamily: '"Space Grotesk", sans-serif', fontWeight: 700, fontSize: 20, color: '#fff', mb: 1 }}>
              AutoInsight
            </Typography>
            <Typography variant="body2" sx={{ color: '#9BA1AE', maxWidth: 320 }}>
              AI-powered vehicle inspection and ownership-cost intelligence for used-car buyers.
            </Typography>
          </Grid>
          <Grid item xs={6} md={2.5}>
            <Typography variant="subtitle2" sx={{ color: '#fff', mb: 1.5, fontWeight: 600 }}>Product</Typography>
            <FooterLink to="/dealers">Find Dealers</FooterLink>
            <FooterLink to="/dashboard">Dashboard</FooterLink>
          </Grid>
          <Grid item xs={6} md={2.5}>
            <Typography variant="subtitle2" sx={{ color: '#fff', mb: 1.5, fontWeight: 600 }}>Company</Typography>
            <FooterLink to="/">About</FooterLink>
            <FooterLink to="/">Careers</FooterLink>
          </Grid>
          <Grid item xs={6} md={3}>
            <Typography variant="subtitle2" sx={{ color: '#fff', mb: 1.5, fontWeight: 600 }}>Legal</Typography>
            <FooterLink to="/">Terms</FooterLink>
            <FooterLink to="/">Privacy</FooterLink>
          </Grid>
        </Grid>
        <Typography variant="caption" sx={{ display: 'block', mt: 5, color: '#6D7382' }}>
          © 2026 AutoInsight. All predictions and estimates are simulated for demonstration purposes.
        </Typography>
      </Container>
    </Box>
  );
}

function FooterLink({ to, children }) {
  return (
    <Link href={to} underline="hover" sx={{ display: 'block', color: '#9BA1AE', fontSize: 14, mb: 1 }}>
      {children}
    </Link>
  );
}
