import { Card, Box, Typography } from '@mui/material';
import { RiskChip } from '../common/Badges';
import { tokens } from '../../theme';

function colorFor(pct) {
  if (pct >= 70) return tokens.good;
  if (pct >= 45) return tokens.warn;
  return tokens.attention;
}

export default function ConditionComponentCard({ icon: Icon, name, health, condition, risk }) {
  const color = colorFor(health);
  return (
    <Card sx={{ p: 2.25, height: '100%' }}>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1.5 }}>
        {Icon && (
          <Box sx={{ width: 34, height: 34, borderRadius: '8px', bgcolor: tokens.paper, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Icon size={17} color={tokens.steel} />
          </Box>
        )}
        <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>{name}</Typography>
      </Box>
      <Typography variant="h4" sx={{ fontWeight: 700, color, mb: 0.25 }}>{health}%</Typography>
      <Typography variant="body2" color="text.secondary" sx={{ mb: 1.5 }}>{condition}</Typography>
      <RiskChip level={risk} />
    </Card>
  );
}
