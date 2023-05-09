import * as React from 'react';
import Admintopbar from './../topbar/Admintopbar';
import Admincategorylist from "./Admincategorylist";

function Adminhome() {
  return (
    <div>
      <Admintopbar/>
      <Admincategorylist/>
    </div>
  );
}


export default Adminhome;