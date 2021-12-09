import axios from 'axios'
import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router'
import { Table } from 'react-bootstrap'
import { Link } from 'react-router-dom'

export default function FacultyShow () {
  const [fac, setFac] = useState([])
  const history = useNavigate()

  const getFac = async () => {
    const response = await axios.get('http://127.0.0.1:8000/api/faculty/')
    console.log(response.data)
    setFac(response.data)
  }

  useEffect(() => {
    getFac()
  }, [])

  const deleteFac = async id => {
    await axios.delete(`http://127.0.0.1:8000/api/faculty/${id}/`)
    history('/faculty')
  }

  return (
    <div>
      <h1>Список Факультетов,</h1>
      <p>которые есть в университете</p>

      <Link className='btn btn-outline-success' to={'/faculty/add/'}>
        Добавить факультет
      </Link>

      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Код факультета</th>
            <th>Наименование</th>
            <th>Декан факультета</th>
            <th>Обновление</th>
            <th>Удаление</th>
          </tr>
        </thead>
        <tbody>
          {fac.map((fac, id) => (
            <tr key={id}>
              <td valign='middle'>{fac.faculty_code}</td>
              <td valign='middle'>{fac.faculty_name}</td>
              <td valign='middle'>{fac.deanery_employee_code_val}</td>
              <td valign='middle'>
                <Link
                  to={`/faculty/${fac.faculty_code}/update`}
                  className='btn btn-outline-warning'
                >
                  Обновить
                </Link>
              </td>
              <td valign='middle'>
                <a
                  href='http://localhost:3000/faculty/'
                  className='btn btn-outline-danger'
                  onClick={() => deleteFac(fac.faculty_code)}
                >
                  Удалить
                </a>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  )
}
