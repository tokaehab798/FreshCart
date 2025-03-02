import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import SliderImage1 from '../../assets/images/image6.jpg'
import SliderImage3 from '../../assets/images/image4.jpg'
import SliderImage4 from '../../assets/images/image3.jpg'
import SliderImage2 from '../../assets/images/image5 (2).jpg'
import SliderImage5 from '../../assets/images/image2.jpg'
import SliderImage6 from '../../assets/images/image1.jpg'




export default function SimpleSlider() {
    var settings = {
        // dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,  
        autoplaySpeed: 6000, 
    };
    return <>
        <Slider {...settings} arrows={false}>
            <div>
            <img src={SliderImage1} className="w-full h-60" alt="" />
            </div>
            <div>
            <img src={SliderImage2} className="w-full h-60" alt="" />
            </div>
            <div>
            <img src={SliderImage3} className="w-full h-60" alt="" />
            </div>
            <div>
            <img src={SliderImage4} className="w-full h-60" alt="" />
            </div>
            <div>
            <img src={SliderImage5} className="w-full h-60" alt="" />

            </div>
            <div>
            <img src={SliderImage6} className="w-full h-60" alt="" />

            </div>
        </Slider>
        </>
 
}