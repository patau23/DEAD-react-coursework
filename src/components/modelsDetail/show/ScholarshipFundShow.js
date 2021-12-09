import axios from 'axios'
import React, { useState, useEffect } from 'react'
import { Table } from 'react-bootstrap'

export default function ScholarshipFundShow () {
  const [fund, setFund] = useState([])

  const getFund = async () => {
    const response = await axios.get('http://127.0.0.1:8000/api/scholar-fund/')
    setFund(response.data)
  }

  useEffect(() => {
    getFund()
  }, [])

  return (
    <div className='centered'>
      <h1>Список начисленных стипендий у факультетов</h1>

      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Код факультета</th>
            <th>Сумма стипендий</th>
          </tr>
        </thead>
        <tbody>
          {fund.map((fund, id) => (
            <tr key={id}>
              <td valign='middle'>{fund.faculty_code_val}</td>
              <td valign='middle'>{fund.scholarship_amount}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  )
}
