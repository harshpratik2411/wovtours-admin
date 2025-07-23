import React from 'react' 
import Navbar from '../Components/Navbar/Navbar' 
import Sidebar from '../Components/Siderbar/Sidebar'

const Homepage = () => {
  return (
    <>  
    <div className='overflow-x-hidden'>
       <Navbar/>  
       <Sidebar/> 
    </div>

    </>
  )
}

export default Homepage