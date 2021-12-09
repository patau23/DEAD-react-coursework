import axios from 'axios'
import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

export default function GroupAdd () {
  const [staff, setStaff] = useState([])
  const getStaff = async () => {
    const response = await axios.get('http://127.0.0.1:8000/api/staff/')
    setStaff(response.data)
  }
  useEffect(() => {
    getStaff()
  }, [])

  /* * * * * * * * */

  const [department, setDepartment] = useState([])
  const getDepartment = async () => {
    const response = await axios.get('http://127.0.0.1:8000/api/department/')
    setDepartment(response.data)
  }
  useEffect(() => {
    getDepartment()
  }, [])

  /* * * * * * * * */

  const [group_name, setGroup_name] = useState('')
  const [сurator_code, setCurator_code] = useState('')
  const [issuing_department_code, setIssuing_department_code] = useState('')

  const history = useNavigate()

  const AddInfo = async () => {
    let formField = new FormData()

    console.log(group_name)
    console.log(сurator_code)
    console.log(issuing_department_code)

    formField.append('group_name', group_name)
    formField.append('сurator_code', сurator_code)
    formField.append('issuing_department_code', issuing_department_code)

    console.log(group_name)
    console.log(сurator_code)
    console.log(issuing_department_code)

    await axios({
      method: 'post',
      url: 'http://127.0.0.1:8000/api/group/',
      data: formField
    })
      .then(response => {
        console.log(response.data)
        history('/group')
      })
      .catch(error => {
        document.querySelector('#error-tag').innerHTML =
          'Пошло что-то не так :('
      })
  }

  return (
    <div>
      <h1>Добавить группу</h1>
      <p id='error-tag'> </p>
      <div className='container'>
        <div className='form-group'>
          <div>
            <p>Наименование группы</p>
            <input
              className='form-control form-control-lg'
              placeholder='Введите наименование группы'
              type='text'
              name='group_name'
              value={group_name}
              onChange={e => setGroup_name(e.target.value)}
            />
          </div>
          <br />

          <div className='form-control'>
            <p>Куратор:</p>
            <select
              className='form-control form-control-lg'
              name='сurator_code'
              value={сurator_code}
              onChange={e => setCurator_code(e.target.value)}
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
            <p>Кафедра выпускающая группу: </p>
            <select
              className='form-control form-control-lg'
              name='issuing_department_code'
              value={issuing_department_code}
              onChange={e => setIssuing_department_code(e.target.value)}
            >
              {department.map((department, id) => (
                <option key={id} value={department.department_code}>
                  {department.department_name}
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
