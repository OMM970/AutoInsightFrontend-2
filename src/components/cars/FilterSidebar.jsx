import {
  Box, Typography, TextField, Slider, FormGroup, FormControlLabel, Checkbox,
  Divider, Button,
} from '@mui/material';
import { tokens } from '../../theme';

const BRANDS = ['Hyundai', 'Tata', 'Maruti', 'Honda', 'Toyota', 'Kia', 'Mahindra'];
const FUELS = ['Petrol', 'Diesel', 'CNG', 'EV'];
const TRANSMISSIONS = ['Manual', 'Automatic'];
const MILEAGE_OPTIONS = [
  { key: 'under50', label: 'Under 50,000 km' },
  { key: '50to80', label: '50,000–80,000 km' },
  { key: 'above80', label: '80,000+ km' },
];
const OWNER_OPTIONS = ['1', '2', '3+'];
const CONDITIONS = ['Excellent', 'Good', 'Needs Attention'];
const MAINTENANCE_OPTIONS = [
  { key: 'under25k', label: 'Under ₹25,000/year' },
  { key: '25to50k', label: '₹25,000–₹50,000/year' },
  { key: '50to100k', label: '₹50,000–₹1,00,000/year' },
  { key: 'above100k', label: 'Above ₹1,00,000/year' },
];

function Group({ title, children }) {
  return (
    <Box sx={{ mb: 2.5 }}>
      <Typography variant="subtitle2" sx={{ fontWeight: 700, mb: 1 }}>{title}</Typography>
      {children}
    </Box>
  );
}

function toggleValue(list, value) {
  return list.includes(value) ? list.filter((v) => v !== value) : [...list, value];
}

export default function FilterSidebar({ filters, setFilters, onReset }) {
  const update = (patch) => setFilters((prev) => ({ ...prev, ...patch }));

  return (
    <Box sx={{ bgcolor: tokens.paperRaised, border: `1px solid ${tokens.line}`, borderRadius: 2, p: 2.5, position: 'sticky', top: 88 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
        <Typography variant="h6" sx={{ fontWeight: 700 }}>Filters</Typography>
        <Button size="small" onClick={onReset} sx={{ color: tokens.textSecondary }}>Reset</Button>
      </Box>

      <Group title="Price (₹)">
        <Box sx={{ display: 'flex', gap: 1 }}>
          <TextField
            size="small" label="Min" type="number" fullWidth
            value={filters.priceMin ?? ''}
            onChange={(e) => update({ priceMin: e.target.value ? Number(e.target.value) : null })}
          />
          <TextField
            size="small" label="Max" type="number" fullWidth
            value={filters.priceMax ?? ''}
            onChange={(e) => update({ priceMax: e.target.value ? Number(e.target.value) : null })}
          />
        </Box>
      </Group>

      <Divider sx={{ mb: 2.5 }} />

      <Group title="Brand">
        <FormGroup>
          {BRANDS.map((b) => (
            <FormControlLabel
              key={b}
              control={
                <Checkbox
                  size="small"
                  checked={filters.brands.includes(b)}
                  onChange={() => update({ brands: toggleValue(filters.brands, b) })}
                />
              }
              label={<Typography variant="body2">{b}</Typography>}
            />
          ))}
        </FormGroup>
      </Group>

      <Divider sx={{ mb: 2.5 }} />

      <Group title="Year">
        <Slider
          value={[filters.yearMin, filters.yearMax]}
          min={2015}
          max={2024}
          step={1}
          marks={false}
          valueLabelDisplay="on"
          onChange={(_, val) => update({ yearMin: val[0], yearMax: val[1] })}
          sx={{ color: tokens.steel, mt: 1 }}
        />
      </Group>

      <Divider sx={{ mb: 2.5 }} />

      <Group title="Fuel">
        <FormGroup>
          {FUELS.map((f) => (
            <FormControlLabel
              key={f}
              control={
                <Checkbox
                  size="small"
                  checked={filters.fuels.includes(f)}
                  onChange={() => update({ fuels: toggleValue(filters.fuels, f) })}
                />
              }
              label={<Typography variant="body2">{f}</Typography>}
            />
          ))}
        </FormGroup>
      </Group>

      <Divider sx={{ mb: 2.5 }} />

      <Group title="Transmission">
        <FormGroup>
          {TRANSMISSIONS.map((t) => (
            <FormControlLabel
              key={t}
              control={
                <Checkbox
                  size="small"
                  checked={filters.transmissions.includes(t)}
                  onChange={() => update({ transmissions: toggleValue(filters.transmissions, t) })}
                />
              }
              label={<Typography variant="body2">{t}</Typography>}
            />
          ))}
        </FormGroup>
      </Group>

      <Divider sx={{ mb: 2.5 }} />

      <Group title="Mileage">
        <FormGroup>
          {MILEAGE_OPTIONS.map((m) => (
            <FormControlLabel
              key={m.key}
              control={
                <Checkbox
                  size="small"
                  checked={filters.mileageBuckets.includes(m.key)}
                  onChange={() => update({ mileageBuckets: toggleValue(filters.mileageBuckets, m.key) })}
                />
              }
              label={<Typography variant="body2">{m.label}</Typography>}
            />
          ))}
        </FormGroup>
      </Group>

      <Divider sx={{ mb: 2.5 }} />

      <Group title="Owners">
        <FormGroup>
          {OWNER_OPTIONS.map((o) => (
            <FormControlLabel
              key={o}
              control={
                <Checkbox
                  size="small"
                  checked={filters.owners.includes(o)}
                  onChange={() => update({ owners: toggleValue(filters.owners, o) })}
                />
              }
              label={<Typography variant="body2">{o === '3+' ? '3+ owners' : `${o}${o === '1' ? 'st' : 'nd'} owner`}</Typography>}
            />
          ))}
        </FormGroup>
      </Group>

      <Divider sx={{ mb: 2.5 }} />

      <Group title="Condition">
        <FormGroup>
          {CONDITIONS.map((c) => (
            <FormControlLabel
              key={c}
              control={
                <Checkbox
                  size="small"
                  checked={filters.conditions.includes(c)}
                  onChange={() => update({ conditions: toggleValue(filters.conditions, c) })}
                />
              }
              label={<Typography variant="body2">{c}</Typography>}
            />
          ))}
        </FormGroup>
      </Group>

      <Divider sx={{ mb: 2.5 }} />

      <Group title="Expected Maintenance">
        <FormGroup>
          {MAINTENANCE_OPTIONS.map((m) => (
            <FormControlLabel
              key={m.key}
              control={
                <Checkbox
                  size="small"
                  checked={filters.maintenanceBuckets.includes(m.key)}
                  onChange={() => update({ maintenanceBuckets: toggleValue(filters.maintenanceBuckets, m.key) })}
                />
              }
              label={<Typography variant="body2">{m.label}</Typography>}
            />
          ))}
        </FormGroup>
      </Group>
    </Box>
  );
}

export const defaultFilters = {
  priceMin: null,
  priceMax: null,
  brands: [],
  yearMin: 2015,
  yearMax: 2024,
  fuels: [],
  transmissions: [],
  mileageBuckets: [],
  owners: [],
  conditions: [],
  maintenanceBuckets: [],
};
