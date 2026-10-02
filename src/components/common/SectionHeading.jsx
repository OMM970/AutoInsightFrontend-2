import { Box, Typography } from '@mui/material';
import { tokens } from '../../theme';

export default function SectionHeading({ title, subtitle, align = 'left' }) {
  return (
    <Box sx={{ mb: 3, textAlign: align }}>
      <Typography variant="h4" sx={{ fontWeight: 700, mb: subtitle ? 0.75 : 0 }}>
        {title}
      </Typography>
      {subtitle && (
        <Typography variant="body1" sx={{ color: tokens.textSecondary, maxWidth: 640, mx: align === 'center' ? 'auto' : 0 }}>
          {subtitle}
        </Typography>
      )}
    </Box>
  );
}
