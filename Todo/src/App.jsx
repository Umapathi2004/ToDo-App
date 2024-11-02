import React, { Fragment, useEffect, useState } from 'react'
import axios from "axios"

const App = () => {  
  const [Users,SetUsers]=useState([]); 
  const [Filtered,SetFilter]=useState([]); 
  const [Hide,SetHide] = useState(false);
  const [AddUser,SetAddUser] = useState({});

  useEffect(()=>{
    SetAddUser({"name":"","age":"","city":""});
    getAllUsers(); 
  },[])  
  const HandelSearch =(e)=> {
  const SearchText = e.target.value.toLowerCase();
  const Filter = Users.filter((user)=>user.name.toLowerCase().includes(SearchText) ||user.city.toLowerCase().includes(SearchText));
  SetFilter(Filter);
  } 
  const HandelHide = () =>{
    const Handel = Hide?false:true;
    SetHide(Handel)
  }
  const HandelClose =()=>{
    SetAddUser({"name":"","age":"","city":""})
    HandelHide();
  }
  const HandeNewUsers = (e) =>{
    SetAddUser({...AddUser,[e.target.name]:e.target.value})
  }
  const HandelUpdate =(User)=>{
    SetAddUser(User);
    HandelHide();
  } 
  const HandelDelete =async(id)=> {  
     await axios.delete("http://localhost:4000/",{data:{id:id}}).then((res)=>{ 
        SetUsers(res.data) 
        SetFilter(res.data);
     }) 
  }   
  const getAllUsers = async() =>{
    try{
     await axios.get("http://localhost:4000/").then((res)=>{
        SetUsers(res.data) 
        SetFilter(res.data);
     })
    }
    catch(error){
      console.log(error.message)
    }
  }
   const createNewUser = async() =>{
    if(AddUser.id){
        await axios.put("http://localhost:4000/",AddUser).then((res)=>{
            SetUsers(res.data) 
            SetFilter(res.data);
    })
    }
    else{ 
    await axios.post("http://localhost:4000/",AddUser).then((res)=>{
        SetUsers(res.data) 
        SetFilter(res.data);
    })}
     HandelHide(); 
     SetAddUser({"name":"","age":"","city":""})
 }  
   
  return (
     <Fragment>
        <div className="container" >
            <div className="input" >
                <input type="search"  placeholder='Search....' onChange={(e)=>HandelSearch(e)}/>
                <button onClick={()=>HandelHide()}>Add New</button>
            </div>
            <table>
               <tr>
                <th>S.no</th>
                <th>Name</th>
                <th>Age</th>
                <th>City</th>
                <th>Opertaions</th>
               </tr>
               {Filtered && Filtered.map((user,index)=>(
               <tr key={user.id}>
                  <td>{index+1}</td>
                  <td>{user.name}</td>
                  <td>{user.age}</td>
                  <td>{user.city}</td>
                  <td>
                      <button onClick={()=>HandelUpdate(user)}>Edite</button>
                      <button onClick={()=>HandelDelete(user.id)}>Delete</button>
                  </td>    
               </tr>
               ))}
            </table> 
        <div className={`Form ${Hide && "hide"}`}>
            <div className="from_container"> 
                <div className="type">********</div>
            <form action="">    
            <div className="namecon">
                <label htmlFor="name">Name :</label>
                <input type="text" id="name" name="name" value={AddUser.name} placeholder='Name...' onChange={(e)=>HandeNewUsers(e)} required autoComplete='off'/>
            </div>
            <div className="agecon">     
                <label htmlFor="age">Age :</label>
                <input type="number" id="age" name="age" value={AddUser.age} placeholder='Age...' onChange={(e)=>HandeNewUsers(e)} required autoComplete='off'/>
            </div>
            <div className="citycon">     
                <label htmlFor="city">City :</label>
                <input type="text" id="city" name="city" value={AddUser.city} placeholder='City...' onChange={(e)=>HandeNewUsers(e)} required autoComplete='off'/>
            </div>
            <div className="button_container">
                <span type="submit" onClick={()=>createNewUser()}>Submit</span>
                <span onClick={()=>HandelClose()}>Close</span>
            </div> 
            </form>
            </div>
        </div>
        </div>  
     </Fragment> 
  )
}

export default App