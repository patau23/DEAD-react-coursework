import axios from 'axios'
import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

export default function StudentAdd () {
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

  const [student_name, setStudent_name] = useState('')
  const [group_code, setGroup_code] = useState('')
  const [education_type_code, setEducation_type_code] = useState('')
  const [personal_reckoning_number, setPersonal_reckoning_number] = useState('')
  const [bank_code, setBank_code] = useState('')

  const history = useNavigate()

  const AddInfo = async () => {
    let formField = new FormData()

    console.log(student_name)
    console.log(group_code)
    console.log(education_type_code)
    console.log(personal_reckoning_number)
    console.log(bank_code)

    formField.append('student_name', student_name)
    formField.append('group_code', group_code)
    formField.append('education_type_code', education_type_code)
    formField.append('personal_reckoning_number', personal_reckoning_number)
    formField.append('bank_code', bank_code)

    console.log(student_name)
    console.log(group_code)
    console.log(education_type_code)
    console.log(personal_reckoning_number)
    console.log(bank_code)

    await axios({
      method: 'post',
      url: 'http://127.0.0.1:8000/api/student/',
      data: formField
    })
      .then(response => {
        console.log(response.data)
        history('/student')
      })
      .catch(error => {
        document.querySelector('#error-tag').innerHTML =
          'Похоже что-то пошло не так :('
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
              placeholder='Введите ФИО'
              type='text'
              name='student_name'
              value={student_name}
              onChange={e => setStudent_name(e.target.value)}
            />
          </div>
          <br />

          <div>
            <p>Номер лицевого счета</p>
            <input
              className='form-control form-control-lg'
              placeholder='Введите лицевой счет студента'
              type='text'
              name='personal_reckoning_number'
              value={personal_reckoning_number}
              onChange={e => setPersonal_reckoning_number(e.target.value)}
            />
          </div>
          <br />

          <div className='form-control'>
            <p>Группа</p>
            <select
              className='form-control form-control-lg'
              name='group_code'
              value={group_code}
              onChange={e => setGroup_code(e.target.value)}
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
            <p>Тип обучения</p>
            <select
              className='form-control form-control-lg'
              name='education_type_code'
              value={education_type_code}
              onChange={e => setEducation_type_code(e.target.value)}
            >
              {edu.map((edu, id) => (
                <option key={id} value={edu.education_type_code}>
                  {edu.education_type_name}
                </option>
              ))}
            </select>
          </div>
          <br />

          <div className='form-control'>
            <p>Банк</p>
            <select
              className='form-control form-control-lg'
              name='bank_code'
              value={bank_code}
              onChange={e => setBank_code(e.target.value)}
            >
              <option key={-1} value={''}></option>
              {bank.map((bank, id) => (
                <option key={id} value={bank.bank_code}>
                  {bank.bank_name}
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
