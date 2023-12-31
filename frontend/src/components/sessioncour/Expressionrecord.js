import React, { useEffect, useState, useRef } from "react";
import { Chart } from "react-google-charts";
import * as faceapi from "face-api.js";
import "../../App.css";

import { useAlert } from "react-alert";
import { useDispatch, useSelector } from "react-redux";

import {
  startExpression,
  sendExpression,
  clearErrors,
} from "../../actions/expressionActions";
import { addItemToCart, removeItemFromCart } from "../../actions/cartActions";

import { videoSource } from "../../streamManager";

const Expressionrecord = ({ match, history }) => {
  const { user } = useSelector((state) => state.auth);
  const { cartItems, useridCartItems } = useSelector((state) => state.cart);
  const [matchParamsId, setMatchParamsId] = useState("");

  const [playing, setPlaying] = useState(true);
  const [stoprecord, setStoprecord] = useState(false);

  const [createdBy, setCreatedBy] = useState("");

  const HEIGHT = 500;
  const WIDTH = 500;
  const videoHeight = 500;
  const videoWidth = 500;

  // const [time, setTime] = useState(0);
  const time = useRef(0);

  const [timerOn, setTimeOn] = useState(false);

  const [initializing, setInitializing] = useState(false);
  const videoRef = useRef();
  const canvasRef = useRef();

  const [neutral, setNeutral] = useState(0);
  const [happy, setHappy] = useState(0);
  const [sad, setSad] = useState(0);
  const [angry, setAngry] = useState(0);
  const [fearful, setFearful] = useState(0);
  const [disgusted, setDisgusted] = useState(0);
  const [surprised, setSurprised] = useState(0);

  const neutrall = useRef(0);
  const happyy = useRef(0);
  const sadd = useRef(0);
  const angryy = useRef(0);
  const fearfull = useRef(0);
  const disgustedd = useRef(0);
  const surprisedd = useRef(0);

  const [dataexpressions, setDataexpressions] = useState({});

  let dataexpression;

  // const [matchParamsId, setMatchParamsId] = useState(match.params.id);

  const dispatch = useDispatch();
  const alert = useAlert();

  const [idExpression, setIdExpression] = useState();

  // const { success, errorstartexpresion = error } = useSelector(state => state.startExpression)
  const { loading, expressionUpdated, error } = useSelector(
    (state) => state.sendExpression
  );

  useEffect(() => {
    const loadModels = async () => {
      const MODEL_URL = process.env.PUBLIC_URL + "/models";
      setInitializing(true);
      Promise.all([
        faceapi.nets.tinyFaceDetector.loadFromUri(MODEL_URL),
        faceapi.nets.faceLandmark68Net.loadFromUri(MODEL_URL),
        faceapi.nets.faceRecognitionNet.loadFromUri(MODEL_URL),
        faceapi.nets.faceExpressionNet.loadFromUri(MODEL_URL),
      ]);
    };
    loadModels();
  }, []);

  useEffect(() => {
    if (match) {
      console.log("match.params");
      console.log(match.params);
      setMatchParamsId((prevMatchParamsId) => match.params.id);
    } else {
      console.log("cartItems");
      console.log(cartItems);
      setMatchParamsId((prevMatchParamsId) => cartItems);
    }

    // if(cartItems){
    // 	setPlaying(true)
    // }

    let interval = null;
    let intervalSendExpression = null;
    if (playing) {
      // addToCart();
      if (match) {
        dispatch(addItemToCart(match.params.id, user._id));
        alert.success("Item Added to Cart");
      } else {
        dispatch(addItemToCart(cartItems, useridCartItems));
        alert.success("Item Added to Cart");
      }
      console.log("videoRef.current", videoRef.current);
      // if (!videoSource.getSource()){
      navigator.mediaDevices.getUserMedia({ video: {} }).then(
        // videoRef.current.srcObject && (

        (stream) => {
          videoSource
            .getSource()
            ?.getTracks()
            .forEach(function (track) {
              console.log(track);
              track.stop();
            });
          videoSource.setSource(stream);
          videoRef.current.srcObject = stream;
        },
        (err) => console.error(err)
      );

      // }else{
      // videoRef.current.srcObject = videoSource.getSource()

      // }
      console.log("videoSource.getSource()", videoSource.getSource());
      console.log("videoRef.current.srcObject", videoRef.current.srcObject);

      interval = setInterval(async () => {
        if (videoRef.current.srcObject) {
          // setTime(prevTime => prevTime + 1)
          time.current = time.current + 1;
          // console.log('time.current ', time.current)
          console.log("videoRef.current", videoRef.current);
          canvasRef.current.innerHTML = await faceapi.createCanvasFromMedia(
            videoRef.current
          );
          const displaySize = {
            width: videoWidth,
            height: videoHeight,
          };
          faceapi.matchDimensions(canvasRef.current, displaySize);
          const detections = await faceapi
            .detectSingleFace(
              videoRef.current,
              new faceapi.TinyFaceDetectorOptions()
            )
            .withFaceLandmarks()
            .withFaceExpressions();
          if (detections) {
            const resizedDetections = faceapi.resizeResults(
              detections,
              displaySize
            );
            canvasRef.current
              .getContext("2d")
              .clearRect(0, 0, videoWidth, videoHeight);
            faceapi.draw.drawDetections(canvasRef.current, resizedDetections);
            faceapi.draw.drawFaceLandmarks(
              canvasRef.current,
              resizedDetections
            );
            faceapi.draw.drawFaceExpressions(
              canvasRef.current,
              resizedDetections
            );
            // console.log(detections.expressions)

            //calculer l'expressions
            setNeutral((neutral) => neutral + detections.expressions.neutral);
            setHappy((happy) => happy + detections.expressions.happy);
            setSad((sad) => sad + detections.expressions.sad);
            setAngry((angry) => angry + detections.expressions.angry);
            setFearful((fearful) => fearful + detections.expressions.fearful);
            setDisgusted(
              (disgusted) => disgusted + detections.expressions.disgusted
            );
            setSurprised(
              (surprised) => surprised + detections.expressions.surprised
            );

            neutrall.current += detections.expressions.neutral;
            happyy.current += detections.expressions.happy;
            sadd.current += detections.expressions.sad;
            angryy.current += detections.expressions.angry;
            fearfull.current += detections.expressions.fearful;
            disgustedd.current += detections.expressions.disgusted;
            surprisedd.current += detections.expressions.surprised;

            console.log(
              "STRREAMMMMMMMMMMMMMMMMMMMMM",
              videoRef.current.srcObject
            );
            console.log("1 interval neutral", neutral);
            console.log("1 interval happy", happy);
            console.log("1 interval sad", sad);
            console.log("1 interval angry", angry);
            console.log("1 interval fearful", fearful);
            console.log("1 interval disgusted", disgusted);
            console.log("1 interval surprised", surprised);

            console.log("1.1 interval neutral", neutrall.current);
            console.log("1.1 interval happy", happyy.current);
            console.log("1.1 interval sad", sadd.current);
            console.log("1.1 interval angry", angryy.current);
            console.log("1.1 interval fearful", fearfull.current);
            console.log("1.1 interval disgusted", disgustedd.current);
            console.log("1.1 interval surprised", surprisedd.current);
          }
        }
      }, 1000);

      //send Expression data
      intervalSendExpression = setInterval(() => {
        // setDataexpressions(perDataexpressions =>
        // 	({
        // 	"surprised" : surprised,
        // 	"disgusted" : disgusted,
        // 	"fearful" : fearful,
        // 	"sad" : sad,
        // 	"angry" : angry,
        // 	"happy" : happy,
        // 	"neutral" : neutral,
        // 	"natureSession" : null ,
        // 	"user" : null,
        // 	"sessioncour": matchParamsId,
        // 	"dateTimeStopRecording" : null
        // }))
        console.log("2 interval neutral", neutral);
        console.log("2 interval happy", happy);
        console.log("2 interval sad", sad);
        console.log("2 interval angry", angry);
        console.log("2 interval fearful", fearful);
        console.log("2 interval disgusted", disgusted);
        console.log("2 interval surprised", surprised);

        console.log("2.2 interval neutral", neutrall.current);
        console.log("2.2 interval happy", happyy.current);
        console.log("2.2 interval sad", sadd.current);
        console.log("2.2 interval angry", angryy.current);
        console.log("2.2 interval fearful", fearfull.current);
        console.log("2.2 interval disgusted", disgustedd.current);
        console.log("2.2 interval surprised", surprisedd.current);
        dataexpression = {
          surprised: surprised,
          disgusted: disgusted,
          fearful: fearful,
          sad: sad,
          angry: angry,
          happy: happy,
          neutral: neutral,
          natureSession: null,
          user: null,
          sessioncour: matchParamsId,
          dateTimeStopRecording: null,
        };

        if (match) {
          dispatch(
            sendExpression({
              surprised: surprisedd.current,
              disgusted: disgustedd.current,
              fearful: fearfull.current,
              sad: sadd.current,
              angry: angryy.current,
              happy: happyy.current,
              neutral: neutrall.current,
              natureSession: null,
              user: null,
              sessioncour: match.params.id,
              dateTimeStopRecording: null,
            })
          );
          surprisedd.current = 0;
          disgustedd.current = 0;
          fearfull.current = 0;
          sadd.current = 0;
          angryy.current = 0;
          happyy.current = 0;
          neutrall.current = 0;
        } else {
          dispatch(
            sendExpression({
              surprised: surprisedd.current,
              disgusted: disgustedd.current,
              fearful: fearfull.current,
              sad: sadd.current,
              angry: angryy.current,
              happy: happyy.current,
              neutral: neutrall.current,
              natureSession: null,
              user: null,
              sessioncour: cartItems,
              dateTimeStopRecording: null,
            })
          );
          surprisedd.current = 0;
          disgustedd.current = 0;
          fearfull.current = 0;
          sadd.current = 0;
          angryy.current = 0;
          happyy.current = 0;
          neutrall.current = 0;
        }
        // dispatch(sendExpression({
        // 	"surprised" : surprisedd.current,
        // 	"disgusted" : disgustedd.current,
        // 	"fearful" : fearfull.current,
        // 	"sad" : sadd.current,
        // 	"angry" : angryy.current,
        // 	"happy" : happyy.current,
        // 	"neutral" : neutrall.current,
        // 	"natureSession" : null ,
        // 	"user" : null,
        // 	"sessioncour": matchParamsId,
        // 	"dateTimeStopRecording" : null
        //  }));
      }, 10000);

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
    } else {
      // removeCartItemHandler();
      clearInterval(interval);
      console.log("ffff", typeof clearInterval(interval));
      clearInterval(intervalSendExpression);
      // const a = ()=> clearInterval(intervalSendExpression)
      console.log("jj");
      // let video = document.getElementsByClassName('app__videoFeed')[0];
      if (videoRef.current.srcObject) {
        // videoRef.current.srcObject.getTracks()[0].stop()
        console.log("videoRef.current.srcObject", videoRef.current.srcObject);
        console.log("videoSource.getSource()", videoSource.getSource());

        videoRef.current.srcObject.getTracks().forEach(function (track) {
          console.log(track);
          track.stop();
        });
        // videoSource.destroy()
      }

      if (cartItems) {
        console.log("item is in the cartItems", cartItems);
        removeCartItemHandler(cartItems, useridCartItems);
      }
    }

    // if(stoprecord){
    // 	console.log('dddddddddddddddddddddddddddddddddddd')
    // 	if(match.params ){
    // 		console.log('match.params')
    // 		console.log(match.params)
    // 		removeCartItemHandler(match.params.id);
    // 	}else{
    // 		console.log('cartItems')
    // 		console.log(cartItems)
    // 		removeCartItemHandler(cartItems);
    // 	}
    // 	// removeCartItemHandler();
    // 	clearInterval(interval)
    // 	console.log('ffff',typeof clearInterval(interval))
    // 	clearInterval(intervalSendExpression)
    // 	// const a = ()=> clearInterval(intervalSendExpression)
    // 	console.log('jj')
    // 	let video = document.getElementsByClassName('app__videoFeed')[0];
    // 	if(videoRef.current.srcObject){
    // 		videoRef.current.srcObject.getTracks()[0].stop()
    // 	}
    // 	// history.push('/availablesessionsstudent')

    // }

    return () => {
      clearInterval(interval);
      clearInterval(intervalSendExpression);
    };
  }, [playing]);

  const startTheExpression = (id) => {
    // dispatch(startExpression(id));
    // setRef(ref => ref + 5)
  };

  const addToCart = () => {
    dispatch(addItemToCart(matchParamsId));
    alert.success("Item Added to Cart");
  };

  const removeCartItemHandler = (id, useridCartItems) => {
    dispatch(removeItemFromCart(id, useridCartItems));

    // if(match ){
    // 	console.log('match.params')
    // 	console.log(match.params)
    // 	// removeCartItemHandler(match.params.id);
    // 	dispatch(removeItemFromCart(match.params.id))

    // }else{
    // 	console.log('cartItems')
    // 	console.log(cartItems)
    // 	// removeCartItemHandler(cartItems);
    // 	dispatch(removeItemFromCart(cartItems))

    // }
    // // removeCartItemHandler();
    // clearInterval(interval)
    // console.log('ffff',typeof clearInterval(interval))
    // clearInterval(intervalSendExpression)
    // // const a = ()=> clearInterval(intervalSendExpression)
    // console.log('jj')
    // let video = document.getElementsByClassName('app__videoFeed')[0];
    // if(videoRef.current.srcObject){
    // 	videoRef.current.srcObject.getTracks()[0].stop()
    // }
    // history.push('/availablesessionsstudent')
  };

  return (
    <div className="app">
      <div>{time.current}</div>
      {/* <button onClick={()=>{()=>setPlaying(true) ; addToCart()}} > Start interval </button>
			<button onClick={()=>{()=>{setPlaying(false)} ; removeCartItemHandler()}} > stop interval </button> */}

      <button onClick={() => setPlaying(true)}> Start interval </button>
      <button onClick={() => setPlaying(false)}> pause interval </button>
      {/* <button  onClick={()=>setStoprecord(true)}  > stop record  </button> */}
      {/* <button  onClick={()=>removeCartItemHandler()}  > stop record  </button> */}
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
      <div className="app__input"></div>
      <div>
        <Chart
          width={"600px"}
          height={"400px"}
          chartType="PieChart"
          loader={<div>Loading Expression</div>}
          data={[
            ["Expression", "Value-Expression"],
            ["neutral", neutral],
            ["happy", happy],
            ["sad", sad],
            ["angry", angry],
            ["fearful", fearful],
            ["disgusted", disgusted],
            ["surprised", surprised],
          ]}
          options={{
            title: "My Expressin in s",
            is3D: true,
            backgroundColor: "# EE82EE",
          }}
          rootProps={{ "data-testid": "1" }}
        />
      </div>
    </div>
  );
};

export default Expressionrecord;
