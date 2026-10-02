import { Chip } from '@mui/material';
import { tokens } from '../../theme';

const conditionStyles = {
  Excellent: { bg: '#E7F3EC', color: tokens.good },
  Good: { bg: '#E7F3EC', color: tokens.good },
  'Needs Attention': { bg: '#FBEAE8', color: tokens.attention },
};

export function ConditionBadge({ condition, size = 'small' }) {
  const style = conditionStyles[condition] || conditionStyles.Good;
  return (
    <Chip
      label={condition}
      size={size}
      sx={{ bgcolor: style.bg, color: style.color, fontWeight: 700, border: 'none' }}
    />
  );
}

const riskStyles = {
  Low: { bg: '#E7F3EC', color: tokens.good },
  Medium: { bg: '#FCEFDC', color: tokens.warn },
  High: { bg: '#FBEAE8', color: tokens.attention },
};

export function RiskChip({ level, size = 'small' }) {
  const style = riskStyles[level] || riskStyles.Low;
  return (
    <Chip
      label={`${level} Risk`}
      size={size}
      sx={{ bgcolor: style.bg, color: style.color, fontWeight: 700, border: 'none' }}
    />
  );
}

const statusStyles = {
  Verified: { bg: '#E7F3EC', color: tokens.good },
  Available: { bg: '#E7F3EC', color: tokens.good },
  'No major record': { bg: '#E7F3EC', color: tokens.good },
  Attention: { bg: '#FBEAE8', color: tokens.attention },
  Expired: { bg: '#FBEAE8', color: tokens.attention },
  Unverified: { bg: '#FBEAE8', color: tokens.attention },
  'Gaps found': { bg: '#FCEFDC', color: tokens.warn },
  'Partially available': { bg: '#FCEFDC', color: tokens.warn },
  'Minor repair recorded': { bg: '#FCEFDC', color: tokens.warn },
};

export function StatusBadge({ label, size = 'small' }) {
  const style = statusStyles[label] || { bg: '#EEF0F3', color: tokens.textSecondary };
  return (
    <Chip
      label={label}
      size={size}
      sx={{ bgcolor: style.bg, color: style.color, fontWeight: 700, border: 'none' }}
    />
  );
}
