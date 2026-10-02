import { useState } from 'react';
import { Box } from '@mui/material';
import { tokens } from '../../theme';

export default function ImageGallery({ images }) {
  const [active, setActive] = useState(0);
  return (
    <Box>
      <Box
        sx={{
          height: { xs: 260, md: 420 },
          borderRadius: 2.5,
          overflow: 'hidden',
          backgroundImage: `url(${images[active]})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          mb: 1.5,
        }}
      />
      {images.length > 1 && (
        <Box sx={{ display: 'flex', gap: 1.25 }}>
          {images.map((img, i) => (
            <Box
              key={img}
              onClick={() => setActive(i)}
              sx={{
                width: 84, height: 60, borderRadius: 1.5, cursor: 'pointer',
                backgroundImage: `url(${img})`, backgroundSize: 'cover', backgroundPosition: 'center',
                border: i === active ? `2px solid ${tokens.amber}` : `2px solid transparent`,
                opacity: i === active ? 1 : 0.7,
              }}
            />
          ))}
        </Box>
      )}
    </Box>
  );
}
