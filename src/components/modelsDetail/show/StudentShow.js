import axios from 'axios'
import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router'
import { Table } from 'react-bootstrap'
import { Link } from 'react-router-dom'

export default function StudentShow () {
  const [student, setStudent] = useState([])
  const history = useNavigate()

  const getStudent = async () => {
    const response = await axios.get('http://127.0.0.1:8000/api/student/')
    setStudent(response.data)
  }

  useEffect(() => {
    getStudent()
  }, [])

  const deleteStudent = async id => {
    await axios.delete(`http://127.0.0.1:8000/api/student/${id}/`)
    history('/student')
  }

  return (
    <div>
      <h1>Список всех студентов</h1>

      <Link className='btn btn-outline-success' to={'/student/add/'}>
        Добавить студента в систему
      </Link>

      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Код</th>
            <th>ФИО</th>
            <th>Код группы</th>
            <th>Тип обучения</th>
            <th>Номер лицевого счета</th>
            <th>Код банка</th>
            <th>Обновление</th>
            <th>Удаление</th>
          </tr>
        </thead>
        <tbody>
          {student.map((student, id) => (
            <tr key={id}>
              <td valign='middle'>{student.student_code}</td>
              <td valign='middle'>{student.student_name}</td>
              <td valign='middle'>{student.group_code_val}</td>
              <td valign='middle'>{student.education_type_code_val}</td>
              <td valign='middle'>{student.personal_reckoning_number}</td>
              <td valign='middle'>{student.bank_code_val}</td>
              <td valign='middle'>
                <Link
                  to={`/student/${student.student_code}/update`}
                  className='btn btn-outline-warning'
                >
                  Обновить
                </Link>
              </td>
              <td valign='middle'>
                <a
                  href='http://localhost:3000/student/'
                  className='btn btn-outline-danger'
                  onClick={() => deleteStudent(student.student_code)}
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
