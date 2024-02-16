import { useEffect, useState } from 'react'
import axios from 'axios'
import { useParams } from 'react-router-dom'
import { useLocation } from 'react-router-dom'
import { motion } from 'framer-motion'

type comicType = {
	_id: string
	title: string
	thumbnail: {
		path: string
		extension: string
	}
	description: string
}

const Character = () => {
	const { id } = useParams()
	const location = useLocation()
	const [isLoading, setIsLoading] = useState(true)
	const [data, setData] = useState<Array<comicType>>([])

	useEffect(() => {
		const fetchData = async () => {
			try {
				const response = await axios.get(
					`https://site--backend-marvel--cfvhczrj5zks.code.run/comics/${id}`
				)
				setData(response.data.comics)
			} catch (error) {
				console.log('catch app>>>', error)
			}
			setIsLoading(false)
		}
		fetchData()
	}, [])

	return isLoading ? (
		<div className="flex h-[85vh] w-screen justify-center items-center text-white text-4xl">
			<div className="loader"></div>
		</div>
	) : (
		<motion.section
			animate={{ opacity: 100 }}
			initial={{ opacity: 0 }}
			transition={{ duration: 1 }}
			className="m-auto w-5/6"
		>
			<h1 className="flex justify-center  h-12 items-center font-bold text-black border border-solid rounded bg-white shadow-white shadow-xl my-6">
				COMICS WITH{' '}
				<span className="text-red-marvel px-2">
					{location.state.character.toUpperCase()}
				</span>
			</h1>
			<div className="flex flex-wrap justify-center w-full ">
				{data.map((comic: comicType) => {
					return (
						<div
							className={
								comic.thumbnail.path && comic.thumbnail.extension
									? 'shadow-white shadow-xl relative min-w-52  m-2 border-2 border-solid border-white rounded flex flex-col w-[18%] h-96  '
									: 'hidden'
							}
							key={comic._id}
						>
							<img
								className="h-full object-cover"
								src={`${comic.thumbnail.path}.${comic.thumbnail.extension}`}
								alt={`image de ${comic.title}`}
							/>
						</div>
					)
				})}
			</div>
		</motion.section>
	)
}

export default Character
