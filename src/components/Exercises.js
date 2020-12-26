import React, { useState, useCallback } from "react";
import Cropper from '@bit/ricardo-ch.react-easy-crop.cropper';
import Slider from '@bit/mui-org.material-ui.slider'

const Exercises = () => {
  const [crop, setCrop] = useState({ x: 0, y: 0 })
	const [zoom, setZoom] = useState(1)
	const onCropComplete = useCallback((croppedArea, croppedAreaPixels) => {
		console.log(croppedArea, croppedAreaPixels)
	}, [])
  return (
    <div className="App">
			<div className="crop-container">
				<Cropper
					image="https://img.huffingtonpost.com/asset/5ab4d4ac2000007d06eb2c56.jpeg?cache=sih0jwle4e&ops=1910_1000"
					crop={crop}
					zoom={zoom}
					aspect={4 / 3}
					onCropChange={setCrop}
					onCropComplete={onCropComplete}
					onZoomChange={setZoom}
				/>
			</div>
			<div className="controls">
				<Slider
					value={zoom}
					min={1}
					max={3}
					step={0.1}
					aria-labelledby="Zoom"
					onChange={(e, zoom) => setZoom(zoom)}
					classes={{ container: 'slider' }}
				/>
			</div>
		</div>
  );
};

export default Exercises;
