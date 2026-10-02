import { useState } from 'react';
import { Link as RouterLink, useLocation } from 'react-router-dom';
import {
  AppBar, Toolbar, Box, Button, IconButton, Drawer, List, ListItemButton,
  ListItemText, Container, Avatar, useMediaQuery,
} from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { Menu as MenuIcon, X as CloseIcon, Gauge } from 'lucide-react';
import { tokens } from '../../theme';

const navItems = [
  { label: 'Home', to: '/' },
  { label: 'Find Dealers', to: '/dealers' },
  { label: 'Dashboard', to: '/dashboard' },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const location = useLocation();

  return (
    <AppBar
      position="sticky"
      elevation={0}
      sx={{ bgcolor: tokens.paperRaised, borderBottom: `1px solid ${tokens.line}`, color: tokens.textPrimary }}
    >
      <Container maxWidth="lg">
        <Toolbar disableGutters sx={{ minHeight: 68 }}>
          <Box
            component={RouterLink}
            to="/"
            sx={{ display: 'flex', alignItems: 'center', gap: 1, textDecoration: 'none', color: 'inherit', mr: 4 }}
          >
            <Box
              sx={{
                width: 34, height: 34, borderRadius: '8px', bgcolor: tokens.ink,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}
            >
              <Gauge size={19} color={tokens.amber} strokeWidth={2.2} />
            </Box>
            <Box sx={{ fontFamily: '"Space Grotesk", sans-serif', fontWeight: 700, fontSize: 20, letterSpacing: '-0.02em' }}>
              AutoInsight
            </Box>
          </Box>

          {!isMobile && (
            <Box sx={{ display: 'flex', gap: 0.5, flex: 1 }}>
              {navItems.map((item) => (
                <Button
                  key={item.to}
                  component={RouterLink}
                  to={item.to}
                  sx={{
                    color: location.pathname === item.to ? tokens.ink : tokens.textSecondary,
                    fontWeight: 600,
                    px: 1.5,
                    borderBottom: location.pathname === item.to ? `2px solid ${tokens.amber}` : '2px solid transparent',
                    borderRadius: 0,
                  }}
                >
                  {item.label}
                </Button>
              ))}
            </Box>
          )}

          <Box sx={{ flex: isMobile ? 1 : 0 }} />

          {!isMobile ? (
            <Avatar sx={{ width: 36, height: 36, bgcolor: tokens.steel, fontSize: 14, fontWeight: 700 }}>RS</Avatar>
          ) : (
            <IconButton onClick={() => setOpen(true)} edge="end" aria-label="Open menu">
              <MenuIcon />
            </IconButton>
          )}
        </Toolbar>
      </Container>

      <Drawer anchor="right" open={open} onClose={() => setOpen(false)}>
        <Box sx={{ width: 260, pt: 2 }} role="presentation">
          <Box sx={{ display: 'flex', justifyContent: 'flex-end', px: 2, pb: 1 }}>
            <IconButton onClick={() => setOpen(false)} aria-label="Close menu">
              <CloseIcon />
            </IconButton>
          </Box>
          <List>
            {navItems.map((item) => (
              <ListItemButton
                key={item.to}
                component={RouterLink}
                to={item.to}
                onClick={() => setOpen(false)}
                selected={location.pathname === item.to}
              >
                <ListItemText primary={item.label} primaryTypographyProps={{ fontWeight: 600 }} />
              </ListItemButton>
            ))}
          </List>
        </Box>
      </Drawer>
    </AppBar>
  );
}
