import * as React from 'react';
import { Html, useProgress } from '@react-three/drei';
import CircularProgress from '@mui/material/CircularProgress';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

export default function CircularProgressWithLabel(props) {
  const { progress } = useProgress();

  return (
    <Html transform center>
      <Box sx={{ position: 'relative', display: 'inline-flex' }}>
        <CircularProgress variant='determinate' value={progress} />
        <Box
          sx={{
            top: 0,
            left: 0,
            bottom: 0,
            right: 0,
            position: 'absolute',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <Typography variant='caption' component='div' color='text.secondary'>
            {`${Math.round(progress)}%`}
          </Typography>
        </Box>
      </Box>
    </Html>
  );
}
