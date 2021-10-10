import React, { useEffect, useState, useRef } from 'react'
import { Chart } from "react-google-charts";
import * as faceapi from 'face-api.js'
import '../../App.css';


const Expressionrecord = () => {

  const [playing, setPlaying] = useState(false);

  const [createdBy,setCreatedBy] = useState("")

	const HEIGHT = 500;
	const WIDTH = 500;
	const videoHeight = 500
	const videoWidth = 500

	const [time, setTime] = useState(0);

	const [timerOn, setTimeOn] = useState(false)

	const [initializing, setInitializing] = useState(false)
	const videoRef = useRef()
	const canvasRef = useRef()

	const [neutral, setNeutral] = useState(0)
	const [happy, setHappy] = useState(0)
	const [sad, setSad] = useState(0)
	const [angry, setAngry] = useState(0)
	const [fearful, setFearful] = useState(0)
	const [disgusted, setDisgusted] = useState(0)
	const [surprised, setSurprised] = useState(0)

	const [idExpression, setIdExpression] = useState()


	useEffect(() => {
		const loadModels = async () => {
			const MODEL_URL = process.env.PUBLIC_URL + '/models'
			setInitializing(true)
			Promise.all([
				faceapi.nets.tinyFaceDetector.loadFromUri(MODEL_URL),
				faceapi.nets.faceLandmark68Net.loadFromUri(MODEL_URL),
				faceapi.nets.faceRecognitionNet.loadFromUri(MODEL_URL),
				faceapi.nets.faceExpressionNet.loadFromUri(MODEL_URL)
			])
		}
		loadModels()
	}, [])


  useEffect(() => {
		let interval = null
		if(playing){
			navigator.mediaDevices.getUserMedia(
				{ video: {} })
				.then(
					(stream) => { videoRef.current.srcObject = stream; },
					(err) => console.error(err)
				)
					interval = setInterval(async () => {
						if(videoRef.current.srcObject){
							setTime(prevTime => prevTime + 1)
							canvasRef.current.innerHTML = faceapi.createCanvasFromMedia(videoRef.current)
							const displaySize = {
								width: videoWidth,
								height: videoHeight
							}
							faceapi.matchDimensions(canvasRef.current, displaySize)
							const detections = await faceapi.detectSingleFace(videoRef.current, new faceapi.TinyFaceDetectorOptions()).withFaceLandmarks().withFaceExpressions()
							if (detections) {
								const resizedDetections = faceapi.resizeResults(detections, displaySize)
								canvasRef.current.getContext('2d').clearRect(0, 0, videoWidth, videoHeight)
								faceapi.draw.drawDetections(canvasRef.current, resizedDetections)
								faceapi.draw.drawFaceLandmarks(canvasRef.current, resizedDetections)
								faceapi.draw.drawFaceExpressions(canvasRef.current, resizedDetections)
								// console.log(detections.expressions)
				
								//calculer l'expressions
								setNeutral(neutral => neutral + detections.expressions.neutral)
								setHappy(happy => happy + detections.expressions.happy)
								setSad(sad => sad + detections.expressions.sad)
								setAngry(angry => angry + detections.expressions.angry)
								setFearful(fearful => fearful + detections.expressions.fearful)
								setDisgusted(disgusted => disgusted + detections.expressions.disgusted)
								setSurprised(surprised => surprised + detections.expressions.surprised)
								// console.log(neutral)		
							}
						}

					}, 1000)
				
			// navigator.getUserMedia(
			// 	{
			// 		video: true,
			// 	},
			// 	(stream) => {
			// 		let video = document.getElementsByClassName('app__videoFeed')[0];
			// 		if (video) {
			// 			video.srcObject = stream;
			// 		}
			// 	},
			// 	(err) => console.error(err)
			// );

			// interval = setInterval(()=> {
			// 	setTime(prevTime => prevTime + 1)
			// 	console.log('ff')
			// }, 1000)
			
		}else{
			clearInterval(interval)
			console.log('jj')
			let video = document.getElementsByClassName('app__videoFeed')[0];
			if(videoRef.current.srcObject){
				videoRef.current.srcObject.getTracks()[0].stop()
			}
		}

		return () => clearInterval(interval)
	}, [playing])

	return (
		<div className="app">
			<div>{time}</div>
			<button
        onClick={()=>setPlaying(true)}
      >
        Start interval
      </button>
			<button
        onClick={()=>setPlaying(false)}
      >
        stop interval
      </button>
			<div className="app__container">
				<video 
					ref={videoRef} 
					width={WIDTH} 
					height={HEIGHT} 
					muted 
					autoPlay
					className="app__videoFeed"
					// onPlay={handleVideoOnPlay} 
				/>
				<canvas ref={canvasRef} className="position-absolut" />
				<div id="piechart"></div>
				{/* <video
					height={HEIGHT}
					width={WIDTH}
					muted
					autoPlay
					className="app__videoFeed"
				></video> */}
			</div>
			<div className="app__input">
			<button
        onClick={()=>setPlaying(true)}
      >
        Start interval
      </button>
			<button
        onClick={()=>setPlaying(false)}
      >
        stop interval
      </button>
			<button
        onClick={()=>setPlaying(true)}
      >
        resum interval
      </button>
			<button
        onClick={()=>setTime(0)}
      >
        reset interval
      </button>

			</div>
			<div>
				<Chart
					width={'600px'}
					height={'400px'}
					chartType="PieChart"
					loader={<div>Loading Expression</div>}
					data={[
						['Expression', 'Value-Expression'],
						['neutral', neutral],
						['happy', happy],
						['sad', sad],
						['angry', angry],
						['fearful', fearful],
						['disgusted', disgusted],
						['surprised', surprised]
					]}
					options={{
						title: 'My Expressin in s',
						is3D: true,
						backgroundColor: '# EE82EE'
					}}
					rootProps={{ 'data-testid': '1' }}
				/>
			</div>
		</div>
	);
}


export default Expressionrecord