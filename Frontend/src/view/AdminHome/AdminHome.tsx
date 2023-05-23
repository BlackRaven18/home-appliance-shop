import * as React from 'react';
import AdminTopBar from '../../TopBar/AdminTopBar';
import AdminCategoryList from "./AdminCategoryList";
import {Box} from "@mui/system";
function AdminHome() {
  return (
      <Box sx={{ display: 'flex', flexDirection: 'column', height: '100vh' }}>
            <AdminTopBar/>
            <Box sx={{ flex: 1, display: 'flex', overflow: 'auto' }}>
                <AdminCategoryList/>
            </Box>
      </Box>
  );
}
export default AdminHome;