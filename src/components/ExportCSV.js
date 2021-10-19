import React from 'react'
import {Button} from 'react-bootstrap'

function ExportCSV({data}) {
    // console.log(data)
    const getCSV = () => {
        const objectToCsv = function(exdata) {
            try{
                const csvRows = []
                //get the headers
                const headers = Object.keys(exdata[0])
                csvRows.push(headers.join(','))

                for(const row of exdata) {
                    const values = headers.map(header => {
                        const val = (''+row[header])
                        const escaped = val.replace(/"/g,'\\"')
                        return `"${escaped}"`
                    })
                    csvRows.push(values.join(','))
                    // console.log(csvRows)
                
                }
                return csvRows.join('\n')
                // console.log(csvRows)
            }
            catch(err)
            {
                console.log('error')
            }
        }
        const download = function(csvData) {
            try{
                    const blob = new Blob([csvData],{type:'text/csv'})
                    const url = window.URL.createObjectURL(blob)
                    const a = document.createElement('a')
                    a.setAttribute('hidden','')
                    a.setAttribute('href',url)
                    a.setAttribute('download','download.csv')
                    document.body.appendChild(a)
                    a.click()
                    document.body.removeChild(a)
            }
            catch(err){
                console.log('error')
            }
        }
        const exdata = data.map(row => ({
            ReferenceNo: row.referenceno,
            PatientName: row.patientname,
            Status: row.status,
            AdmissionType:row.admissiontype,
            DrName: row.drname,
            DateOfAdmission:row.dateadmission,
            InsuranceCompanyID:row.insurancecom,
            Treatment: row.treatment,
            PatientEmail: row.pemail,
            MobileNo: row.mob,
            AdharNo: row.adharno,
            Gender:row.gender,
            DateOfBirth:row.dob,
            City:row.city,
            Pincode:row.pincode,
            State: row.state,
        }))
    // console.log(exdata)
        const csvData = objectToCsv(exdata)
        download(csvData)
    }
    
    return (
        <div> &nbsp;
            <Button onClick={getCSV}>Download CSV  <i class="fas fa-download"></i></Button>

        </div>
    )
}

export default ExportCSV
