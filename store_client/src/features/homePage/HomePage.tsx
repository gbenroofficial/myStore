import { Box, Typography } from "@mui/material";
import Slider from "react-slick";
const HomePage = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };
  const images = [
    "/images/hero1.jpg",
    "/images/hero2.jpg",
    "/images/hero3.jpg",
  ];

  return (
    <>
      <Slider {...settings}>
        {images.map((image) => (
          <div>
            <img
              src={image}
              alt="hero"
              style={{ display: "block", width: "100%", maxHeight: 500 }}
            />
          </div>
        ))}
      </Slider>

      <Box display="flex" justifyContent="center" sx={{ p: 4 }}>
        <Typography variant="h1">Welcome to our store</Typography>
      </Box>
    </>
  );
};

export default HomePage;
