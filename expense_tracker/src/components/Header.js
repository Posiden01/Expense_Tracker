import React,{useState} from 'react'
import Logo from '../asset/img/logo.png'
import arrow from '../asset/img/downarrow.png'
import { useNavigate, useLocation } from 'react-router-dom'

function Header() {
  const username = localStorage.getItem("name");
  const location = useLocation();
   const [inputs, setInputs] = useState({})
       const navigate = useNavigate();
          const handleChange = (event) => {
              const name = event.target.name;
              const value = event.target.value;
              setInputs(values => ({ ...values, [name]: value }))
          }
  const doLogout =()=>{
    localStorage.clear();
    navigate('/');
  }
  const openModal = () => {
      
    var modal = document.getElementById("myModal3");
    console.log("AA")
    modal.style.display = "block";
}
const closeModal = () => {

    var modal = document.getElementById("myModal3");
    console.log("BB")
    modal.style.display = "none";
}
  console.log("MSG ", location.pathname);
  return (
    <div className='header'>
       <div id="myModal3" className="modal1">
       <div className='formcard'>
                <div>
                    <h2 style={{ alignSelf: 'center' }}>Change Password</h2>
                </div>
                <form onSubmit={closeModal}>
                    <div>
                        <label>
                            Old Password
                        </label>
                        <input
                            required
                            type="password"
                            placeholder='Enter your old password'
                            value={inputs.psw || ''}
                            onChange={handleChange}
                            name='psw'

                        />
                    </div>
                    <div>
                        <label>
                            New Password
                        </label>
                        <input
                            required
                            type="password"
                            placeholder='Enter your new password'
                            value={inputs.npsw || ''}
                            onChange={handleChange}
                            name='npsw'

                        />
                    </div>
                    <div>
                        <label>
                            Confirm New Password
                        </label>
                        <input
                            required
                            type="password"
                            placeholder='Confirm your new password'
                            value={inputs.cnfpsw || ''}
                            onChange={handleChange}
                            name='cnfpsw'

                        />
                    </div>
                    <div>
                        <button>Submit</button>
                    </div>
                    <div>
                        <button onClick={closeModal}>Cancel</button>
                    </div>
                </form>
            </div>
                    </div>
      <div style={{ display: 'flex', width: '90%', alignItems: 'center' }}>
        <img src={Logo} />
        <h2>Expense Tracker</h2>
      </div>
      {
        location.pathname === '/dashboard' ?
          <div style={{ width: '10%', display: 'flex', alignItems: 'center' }}>
            <p>{username}</p>
            <div className="dropdown">
              <img style={{ width: '10px', height: '10px', marginLeft: '10px' }} src={arrow} />
              <div className="dropdown-content">
                <p onClick={openModal}>Change Password</p>
                <p onClick={doLogout}>Logout</p>
              </div>
            </div>
            {/* <p>User Name</p>
            <img style={{ width: '10px', height: '10px', marginLeft: '10px' }} src={arrow} /> */}
          </div>
          :
          null
      }

    </div>
  )
}

export default Header


