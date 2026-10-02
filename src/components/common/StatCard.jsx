import { Box, Card, Typography } from '@mui/material';
import { tokens } from '../../theme';

export default function StatCard({ label, value, sub, accent = false, icon: Icon }) {
  return (
    <Card
      sx={{
        p: 2.5,
        height: '100%',
        bgcolor: accent ? tokens.ink : tokens.paperRaised,
        color: accent ? '#fff' : tokens.textPrimary,
        border: accent ? 'none' : `1px solid ${tokens.line}`,
      }}
    >
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
        {Icon && <Icon size={16} color={accent ? tokens.amber : tokens.textSecondary} />}
        <Typography
          variant="body2"
          sx={{ color: accent ? '#B9BEC9' : tokens.textSecondary, fontWeight: 600 }}
        >
          {label}
        </Typography>
      </Box>
      <Typography variant="h5" sx={{ fontWeight: 700, mb: sub ? 0.5 : 0 }}>
        {value}
      </Typography>
      {sub && (
        <Typography variant="caption" sx={{ color: accent ? '#9BA1AE' : tokens.textFaint }}>
          {sub}
        </Typography>
      )}
    </Card>
  );
}
