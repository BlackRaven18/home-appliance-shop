import { Backdrop, Box } from "@mui/material";
import LoadingSpinner from "./LoadingSpinner";

interface CustomBackdropProps {
    label: string;
}

const CustomBackdrop = ({ label }: CustomBackdropProps) => {
    return (
        <Box>
            <Backdrop
                sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                open={true}
            >
                <LoadingSpinner label={label} />
            </Backdrop>
        </Box>
    )
}

export default CustomBackdrop;