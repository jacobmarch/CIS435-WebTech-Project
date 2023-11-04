import Header from './components/Header';
import SignUpPage from './components/signup';
import LoginPage from './components/login';
import './App.css';

function App() {
  return (
    <div className="App">
    <Header/>
    <div className='CenterContainer'>
      <SignUpPage/>
     { 
     //<LoginPage/>
     }
    </div>
    
  </div>
  );
}

export default App;
