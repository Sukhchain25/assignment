import React from 'react';
import { Route, Routes, BrowserRouter as Router } from 'react-router-dom';

function AppRoutes() {
  return (
    <>
      <Router>
        <Routes>
          <Route path='/' element={<h1>'hello world'</h1>} />
        </Routes>
      </Router>
    </>
  );
}

export default AppRoutes;
