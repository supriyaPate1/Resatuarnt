import React, { Component } from 'react'
import './sign.css'
import  Data from './test.json'
export default class Signlogin extends Component {
  //..........defining state variables............

  state={
    name:"",
    email:"",
    password:"",
    mpass:"",
    arrData:[],
    statusUP:'',
    statusIN:'',
    textEmail:"",
    textPass:"",
    textSearch:"",
    display:"none",
    infoREST:"",
  }
  //...........displaying sign up form when clicked on sign up...........

  showformSignup=()=>{

    document.getElementById("para").style.display="none";
    document.getElementById('moreIN').style.display="none";
    document.getElementById("frmSignUp").style.display="block";
    document.getElementById('frmSignin').style.display="none";
    // document.getElementById('wel').style.display="none";
    
  }

//...........displaying sign up form when clicked on sign up...........

  showformSignin=()=>{
    document.getElementById("para").style.display="none";
    document.getElementById('moreIN').style.display="none";
    document.getElementById("frmSignin").style.display="block";
    document.getElementById('frmSignUp').style.display="none";
    
  }
//...........hiding sign up and login form when clicked on x button...........

  closeform=()=>{
    document.getElementById('frmSignUp').style.display="none";
    document.getElementById('frmSignin').style.display="none";
    document.getElementById("para").style.display="block";
    document.getElementById('moreIN').style.display="block";
    document.getElementById('infoR1').style.display="none";
    
  }
//...........emptying fields in sign up  form when clicked on cancel button...........

  cancelform_signup=()=>{
    document.getElementById('firstN').value="";
    document.getElementById('email').value="";
    document.getElementById('pass').value="";
    document.getElementById('Rpass').value="";  
      this.setState({
        name:"",
        email:"",
        password:"",
        mpass:"",
      })
  }
//...........emptying fields in sign in form when clicked on cancel button...........

  cancelform_signin=()=>{
    document.getElementById('email1').value="";
    document.getElementById('pass1').value=""; 
      this.setState({
        email:"",
        password:"",     
      })
  }
//.............collecting form data of sign up............

  formDataSUP=()=>{
    // alert("hghhj")
    var arrTemp=[];
    var name1=document.getElementById('firstN').value;   
  
    var email1=document.getElementById('email').value;

    var pass1=document.getElementById('pass').value;
    var mpass1=document.getElementById('Rpass').value;
    if(pass1===mpass1&&name1!==""&&email1!==""&&mpass1!==""){
      arrTemp=[name1,email1,pass1,mpass1] 
    this.setState({
      name:name1,
      email:email1,
      password:pass1, 
      statusUP:"Your account has been created.",
      arrData:[...this.state.arrData,arrTemp]
      
    })
   
  } 
  else if(pass1!==mpass1){
    var pass1=document.getElementById('pass').value="";
    var mpass1=document.getElementById('Rpass').value="";
    this.setState({
      password:"",
      mpass:"",
      statusUP:"Password didn't match.",
    })
  }
  document.getElementById('firstN').value="";
  document.getElementById('email').value="";
  document.getElementById('pass').value="";  
  document.getElementById('Rpass').value="";
  }

  //function for signin form
  formDataSIN=()=>{
    var tempN="";
    var emailIN=document.getElementById('email1').value;
    var passIN=document.getElementById('pass1').value;
     var flag = false;
    this.state.arrData.forEach((val)=>{
      if(val[1] === emailIN && val[2] === passIN){
        flag = true;
        tempN=val[0];
      }
     
    })
    if(flag){
      this.setState({        
        statusIN:"Log in successful",
      })
      document.getElementById('signup').disabled = true;
      document.getElementById('login').innerHTML=""
      document.getElementById('signup').innerHTML="Welcome"+" "+tempN;      
      document.getElementById('login').disabled = true;
    }
    else {
      var emailIN=document.getElementById('email1').value="";
      var passIN=document.getElementById('pass1').value="";
      this.setState({
        password:"",
        email:"",
        statusIN:"Email or password didn't match.",
      })
     }
  }
  //function to search data 
  searchData=()=>{
   
    var TS=document.getElementById("inp").value.toUpperCase();
    this.setState({
      textSearch:TS,
      display:"block"
    })
    if(TS==="")
    {
      this.setState({
        display:"none"
      })
    }  
  }
  
  //function to select restaurant from list appeared
  searchLi=(event)=>{
    var click=event.target.innerHTML;   
    document.getElementById("inp").value=click;
    document.getElementById('searchItems').style.display="none"
  }

  // function to display info of restaurant selected
  OnclickSBtn=()=>{
    
   document.getElementById('offer').style.display="none"
   var liItem= document.getElementById("inp").value.toUpperCase();
   
   var info;
   if(liItem!==""){
    Data.map((val,i)=>{
   
      if((val.name.toUpperCase().startsWith(liItem))){    
         info=<div className='infoR' id='infoR1' key={i}>
                    <span class="close" onClick={this.closeform}>&times;</span>
                     <p><h4>Name:</h4>{val.name}</p>
                     <p><h4>Neighborhood:</h4>{val.neighborhood}</p>                                 
                     <img id='photograph' src = {val.photograph}/>
                     <p><h4>Address:</h4>{val.address}</p>
                     <p><h4>cuisine Type:</h4>{val.cuisine_type}</p>
                     <p><h4>Operating Hours:</h4></p>
                     <p>Monday: {val.operating_hours.Monday}</p>
                     <p>Tuesday: {val.operating_hours.Tuesday}</p>
                     <p>Wednesday: {val.operating_hours.Wednesday}</p>
                     <p>Thursday: {val.operating_hours.Thursday}</p>
                     <p>Friday: {val.operating_hours.Friday}</p>
                     <p>Saturday:{val.operating_hours.Saturday}</p>
                     <p>Sunday:{val.operating_hours.Sunday}</p>
                     <p><h4>Reviews:</h4></p>
                      { val.reviews.map((item)=>{
                        return <>
                        
                          <p>Name: {item.name}</p>
                          <p>Date: {item.date}</p>
                          <p>Rating: {item.rating}</p>
                          <div id='comment'><p>Comments: {item.comments}</p></div>
      
                          </>
                        }
                      )}
                </div>
          }   
              })
              this.setState({
                infoREST:info,
              })
   }   
            document.getElementById("inp").value="";
  }

