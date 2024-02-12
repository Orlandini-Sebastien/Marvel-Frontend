import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { useState } from 'react'
import Header from './components/Header'
import Comics from './pages/Comics'
import Characters from './pages/Characters'
import Character from './pages/Character'
import Favoris from './pages/Favoris'
import ModalLogin from './components/ModalLogin'
import ModalSignUp from './components/ModalSignUp'
import Cookies from 'js-cookie'

function App() {
	
	const [displayLogin, setDisplayLogin] = useState(false)
	const [displaySignUp, setDisplaySignUp] = useState(false)
	const [token, setToken] = useState(Cookies.get('userToken') || '')
	const [data, setData] = useState([]);
	return (
		<Router>
			<Header
				setDisplayLogin={setDisplayLogin}
				setDisplaySignUp={setDisplaySignUp}
				setToken={setToken}
				token={token}
			/>
			<Routes>
			
				<Route path="/comics" element={<Comics />} />
				<Route path="/" element={<Characters data={data} setData={setData}	 />} />
				<Route path="/character/:id" element={<Character />} />
				<Route path="/favoris" element={<Favoris token={token} setDisplayLogin={setDisplayLogin} />} />
			</Routes>
			{displayLogin && (
				<ModalLogin
					setDisplayLogin={setDisplayLogin}
					setDisplaySignUp={setDisplaySignUp}
					setToken={setToken}
				/>
			)}
			{displaySignUp && (
				<ModalSignUp
					setDisplaySignUp={setDisplaySignUp}
					setDisplayLogin={setDisplayLogin}
					setToken={setToken}
				/>
			)}
		</Router>
	)
}

export default App
