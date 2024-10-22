import Add from "./components/Add/Add"
import Counter from "./components/Counter/Counter"
import Timer from "./components/Timer/Timer"
import Temperatures from "./components/Temperatures/Temperatures"

import './Components.css'



function Components() {
    return ( 
        <div className='background'>

      <div className='title'>
      <button >REACT COMPONENTS</button>
      </div>

      <div className='container'>

      <div>
      <Counter />
          <Timer />
          </div>
      <div>
         <Add />
      </div>
      </div>
      
      <Temperatures />

      <div className='title'>
      <button >นางสาว สิรินทรา อัคคเมธี 66073734</button>
     </div>
     </div>
    
     )
}

export default Components