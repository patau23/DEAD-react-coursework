import axios from 'axios'
import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

export default function DepartmentAdd () {
  const [staff, setStaff] = useState([])
  const getStaff = async () => {
    const response = await axios.get('http://127.0.0.1:8000/api/staff/')
    setStaff(response.data)
  }
  useEffect(() => {
    getStaff()
  }, [])

  /* * * * * * * * */

  const [faculty, setFaculty] = useState([])
  const getFaculty = async () => {
    const response = await axios.get('http://127.0.0.1:8000/api/faculty/')
    setFaculty(response.data)
  }
  useEffect(() => {
    getFaculty()
  }, [])

  /* * * * * * * * */

  const [department_name, setDepartment_name] = useState('')
  const [department_head_code, setDepartment_head_code] = useState('')
  const [faculty_code, setFaculty_code] = useState('')

  const history = useNavigate()

  const AddInfo = async () => {
    let formField = new FormData()

    console.log(department_name)
    console.log(department_head_code)
    console.log(faculty_code)

    formField.append('department_name', department_name)
    formField.append('department_head_code', department_head_code)
    formField.append('faculty_code', faculty_code)

    console.log(department_name)
    console.log(department_head_code)
    console.log(faculty_code)

    await axios({
      method: 'post',
      url: 'http://127.0.0.1:8000/api/department/',
      data: formField
    })
      .then(response => {
        console.log(response.data)
        history('/department')
      })
      .catch(error => {
        document.querySelector('#error-tag').innerHTML =
          'Похоже был выбран уже существующий заведующий какой-либо кафедры'
      })
  }

  return (
    <div>
      <h1> Добавить факультет </h1>
      <p id='error-tag'> </p>
      <div className='container'>
        <div className='form-group'>
          <div>
            <p>Наименование кафедры</p>
            <input
              className='form-control form-control-lg'
              placeholder='Введите наименование факультета'
              type='text'
              name='department_name'
              value={department_name}
              onChange={e => setDepartment_name(e.target.value)}
            />
          </div>
          <br />

          <div className='form-control'>
            <p>Декан:</p>
            <select
              className='form-control form-control-lg'
              name='department_head_code'
              value={department_head_code}
              onChange={e => setDepartment_head_code(parseInt(e.target.value))}
            >
              <option key={-1} value={''}></option>
              {staff.map((staff, id) => (
                <option key={id} value={staff.сurator_code}>
                  {staff.curator_name}
                </option>
              ))}
            </select>
          </div>
          <br />

          <div className='form-control'>
            <p>Факультет</p>
            <select
              className='form-control form-control-lg'
              name='faculty_code'
              value={faculty_code}
              onChange={e => setFaculty_code(parseInt(e.target.value))}
            >
              <option key={-1} value={''}></option>
              {faculty.map((faculty, id) => (
                <option key={id} value={faculty.faculty_code}>
                  {faculty.faculty_name}
                </option>
              ))}
            </select>
          </div>
          <br />
          <button className='btn btn-outline-success' onClick={AddInfo}>
            Добавить
          </button>
        </div>
      </div>
    </div>
  )
}
