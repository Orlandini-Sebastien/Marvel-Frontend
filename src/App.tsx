import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { useState } from 'react'
import HomePage from './pages/Characters'
import Header from './components/Header'
import Comics from './pages/Comics'
import Characters from './pages/Characters'
import Character from './pages/Character'
import Favoris from './pages/Favoris'
import ModalLogin from './components/ModalLogin'
import ModalSignUp from './components/ModalSignUp'
import Cookies from 'js-cookie'

function App() {
	//const [token, setToken] = useState(Cookies.get('userToken') || '')
	const [displayLogin, setDisplayLogin] = useState(false)
	const [displaySignUp, setDisplaySignUp] = useState(false)
	const [token, setToken] = useState(Cookies.get('userToken') || '')
	return (
		<Router>
			<Header
				setDisplayLogin={setDisplayLogin}
				setDisplaySignUp={setDisplaySignUp}
				setToken={setToken}
				token={token}
			/>
			<Routes>
				<Route path="/" element={<HomePage />} />
				<Route path="/comics" element={<Comics />} />
				<Route path="/" element={<Characters />} />
				<Route path="/character/:id" element={<Character />} />
				<Route path="/favoris" element={<Favoris />} />
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
