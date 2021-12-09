import axios from 'axios'
import React, { useState, useEffect } from 'react'
import { Table } from 'react-bootstrap'

export default function TypesofEducationShow () {
  const [edu, setEdu] = useState([])

  const getEdu = async () => {
    const response = await axios.get('http://127.0.0.1:8000/api/educ-type/')
    setEdu(response.data)
  }

  useEffect(() => {
    getEdu()
  }, [])

  return (
    <div className='centered'>
      <h1>Список видов обучения в универе</h1>

      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Код обучения</th>
            <th>Вид обучения</th>
          </tr>
        </thead>
        <tbody>
          {edu.map((edu, id) => (
            <tr key={id}>
              <td valign='middle'>{edu.education_type_code}</td>
              <td valign='middle'>{edu.education_type_name}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  )
}
