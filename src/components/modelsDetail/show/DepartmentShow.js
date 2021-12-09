import axios from 'axios'
import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router'
import { Table } from 'react-bootstrap'
import { Link } from 'react-router-dom'

export default function DepartmentShow () {
  const [dep, setDepartment] = useState([])
  const history = useNavigate()

  const getDepartment = async () => {
    const response = await axios.get('http://127.0.0.1:8000/api/department/')
    console.log(response.data)
    setDepartment(response.data)
  }

  useEffect(() => {
    getDepartment()
  }, [])

  const deleteDepartment = async id => {
    await axios.delete(`http://127.0.0.1:8000/api/department/${id}/`)
    history('/department')
  }

  return (
    <div>
      <h1>Список Кафедр</h1>

      <Link className='btn btn-outline-success' to={'/department/add/'}>
        Добавить факультет
      </Link>

      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Код кафедры</th>
            <th>Наименование</th>
            <th>Код факультета</th>
            <th>Заведующий кафедрой</th>
            <th>Обновление</th>
            <th>Удаление</th>
          </tr>
        </thead>
        <tbody>
          {console.log(dep[0])}
          {dep.map((dep, id) => (
            <tr key={id}>
              <td valign='middle'>{dep.department_code}</td>
              <td valign='middle'>{dep.department_name}</td>
              <td valign='middle'>{dep.faculty_code_val}</td>
              <td valign='middle'>{dep.department_head_code_val}</td>

              <td valign='middle'>
                <Link
                  to={`/department/${dep.department_code}/update`}
                  className='btn btn-outline-warning'
                >
                  Обновить
                </Link>
              </td>
              <td valign='middle'>
                <a
                  href='http://localhost:3000/department/'
                  className='btn btn-outline-danger'
                  onClick={() => deleteDepartment(dep.department_code)}
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
