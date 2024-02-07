import { useEffect, useState } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'

const Characters = () => {
	const [isLoading, setIsLoading] = useState(true)
	const [data, setData] = useState([])

	useEffect(() => {
		console.log('dedans')

		const fetchData = async () => {
			try {
				const response = await axios.get('http://localhost:3000/characters')

				setData(response.data)
			} catch (error) {
				console.log('catch app>>>', error)
			}
			setIsLoading(false)
		}
		fetchData()
	}, [])

	{
		console.log('Dans characters >>', data)
	}

	return isLoading ? (
		<div className="flex h-[85vh] w-screen justify-center items-center">
			Loding ...
		</div>
	) : (
		<section className="m-auto w-5/6">
			<h1 className="flex justify-center  h-12 items-center font-bold">
			
				Liste des personnages
			</h1>
			<div className="flex flex-wrap justify-center ">
				{data.map((character) => {
					return (
						
						<Link
							className="relative min-w-52  m-2 border-4 border-solid  rounded shadow-2xl flex flex-col w-[18%] h-96  "
							to={`/character/${character._id}`}
							state={{ from: '/characters', character: character.name }}
							key={character._id}
						>
							<img
								className="h-full object-cover"
								src={`${character.thumbnail.path}/portrait_uncanny\.${character.thumbnail.extension}`}
								alt={`image de ${character.name}`}
							/>

							<div className="absolute font-bold w-full ">
								<div className="flex justify-center bg-red-300 bg-opacity-60">
									{character.name}
								</div>
							</div>

							<div
								className={
									character.description ?
									'absolute h-20 bottom-0 font-bold  w-full bg-red-300 bg-opacity-60 ' : 'hidden'
								}
							>
								<div className="flex h-20 overflow-hidden overflow-y-scroll   ">
									{character.description}
								</div>
							</div>
						</Link>
					)
				})}
			</div>
		</section>
	)
}

export default Characters
