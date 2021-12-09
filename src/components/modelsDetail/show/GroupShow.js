import axios from 'axios'
import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router'
import { Table } from 'react-bootstrap'
import { Link } from 'react-router-dom'

export default function GroupShow () {
  const [group, setGroup] = useState([])
  const history = useNavigate()

  const getGroup = async () => {
    const response = await axios.get('http://127.0.0.1:8000/api/group/')
    setGroup(response.data)
  }

  useEffect(() => {
    getGroup()
  }, [])

  const deleteGroup = async id => {
    await axios.delete(`http://127.0.0.1:8000/api/group/${id}/`)
    history('/group')
  }

  return (
    <div>
      <h1>Список всех групп</h1>

      <Link className='btn btn-outline-success' to={'/group/add/'}>
        Добавить группу
      </Link>

      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Код</th>
            <th>Название группы</th>
            <th>
              Код <br /> выпускающей кафедры
            </th>
            <th>Код куратора</th>
            <th>Обновление</th>
            <th>Удаление</th>
          </tr>
        </thead>
        <tbody>
          {group.map((group, id) => (
            <tr key={id}>
              <td valign='middle'>{group.group_code}</td>
              <td valign='middle'>{group.group_name}</td>
              <td valign='middle'>{group.issuing_department_code_val}</td>
              <td valign='middle'>{group.сurator_code_val}</td>
              <td valign='middle'>
                <Link
                  to={`/group/${group.group_code}/update`}
                  className='btn btn-outline-warning'
                >
                  Обновить
                </Link>
              </td>
              <td valign='middle'>
                <a
                  href='http://localhost:3000/group/'
                  className='btn btn-outline-danger'
                  onClick={() => deleteGroup(group.group_code)}
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
