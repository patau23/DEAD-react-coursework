import axios from 'axios'
import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

export default function FellowAdd () {
  const [student, setStudent] = useState([])
  const getStudent = async () => {
    const response = await axios.get('http://127.0.0.1:8000/api/student/')
    setStudent(response.data)
  }
  useEffect(() => {
    getStudent()
  }, [])

  /* * * * * * * * */

  const [scholar, setScholar] = useState([])
  const getScholar = async () => {
    const response = await axios.get('http://127.0.0.1:8000/api/scholar-type/')
    setScholar(response.data)
  }
  useEffect(() => {
    getScholar()
  }, [])

  /* * * * * * * * */

  const [student_code, setStudent_code] = useState('')
  const [scholarship_type_code, setScholarship_type_code] = useState('')
  const [
    beginning_of_the_accrual_period,
    setBeginning_of_the_accrual_period
  ] = useState('')
  const [
    ending_of_the_accrual_period,
    setEnding_of_the_accrual_period
  ] = useState('')

  const history = useNavigate()

  const AddInfo = async () => {
    let formField = new FormData()

    console.log(student_code)
    console.log(scholarship_type_code)
    console.log(beginning_of_the_accrual_period)
    console.log(ending_of_the_accrual_period)

    formField.append('student_code', student_code)
    formField.append('scholarship_type_code', scholarship_type_code)
    formField.append(
      'beginning_of_the_accrual_period',
      beginning_of_the_accrual_period
    )
    formField.append(
      'ending_of_the_accrual_period',
      ending_of_the_accrual_period
    )

    console.log(student_code)
    console.log(scholarship_type_code)
    console.log(beginning_of_the_accrual_period)
    console.log(ending_of_the_accrual_period)

    await axios({
      method: 'post',
      url: 'http://127.0.0.1:8000/api/fellow/',
      data: formField
    })
      .then(response => {
        console.log(response.data)
        history('/fellow')
      })
      .catch(error => {
        document.querySelector('#error-tag').innerHTML =
          'Похоже пошло что-то не так'
      })
  }

  return (
    <div>
      <h1> Добавить стипендиата </h1>
      <p id='error-tag'> </p>
      <div className='container'>
        <div className='form-group'>
          <div className='form-control'>
            <p>Студент</p>
            <select
              className='form-control form-control-lg'
              name='student_code'
              value={student_code}
              onChange={e => setStudent_code(parseInt(e.target.value))}
            >
              <option key={-1} value={''}></option>
              {student.map((student, id) => (
                <option key={id} value={student.student_code}>
                  {student.student_name}
                </option>
              ))}
            </select>
          </div>
          <br />

          <div className='form-control'>
            <p>Вид стипендии</p>
            <select
              className='form-control form-control-lg'
              name='scholarship_type_code'
              value={scholarship_type_code}
              onChange={e => setScholarship_type_code(parseInt(e.target.value))}
            >
              <option key={-1} value={''}></option>
              {scholar.map((scholar, id) => (
                <option key={id} value={scholar.scholarship_type_code}>
                  {scholar.scholarship_type_name}
                </option>
              ))}
            </select>
          </div>
          <br />

          <div>
            <p>Дата начисления стипендии</p>
            <input
              className='form-control form-control-lg'
              placeholder='Дата'
              type='date'
              name='beginning_of_the_accrual_period'
              value={beginning_of_the_accrual_period}
              onChange={e => setBeginning_of_the_accrual_period(e.target.value)}
            />
          </div>
          <br />

          <div>
            <p>Дата начисления стипендии</p>
            <input
              className='form-control form-control-lg'
              placeholder='Дата'
              type='date'
              name='ending_of_the_accrual_period'
              value={ending_of_the_accrual_period}
              onChange={e => setEnding_of_the_accrual_period(e.target.value)}
            />
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
