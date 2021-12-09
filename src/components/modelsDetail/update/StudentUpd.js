import axios from 'axios'
import React, { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router'

export default function StudentUpd () {
  const [group, setGroup] = useState([])
  const getGroup = async () => {
    const response = await axios.get('http://127.0.0.1:8000/api/group/')
    setGroup(response.data)
  }
  useEffect(() => {
    getGroup()
  }, [])

  /* * * * * * * * */

  const [edu, setEdu] = useState([])
  const getEdu = async () => {
    const response = await axios.get('http://127.0.0.1:8000/api/educ-type/')
    setEdu(response.data)
  }
  useEffect(() => {
    getEdu()
  }, [])

  /* * * * * * * * */

  const [bank, setBank] = useState([])
  const getBank = async () => {
    const response = await axios.get('http://127.0.0.1:8000/api/bank/')
    setBank(response.data)
  }
  useEffect(() => {
    getBank()
  }, [])

  /* * * * * * * * */

  const { id } = useParams('')

  const [student_name, setStudent_name] = useState('')
  const [group_code, setGroup_code] = useState('')
  const [education_type_code, setEducation_type_code] = useState('')
  const [personal_reckoning_number, setPersonal_reckoning_number] = useState('')
  const [bank_code, setBank_code] = useState('')

  const history = useNavigate()

  useEffect(() => {
    const loadInfo = async () => {
      const { data } = await axios.get(
        `http://127.0.0.1:8000/api/student/${id}/`
      )
      console.log(data)

      setStudent_name(data.student_name)
      setGroup_code(data.group_code)
      setEducation_type_code(data.education_type_code)
      setPersonal_reckoning_number(data.personal_reckoning_number)
      setBank_code(data.bank_code)
    }

    loadInfo()
  }, [id])

  const UpdateInfo = async () => {
    let formField = new FormData()

    formField.append('student_name', student_name)
    formField.append('group_code', group_code)
    formField.append('education_type_code', education_type_code)
    formField.append('personal_reckoning_number', personal_reckoning_number)
    formField.append('bank_code', bank_code)

    await axios({
      method: 'PUT',
      url: `http://127.0.0.1:8000/api/student/${id}/`,
      data: formField
    })
      .then(response => {
        console.log(response.data)
        history('/student')
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
            <p>ФИО</p>
            <input
              type='text'
              className='form-control form-control-lg'
              name='student_name'
              value={student_name}
              placeholder=''
              onChange={e => setStudent_name(e.target.value)}
            />
          </div>
          <br />

          <div className='form-control'>
            <p>Группа</p>
            <select
              className='form-control form-control-lg'
              name='group_code'
              value={group_code}
              onChange={e => setGroup_code(parseInt(e.target.value))}
            >
              {group.map((group, id) => (
                <option key={id} value={group.group_code}>
                  {group.group_name}
                </option>
              ))}
            </select>
          </div>
          <br />

          <div className='form-control'>
            <p>Вид обучения</p>
            <select
              className='form-control form-control-lg'
              name='education_type_code'
              value={education_type_code}
              onChange={e => setEducation_type_code(parseInt(e.target.value))}
            >
              {edu.map((edu, id) => (
                <option key={id} value={edu.education_type_code}>
                  {edu.education_type_name}
                </option>
              ))}
            </select>
          </div>
          <br />

          <div>
            <p>Номер лицевого счета</p>
            <input
              type='text'
              className='form-control form-control-lg'
              name='personal_reckoning_number'
              value={personal_reckoning_number}
              placeholder=''
              onChange={e => setPersonal_reckoning_number(e.target.value)}
            />
          </div>
          <br />

          <div className='form-control'>
            <p>Банк</p>
            <select
              className='form-control form-control-lg'
              name='bank_code'
              value={bank_code}
              onChange={e => setBank_code(parseInt(e.target.value))}
            >
              {bank.map((bank, id) => (
                <option key={id} value={bank.bank_code}>
                  {bank.bank_name}
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
