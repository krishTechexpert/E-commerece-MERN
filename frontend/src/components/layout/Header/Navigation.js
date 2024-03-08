import React from 'react'
import { Link} from "react-router-dom";


function Navigation({className}) {
  return <>
  
    <ul className={className}>

            <li>
              <Link to="/" className="inline-flex items-center text-sm font-semibold text-gray-800 hover:text-gray-900">
                Home
              </Link>
            </li>
            <li>
              <Link to="/products" className="inline-flex items-center text-sm font-semibold text-gray-800 hover:text-gray-900">
                Products
              </Link>
            </li>
            <li>
              <Link to="/about" className="inline-flex items-center text-sm font-semibold text-gray-800 hover:text-gray-900">
                About Us
              </Link>
            </li>
            <li>
              <Link to="/contact" className="inline-flex items-center text-sm font-semibold text-gray-800 hover:text-gray-900">
                Contact Us
              </Link>
            </li>

          </ul>
        
  </>
}

export default Navigation
