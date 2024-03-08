import React from 'react'
import { Outlet} from "react-router-dom";

 {/* An <Outlet> renders whatever child route is currently active,
          so you can think about this <Outlet> as a placeholder for
          the child routes we defined above. */}

function PageDisplay() {
  return (
        <Outlet />
  )
}

export default PageDisplay