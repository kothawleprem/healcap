import React from 'react'

import {Table} from 'react-bootstrap'


function Datatable({data}) {
    const columns = data[0] && Object.keys(data[0])
    const renderTableHearder = () => {
        return data[0] && Object.keys(data[0]).map(attr => <th key={attr}>
            {attr.toUpperCase()}
        </th>)
    }
    const renderTableRows = () => {
        return data.map(patient => {
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
                        {patient.status}
                    </td>
                </tr>
            )
        })
    }
    return (
        <Table >
            <thead>
                <tr>
                {renderTableHearder()}
                </tr>
            </thead>
                <tbody>
                    {renderTableRows()}
                </tbody>
        </Table>
    )
}

export default Datatable
