import { Box, Typography, LinearProgress } from '@mui/material';
import { tokens } from '../../theme';

function colorFor(pct) {
  if (pct >= 70) return tokens.good;
  if (pct >= 45) return tokens.warn;
  return tokens.attention;
}

export default function HealthBar({ label, value, height = 8 }) {
  const color = colorFor(value);
  return (
    <Box sx={{ mb: 1.5 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 0.5 }}>
        <Typography variant="body2" sx={{ fontWeight: 600 }}>{label}</Typography>
        <Typography variant="body2" sx={{ fontWeight: 700, color }}>{value}%</Typography>
      </Box>
      <LinearProgress
        variant="determinate"
        value={value}
        sx={{
          height,
          borderRadius: height,
          bgcolor: tokens.line,
          '& .MuiLinearProgress-bar': { bgcolor: color, borderRadius: height },
        }}
      />
    </Box>
  );
}
