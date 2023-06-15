import { Box, CircularProgress, Stack, Typography } from "@mui/material"

interface LoadingSpinnerProps {
    label: string;
}

const LoadingSpinner = ({label}: LoadingSpinnerProps) => {
    return(
        <Box
                    display={'flex'}
                    justifyContent={'center'}
                    alignItems={'center'}
                    margin={10}
                >
                    <Stack
                        display={'flex'}
                        justifyContent={'center'}
                        alignItems={'center'}
                        spacing={2}
                    >
                        <CircularProgress
                            style={{ color: '#6699ff' }}
                            size={100}
                        />
                        <Typography>{label}</Typography>
                    </Stack>
                </Box>
    )
}

export default LoadingSpinner;