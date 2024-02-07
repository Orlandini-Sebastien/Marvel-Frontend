import { useEffect, useState } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'

const Characters = () => {
	const descriptionToggleInitial: boolean[] = new Array(100).fill(false)
	const [isLoading, setIsLoading] = useState(true)
	const [data, setData] = useState([])
	const [descriptionToggle, setDescriptionToggle] = useState(
		descriptionToggleInitial
	)

	const handleDescription = (index: number) => {
		const newValue = [...descriptionToggle]
		console.log('index', index)
		console.log(newValue[index])
		if (newValue[index] === false) newValue[index] = true
		else newValue[index] = false
		setDescriptionToggle(newValue)
		console.log('je viens de clique')
		console.log('state >>>', descriptionToggle)
	}

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

	return isLoading ? (
		<div className="flex h-[85vh] w-screen justify-center items-center">
			Loding ...
		</div>
	) : (
		<main className='bg-black '>
					<section className="m-auto w-5/6">
			<h1 className="flex justify-center  h-12 items-center font-bold text-white">
				Characters
			</h1>
			<div className="flex flex-wrap justify-center ">
				{data.map((character, index) => {
					return (
						<div className="relative ">
							<Link
								className="shadow-white shadow-xl relative min-w-60  my-2  border-2 border-solid border-white  rounded flex flex-col w-[18%] h-96  "
								to={`/character/${character._id}`}
								state={{ from: '/characters', character: character.name }}
								key={character._id}
							>
								<img
									className="h-full object-cover"
									src={`${character.thumbnail.path}/portrait_uncanny\.${character.thumbnail.extension}`}
									alt={`image de ${character.name}`}
								/>

								<div className="absolute font-bold w-full  ">
									<div className="flex justify-center bg-red-300 bg-opacity-60 rounded">
										{character.name}
									</div>
								</div>

								<div
									className={
										descriptionToggle[index]
											? 'absolute top-12 font-bold  w-full bg-red-300 bg-opacity-60 flex rounded  '
											: 'hidden'
									}
								>
									{character.description}
								</div>
							</Link>

							<button
								className={
									character.description
										? 'right-[36%] absolute z-10 bg-slate-100 bg-opacity-70  rounded bottom-4 border-2 border-red-400 '
										: 'hidden'
								}
								onClick={() => handleDescription(index)}
							>
								description
							</button>
						</div>
					)
				})}
			</div>
		</section>
		</main>

	)
}

export default Characters
