import React, { useState,useEffect } from 'react'
import img1 from '../asset/img/cart.jpg'
import del from '../asset/img/delete.svg'
import edit from '../asset/img/edit.png'
import { Link, useNavigate } from 'react-router-dom'
import api from '../api/api.json'
function Dashboard() {
    const navigate = useNavigate();
    const [inputs, setInputs] = useState({})
    const [inputs1, setInputs1] = useState({})
    const [showdata, setShowData] = useState(false)
    const myExpenses = [100, 200, 300, 600, 700, 800];

    useEffect(() => {
        (async () => {
            try{
        const res = await fetch(api.baseurl + "record/get?email="+localStorage.getItem("email"),
           {
               headers: {
                   "token": localStorage.getItem("token"),
               },
           }
        )
        const data = await res.json()
        console.log("Data ",data); 
    }
    catch (error) {
        console.log("Error ", error);
    }
    })();
   },[showdata])


    const handleChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setInputs(values => ({ ...values, [name]: value }))
    }
    const handleChange1 = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setInputs(values => ({ ...values, [name]: value }))
    }
     

    const openModal1 = (val) => {
      
        var modal1 = document.getElementById("myModal");
        console.log("AA",val)
        modal1.style.display = "block";
    }
    const closeModal1 = () => {
    
        var modal1 = document.getElementById("myModal");
        console.log("BB")
        modal1.style.display = "none";
    }
    const openModal2 = () => {
     
        var modal2 = document.getElementById("myModal2");
        console.log("CC")
        modal2.style.display = "block";
    }
    const closeModal2 = (event) => {
 
   
        var modal2 = document.getElementById("myModal2");
        console.log("DD")
        modal2.style.display = "none";
    }

    const deleteExpense = () => {
        closeModal1()
    }
    const editExpense = () => {
        closeModal2()
    }
    const addExpense = (event) => {
        event.preventDefault();
        console.log("Clicked", inputs);
        setShowData(true)
    }
    return (
        <div className='container'>
            {showdata ?
                <div className='leftcontainer'>
                    <p>Total Expenses : 1000</p>

                    <div id="myModal" className="modal">
                        <div className="modal-content">
                            <p>Do you want to delete this expense?</p>
                            <button onClick={deleteExpense}>Yes</button>
                            <button onClick={closeModal1}>No</button>
                        </div>
                    </div>
                    <div id="myModal2" className="modal2">
                        
                            <div className='formcard'>
                                <div>
                                    <h2 style={{ alignSelf: 'center' }}>Edit Expense</h2>
                                </div>
                                <form onSubmit={editExpense}>
                                    <div>
                                        <label>
                                            Title
                                        </label>
                                        <input
                                            required
                                            type="text"
                                            placeholder='Enter your expense title'
                                            value={inputs1.title || ''}
                                            onChange={handleChange}
                                            name='title1'

                                        />
                                    </div>
                                    <div>
                                        <label>
                                            Amount
                                        </label>
                                        <input
                                            required
                                            type="number"
                                            placeholder='Enter your expense amount'
                                            value={inputs1.expense1 || ''}
                                            onChange={handleChange}
                                            name='expense1'

                                        />
                                    </div>
                                    <div>
                                        <label>
                                            Type
                                        </label>
                                        <select
                                            value={inputs1.type1 || ''}
                                            onChange={handleChange}
                                            name='type1'
                                            required

                                        >
                                            <option disabled value=''>Please Select Payment Type</option>
                                            <option value="cash">Cash</option>
                                            <option value="upi">UPI</option>
                                            <option value="card">Card</option>
                                        </select>

                                    </div>
                                    <div>
                                        <label>
                                            Date
                                        </label>
                                        <input
                                            required
                                            type="date"
                                            placeholder='Enter Date'
                                            value={inputs1.date1 || ''}
                                            onChange={handleChange}
                                            name='date1'

                                        />
                                    </div>


                                    <div>
                                        <button>Edit Expense</button>
                                    </div>
                                    <div>
                                        <button onClick={closeModal2}>Cancel</button>
                                    </div>

                                </form>
                            </div>
                    
                    </div>
                    <div style={{ backgroundColor: 'lightgray', width: '100%', overflowY: 'scroll', marginBottom: '50px', justifyContent: 'center', justifyItems: 'center', padding: '20px' }}>
                        {myExpenses.map((key,val) =>
                            <div className='expenseCard' key={key}>
                                <div style={{ width: '100%', display: 'flex', flexDirection: 'row', justifyContent: 'flex-end', justifyItems: 'center', alignContent: 'center', alignItems: 'center' }}>
                                    <img onClick={openModal2} style={{ width: '30px', height: '30px' }} src={edit} />
                                    <img onClick={()=>{openModal1(val)}} style={{ width: '20px', height: '20px', marginLeft: '4px' }} src={del} />
                                </div>
                                <p>Title</p>
                                <p>Amount {val}</p>
                                <p>Date</p>
                                <p>Type</p>
                            </div>
                        )}
                    </div>
                </div>
                :
                <div className='leftcontainer'>
                    <p>Please add your expenses</p>
                    <img src={img1} />
                </div>
            }

            <div className='rightcontainer'>
                <div className='formcard'>
                    <div>
                        <h2 style={{ alignSelf: 'center' }}>Add Expense</h2>
                    </div>
                    <form onSubmit={addExpense}>
                        <div>
                            <label>
                                Title
                            </label>
                            <input
                                required
                                type="text"
                                placeholder='Enter your expense title'
                                value={inputs.title || ''}
                                onChange={handleChange}
                                name='title'

                            />
                        </div>
                        <div>
                            <label>
                                Amount
                            </label>
                            <input
                                required
                                type="number"
                                placeholder='Enter your expense amount'
                                value={inputs.expense || ''}
                                onChange={handleChange}
                                name='expense'

                            />
                        </div>
                        <div>
                            <label>
                                Type
                            </label>
                            <select
                                value={inputs.type || ''}
                                onChange={handleChange}
                                name='type'
                                required

                            >
                                <option disabled value=''>Please Select Payment Type</option>
                                <option value="cash">Cash</option>
                                <option value="upi">UPI</option>
                                <option value="card">Card</option>
                            </select>

                        </div>
                        <div>
                            <label>
                                Date
                            </label>
                            <input
                                required
                                type="date"
                                placeholder='Enter Date'
                                value={inputs.date || ''}
                                onChange={handleChange}
                                name='date'

                            />
                        </div>


                        <div>
                            <button>Add</button>
                        </div>

                    </form>
                </div>

            </div>

        </div>
    )
}

export default Dashboard
