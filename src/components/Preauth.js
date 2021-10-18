import React,{useState} from 'react'
import Button from '@material-ui/core/Button';





function Preauth() {
    
    


    const [user,setUser] = useState({
         referenceno:"",patientname:"", policyno:"",admissiontype:"",gender:"",address:"",
         drname:"" ,pemail:"", dob:"", city:"",
         pincode:"", dateadmission:"", insurancecom:"",
         mob:"", state:"", treatment:"",adharno:"",status:"Pending"
      });


let name, value;

const handelInputs = (e) => {
  console.log(e);
  name = e.target.name;
  value = e.target.value;

  setUser({ ...user, [name]:value});
}


const PostData = async (e) => {
e.preventDefault();
const { referenceno,patientname, policyno, admissiontype, gender,address,
drname, pemail, dob, city,
pincode, dateadmission, insurancecom,
mob, state, treatment, adharno,status } = user;

console.log('referenceno',referenceno)

const res = await fetch("/preauth",{
  method: "POST",
  headers: {
    "Content-Type": "application/json"
  },
  body:JSON.stringify({
    referenceno,patientname, policyno, admissiontype, gender,address,drname, pemail, dob, city, pincode, dateadmission, insurancecom, mob, state, treatment, adharno,status
  })

  

});
const data = await res.json();

if (!data) {
  console.log("preauth not send");
} else {
alert ("Preauth Send Succesfully");

}

}

    return (
        <>
        <form  method="POST" variant="outlined">
        <div>
            <br></br><h1><center> Preauthauthorization Request Form</center></h1><br></br>
            

        <div className='preauth row'><br></br><br></br>
            <div className="col-lg-4">
                <br></br>
                <label className="LabelClass">Reference Number</label>
                <input type="text" placeholder="Enter reference number" name="referenceno" value={user.referenceno}
                onChange={handelInputs} class="form-control form-control-sm" required></input>
                <br></br>

                <label className="LabelClass">Admission Type</label>
                <input type="text" placeholder="Enter Admission Type" name="admissiontype" value={user.admissiontype}
                onChange={handelInputs} class="form-control form-control-sm" required></input>
                <br></br><br></br><br></br>
                <label className="LabelClass">Gender</label>
                <input type="text" placeholder="Enter Gender" name="gender" value={user.gender}
                onChange={handelInputs} class="form-control form-control-sm" required></input>
                <br></br>
                <label className="LabelClass">Address</label>
                <textarea className="form-control form-control-sm" rows="4" placeholder = "Enter address" name ="address" onChange={handelInputs}  value={user.address} required style={{resize: "None", fontSize: "20px", width: "350px"}}></textarea>

                <br></br>        
                <label className="LabelClass">Doctor</label>
                <input type="text" placeholder="Enter Name"  name ="drname" onChange={handelInputs}  value={user.drname}  class="form-control form-control-sm" required></input>
           </div> 

          

           <div className="col-lg-4">
                <br></br>
                 <label className="LabelClass">Patient Name</label>
                <input type="text" placeholder="Enter Patient Name"  name="patientname"  class="form-control form-control-sm"   value={user.patientname}
                onChange={handelInputs} required></input>
                <br></br>
                <label className="LabelClass">Policy Number</label>
                <input type="text" placeholder="Enter policy no."  name="policyno"  class="form-control form-control-sm"   value={user.policyno}
                onChange={handelInputs} required></input>
                <br></br>
                <label  className="LabelClass" style={{marginTop: "10px"}}>D.O.B</label>
                 <input type="text" placeholder="Enter D.O.B"  name="dob"  class="form-control form-control-sm"   value={user.dob}
                onChange={handelInputs} required></input>
                
                <br></br>
                <label className="LabelClass">City</label>
                <input type="text" class="form-control form-control-sm" name="city" onChange={handelInputs}  value={user.city}  placeholder="Enter City" required></input>
                <br></br>
                <label className="LabelClass">Pincode</label>
                <input type="text" class="form-control form-control-sm" name="pincode"  onChange={handelInputs}  value={user.pincode} placeholder="Enter Pincode" required></input>

                <br></br>
                <label className="LabelClass">Date of Admission</label>
                <input type="text" placeholder="Enter Date of Admission"  name="dateadmission"  class="form-control form-control-sm"   value={user.dateadmission}
                onChange={handelInputs} required></input>
           
           </div> 

           <div className="col-lg-4">
                <br></br>
                <label className="LabelClass">Insurance Company ID</label>
                <input type="text" class="form-control form-control-sm" name="insurancecom"  onChange={handelInputs}  value={user.insurancecom} placeholder="Enter insurancecom" required></input>
                <br></br>
                <label className="LabelClass">Patient Email</label>
                <input type="text" className="form-control form-control-sm" placeholder="example@example.com" name="pemail" onChange={handelInputs}  value={user.pemail}  required></input>

                <br></br><br></br><br></br>
                <label className="LabelClass">Mobile Number</label>
                <input type="text" className="form-control form-control-sm" pattern="^\d{10}$" placeholder="9999999999" name="mob" onChange={handelInputs}  value={user.mob}  required></input>
                <br></br>
                <label className="LabelClass">State</label>
                <input type="text" class="form-control form-control-sm" name="state"  onChange={handelInputs}  value={user.state} placeholder="Enter State" required></input>
                <br></br>
                <label className="LabelClass">Treatment</label>
                <input type="text" class="form-control form-control-sm" name="treatment"  onChange={handelInputs}  value={user.treatment} placeholder="Enter Treatment" required></input>
                <br></br>
                 
                <br></br>
                <label className="LabelClass">Aadhar Card No.</label>
                <input type='text'  className="form-control form-control-sm" placeholder='Enter Aadhar Card Number'  name="adharno" onChange={handelInputs}  value={user.adharno} required /> 
            </div>
            <br></br><br></br>
           </div> <br></br>
         
           <div className='preauth'>
                <h2><center>Past Illness Details</center></h2><br></br>
                <h5>Past Illness/Chronic Details</h5><br></br>
                <div className='row'>
                <div className="col-lg-3">
                    <label className='PastIllnessLabel'>HyperTension</label>
                    <br></br><br></br>
                    <label className='PastIllnessLabel'>Diabetes</label>
                    <br></br><br></br>
                    <label className='PastIllnessLabel'>Heart Disease</label>
                    <br></br><br></br>
                    <label className='PastIllnessLabel'>COPD</label>
                    <br></br><br></br>
                    <label className='PastIllnessLabel'>HIV</label>
                    <br></br><br></br>
                    <label className='PastIllnessLabel'>Asthama</label>
                    <br></br><br></br>
                    <label className='PastIllnessLabel'>Cancer</label>
                    <br></br><br></br>
                    <label className='PastIllnessLabel'>Arthritis</label>
                    <br></br><br></br>
                    <label className='PastIllnessLabel'>Congenital Disease</label>
                    <br></br><br></br>
                    <label className='PastIllnessLabel'>Other Diseases</label>
                    <br></br><br></br>
                    <label className='PastIllnessLabel'>Alcohol/Drugs</label>
                    <br></br><br></br>
                    <label className='PastIllnessLabel'>Smoking History</label>
                    <br></br>
                </div>
                <div className='col-lg-5'>
                <div>
                    <label className="PastIllnessLabel"><input type='radio' value={user.hypertension} onChange={handelInputs} name="hype" ></input>  Yes</label>
                    <label className="PastIllnessLabel"><input style={{marginLeft: "70px"}} type='radio' value='no'  onChange={handelInputs} ></input>  No</label>
                    <label className="PastIllnessLabel"><input style={{marginLeft: "70px"}} type='radio' value='not mention' onChange={handelInputs} ></input>  Not Mentioned</label>
                </div><br></br>
                <div>
                    <label className="PastIllnessLabel"><input type='radio' value='Diabetes' ></input>  Yes</label>
                    <label className="PastIllnessLabel"><input style={{marginLeft: "70px"}} type='radio' value='HyperTension' ></input>  No</label>
                    <label className="PastIllnessLabel"><input style={{marginLeft: "70px"}} type='radio' value='HyperTension' ></input>  Not Mentioned</label>
                </div><br></br>
                <div>
                    <label className="PastIllnessLabel"><input type='radio' value='Heart Disease' ></input>  Yes</label>
                    <label className="PastIllnessLabel"><input style={{marginLeft: "70px"}} type='radio' value='HyperTension' ></input>  No</label>
                    <label className="PastIllnessLabel"><input style={{marginLeft: "70px"}} type='radio' value='HyperTension' ></input>  Not Mentioned</label>
                </div><br></br>
                <div>
                    <label className="PastIllnessLabel"><input type='radio' value='COPD' ></input>  Yes</label>
                    <label className="PastIllnessLabel"><input style={{marginLeft: "70px"}} type='radio' value='HyperTension' ></input>  No</label>
                    <label className="PastIllnessLabel"><input style={{marginLeft: "70px"}} type='radio' value='HyperTension' ></input>  Not Mentioned</label>
                </div><br></br>
                <div>
                    <label className="PastIllnessLabel"><input type='radio' value='HIV' ></input>  Yes</label>
                    <label className="PastIllnessLabel"><input style={{marginLeft: "70px"}} type='radio' value='HyperTension' ></input>  No</label>
                    <label className="PastIllnessLabel"><input style={{marginLeft: "70px"}} type='radio' value='HyperTension' ></input>  Not Mentioned</label>
                </div><br></br>
                <div>
                    <label className="PastIllnessLabel"><input type='radio' value='Asthama' ></input>  Yes</label>
                    <label className="PastIllnessLabel"><input style={{marginLeft: "70px"}} type='radio' value='HyperTension' ></input>  No</label>
                    <label className="PastIllnessLabel"><input style={{marginLeft: "70px"}} type='radio' value='HyperTension' ></input>  Not Mentioned</label>
                </div><br></br>
                <div>
                    <label className="PastIllnessLabel"><input type='radio' value='Cancer' ></input>  Yes</label>
                    <label className="PastIllnessLabel"><input style={{marginLeft: "70px"}} type='radio' value='HyperTension' ></input>  No</label>
                    <label className="PastIllnessLabel"><input style={{marginLeft: "70px"}} type='radio' value='HyperTension' ></input>  Not Mentioned</label>
                </div><br></br>
                <div>
                    <label className="PastIllnessLabel"><input type='radio' value='Arthritis'></input>  Yes</label>
                    <label className="PastIllnessLabel"><input style={{marginLeft: "70px"}} type='radio' value='HyperTension' ></input>  No</label>
                    <label className="PastIllnessLabel"><input style={{marginLeft: "70px"}} type='radio' value='HyperTension' ></input>  Not Mentioned</label>
                </div><br></br>
                <div>
                    <label className="PastIllnessLabel"><input type='radio' value='Congenital Disease' ></input>  Yes</label>
                    <label className="PastIllnessLabel"><input style={{marginLeft: "70px"}} type='radio' value='HyperTension' ></input>  No</label>
                    <label className="PastIllnessLabel"><input style={{marginLeft: "70px"}} type='radio' value='HyperTension' ></input>  Not Mentioned</label>
                </div><br></br>
                <div>
                    <label className="PastIllnessLabel"><input type='radio' value='Other Disease' ></input>  Yes</label>
                    <label className="PastIllnessLabel"><input style={{marginLeft: "70px"}} type='radio' value='HyperTension' ></input>  No</label>
                    <label className="PastIllnessLabel"><input style={{marginLeft: "70px"}} type='radio' value='HyperTension' ></input>  Not Mentioned</label>
                </div><br></br>
                <div>
                    <label className="PastIllnessLabel"><input type='radio' value='Alcohol/Drugs' ></input>  Yes</label>
                    <label className="PastIllnessLabel"><input style={{marginLeft: "70px"}} type='radio' value='HyperTension' ></input>  No</label>
                    <label className="PastIllnessLabel"><input style={{marginLeft: "70px"}} type='radio' value='HyperTension' ></input>  Not Mentioned</label>
                </div><br></br>
                <div>
                    <label className="PastIllnessLabel"><input type='radio' value='Smoking History' ></input>  Yes</label>
                    <label className="PastIllnessLabel"><input style={{marginLeft: "70px"}} type='radio' value='HyperTension' ></input>  No</label>
                    <label className="PastIllnessLabel"><input style={{marginLeft: "70px"}} type='radio' value='HyperTension' ></input>  Not Mentioned</label>
                </div><br></br>
                </div>
                <div className='col-lg-4'>
                        <input type='text' style={{width: "325px", marginBottom: "12px" }} className="form-control form-control-sm"  placeholder='Remarks'></input>
                        
                        <input type='text' style={{width: "325px", marginBottom: "12px" }} className="form-control form-control-sm"  placeholder='Remarks'></input>
                        
                        <input type='text' style={{width: "325px", marginBottom: "12px" }} className="form-control form-control-sm"  placeholder='Remarks'></input>
                       
                        <input type='text' style={{width: "325px", marginBottom: "12px" }} className="form-control form-control-sm"  placeholder='Remarks'></input>
                       
                        <input type='text' style={{width: "325px", marginBottom: "14px" }} className="form-control form-control-sm"  placeholder='Remarks'></input>
                       
                        <input type='text' style={{width: "325px", marginBottom: "14px" }} className="form-control form-control-sm"  placeholder='Remarks'></input>
                       
                        <input type='text' style={{width: "325px", marginBottom: "14px" }} className="form-control form-control-sm"  placeholder='Remarks'></input>
                       
                        <input type='text' style={{width: "325px", marginBottom: "12px" }} className="form-control form-control-sm"  placeholder='Remarks'></input>
                       
                        <input type='text' style={{width: "325px", marginBottom: "14px" }} className="form-control form-control-sm"  placeholder='Remarks'></input>
                       
                        <input type='text' style={{width: "325px", marginBottom: "14px"}} className="form-control form-control-sm"  placeholder='Remarks'></input>
                        
                        <input type='text' style={{width: "325px", marginBottom: "14px"}} className="form-control form-control-sm"  placeholder='Remarks'></input>
                        <input type='text' style={{width: "325px", marginBottom: "14px"}} className="form-control form-control-sm"  placeholder='Remarks'></input>
                       
                </div>
              </div>
                    
            </div>
            <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
           
            onClick={PostData}
          >
            Sign Up
          </Button>
        </div>


        </form>
    </>
    )
}

export default Preauth