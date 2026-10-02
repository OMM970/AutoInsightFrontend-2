import { useNavigate } from 'react-router-dom';
import { Card, Box, Typography, Button, Chip } from '@mui/material';
import { Star, MapPin, ShieldCheck, Car } from 'lucide-react';
import { tokens } from '../../theme';
import { formatINR } from '../../utils/format';

export default function DealerCard({ dealer }) {
  const navigate = useNavigate();
  return (
    <Card sx={{ overflow: 'hidden', display: 'flex', flexDirection: { xs: 'column', sm: 'row' } }}>
      <Box
        sx={{
          width: { xs: '100%', sm: 220 },
          height: { xs: 160, sm: 'auto' },
          flexShrink: 0,
          backgroundImage: `url(${dealer.image})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      />
      <Box sx={{ p: 2.5, flex: 1, display: 'flex', flexDirection: 'column' }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 1, flexWrap: 'wrap' }}>
          <Box>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <Typography variant="h6" sx={{ fontWeight: 700 }}>{dealer.name}</Typography>
              {dealer.verified && (
                <Chip
                  icon={<ShieldCheck size={13} />}
                  label="Verified"
                  size="small"
                  sx={{ bgcolor: '#E7F3EC', color: tokens.good, fontWeight: 700 }}
                />
              )}
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5, color: tokens.textSecondary, mt: 0.5 }}>
              <MapPin size={14} />
              <Typography variant="body2">{dealer.area}, {dealer.city}</Typography>
            </Box>
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5, bgcolor: tokens.amberSoft, px: 1, py: 0.5, borderRadius: 1 }}>
            <Star size={14} fill={tokens.amber} color={tokens.amber} />
            <Typography variant="body2" sx={{ fontWeight: 700 }}>{dealer.rating}</Typography>
            <Typography variant="caption" sx={{ color: tokens.textSecondary }}>({dealer.reviewCount})</Typography>
          </Box>
        </Box>

        <Box sx={{ display: 'flex', gap: 3, mt: 2, flexWrap: 'wrap' }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.75 }}>
            <Car size={16} color={tokens.textSecondary} />
            <Typography variant="body2" color="text.secondary">{dealer.carsAvailable} cars available</Typography>
          </Box>
          <Typography variant="body2" color="text.secondary">
            Starting from <b style={{ color: tokens.textPrimary }}>{formatINR(dealer.startingPrice)}</b>
          </Typography>
        </Box>

        <Box sx={{ flex: 1 }} />
        <Box sx={{ mt: 2 }}>
          <Button variant="contained" onClick={() => navigate(`/dealers/${dealer.id}`)}>
            View Cars
          </Button>
        </Box>
      </Box>
    </Card>
  );
}
