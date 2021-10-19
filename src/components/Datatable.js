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
                        {patient.status}
                    </td>
                    <td>
                        {patient.patientname}
                    </td>
                    <td>
                        {patient.insurancecom}
                    </td>
                     <td>
                        {patient.dateadmission}
                    </td>
                    {/* <td>
                        {patient.mob}
                    </td> */}
                    {/* <td>
                        {patient.pemail}
                    </td> */}
                </tr>
            )
        })
    }
    return (
        <Table >
            <thead>
                <tr>
                <th>
                    Reference No
                </th>
                <th>
                    Status
                </th>
                <th>
                    Patient Name
                </th>
                <th>
                    Insurance Company Id
                </th>
                <th>
                    Date of Admission
                </th>
                </tr>
            </thead>
                <tbody>
                    {renderTableRows()}
                </tbody>
        </Table>
    )
}

export default Datatable
