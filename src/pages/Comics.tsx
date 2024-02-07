import { useEffect, useState } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'

const Comics = () => {
	const [isLoading, setIsLoading] = useState(true)
	const [data, setData] = useState([])

	useEffect(() => {
		console.log('dedans')

		const fetchData = async () => {
			try {
				const response = await axios.get('http://localhost:3000/comics')

				setData(response.data)
			} catch (error) {
				console.log('catch app>>>', error)
			}
			setIsLoading(false)
		}
		fetchData()
	}, [])

	{
		console.log('Dans comics >>', data)
	}

	return isLoading ? (
		<div className="flex h-[85vh] w-screen justify-center items-center">
			Loading ...
		</div>
	) : (
		<div className="w-4/5 m-auto flex flex-wrap ">
			{data.map((character) => {
				return (
					<div
						
						
						className=" w-1/4 border border-solid flex flex-col "
						key={character._id}
					>
						<img
							className="object-cover"
							src={`${character.thumbnail.path}\.${character.thumbnail.extension}`}
							alt={`image de ${character.name}`}
						/>
						<div> {character.name}</div>
						<div> {character.description}</div>
					</div>
				)
			})}
		</div>
	)
}

export default Comics
