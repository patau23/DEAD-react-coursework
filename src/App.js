import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

/* COMPONENTS */
import Navbar from './components/Navbar/Navbar'

/* PAGES */
import HomePage from './components/HomePage/HomePage'

import BankShow from './components/modelsDetail/show/BankShow'
import BankAdd from './components/modelsDetail/add/BankAdd'
import BankUpd from './components/modelsDetail/update/BankUpd'

import StaffShow from './components/modelsDetail/show/StaffShow'
import StaffAdd from './components/modelsDetail/add/StaffAdd'
import StaffUpd from './components/modelsDetail/update/StaffUpd'

import FacultyShow from './components/modelsDetail/show/FacultyShow'
import FacultyAdd from './components/modelsDetail/add/FacultyAdd'
import FacultyUpd from './components/modelsDetail/update/FacultyUpd'

import DepartmentShow from './components/modelsDetail/show/DepartmentShow'
import DepartmentAdd from './components/modelsDetail/add/DepartmentAdd'
import DepartmentUpd from './components/modelsDetail/update/DepartmentUpd'

import GroupShow from './components/modelsDetail/show/GroupShow'
import GroupAdd from './components/modelsDetail/add/GroupAdd'
import GroupUpd from './components/modelsDetail/update/GroupUpd'

import StudentShow from './components/modelsDetail/show/StudentShow'
import StudentAdd from './components/modelsDetail/add/StudentAdd'
import StudentUpd from './components/modelsDetail/update/StudentUpd'

import AccrualShow from './components/modelsDetail/show/AccrualShow'
import AccrualAdd from './components/modelsDetail/add/AccrualAdd'
import AccrualUpd from './components/modelsDetail/update/AccrualUpd'

import FellowShow from './components/modelsDetail/show/FellowShow'
import FellowAdd from './components/modelsDetail/add/FellowAdd'
import FellowUpd from './components/modelsDetail/update/FellowUpd'

import TypesofEducationShow from './components/modelsDetail/show/TypesofEducationShow'

import TypesofScholarShow from './components/modelsDetail/show/TypesofScholarShow'

import ScholarshipFundShow from './components/modelsDetail/show/ScholarshipFundShow'
/* 



*/
export default function App () {
  return (
    <div className='App'>
      <Router>
        {/* SLPIT RIGHT */}
        <div className='split right'>
          <Navbar />
        </div>

        {/* SPLIT LEFT */}
        <div className='split left'>
          <Routes>
            <Route exact path='/' element={<HomePage />} />

            <Route exact path='/bank' element={<BankShow />} />
            <Route exact path='/bank/add' element={<BankAdd />} />
            <Route exact path='/bank/:id/update' element={<BankUpd />} />

            <Route exact path='/educ-type' element={<TypesofEducationShow />} />

            <Route
              exact
              path='/scholar-type'
              element={<TypesofScholarShow />}
            />

            <Route
              exact
              path='/scholar-fund'
              element={<ScholarshipFundShow />}
            />

            {/* * */}
            <Route exact path='/staff' element={<StaffShow />} />
            <Route exact path='/staff/add' element={<StaffAdd />} />
            <Route exact path='/staff/:id/update' element={<StaffUpd />} />

            <Route exact path='/faculty' element={<FacultyShow />} />
            <Route exact path='/faculty/add' element={<FacultyAdd />} />
            <Route exact path='/faculty/:id/update' element={<FacultyUpd />} />

            <Route exact path='/department' element={<DepartmentShow />} />
            <Route exact path='/department/add' element={<DepartmentAdd />} />
            <Route
              exact
              path='/department/:id/update'
              element={<DepartmentUpd />}
            />

            <Route exact path='/group' element={<GroupShow />} />
            <Route exact path='/group/add' element={<GroupAdd />} />
            <Route exact path='/group/:id/update' element={<GroupUpd />} />

            <Route exact path='/student' element={<StudentShow />} />
            <Route exact path='/student/add' element={<StudentAdd />} />
            <Route exact path='/student/:id/update' element={<StudentUpd />} />

            <Route exact path='/accrual' element={<AccrualShow />} />
            <Route exact path='/accrual/add' element={<AccrualAdd />} />
            <Route exact path='/accrual/:id/update' element={<AccrualUpd />} />

            <Route exact path='/fellow' element={<FellowShow />} />
            <Route exact path='/fellow/add' element={<FellowAdd />} />
            <Route exact path='/fellow/:id/update' element={<FellowUpd />} />
            {/* * */}
          </Routes>
        </div>
      </Router>
    </div>
  )
}
