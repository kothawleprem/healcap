import React,{useState,useEffect} from 'react'

import axios from 'axios'

const  SendMail = () => {
    const [response,setResponse] = useState(null)
    const [referenceno,setReferenceno] = useState(null)

    useEffect(()=> {

        if(referenceno >= 0)
        {
            console.log(referenceno)
            axios.get(`http://localhost:5000/sendEmail?referenceno=${referenceno}`)
            .then(response => {
                setResponse(response.data)
            })
            .catch(err => {
            console.log(err)
        })
        }
        
    },[referenceno])

    const textInput = React.createRef();  // React use ref to get input value

    const onOnclickHandler = (e) => {
        setReferenceno(textInput.current.value);
        // console.log(textInput.current.value);
  };

    return (
        <div>
          

            <div class="card" >
  <div class="card-body">
    <h3 class="card-title">Enter reference number to send email.</h3>
    <div class="input-group mb-3">
  <input type="text" class="form-control"  ref={textInput} aria-describedby="button-addon2"/>
  <button class="btn btn-outline-secondary" onClick={onOnclickHandler} type="button" id="button-addon2">Submit</button>
</div>
  {!response ? (
                <p>Did not send Mail :(</p>
            ) : (
                 <div className="result">
                <p>{response}</p>
                </div>
            )}
           
        </div>
    
  </div>
</div>

    )
}

export default SendMail
