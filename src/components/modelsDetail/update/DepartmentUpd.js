import axios from 'axios'
import React, { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router'

export default function DepartmentUpd () {
  const [faculty, setFaculty] = useState([])
  const getFaculty = async () => {
    const response = await axios.get('http://127.0.0.1:8000/api/faculty/')
    setFaculty(response.data)
  }
  useEffect(() => {
    getFaculty()
  }, [])

  /* * * * * * * * * */

  const [staff, setStaff] = useState([])
  const getStaff = async () => {
    const response = await axios.get('http://127.0.0.1:8000/api/staff/')
    setStaff(response.data)
  }
  useEffect(() => {
    getStaff()
  }, [])

  /* * * * * * * * * */

  const { id } = useParams('')

  const [department_name, setDepartment_name] = useState('')
  const [faculty_code, setFaculty_code] = useState('')
  const [department_head_code, setDepartment_head_code] = useState('')

  const history = useNavigate()

  useEffect(() => {
    const loadInfo = async () => {
      const { data } = await axios.get(
        `http://127.0.0.1:8000/api/department/${id}/`
      )
      console.log(data)

      setDepartment_name(data.department_name)
      setFaculty_code(data.faculty_code)
      setDepartment_head_code(data.department_head_code)
    }

    loadInfo()
  }, [id])

  const UpdateInfo = async () => {
    let formField = new FormData()

    formField.append('department_name', department_name)
    formField.append('faculty_code', faculty_code)
    formField.append('department_head_code', department_head_code)

    await axios({
      method: 'PUT',
      url: `http://127.0.0.1:8000/api/department/${id}/`,
      data: formField
    })
      .then(response => {
        console.log(response.data)
        history('/department')
      })
      .catch(error => {
        document.querySelector('#error-tag').innerHTML =
          'Похоже пошло что-то не так'
      })
  }

  return (
    <div>
      <h1>Изменить элемент</h1>
      <p id='error-tag'> </p>
      <div className='container'>
        <div className='form-group'>
          <div>
            Наименование кафедры:
            <input
              type='text'
              className='form-control form-control-lg'
              name='department_name'
              value={department_name}
              placeholder='Наименование кафедры'
              onChange={e => setDepartment_name(e.target.value)}
            />
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
              {faculty.map((faculty, id) => (
                <option key={id} value={faculty.faculty_code}>
                  {faculty.faculty_name}
                </option>
              ))}
            </select>
          </div>
          <br />

          <div className='form-control'>
            <p>Зав.кафедра</p>
            <select
              className='form-control form-control-lg'
              name='department_head_code'
              value={department_head_code}
              onChange={e => setDepartment_head_code(parseInt(e.target.value))}
            >
              {staff.map((staff, id) => (
                <option key={id} value={staff.сurator_code}>
                  {staff.curator_name}
                </option>
              ))}
            </select>
          </div>
          <br />

          <button className='btn btn-outline-success' onClick={UpdateInfo}>
            Обновить
          </button>
        </div>
      </div>
    </div>
  )
}
