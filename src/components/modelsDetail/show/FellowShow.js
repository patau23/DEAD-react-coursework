import axios from 'axios'
import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router'
import { Table } from 'react-bootstrap'
import { Link } from 'react-router-dom'

export default function FellowShow () {
  const [fellow, setFellow] = useState([])
  const history = useNavigate()

  const getFellow = async () => {
    const response = await axios.get('http://127.0.0.1:8000/api/fellow/')
    setFellow(response.data)
  }

  useEffect(() => {
    getFellow()
  }, [])

  const deleteFellow = async id => {
    await axios.delete(`http://127.0.0.1:8000/api/fellow/${id}/`)
    history('/fellow')
  }

  return (
    <div>
      <h1>Список стипендиатов</h1>
      <p>которые получают ежемесячную выплату</p>

      <Link className='btn btn-outline-success' to={'/fellow/add/'}>
        Добавить стипендиата
      </Link>

      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Код студента</th>
            <th>Тип стипендии</th>
            <th>Дата начала получения стипендии</th>
            <th>Дата окончания получения стипендии</th>
            <th>Обновление</th>
            <th>Удаление</th>
          </tr>
        </thead>
        <tbody>
          {fellow.map((fellow, id) => (
            <tr key={id}>
              <td valign='middle'>{fellow.student_code_val}</td>
              <td valign='middle'>{fellow.scholarship_type_code_val}</td>
              <td valign='middle'>{fellow.beginning_of_the_accrual_period}</td>
              <td valign='middle'>{fellow.ending_of_the_accrual_period}</td>
              <td valign='middle'>
                <Link
                  to={`/fellow/${fellow.id}/update`}
                  className='btn btn-outline-warning'
                >
                  Обновить
                </Link>
              </td>
              <td valign='middle'>
                <a
                  href='http://localhost:3000/fellow/'
                  className='btn btn-outline-danger'
                  onClick={() => deleteFellow(fellow.id)}
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
