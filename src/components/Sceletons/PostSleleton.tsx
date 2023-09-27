import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Avatar from '@mui/material/Avatar';
import Grid from '@mui/material/Grid';
import Skeleton from '@mui/material/Skeleton';

function Post() {
  return (
    <div style={{ padding: '10px'}}>
      <Box sx={{ display: 'flex', alignItems: 'center', padding: '10px'}}>
        <Box sx={{ margin: 0 }}>
            <Skeleton variant="circular">
              <Avatar style={{width: '55px', height: '55px'}} />
            </Skeleton>
        </Box>
        <Box sx={{ width: '100%', padding: '20px' }}>
          <Skeleton width="25%">
            <Typography>...</Typography>
          </Skeleton>
        </Box>
      </Box>
    
      <Box sx={{ width: '100%', padding: '20px', marginTop: '-20px' }}>
        <Skeleton width="50%">
          <Typography>...</Typography>
        </Skeleton>
      </Box>

      <Box sx={{ width: '100%', padding: '20px', marginTop: '-20px' }}>
        <Skeleton width="50%">
          <Typography>...</Typography>
        </Skeleton>
      </Box>
    
      <Skeleton variant="rectangular" width="100%" style={{borderRadius: '20px'}}>
        <div style={{ paddingTop: '57%' }} />
      </Skeleton>
    </div>
  );
}

export default function SkeletonPost() {
  return (
    <Grid container spacing={8}>
      <Grid item xs>
        <Post />
      </Grid>
    </Grid>
  );
}
