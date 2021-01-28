import React,{useEffect, useState} from 'react'
import './Slider.scss'

import sliderImage1 from '../../assets/images/sliderImage1.jpg'
import sliderImage2 from '../../assets/images/sliderImage2.jpg'
import sliderImage3 from '../../assets/images/sliderImage3.jpg'

import {GoPrimitiveDot} from 'react-icons/go'

const Slider = () => {

    const sliderImages = [sliderImage1,sliderImage2,sliderImage3]

    const [currentImageIndex,setCurrentImageIndex] = useState(0)

    useEffect(() => {
        const sliderTimer = setTimeout(() => {
            const nextImageIndex = ((currentImageIndex+1)%sliderImages.length)
            setCurrentImageIndex(nextImageIndex)
        },2000)

        return () => {
            clearTimeout(sliderTimer)
        }
    },[currentImageIndex])

    return(
        <div className="slider">
            <img src={sliderImages[currentImageIndex]} alt="SliderImage" className="sliderImage" />
            <div className="sliderDots">
            {
                sliderImages.map((element,index) => (
                    <span className="sliderdotIconContainer" key={index}>
                        <GoPrimitiveDot 
                            size='1.5rem' 
                            className= 'sliderDotIcon' 
                            style = {index === currentImageIndex ? {transform : 'scale(1.2)'} : null}
                            onClick = {() => setCurrentImageIndex(index)}
                        />
                    </span>
                ))
            }
            </div>
        </div>
    )
}

export default Slider