import axios from 'axios'
import React, { useState, useEffect } from 'react'
import { Table } from 'react-bootstrap'

export default function TypesofScholarShow () {
  const [scholar, setScholar] = useState([])

  useEffect(() => {
    const getScholar = async () => {
      const response = await axios.get(
        'http://127.0.0.1:8000/api/scholar-type/'
      )
      setScholar(response.data)
    }
    getScholar()
  }, [])

  return (
    <div className='centered'>
      <h1>Список видов обучения в универе</h1>

      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Код</th>
            <th>Вид стипендии</th>
            <th>
              Выплата <br /> расчитанная на одного студента / 1 месяц
            </th>
          </tr>
        </thead>
        <tbody>
          {scholar.map((scholar, id) => (
            <tr key={id}>
              <td valign='middle'>{scholar.scholarship_type_code}</td>
              <td valign='middle'>{scholar.scholarship_type_name}</td>
              <td valign='middle'>{scholar.amount_of_money}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  )
}
