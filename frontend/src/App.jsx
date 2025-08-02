import React from 'react'
import { Routes, Route } from 'react-router-dom'; 
import Homepage from './pages/Homepage.jsx';
import CreatePage from './pages/CreatePage.jsx';
import NoteDetailPage from './pages/NoteDetailPage.jsx';
import {Toaster,toast} from 'react-hot-toast';

const App = () => {
  return (
    <div data-theme="lemonade" className='min-h-screen bg-base-200'>
      
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/create" element={<CreatePage />} />
        <Route path="/note/:id" element={<NoteDetailPage />} />
      </Routes>
    </div>
  )
}

export default App
