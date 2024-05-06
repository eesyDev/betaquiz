import React from 'react';
import { Skeleton } from '@mui/material';
import { Stack } from '@mui/material';

const ClassSkeleton = () => {
  return (
    <div className='skeleton'>
        <Stack spacing={1}>
            <div className="skeleton-row">
                <Skeleton variant="text" width="18%" height={40}/>
                <Skeleton variant="text" width="18%" height={40} />
                <Skeleton variant="text" width="35%" height={40} />
                <Skeleton variant="text" width="18%" height={40} />
            </div> 
        </Stack>
    </div>
  )
}

export default ClassSkeleton