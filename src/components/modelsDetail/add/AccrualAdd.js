import axios from 'axios'
import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

export default function AccrualAdd () {
  const [student, setStudent] = useState([])
  const getStudent = async () => {
    const response = await axios.get('http://127.0.0.1:8000/api/student/')
    setStudent(response.data)
  }
  useEffect(() => {
    getStudent()
  }, [])

  /* * * * * * * * */

  const [student_code, setStudent_code] = useState('')
  const [
    date_of_scholarship_accrual,
    setDate_of_scholarship_accrual
  ] = useState('')
  const [amount_of_money, setAmount_of_money] = useState('')

  const history = useNavigate()

  const AddInfo = async () => {
    let formField = new FormData()

    console.log(student_code)
    console.log(date_of_scholarship_accrual)
    console.log(amount_of_money)

    formField.append('student_code', student_code)
    formField.append('date_of_scholarship_accrual', date_of_scholarship_accrual)
    formField.append('amount_of_money', amount_of_money)

    console.log(student_code)
    console.log(date_of_scholarship_accrual)
    console.log(amount_of_money)

    await axios({
      method: 'post',
      url: 'http://127.0.0.1:8000/api/accrual/',
      data: formField
    })
      .then(response => {
        console.log(response.data)
        history('/accrual')
      })
      .catch(error => {
        document.querySelector('#error-tag').innerHTML = 'Что-то пошло не так'
      })
  }

  return (
    <div>
      <h1> Добавить начисление </h1>
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

          <div>
            <p>Дата начисления стипендии</p>
            <input
              className='form-control form-control-lg'
              placeholder='Дата'
              type='date'
              name='date_of_scholarship_accrual'
              value={date_of_scholarship_accrual}
              onChange={e => setDate_of_scholarship_accrual(e.target.value)}
            />
          </div>
          <br />

          <div>
            <p>Сумма</p>
            <input
              className='form-control form-control-lg'
              placeholder='Сумма'
              type='number'
              name='amount_of_money'
              value={amount_of_money}
              onChange={e => setAmount_of_money(parseInt(e.target.value))}
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
