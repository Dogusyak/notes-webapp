import React from 'react';
import './App.css';
import TodoHeader from '../header/Header';
import AppContent from '../appcontent/AppContent';

export function App () {
  return (
   <div className="App">
                <TodoHeader name={"Doguhan Michi"}/>
                <AppContent/>
            </div>
  )
}
