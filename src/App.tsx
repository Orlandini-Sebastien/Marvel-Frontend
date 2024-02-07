import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

import HomePage from './pages/Characters'
import Header from './components/Header'
import Comics from './pages/Comics'
import Characters from './pages/Characters'
import SignIn from './pages/SignIn'
import SignUp from './pages/SignUp'
import Character from './pages/Character'

function App() {

	return (
		<Router>
			<Header />
			<Routes>
				<Route path="/" element={<HomePage />} />
				<Route path="/comics" element={<Comics />} />
				<Route path="/" element={<Characters />} />
				<Route path="/character/:id" element={<Character />} />
				<Route path="/signin" element={<SignIn />} />
				<Route path="/signup" element={<SignUp />} />
			</Routes>
		</Router>
	)
}

export default App
