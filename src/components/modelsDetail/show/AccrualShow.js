import axios from 'axios'
import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router'
import { Table } from 'react-bootstrap'
import { Link } from 'react-router-dom'

const AccrualShow = () => {
  const [accrual, setAccrual] = useState([])
  const history = useNavigate()

  const getAccrual = async () => {
    const response = await axios.get('http://127.0.0.1:8000/api/accrual/')
    setAccrual(response.data)
  }

  useEffect(() => {
    getAccrual()
  }, [])

  const deleteAccrual = async id => {
    await axios.delete(`http://127.0.0.1:8000/api/accrual/${id}/`)
    history('/accrual')
  }

  return (
    <div>
      <h1>Список произведенных начислений</h1>

      <Link to={'/accrual/add/'} className='btn btn-outline-success'>
        Добавить начисление студенту
      </Link>

      <div>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>ID</th>
              <th>Код студента</th>
              <th>Дата начисления</th>
              <th>Сумма, тг</th>
              <th>Обновление</th>
              <th>Удаление</th>
            </tr>
          </thead>

          <tbody>
            {accrual.map((accrual, id) => (
              <tr key={id}>
                <td valign='middle'>{accrual.id}</td>
                <td valign='middle'>{accrual.student_code_val}</td>
                <td valign='middle'>{accrual.date_of_scholarship_accrual}</td>
                <td valign='middle'>{accrual.amount_of_money}</td>
                <td valign='middle'>
                  <Link
                    to={`/accrual/${accrual.id}/update`}
                    className='btn btn-outline-warning'
                  >
                    Обновить
                  </Link>
                </td>
                <td valign='middle'>
                  <a
                    href='http://localhost:3000/accrual/'
                    onClick={() => deleteAccrual(accrual.id)}
                    className='btn btn-outline-danger'
                  >
                    Удалить
                  </a>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
    </div>
  )
}

export default AccrualShow
