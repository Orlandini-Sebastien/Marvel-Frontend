import { useEffect, useState } from 'react'
import axios from 'axios'

type comicType = {
	_id: string
	title: string
	thumbnail: {
		path: string
		extension: string
	}
	description: string
}

const Comics = () => {
	const [isLoading, setIsLoading] = useState(true)
	const [data, setData] = useState([])
	const [page, setPage] = useState(0)
	const descriptionToggleInitial: boolean[] = new Array(100).fill(false)
	const [descriptionToggle, setDescriptionToggle] = useState(
		descriptionToggleInitial
	)
	const [searchComic, setSearchComic] = useState('')

	const handlesearchComic = (
		event: React.ChangeEvent<HTMLInputElement>
	): void => {
		const value = event.target.value
		setPage(0)
		setSearchComic(value)
	}

	const handleDescription = (index: number) => {
		const newValue = [...descriptionToggle]
		if (newValue[index] === false) newValue[index] = true
		else newValue[index] = false
		setDescriptionToggle(newValue)
	}

	useEffect(() => {
		console.log('dedans')

		const fetchData = async () => {
			try {
				const response = await axios.get(
					`http://localhost:3000/comics?page=${page}&comic=${searchComic}`
				)

				setData(response.data)
			} catch (error) {
				console.log('catch app>>>', error)
			}
			setIsLoading(false)
		}
		fetchData()
	}, [page, searchComic])

	{
		console.log('Dans comics >>', data)
	}

	return isLoading ? (
		<div className="flex h-[85vh] w-screen justify-center items-center">
			Loading ...
		</div>
	) : (
	
			<section className="m-auto w-5/6">
				<div className="flex justify-center items-center">
					<label
						htmlFor="searchComic"
						className="flex justify-center  h-12 items-center font-bold text-white"
					>
						Comics
					</label>
					<input
						type="text"
						placeholder="search"
						id="searchComic"
						name="searchComic"
						value={searchComic}
						onChange={handlesearchComic}
						className="bg-red-100 rounded h-7 mx-2"
					/>
				</div>
				<div className="flex flex-wrap justify-center w-full ">
					{data.map((comic: comicType, index: number) => {
						return (
							<div
								className="relative xl:w-1/4 lg:w-1/3 md:w-1/2 "
								key={comic._id}
							>
								<div className="shadow-white shadow-xl relative  m-2  border-2 border-white border-solid  rounded  flex flex-col  h-96  ">
									<img
										className=" h-full object-cover"
										src={`${comic.thumbnail.path}.${comic.thumbnail.extension}`}
										alt={`image de ${comic.title}`}
									/>
									<div className="absolute font-bold w-full  ">
										<div className="flex justify-center bg-red-300 bg-opacity-60 rounded">
											{comic.title}
										</div>
									</div>

									<div
										className={
											descriptionToggle[index]
												? 'absolute top-12 font-bold  w-full bg-red-300 bg-opacity-60 flex rounded  '
												: 'hidden'
										}
									>
										{comic.description}
									</div>
								</div>

								<button
									className={
										comic.description
											? 'absolute left-1/2 transform -translate-x-1/2  z-10 bg-slate-100 bg-opacity-70  rounded bottom-4 border-2 border-red-400 '
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

				<div className="text-white flex justify-center h-20">
					<button
						onClick={() => {
							setPage(0)
						}}
						className="px-1"
					>
						{' '}
						1
					</button>
					<button
						onClick={() => {
							setPage(1)
						}}
						className="px-1"
					>
						{' '}
						2
					</button>
					<button
						onClick={() => {
							setPage(2)
						}}
						className="px-1"
					>
						{' '}
						3
					</button>
					<button
						onClick={() => {
							setPage(3)
						}}
						className="px-1"
					>
						{' '}
						4
					</button>
					<button
						onClick={() => {
							setPage(4)
						}}
						className="px-1"
					>
						{' '}
						5
					</button>
					<button
						onClick={() => {
							setPage(5)
						}}
						className="px-1"
					>
						{' '}
						6
					</button>
					<button
						onClick={() => {
							setPage(6)
						}}
						className="px-1"
					>
						{' '}
						7
					</button>
					<button
						onClick={() => {
							setPage(7)
						}}
						className="px-1"
					>
						{' '}
						8
					</button>
				</div>
			</section>
	
	)
}

export default Comics