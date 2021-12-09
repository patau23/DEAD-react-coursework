import axios from 'axios'
import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

export default function FacultyAdd () {
  const [staff, setStaff] = useState([])

  const getStaff = async () => {
    const response = await axios.get('http://127.0.0.1:8000/api/staff/')
    setStaff(response.data)
  }

  useEffect(() => {
    getStaff()
  }, [])

  /*  */

  function someshit (e) {
    console.log(e)
    console.log(e.target)
    console.log(typeof e.target.value)
    setDeanery_employee_codee(parseInt(e.target.value))
  }

  const [faculty_name, setFaculty_name] = useState('')
  const [deanery_employee_code, setDeanery_employee_codee] = useState(0)

  const history = useNavigate()

  const AddInfo = async () => {
    let formField = new FormData()
    
    formField.append('faculty_name', faculty_name)
    formField.append('deanery_employee_code', deanery_employee_code)

    await axios({
      method: 'post',
      url: 'http://127.0.0.1:8000/api/faculty/',
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
      <h1> Добавить факультет </h1>
      <p id='error-tag'> </p>
      <div className='container'>
        <div className='form-group'>
          <div>
            <p>Наименование факультета:</p>
            <input
              className='form-control form-control-lg'
              placeholder='Введите наименование факультета'
              type='text'
              name='faculty_name'
              value={faculty_name}
              onChange={e => setFaculty_name(e.target.value)}
            />
          </div>
          <br />
          <div className='form-control'>
            <p>Декан:</p>
            <select
              className='form-control form-control-lg'
              name='deanery_employee_code'
              value={deanery_employee_code}
              onChange={e => someshit(e)}
            >
              <option key={-1} value={''}></option>
              {staff.map((staff, id) => (
                <option key={id} value={staff.сurator_code}>
                  {staff.curator_name}
                  {/* {console.log(staff.curator_name, staff.сurator_code)} */}
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
