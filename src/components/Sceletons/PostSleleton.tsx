import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Avatar from '@mui/material/Avatar';
import Grid from '@mui/material/Grid';
import Skeleton from '@mui/material/Skeleton';
import { useAppearance } from '@vkontakte/vkui';

export function SkeletonAvatar() {

  const apperance = useAppearance()

  return (
    <Skeleton variant="circular" style={{ background: `${apperance === 'dark' ? '#232324' : '#f5f5f5'}`}}>
      <Avatar style={{width: '55px', height: '55px'}} />
    </Skeleton>
  )
}

export function SkeletonComment() {

  const apperance = useAppearance()

  return (
    <>
    <Box sx={{ display: 'flex', alignItems: 'center', padding: '10px'}}>
      <Box sx={{ margin: 0 }}>
          <SkeletonAvatar/>
      </Box>
      <Box sx={{ width: '100%', padding: '20px' }}>
        <Skeleton width="25%" style={{ background: `${apperance === 'dark' ? '#232324' : '#f5f5f5'}`}}>
          <Typography>...</Typography>
        </Skeleton>
      </Box>
    </Box>

    <Box sx={{ width: '100%', padding: '20px', marginTop: '-20px' }}>
      <Skeleton width="50%" style={{ background: `${apperance === 'dark' ? '#232324' : '#f5f5f5'}`}}>
        <Typography>...</Typography>
      </Skeleton>
    </Box>
  </>
  )
}

function Post() {

  const apperance = useAppearance()

  return (
    <div style={{ padding: '10px'}}>
      <Box sx={{ display: 'flex', alignItems: 'center', padding: '10px'}}>
        <Box sx={{ margin: 0 }}>
            <SkeletonAvatar/>
        </Box>
        <Box sx={{ width: '100%', padding: '20px' }}>
          <Skeleton width="25%" style={{ background: `${apperance === 'dark' ? '#232324' : '#f5f5f5'}`}}>
            <Typography>...</Typography>
          </Skeleton>
        </Box>
      </Box>
    
      <Box sx={{ width: '100%', padding: '20px', marginTop: '-20px' }}>
        <Skeleton width="50%" style={{ background: `${apperance === 'dark' ? '#232324' : '#f5f5f5'}`}}>
          <Typography>...</Typography>
        </Skeleton>
      </Box>

      <Box sx={{ width: '100%', padding: '20px', marginTop: '-20px' }}>
        <Skeleton width="50%" style={{ background: `${apperance === 'dark' ? '#232324' : '#f5f5f5'}`}}>
          <Typography>...</Typography>
        </Skeleton>
      </Box>
    
      <Skeleton variant="rectangular" width="100%" height='500px' style={{borderRadius: '20px', background: `${apperance === 'dark' ? '#232324' : '#f5f5f5'}`}}>
        <div style={{ paddingTop: '57%' }} />
      </Skeleton>

      <Box sx={{ width: '100%', padding: '10px', marginTop: '15px' }}>
        <Skeleton width="100px" style={{ background: `${apperance === 'dark' ? '#232324' : '#f5f5f5'}`}}>
          <Typography>...</Typography>
        </Skeleton>
      </Box>

    </div>
  );
}

export function SkeletonPost() {
  return (
    <Grid container spacing={8}>
      <Grid item xs>
        <Post />
      </Grid>
    </Grid>
  );
}

