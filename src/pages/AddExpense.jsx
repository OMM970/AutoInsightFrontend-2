import { useState } from 'react';
import { useNavigate, Link as RouterLink } from 'react-router-dom';
import {
  Container, Box, Typography, Card, TextField, MenuItem, Button, Breadcrumbs, Link,
  Stack, Alert,
} from '@mui/material';
import { Upload, Save } from 'lucide-react';
import { useAppContext } from '../context/AppContext';
import { tokens } from '../theme';

const CATEGORIES = ['Service', 'Repair', 'Tyres', 'Battery', 'Brakes', 'Insurance', 'Other'];

export default function AddExpense() {
  const navigate = useNavigate();
  const { addExpense } = useAppContext();
  const [form, setForm] = useState({ category: 'Service', amount: '', date: '', description: '', receiptName: '' });
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState('');

  const update = (patch) => setForm((prev) => ({ ...prev, ...patch }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.amount || !form.date) {
      setError('Please fill in the amount and date.');
      return;
    }
    setError('');
    setSaving(true);
    await addExpense({
      category: form.category,
      amount: Number(form.amount),
      date: form.date,
      description: form.description || `${form.category} expense`,
    });
    setSaving(false);
    setSaved(true);
    setTimeout(() => navigate('/dashboard'), 900);
  };

  return (
    <Box sx={{ bgcolor: tokens.paper, minHeight: '80vh', py: { xs: 4, md: 6 } }}>
      <Container maxWidth="sm">
        <Breadcrumbs sx={{ mb: 2 }}>
          <Link component={RouterLink} to="/dashboard" underline="hover" color="text.secondary">Dashboard</Link>
          <Typography color="text.primary">Add Expense</Typography>
        </Breadcrumbs>

        <Typography variant="h4" sx={{ fontWeight: 700, mb: 0.5 }}>Add an Expense</Typography>
        <Typography color="text.secondary" sx={{ mb: 4 }}>Log a real maintenance or repair cost to track it against the AI estimate.</Typography>

        <Card sx={{ p: 3.5 }}>
          <Box component="form" onSubmit={handleSubmit}>
            <Stack spacing={2.5}>
              <TextField
                select label="Expense Category" value={form.category}
                onChange={(e) => update({ category: e.target.value })}
                fullWidth
              >
                {CATEGORIES.map((c) => <MenuItem key={c} value={c}>{c}</MenuItem>)}
              </TextField>

              <TextField
                label="Amount (₹)" type="number" value={form.amount}
                onChange={(e) => update({ amount: e.target.value })}
                fullWidth required
              />

              <TextField
                label="Date" type="date" value={form.date}
                onChange={(e) => update({ date: e.target.value })}
                InputLabelProps={{ shrink: true }}
                fullWidth required
              />

              <TextField
                label="Description" value={form.description}
                onChange={(e) => update({ description: e.target.value })}
                fullWidth multiline minRows={2}
                placeholder="e.g. Replaced front brake pads at authorized service center"
              />

              <Button
                component="label"
                variant="outlined"
                startIcon={<Upload size={16} />}
                sx={{ justifyContent: 'flex-start', color: tokens.textSecondary, borderColor: tokens.line }}
              >
                {form.receiptName || 'Upload Receipt (optional)'}
                <input
                  type="file"
                  hidden
                  onChange={(e) => update({ receiptName: e.target.files?.[0]?.name || '' })}
                />
              </Button>

              {error && <Alert severity="error">{error}</Alert>}
              {saved && <Alert severity="success">Expense saved. Updating your dashboard…</Alert>}

              <Button type="submit" size="large" variant="contained" startIcon={<Save size={18} />} disabled={saving}>
                {saving ? 'Saving…' : 'Save Expense'}
              </Button>
            </Stack>
          </Box>
        </Card>
      </Container>
    </Box>
  );
}
