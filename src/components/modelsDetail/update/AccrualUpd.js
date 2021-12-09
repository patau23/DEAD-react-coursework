import axios from 'axios'
import React, { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router'

export default function AccrualUpd () {

  const { id } = useParams(0)

  const [student_code, setStudent_code] = useState('')
  const [student_code_val, setStudent_code_val] = useState('')
  const [
    date_of_scholarship_accrual,
    setDate_of_scholarship_accrual
  ] = useState('')
  const [amount_of_money, setAmount_of_money] = useState('')

  const history = useNavigate()

  useEffect(() => {
    const loadInfo = async () => {
      console.log('bruh')
      const { data } = await axios.get(
        `http://127.0.0.1:8000/api/accrual/${id}/`
      )
      console.log(data)

      setStudent_code(data.student_code)
      setStudent_code_val(data.student_code_val)
      setDate_of_scholarship_accrual(data.date_of_scholarship_accrual)
      setAmount_of_money(data.amount_of_money)
    }
    loadInfo()
  }, [id])

  const UpdateInfo = async () => {
    let formField = new FormData()

    console.log(student_code)

    formField.append('student_code', student_code)
    formField.append('date_of_scholarship_accrual', date_of_scholarship_accrual)
    formField.append('amount_of_money', amount_of_money)

    console.log(student_code)

    await axios({
      method: 'PUT',
      url: `http://127.0.0.1:8000/api/accrual/${id}/`,
      data: formField
    })
      .then(response => {
        console.log(response.data)
        history('/accrual')
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
          <div className='form-control'>
            <p>Студент {student_code}:</p>
            <h3>{student_code_val}</h3>
          </div>
          <br />

          <div>
            <p>Дата начисления стипендии</p>
            <input
              type='date'
              className='form-control form-control-lg'
              name='date_of_scholarship_accrual'
              value={date_of_scholarship_accrual}
              placeholder=''
              onChange={e => setDate_of_scholarship_accrual(e.target.value)}
            />
          </div>
          <br />

          <div>
            <p>Сумма</p>
            <input
              type='text'
              className='form-control form-control-lg'
              name='amount_of_money'
              value={amount_of_money}
              placeholder=''
              onChange={e => setAmount_of_money(parseInt(e.target.value))}
            />
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
