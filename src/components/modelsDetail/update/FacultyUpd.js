import axios from 'axios'
import React, { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router'

export default function FacultyUpd () {
  const [staff, setStaff] = useState([])

  const getStaff = async () => {
    const response = await axios.get('http://127.0.0.1:8000/api/staff/')
    setStaff(response.data)
  }

  useEffect(() => {
    getStaff()
  }, [])

  const { id } = useParams('')

  const [faculty_name, setFaculty_name] = useState('')
  const [deanery_employee_code, setDeanery_employee_code] = useState('')

  const history = useNavigate()

  useEffect(() => {
    const loadInfo = async () => {
      const { data } = await axios.get(
        `http://127.0.0.1:8000/api/faculty/${id}/`
      )
      console.log(data)

      setFaculty_name(data.faculty_name)
      setDeanery_employee_code(data.deanery_employee_code)
    }

    loadInfo()
  }, [id])

  const UpdateInfo = async () => {
    let formField = new FormData()

    formField.append('faculty_name', faculty_name)
    formField.append('deanery_employee_code', deanery_employee_code)

    await axios({
      method: 'PUT',
      url: `http://127.0.0.1:8000/api/faculty/${id}/`,
      data: formField
    })
      .then(response => {
        console.log(response.data)
        history('/faculty')
      })
      .catch(error => {
        document.querySelector('#error-tag').innerHTML =
          'Похоже был выбран уже существующий декан какого-либо факультета'
      })
  }

  return (
    <div>
      <h1>Изменить элемент</h1>
      <p id='error-tag'> </p>
      <div className='container'>
        <div className='form-group'>
          Наименование факультета:
          <div>
            <input
              type='text'
              className='form-control form-control-lg'
              name='faculty_name'
              value={faculty_name}
              placeholder='Наименование факультета'
              onChange={e => setFaculty_name(e.target.value)}
            />
          </div>
          <div className='form-control'>
            <p>Декан:</p>
            <select
              className='form-control form-control-lg'
              name='deanery_employee_code'
              value={deanery_employee_code}
              onChange={e => setDeanery_employee_code(parseInt(e.target.value))}
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
