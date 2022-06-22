import { useMemoizedFn } from 'ahooks'
import clsx from 'clsx'
import dropzone from 'dropzone'
import { Fragment, useEffect, useRef, useState } from 'react'

import { toArrayBuffer } from '@/utils/toArrayBuffer'
import { Crosshair } from '@geist-ui/icons'
import { Note, Spinner } from '@geist-ui/react'

import styles from './index.module.less'

import type Dropzone from 'dropzone'
import type { NextPage } from 'next'

interface List {
	type: 'success' | 'error'
	text: string
}

const Home: NextPage = () => {
	const uploader = useRef<Dropzone>()
	const [file, setFile] = useState('')
	const [list, setList] = useState<Array<List>>([])
	const [loading, setLoading] = useState(false)

	useEffect(() => {
		const current_dropzone = new dropzone('#uploader', {
			url: '/api/transfer',
			uploadMultiple: false,
			acceptedFiles: '.xml'
		})

		uploader.current = current_dropzone

		current_dropzone.on('uploadprogress', (file, progress) => {
			setFile(file.name)
			setLoading(true)

			if (progress === 100) setTimeout(() => setLoading(false), 600)
		})

		return () => {
			uploader.current?.destroy()
		}
	}, [])

	useEffect(() => {
		uploader.current!.on('success', (file, res: any) => {
			download(res)

			setTimeout(() => {
				setList([{ type: 'success', text: file.name + '，转换成功' }])
			}, 600)
		})

		uploader.current!.on('error', (file, error) => {
			setLoading(false)
			setList([{ type: 'error', text: file.name + '，转换失败，' + error }])
		})
	}, [])

	const download = useMemoizedFn(
		({ name, buffer }: { name: string; buffer: { data: Buffer } }) => {
			const blob = new Blob([toArrayBuffer(buffer.data)], {
				type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
			})

			const file_name = name
			const link = document.createElement('a')
			const body = document.body

			link.href = window.URL.createObjectURL(blob)
			link.download = file_name

			body.appendChild(link)
			link.click()
			body.removeChild(link)
		}
	)

	return (
		<div
			className={clsx([
				styles._local,
				'w_100vw h_100vh flex justify_center align_center border_box'
			])}
		>
			<div className='content_wrap flex flex_column justify_center align_center'>
				<div className='title'>ASN.xml to Excel</div>
				<div className='upload_wrap w_100 relative cursor_point'>
					<div id='uploader' className='uploader w_100 h_100'></div>
					<div
						className={clsx([
							loading && 'loading',
							'status_wrap absolute top_0 left_0 w_100 h_100 flex flex_column justify_center align_center transition_normal'
						])}
					>
						{loading ? (
							<Fragment>
								<Spinner scale={2}></Spinner>
								<span className='file mt_20 text_center'>
									{file}
								</span>
							</Fragment>
						) : (
							<Fragment>
								<Crosshair
									className='icon_upload'
									size={36}
								></Crosshair>
								<span className='desc mt_10'>
									点击或拖拽文件至此处
								</span>
								<span className='desc'>以进行转换（*.xml）</span>
							</Fragment>
						)}
					</div>
				</div>
				{list.length !== 0 && (
					<div className='list_wrap w_100 flex flex_column align_center mt_20'>
						{list.map((item, index) => (
							<Note
								className='border_box'
								type={item.type}
								label={false}
								filled
								key={index}
								style={{ width: '100%', marginBottom: 12 }}
							>
								{item.text}
							</Note>
						))}
						<span
							className='btn_clear cursor_point mb_20'
							onClick={() => setList([])}
						>
							清除记录
						</span>
					</div>
				)}
			</div>
		</div>
	)
}

export default Home
