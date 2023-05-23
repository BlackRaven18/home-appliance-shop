import * as React from 'react';
import AdminTopBar from '../../TopBar/AdminTopBar';
import AdminCategoryList from "./AdminCategoryList";
function AdminHome() {
  return (
    <div>
      <AdminTopBar/>
      <AdminCategoryList/>
    </div>
  );
}
export default AdminHome;