  render() {  
  
    return (
      <>
        <div className='main'>
          <div className='NavContent'>
            <div className='navB'>
              <div><img src='logo.png'/></div>
              <div id='nam'>Dessert Delight</div>       
            </div> 
            <div className='width40'></div>
             <div className='contentRightNav'> 
                <div className='sign'>
                  <h5><button id='home' >Home</button></h5>
                </div>
                <div className='sign'>
                  <h5><button id='signup' onClick={this.showformSignup}>Signup</button></h5>
                </div>
                <div className='sign'>
                  <h5><button id='login' onClick={ this.showformSignin}>Login</button></h5>
                </div>
             </div>  
            </div>                 
      </div>
      <div id='sBar'>
              <div ><input id='inp' placeholder='type to search'onChange={this.searchData}></input>
              <button id='button' onClick={this.OnclickSBtn}>Search</button> 
              <div>{this.state.infoREST}</div> 
              <p id="searchItems" style={{display:this.state.display}}>{              
                Data.map(
                  (val,i)=>{
                    if((val.name.toUpperCase().startsWith(this.state.textSearch))||val.cuisine_type.toUpperCase().startsWith(this.state.textSearch)||(val.neighborhood.toUpperCase().startsWith(this.state.textSearch))){
                     return <div id='disR' key={i}>
                      <li className='nameR' id='nameR' onClick={this.searchLi}>{val.name}</li>
                      </div>
                    }
                  }                 
                 )
                }
              </p>
              </div> 
      </div>
      <div>
            <marquee id='offer' width="100%" direction="left" height="50px ">
              <h2 style={{color:"yellow",textAlign:"center ",width:"100%"}}>50% off on all our deals. Book now to avail your favourite food in the best prices ever.</h2>
            </marquee>
      </div>
      <div id='moreIN' className='moreIN'>
        <h2 id="newH">New Here?</h2>
        <button id='more' className='more'onClick={this.showformSignup}>Sign Up</button>
      </div>
      <div  id='para' className='para'>
      <p id='firstLine'>Craving for some sweets?</p>
      <p id='secLine'>Welcome to our restaurant to choose from a variety of desserts.</p>
      <p id='thirdLine'>..........Yummmm..........</p>
      </div>

      <div id='frmSignUp' className='modal'>
        <span  className="close" title="Close Modal" onClick={this.closeform}>&times;</span>
        <p id='formSinnupStatus'>{this.state.statusUP}</p>
        <h2 className='text'>Sign Up</h2>
            <p className='text'>Please fill in the details to create an account.</p>
            <hr/>
            <form className='form' action='#'>
            <table className='tab'>
                <tr>Enter your name </tr>
                <tr>
                    <td colSpan={2}><input type='text'  className='onefield' required id='firstN' placeholder='name' minLength="2"  maxLength="20" pattern="[A-Za-z]{1,32}"></input></td>
                   
                </tr>
                <tr>
                    <td>Email</td>
                </tr>
                <tr>
                    <td colSpan={2}><input type="text" pattern="[^@\s]+@[^@\s]+\.[^@\s]+" className='onefield' id='email' required></input></td>
                </tr>
                <tr>Create Password</tr>
                <tr>
                    <td colSpan={2}><input  className='onefield' type='text' id='pass'  minLength="2"  maxlength="10" required ></input></td>
                </tr>
                <tr>Repeat Password</tr>
                <tr>
                    <td colSpan={2}><input className='onefield' type='text' id='Rpass'  minLength="2"  maxlength="10" required></input></td>
                </tr>
                <tr>
                    <td><button type='reset' id='cancel'onClick={this.cancelform_signup} >Cancel</button>&emsp;<button type='submit' id='button' onClick={this.formDataSUP}>Sign Up</button></td>
                </tr>               
            </table>
        </form>
    </div>

    <div id='frmSignin' className='modal1'>
        <span  className="close" title="Close Modal" onClick={this.closeform}>&times;</span>
        <p id="formSinnupStatus">{this.state.statusIN}</p>
        <h2 className='text'>Sign in</h2>
            <p className='text'>Please fill in the details to login</p>
            <hr/>
        <form className='form' action='#'>
            <table className='tab'>
                <tr>
                    <td>Email</td>
                </tr>
                <tr>
                    <td colSpan={2}><input type="text" pattern="[^@\s]+@[^@\s]+\.[^@\s]+" className='onefield' id='email1' required></input></td>
                </tr>
                <tr>Enter Password</tr>
                <tr>
                    <td colSpan={2}><input  className='onefield' type='text' id='pass1'  minLength="2"  maxLength="10" required ></input></td>
                </tr>
                <tr>
                    <td><button type='reset' id='cancel' onClick={this.cancelform_signin}>Cancel</button>&emsp;<button type='submit' id='button' onClick={this.formDataSIN}>Sign in</button></td>
                </tr>               
            </table>
        </form>
     
    </div>
  
      </>
    )
  }
}
