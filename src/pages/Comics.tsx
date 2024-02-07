import { useEffect, useState } from 'react'
import axios from 'axios'


const Comics = () => {
	const [isLoading, setIsLoading] = useState(true)
	const [data, setData] = useState([])
	const descriptionToggleInitial: boolean[] = new Array(100).fill(false)
	const [descriptionToggle, setDescriptionToggle] = useState(
		descriptionToggleInitial
	)
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
		<main className='bg-black'>
					<section className="m-auto w-5/6">
			<h1 className="flex justify-center  h-12 items-center font-bold text-white ">
				Comics
			</h1>
			<div className="flex flex-wrap justify-center ">
				{data.map((comic, index) => {
					return (
						<div className="relative">
							<div
								className="shadow-white shadow-xl relative min-w-60  my-2  border-2 border-white border-solid  rounded  flex flex-col w-[18%] h-96  "
								key={comic._id}
							>
								<img
									className=" h-full object-cover"
									src={`${comic.thumbnail.path}\.${comic.thumbnail.extension}`}
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

export default Comics
