import axios from 'axios'
import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router'
import { Table } from 'react-bootstrap'
import { Link } from 'react-router-dom'

export default function StaffShow () {
  const [staff, setStaff] = useState([])
  const history = useNavigate()

  const getStaff = async () => {
    const response = await axios.get('http://127.0.0.1:8000/api/staff/')
    setStaff(response.data)
  }

  useEffect(() => {
    getStaff()
  }, [])

  const deleteStaff = async id => {
    await axios.delete(`http://127.0.0.1:8000/api/staff/${id}/`)
    history('/staff')
  }

  return (
    <div>
      <h1>Список сотрудников</h1>
      <Link to={'/Staff/add/'} className='btn btn-outline-success'>
        Добавить сотрудника
      </Link>
      <div>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>ID сотрудника</th>
              <th>ФИО сотрудника</th>
              <th>Обновление</th>
              <th>Удаление</th>
            </tr>
          </thead>
          <tbody>
            {staff.map((staff, id) => (
              <tr key={id}>
                <td valign='middle'>{staff.сurator_code}</td>
                <td valign='middle'>{staff.curator_name}</td>
                <td valign='middle'>
                  <Link
                    to={`/staff/${staff.сurator_code}/update`}
                    className='btn btn-outline-warning'
                  >
                    Обновить
                  </Link>
                </td>
                <td valign='middle'>
                  <a
                    href='http://localhost:3000/Staff/'
                    onClick={() => deleteStaff(staff.сurator_code)}
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
