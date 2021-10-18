import React,{Component} from 'react'


class Dashboard extends Component{
    constructor(props){
        super(props)
        this.state = {
            patients:[],
            isLoading:true,
            isError:false
        }
    }

    //async function get request

    async componentDidMount(){
        this.setState({isLoading:true})
        const response = await fetch("http://localhost:5000/read?name=Prem")
        if(response.ok){
            const patients = await response.json()
            console.log(patients)
            this.setState({patients,isLoading:false})
        }
        else{
            this.setState({isError:true,isLoading:false})
        }
        
    }

    renderTableHearder = () => {
        return Object.keys(this.state.patients[0]).map(attr => <th key={attr}>
            {attr.toUpperCase()}
        </th>)
    }

    renderTableRows = () => {
        return this.state.patients.map(patient => {
            return (
                <tr key={patient.referenceno}>
                    <td>
                        {patient.referenceno}
                    </td>
                    <td>
                        {patient.admissiontype}
                    </td>
                    <td>
                        {patient.gender}
                    </td>
                    <td>
                        {patient.address}
                    </td>
                    <td>
                        {patient.drname}
                    </td>
                    <td>
                        {patient.policyno}
                    </td>
                    <td>
                        {patient.pfname}
                    </td>
                    <td>
                        {patient.pmname}
                    </td>
                    <td>
                        {patient.psname}
                    </td>
                    <td>
                        {patient.pemail}
                    </td>
                    <td>
                        {patient.dob}
                    </td>
                    <td>
                        {patient.city}
                    </td>
                    <td>
                        {patient.pincode}
                    </td>
                    <td>
                        {patient.dateadmission}
                    </td>
                    <td>
                        {patient.insurancecom}
                    </td>
                    <td>
                        {patient.patientname}
                    </td>
                    <td>
                        {patient.mob}
                    </td>
                    <td>
                        {patient.state}
                    </td>
                    <td>
                        {patient.treatment}
                    </td>
                    <td>
                        {patient.adharno}
                    </td>
                    <td>
                        {patient.uid}
                    </td>

                </tr>
            )
        })
    }
    render(){
        const {patients,isLoading,isError} = this.state
        if(isLoading){
            return <div>Loading...</div>
        }
        if(isError){
            return <div>Error...</div>
        }
        return patients.length > 0
        ? (
            <table>
                <thead>
                    <tr>
                        {this.renderTableHearder()}
                    </tr>
                </thead>
                <tbody>
                    {this.renderTableRows()}
                </tbody>
            </table>
        ) : (
            <div>No users</div>
        )
    }
}

export default Dashboard

    // const renderTableRows = () => {
    //     return data.map(patient => {
    //         console.log(patient)
    //         return (
    //             <tr key={patient.referenceno}>
    //                 <td>
    //                     {patient.referenceno}
    //                 </td>
    //                 <td>
    //                     {patient.admissiontype}
    //                 </td>
    //                 <td>
    //                     {patient.gender}
    //                 </td>
    //                 <td>
    //                     {patient.address}
    //                 </td>
    //                 <td>
    //                     {patient.drname}
    //                 </td>
    //                 <td>
    //                     {patient.policyno}
    //                 </td>
    //                 <td>
    //                     {patient.pfname}
    //                 </td>
    //                 <td>
    //                     {patient.pmname}
    //                 </td>
    //                 <td>
    //                     {patient.psname}
    //                 </td>
    //                 <td>
    //                     {patient.pemail}
    //                 </td>
    //                 <td>
    //                     {patient.dob}
    //                 </td>
    //                 <td>
    //                     {patient.city}
    //                 </td>
    //                 <td>
    //                     {patient.pincode}
    //                 </td>
    //                 <td>
    //                     {patient.dateadmission}
    //                 </td>
    //                 <td>
    //                     {patient.insurancecom}
    //                 </td>
    //                 <td>
    //                     {patient.patientname}
    //                 </td>
    //                 <td>
    //                     {patient.mob}
    //                 </td>
    //                 <td>
    //                     {patient.state}
    //                 </td>
    //                 <td>
    //                     {patient.treatment}
    //                 </td>
    //                 <td>
    //                     {patient.adharno}
    //                 </td>
    //                 <td>
    //                     {patient.uid}
    //                 </td>

    //             </tr>
    //         )
    //     })
    // }