import React,{useState} from 'react'
import Button from '@material-ui/core/Button';





function Preauth() {
    
    


    const [user,setUser] = useState({
         referenceno:"", policyno:"",admissiontype:"",gender:"",address:"",
         drname:"" ,pfname:"", pmname:"", psname:"", pemail:"", dob:"", city:"",
         pincode:"", dateadmission:"", insurancecom:"",  patientname:"",
         mob:"", state:"", treatment:"", uid:"",adharno:"",hypertension:""
      
      });

      const [selectedFile,filename] = useState({
          selectedFile:null,filename:''
      })



let name, value;

const handelInputs = (e) => {
  console.log(e);
  name = e.target.name;
  value = e.target.value;

  setUser({ ...user, [name]:value});
}



const PostData = async (e) => {
e.preventDefault();
const { referenceno, policyno, admissiontype, gender,address,
drname,pfname, pmname, psname, pemail, dob, city,
pincode, dateadmission, insurancecom,  patientname,
mob, state, treatment, uid,adharno,hypertension} = user;

console.log('referenceno',referenceno)

const res = await fetch("/preauth",{
  method: "POST",
  headers: {
    "Content-Type": "application/json"
  },
  body:JSON.stringify({
    referenceno, policyno,admissiontype, gender,address,
    drname,pfname, pmname, psname, pemail, dob, city,
    pincode, dateadmission, insurancecom,  patientname,
    mob, state, treatment, uid,adharno ,hypertension
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
                <select className="form-control form-control-sm" onChange={handelInputs} name="admissiontype" value={user.admissiontype} style={{width: "300px", height: "43px", fontSize: "20px"}}>
                    <option value = "sender" selected disabled hidden>Select Type</option> 
                    <option value = "Planned" onChange={handelInputs}>Planned</option> 
                    <option value = "Emergency" onChange={handelInputs}>Emergency</option> 
                    <option value = "Accident" onChange={handelInputs}>Accident</option> 
                    <option value = "Maternity" onChange={handelInputs}>Maternity</option> 
                </select>
                <br></br><br></br><br></br>
                <label className="LabelClass">Gender</label>
                <select class="form-control form-control-sm" onChange={handelInputs}  name="gender" value={user.gender} style={{width: "300px", height: "43px", fontSize: "20px"}}>
                    <option value = "sender" selected disabled hidden>Select Gender</option> 
                    <option value = "Male" onChange={handelInputs}>Male</option> 
                    <option value = "Female" onChange={handelInputs}>Female</option>                 
                </select>
                <br></br>
                <label className="LabelClass">Address</label>
                <textarea className="form-control form-control-sm" rows="4" placeholder = "Enter address" name ="address" onChange={handelInputs}  value={user.address} required style={{resize: "None", fontSize: "20px", width: "350px"}}></textarea>

                <br></br>        
                <label className="LabelClass">Doctor</label>
                <input type="text" placeholder="Enter Name"  name ="drname" onChange={handelInputs}  value={user.drname}  class="form-control form-control-sm" required></input>
           </div> 

          

           <div className="col-lg-4">
                <br></br>
                <label className="LabelClass">Policy Number</label>
                <input type="text" placeholder="Enter policy no."  name="policyno"  class="form-control form-control-sm"   value={user.policyno}
                onChange={handelInputs} required></input>
                <br></br>
                <label className="LabelClass">Patient</label>
                <input type="text" class="form-control form-control-sm" placeholder="First Name" name="pfname" onChange={handelInputs}  value={user.pfname} required></input>
                <div className='row'>
                    <div className="col-lg-2">
                      <input type="text" style={{width: "317%"}} class="form-control form-control-sm" placeholder="Middle Name" name="pmname" onChange={handelInputs}  value={user.pmname} required></input>
                    </div>
                    <div className="col-lg-2">
                      <input type="text" style={{width: "322%", marginLeft: "80px"}} class="form-control form-control-sm" placeholder="Surname" name="psname" onChange={handelInputs}  value={user.psname} required></input>
                    </div>
                </div>
                <br></br>   
                <label  className="LabelClass" style={{marginTop: "10px"}}>D.O.B</label>
                <input type="date" class="form-control form-control-sm" name="dob" onChange={handelInputs} value={user.dob} style={{width: "300px", height: "43px", fontSize: "20px"}}></input>
                
                <br></br>
                <label className="LabelClass">City</label>
                <input type="text" class="form-control form-control-sm" name="city" onChange={handelInputs}  value={user.city}  placeholder="Enter City" required></input>
                <br></br>
                <label className="LabelClass">Pincode</label>
                <input type="text" class="form-control form-control-sm" name="pincode"  onChange={handelInputs}  value={user.pincode} placeholder="Enter Pincode" required></input>

                <br></br>
                <label className="LabelClass">Date of Admission</label>
                <input type="date" class="form-control form-control-sm" name="dateadmission" onChange={handelInputs}  value={user.dateadmission}  style={{width: "300px", height: "43px", fontSize: "20px"}} required></input>
           
           </div> 

           <div className="col-lg-4">
                <br></br>
                <label className="LabelClass">Insurance Company</label>
                <select class="form-control form-control-sm" value={user.insurancecom} onChange={handelInputs} name="insurancecom"  style={{width: "300px", height: "43px", fontSize: "20px"}}>
                    <option value = "sender" selected disabled hidden>Select Company</option> 
                    <option value = "Birla" onChange={handelInputs} >Aditya Birla Health Insurance Co. Ltd.</option> 
                    <option value = "Bajaj" onChange={handelInputs}>Bajaj Allianz General Insurance Co. Ltd.</option> 
                    <option value = "CareHealth" onChange={handelInputs}>Care Health Insurance Ltd.</option>   
                    <option value = "DHFL" onChange={handelInputs}>DHFL Insurance General Insurance Co. Ltd.</option> 
                    <option value = "HDFC_ERGO" onChange={handelInputs} >HDFC ERGO General Insurance Co. Ltd.</option> 
                    <option value = "HDFC_LIFE" onChange={handelInputs} >HDFC Life Insurance Co. Ltd.</option> 
                    <option value = "ICICI_Lombard"  onChange={handelInputs}>ICICI Lombard General Insurance Co. Ltd.</option> 
                    <option value = "ICICI_Prudential"  onChange={handelInputs}>ICICI Prudential Life Insurance Co. Ltd.</option> 
                    <option value = "Reliance_General" onChange={handelInputs} >Reliance General Insurance Co. Ltd.</option> 
                    <option value = "SBI_General"  onChange={handelInputs}>SBI General Insurance Co. Ltd.</option> 
                    <option value = "SBI_Life" onChange={handelInputs} >SBI Life Insurance Co. Ltd.</option> 
                    <option value = "Star"  onChange={handelInputs}>Star Health And Allied Insurance Co. Ltd.</option> 
                    <option value = "Tata"  onChange={handelInputs}>Tata Aig General Insurance Co. Ltd.</option> 
                </select>
                <br></br>
                <label className="LabelClass">Patient Email</label>
                <input type="text" className="form-control form-control-sm" placeholder="example@example.com" name="pemail" onChange={handelInputs}  value={user.pemail}  required></input>

                <br></br><br></br><br></br>
                <label className="LabelClass">Mobile Number</label>
                <input type="text" className="form-control form-control-sm" pattern="^\d{10}$" placeholder="9999999999" name="mob" onChange={handelInputs}  value={user.mob}  required></input>
                <br></br>
                <label className="LabelClass">State</label>
                <select class="form-control form-control-sm"  value={user.state} onChange={handelInputs} name="state" style={{width: "300px", height: "43px", fontSize: "20px"}}>
                <option value = "state" selected disabled hidden>Select State</option> 
                    <option value="Andhra Pradesh" onChange={handelInputs}>Andhra Pradesh</option>
                    <option value="Andaman and Nicobar Islands" onChange={handelInputs}>Andaman and Nicobar Islands</option>
                    <option value="Arunachal Pradesh" onChange={handelInputs}>Arunachal Pradesh</option>
                    <option value="Assam" onChange={handelInputs}>Assam</option>
                    <option value="Bihar" onChange={handelInputs}>Bihar</option>
                    <option value="Chandigarh" onChange={handelInputs}>Chandigarh</option>
                    <option value="Chhattisgarh" onChange={handelInputs}>Chhattisgarh</option>
                    <option value="Dadar and Nagar Haveli" onChange={handelInputs}>Dadar and Nagar Haveli</option>
                    <option value="Daman and Diu" onChange={handelInputs}>Daman and Diu</option>
                    <option value="Delhi" onChange={handelInputs}>Delhi</option>
                    <option value="Lakshadweep" onChange={handelInputs}>Lakshadweep</option>
                    <option value="Puducherry" onChange={handelInputs}>Puducherry</option>
                    <option value="Goa" onChange={handelInputs}>Goa</option>
                    <option value="Gujarat" onChange={handelInputs}>Gujarat</option>
                    <option value="Haryana" onChange={handelInputs}>Haryana</option>
                    <option value="Himachal Pradesh" onChange={handelInputs}>Himachal Pradesh</option>
                    <option value="Jammu and Kashmir" onChange={handelInputs}>Jammu and Kashmir</option>
                    <option value="Jharkhand" onChange={handelInputs}>Jharkhand</option>
                    <option value="Karnataka" onChange={handelInputs}> Karnataka</option>
                    <option value="Kerala" onChange={handelInputs}>Kerala</option>
                    <option value="Madhya Pradesh" onChange={handelInputs}>Madhya Pradesh</option>
                    <option value="Maharashtra" onChange={handelInputs}>Maharashtra</option>
                    <option value="Manipur" onChange={handelInputs}>Manipur</option>
                    <option value="Meghalaya" onChange={handelInputs}>Meghalaya</option>
                    <option value="Mizoram" onChange={handelInputs}>Mizoram</option>
                    <option value="Nagaland" onChange={handelInputs}>Nagaland</option>
                    <option value="Odisha" onChange={handelInputs}>Odisha</option>
                    <option value="Punjab" onChange={handelInputs}>Punjab</option>
                    <option value="Rajasthan" onChange={handelInputs}>Rajasthan</option>
                    <option value="Sikkim" onChange={handelInputs}>Sikkim</option>
                    <option value="Tamil Nadu" onChange={handelInputs}>Tamil Nadu</option>
                    <option value="Telangana" onChange={handelInputs}>Telangana</option>
                    <option value="Tripura" onChange={handelInputs}>Tripura</option>
                    <option value="Uttar Pradesh" onChange={handelInputs}>Uttar Pradesh</option>
                    <option value="Uttarakhand" onChange={handelInputs}>Uttarakhand</option>
                    <option value="West Bengal" onChange={handelInputs}>West Bengal</option>
                </select>
                <br></br>
                <label className="LabelClass">Treatment</label>
                <select class="form-control form-control-sm" name="treatment"  onChange={handelInputs} value={user.treatment} style={{width: "300px", height: "43px", fontSize: "20px"}}>
                    <option value = "Treatment" selected disabled hidden>Select Treatment</option> 
                    <option value = "Cancer" onChange={handelInputs}>Cancer</option> 
                    <option value = "Medical" onChange={handelInputs}>Medical</option> 
                    <option value = "Surgery with Medical" onChange={handelInputs}>Surhery with Medical</option>
                    <option value = "Surgical" onChange={handelInputs}>Surgical</option> 
                    <option value = "Trauma" onChange={handelInputs}>Trauma</option> 
                </select> 
                <br></br>
                <label className="LabelClass">Aadhar Card No.</label>
                <input type='text'  className="form-control form-control-sm" placeholder='Enter Aadhar Card Number'  name="adharno" onChange={handelInputs}  value={user.adharno} required /> 
            </div>
            <br></br><br></br>
           </div> <br></br>
           <div className='preauth'>
               <h1 style={{fontSize: "30px"}}><center>Attachment Details</center></h1><br></br>
               <h5>Upload Files/Reports/ID Details(Scanned PDF and JPG files)</h5><br></br>
                <div className='row'>
                    <div className="col-lg-4">
                        <input type='file' style={{height: "40px", fontSize: "20px", width:"70%"}} className="form-control form-control-sm"></input>
                        <br></br>
                    </div>
                    
                </div>
           </div><br></br>
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