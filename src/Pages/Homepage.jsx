import React from 'react' 
import Navbar from '../Components/Navbar/Navbar' 
import Sidebar from '../Components/Siderbar/Sidebar' 
import Hero from '../Components/Hero/Hero'

const Homepage = () => {
  return (
    <>  
    <div className='overflow-x-hidden'>
        <Navbar/>  
       <Sidebar/>  
    </div> 
    
        <Hero/>
   

    </>
  )
}

export default Homepage