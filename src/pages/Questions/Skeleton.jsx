import React from 'react';
import { Skeleton, Stack } from '@mui/material';

const QuestionCardSkeleton = () => {
  return (
    <div className='skeleton layer'>
        <Stack spacing={1}>
            <div className="skeleton-graytitle">
                <Skeleton variant="rounded" width="100%" height={70}/>
            </div>
            <div className="skeleton-col">
                <div className="skeleton-row-sm">
                   <Skeleton variant="text" width="5%" height={30}/> <Skeleton variant="text" width="80%" height={30}/>
                </div>
                <div className="skeleton-row-sm">
                   <Skeleton variant="text" width="5%" height={30}/> <Skeleton variant="text" width="80%" height={30}/>
                </div>
                <div className="skeleton-row-sm">
                   <Skeleton variant="text" width="5%" height={30}/> <Skeleton variant="text" width="80%" height={30}/>
                </div>
                <div className="skeleton-row-sm">
                   <Skeleton variant="text" width="5%" height={30}/> <Skeleton variant="text" width="80%" height={30}/>
                </div>
            </div> 
            <div className="skeleton-row-sm">
                <Skeleton variant="rounded" width="50%" height={40}/>
                <Skeleton variant="rounded" width="50%" height={40}/>
            </div>
        </Stack>
    </div>
  )
}

export default QuestionCardSkeleton