import axios from 'axios'
import React, { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router'

export default function GroupUpd () {
  const [department, setDepartment] = useState([])
  const getFaculty = async () => {
    const response = await axios.get('http://127.0.0.1:8000/api/department/')
    setDepartment(response.data)
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

  const [group_name, setGroup_name] = useState('')
  const [issuing_department_code, setIssuing_department_code] = useState('')
  const [сurator_code, setCurator_code] = useState('')

  const history = useNavigate()

  useEffect(() => {
    const loadInfo = async () => {
      const { data } = await axios.get(`http://127.0.0.1:8000/api/group/${id}/`)
      console.log(data)

      setGroup_name(data.group_name)
      setIssuing_department_code(data.issuing_department_code)
      setCurator_code(data.сurator_code)
    }

    loadInfo()
  }, [id])

  const UpdateInfo = async () => {
    let formField = new FormData()

    formField.append('group_name', group_name)
    formField.append('issuing_department_code', issuing_department_code)
    formField.append('сurator_code', сurator_code)

    await axios({
      method: 'PUT',
      url: `http://127.0.0.1:8000/api/group/${id}/`,
      data: formField
    })
      .then(response => {
        console.log(response.data)
        history('/group')
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
            Название группы
            <input
              type='text'
              className='form-control form-control-lg'
              name='group_name'
              value={group_name}
              placeholder='Наименование кафедры'
              onChange={e => setGroup_name(e.target.value)}
            />
          </div>
          <br />

          <div className='form-control'>
            <p>Выпускающая кафедра</p>
            <select
              className='form-control form-control-lg'
              name='issuing_department_code'
              value={issuing_department_code}
              onChange={e =>
                setIssuing_department_code(parseInt(e.target.value))
              }
            >
              {department.map((department, id) => (
                <option key={id} value={department.department_code}>
                  {department.department_name}
                </option>
              ))}
            </select>
          </div>
          <br />

          <div className='form-control'>
            <p>Куратор</p>
            <select
              className='form-control form-control-lg'
              name='сurator_code'
              value={сurator_code}
              onChange={e => setCurator_code(parseInt(e.target.value))}
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
