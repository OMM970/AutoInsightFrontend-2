import { Link as RouterLink } from 'react-router-dom';
import { Container, Box, Typography, Button } from '@mui/material';

export default function NotFound() {
  return (
    <Container maxWidth="sm" sx={{ py: 14, textAlign: 'center' }}>
      <Typography variant="h2" sx={{ fontWeight: 700, mb: 2 }}>404</Typography>
      <Typography variant="h6" sx={{ mb: 1 }}>Page not found</Typography>
      <Typography color="text.secondary" sx={{ mb: 4 }}>
        The page you're looking for doesn't exist or may have moved.
      </Typography>
      <Box>
        <Button component={RouterLink} to="/" variant="contained">Back to Home</Button>
      </Box>
    </Container>
  );
}
