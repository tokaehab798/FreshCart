// import { useQuery } from "@tanstack/react-query";
// import axios from "axios";
// import { useEffect, useState } from "react";
import { TailSpin } from "react-loader-spinner";
import Slider from "react-slick";
import { useAllCategories } from "../../assets/hooks/useAllCategories";
import { Link } from "react-router-dom";

function CenterMode() {
    // const [allCategories, setAllCategories] = useState(null);
    const settings = {
        className: "center",
        centerMode: true,
        infinite: true,
        centerPadding: "50px",
        slidesToShow: 9,
        speed: 500,
        autoplay: true,
        autoplaySpeed: 2000,
        dots: false,
        responsive: [
            {
                breakpoint: 1280, // Large screens
                settings: {
                    slidesToShow: 5,
                    centerPadding: "40px",
                },
            },
            {
                breakpoint: 1024, // Tablets
                settings: {
                    slidesToShow: 4,
                    centerPadding: "30px",
                },
            },
            {
                breakpoint: 768, // Mobile
                settings: {
                    slidesToShow: 2,
                    centerPadding: "20px",
                },
            },
            {
                breakpoint: 480, // Smallest screens
                settings: {
                    slidesToShow: 1,
                    centerPadding: "10px",
                },
            },
        ],
    };




    // function getAllCategories() {
    //     axios
    //         .get('https://ecommerce.routemisr.com/api/v1/categories')
    //         .then(({ data }) => {
    //             setAllCategories(data.data);
    //         })
    //         .catch((error) => {
    //             console.log(error);
    //         });
    // }

    // useEffect(() => {
    //     getAllCategories();
    // }, []);

  const {isLoading , data }= useAllCategories()

    if (isLoading) {
     return <>
        <div className="flex justify-center items-center h-40 bg-white">
            <TailSpin
                visible={true}
                height="30"
                width="30"
                color="#15803D"
                ariaLabel="tail-spin-loading"
                radius="1"
            />
        </div>
     </>
    }

    return (
        <>       <div className="slider-container px-4">
            <Slider {...settings}>
                {data.data.data.map((category) => (
                 <Link key={category._id} to={`/categoryproducts/${category._id}`} className="p-2 block">
                    <div className="p-2">
                        <img
                            src={category.image}
                            className="h-32 w-full object-cover rounded-lg"
                            alt={category.name}
                        />
                        <h6 className="text-center mt-2 font-semibold text-gray-700">{category.name}</h6>
                    </div>
                </Link>
                ))}
            </Slider>
        </div>

        </>
    );
}

export default CenterMode;
