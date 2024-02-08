import { useEffect, useState } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'

type characterType = {
	_id: string
	name: string
	thumbnail: {
		path: string
		extension: string
	}
	description: string
}

const Characters = () => {
	const descriptionToggleInitial: boolean[] = new Array(100).fill(false)
	const [isLoading, setIsLoading] = useState(true)
	const [data, setData] = useState([])
	const [page, setPage] = useState(0)
	const [descriptionToggle, setDescriptionToggle] = useState(
		descriptionToggleInitial
	)
	const [searchCharacter, setSearchCharacter] = useState('')

	const handlesearchCharacter = (
		event: React.ChangeEvent<HTMLInputElement>
	): void => {
		const value = event.target.value
		setPage(0)
		setSearchCharacter(value)
	}

	const pagination = () => {
		console.log(data.length)
		const array: number[] = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14]
		const newArray = array.map((number, index) => {
			return (
				<button
					key={index}
					onClick={() => {
						setPage(number)
					}}
					className="px-1"
				>
					{number + 1}
				</button>
			)
		})
		return newArray
	}

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
				const response = await axios.get(
					`http://localhost:3000/characters?page=${page}&character=${searchCharacter}`
				)

				setData(response.data)
			} catch (error) {
				console.log('catch app>>>', error)
			}
			setIsLoading(false)
		}
		fetchData()
	}, [page, searchCharacter])

	return isLoading ? (
		<div className="flex h-[85vh] w-screen justify-center items-center">
			Loding ...
		</div>
	) : (
		
			<section className="m-auto w-5/6">
				<div className="flex justify-center items-center">
					<label
						htmlFor="searchCharacter"
						className="flex justify-center  h-12 items-center font-bold text-white"
					>
						Characters
					</label>
					<input
						type="text"
						placeholder="search"
						id="searchCharacter"
						name="searchCharacter"
						value={searchCharacter}
						onChange={handlesearchCharacter}
						className="bg-red-100 rounded h-7 mx-2"
					/>
				</div>

				<div className="flex flex-wrap justify-center w-full  ">
					{data.map((character: characterType, index: number) => {
						return (
							<div
								key={character._id}
								className="relative xl:w-1/4 lg:w-1/3 md:w-1/2 "
							>
								<Link
									className="shadow-white shadow-xl relative  m-2  border-2 border-white border-solid  rounded  flex flex-col  h-96  "
									to={`/character/${character._id}`}
									state={{ from: '/characters', character: character.name }}
								>
									<img
										className="h-full object-cover"
										src={`${character.thumbnail.path}/portrait_uncanny.${character.thumbnail.extension}`}
										alt={`image de ${character.name}`}
									/>

									<div className="absolute font-bold w-full  ">
										<div
											className={
												descriptionToggle[index]
													? 'hidden'
													: 'flex justify-center bg-red-300 bg-opacity-60 rounded font-extrabold my-2 mx-4'
											}
										>
											{character.name}
										</div>
									</div>

									<div
										className={
											descriptionToggle[index]
												? 'absolute  font-bold  w-full bg-red-300 bg-opacity-60 flex rounded  flex-col '
												: 'hidden'
										}
									>
										<div className="flex  justify-center font-extrabold my-2 ">
											{character.name}
										</div>
										<div>{character.description}</div>
									</div>
								</Link>

								<button
									className={
										character.description
											? 'absolute left-1/2 transform -translate-x-1/2  z-10 bg-slate-100 bg-opacity-70  rounded bottom-4 border-2 border-red-400 font-bold '
											: 'hidden'
									}
									onClick={() => handleDescription(index)}
								>
									DESCRIPTION
								</button>
							</div>
						)
					})}
				</div>

				<div className="text-white flex justify-center h-20 ">
					{pagination()}
				</div>
			</section>
	
	)
}

export default Characters
