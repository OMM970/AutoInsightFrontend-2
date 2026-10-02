import { useNavigate } from 'react-router-dom';
import { Card, Box, Typography, Button, Stack } from '@mui/material';
import { Gauge, Fuel, Settings2, User } from 'lucide-react';
import { ConditionBadge } from '../common/Badges';
import { tokens } from '../../theme';
import { formatINR, formatKm } from '../../utils/format';

export default function CarCard({ car }) {

    console.log("CAR:", car);
    console.log("IMAGE:", car.images?.[0]);

    const navigate = useNavigate();
  return (

    <Card sx={{ overflow: 'hidden', height: '100%', display: 'flex', flexDirection: 'column' }}>
      <Box sx={{ position: 'relative' }}>
          <Box
              sx={{
                  height: 190,
                  backgroundImage: car.images?.[0]
                      ? `url("${car.images[0]}")`
                      : 'none',
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                  backgroundRepeat: 'no-repeat',
                  backgroundColor: '#eee',
              }}
          />
        <Box sx={{ position: 'absolute', top: 12, left: 12 }}>
          <ConditionBadge condition={car.condition} />
        </Box>
      </Box>

      <Box sx={{ p: 2.25, display: 'flex', flexDirection: 'column', flex: 1 }}>
        <Typography variant="subtitle1" sx={{ fontWeight: 700, lineHeight: 1.3 }}>
          {car.brand} {car.model}
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 1.25 }}>
          {car.variant} · {car.year}
        </Typography>

        <Stack direction="row" spacing={1.5} flexWrap="wrap" sx={{ rowGap: 0.75, mb: 1.5 }}>
          <MetaTag icon={Gauge} label={formatKm(car.mileageKm)} />
          <MetaTag icon={Fuel} label={car.fuel} />
          <MetaTag icon={Settings2} label={car.transmission} />
          <MetaTag icon={User} label={`${car.owners} owner${car.owners > 1 ? 's' : ''}`} />
        </Stack>

        <Box
          sx={{
            display: 'flex', justifyContent: 'space-between', alignItems: 'center',
            bgcolor: tokens.paper, borderRadius: 1.5, px: 1.5, py: 1, mb: 1.5,
          }}
        >
          <Typography variant="caption" color="text.secondary">Est. annual maintenance</Typography>
          <Typography variant="body2" sx={{ fontWeight: 700, color: tokens.steel }}>
            {formatINR(car.estimatedAnnualMaintenance)}/yr
          </Typography>
        </Box>

        <Box sx={{ flex: 1 }} />

        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Typography variant="h6" sx={{ fontWeight: 700 }}>{formatINR(car.price)}</Typography>
          <Button size="small" variant="outlined" onClick={() => navigate(`/cars/${car.inventoryId}`)}  >
            View Details
          </Button>
        </Box>
      </Box>
    </Card>
  );
}

function MetaTag({ icon: Icon, label }) {
  return (
    <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
      <Icon size={13} color={tokens.textSecondary} />
      <Typography variant="caption" color="text.secondary">{label}</Typography>
    </Box>
  );
}
