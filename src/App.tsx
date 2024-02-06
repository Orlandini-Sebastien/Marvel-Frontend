import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

import HomePage from './pages/HomePage'
import Header from './components/Header'
import Comics from './pages/Comics'
import Characters from './pages/Characters'
import SignIn from './pages/SignIn'
import SignUp from './pages/SignUp'

function App() {

	return (
		<Router>
			<Header />
			<Routes>
				<Route path="/" element={<HomePage />} />
				<Route path="/comics" element={<Comics />} />
				<Route path="/characters" element={<Characters />} />
				<Route path="/signin" element={<SignIn />} />
				<Route path="/signup" element={<SignUp />} />
			</Routes>
		</Router>
	)
}

export default App
