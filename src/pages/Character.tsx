import { useEffect, useState } from 'react'
import axios from 'axios'
import { useParams } from 'react-router-dom'
import { useLocation } from 'react-router-dom'

const Character = () => {
	const { id } = useParams()
	const location = useLocation()
	console.log('location >>>>', location)
	console.log(id)
	const [isLoading, setIsLoading] = useState(true)
	const [data, setData] = useState([])

	useEffect(() => {
		console.log('dedans')

		const fetchData = async () => {
			try {
				const response = await axios.get(`http://localhost:3000/comic/${id}`)
				console.log('response', response)
				setData(response.data)
			} catch (error) {
				console.log('catch app>>>', error)
			}
			setIsLoading(false)
		}
		fetchData()
	}, [])

	{
		console.log('Dans character >>>>>', data)
	}

	return isLoading ? (
		<div className="flex h-[85vh] w-screen justify-center items-center">
			Loding ...
		</div>
	) : (
		<section className="m-auto w-5/6">
			<h1 className="flex justify-center  h-12 items-center font-bold">
				Les aventures de {location.state.character}
			</h1>
			<div className="flex flex-wrap justify-center ">
				{data.comics.map((comic) => {
					return (
						<div
							className={(comic.thumbnail.path && comic.thumbnail.extension) ? "relative min-w-52  m-2 border-4 border-solid  rounded shadow-2xl flex flex-col w-[18%] h-96" : "hidden"}   
							key={comic._id}
						>
							<img
								className="h-full object-cover"
								src={`${comic.thumbnail.path}\.${comic.thumbnail.extension}`}
								alt={`image de ${comic.name}`}
							/>
						</div>
					)
				})}
			</div>
		</section>
	)
}

export default Character
