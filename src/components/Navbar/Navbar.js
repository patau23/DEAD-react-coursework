import React from 'react'
import { Link } from 'react-router-dom'
import { Button, ListGroup, Accordion } from 'react-bootstrap'

function Navbar () {
  return (
    <div>
      <Link to='/'>
        <div className='d-grid gap-2'>
          <Button variant='light' size='lg'>
            Главная страница
          </Button>
        </div>
      </Link>
      <a href='http://127.0.0.1:8000/api/'>
        <div className='d-grid gap-2'>
          <Button variant='light' size='lg'>
            API
          </Button>
        </div>
      </a>
      <a href='http://127.0.0.1:8000/admin/'>
        <div className='d-grid gap-2'>
          <Button variant='light' size='lg'>
            Админ панель Django
          </Button>
        </div>
      </a>
      <Accordion defaultActiveKey='0'>
        <Accordion.Item eventKey='0'>
          <Accordion.Header>Модели начисления стипендий</Accordion.Header>
          <Accordion.Body>
            <ListGroup>
              <ListGroup.Item>
                <Link to='/staff/'>Сотрудники</Link>
              </ListGroup.Item>
              <ListGroup.Item>
                <Link to='/faculty/'>Факультеты</Link>
              </ListGroup.Item>
              <ListGroup.Item>
                <Link to='/department/'>Кафедры</Link>
              </ListGroup.Item>
              <ListGroup.Item>
                <Link to='/group/'>Группы</Link>
              </ListGroup.Item>
              <ListGroup.Item>
                <Link to='/student/'>Студенты</Link>
              </ListGroup.Item>
              <ListGroup.Item>
                <Link to='/fellow/'>Стипендиаты</Link>
              </ListGroup.Item>
              <ListGroup.Item>
                <Link to='/accrual/'>Начисления</Link>
              </ListGroup.Item>
            </ListGroup>
          </Accordion.Body>
        </Accordion.Item>
        <Accordion.Item eventKey='1'>
          <Accordion.Header>Остальные модели</Accordion.Header>
          <Accordion.Body>
            <ListGroup>
              <ListGroup.Item>
                <Link to='/bank/'>Банки</Link>
              </ListGroup.Item>
              <ListGroup.Item>
                <Link to='/educ-type/'>Вид обучения</Link>
              </ListGroup.Item>
              <ListGroup.Item>
                <Link to='/scholar-type/'>Вид стипендии</Link>
              </ListGroup.Item>
              <ListGroup.Item>
                <Link to='/scholar-fund/'>Стипенд. Фонды</Link>
              </ListGroup.Item>
            </ListGroup>
          </Accordion.Body>
        </Accordion.Item>
      </Accordion>
    </div>
  )
}

export default Navbar
