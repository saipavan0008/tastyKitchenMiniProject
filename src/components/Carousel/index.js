import {Component} from 'react'
import Cookies from 'js-cookie'
import Slider from 'react-slick'
import Loader from 'react-loader-spinner'

import './index.css'

class Carousel extends Component {
  state = {carouselLoading: false, carouselData: []}

  componentDidMount() {
    this.getCarouselData()
  }

  getCarouselData = async () => {
    this.setState({carouselLoading: true})
    const jwtToken = Cookies.get('jwt_token')
    const url = 'https://apis.ccbp.in/restaurants-list/offers'
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }
    const response = await fetch(url, options)
    const data = await response.json()
    const updatedData = data.offers.map(each => ({
      id: each.id,
      imageUrl: each.image_url,
    }))
    this.setState({carouselData: updatedData, carouselLoading: false})
  }

  renderCarousel = () => {
    const settings = {
      dots: true,
      infinite: true,
      speed: 500,
      slidesToShow: 1,
      slidesToScroll: 1,
      autoplay: true,
      autoplaySpeed: 2000,
    }
    const {carouselData} = this.state
    return (
      <ul className="carousel-container">
        <Slider {...settings} className="carousal">
          {carouselData.map(each => (
            <li key={each.id}>
              <img src={each.imageUrl} alt="offer" className="carousel-image" />
            </li>
          ))}
        </Slider>
      </ul>
    )
  }

  renderLoader = () => (
    <div // testid="restaurants-offers-loader"
      className="carousal-loader"
    >
      <Loader type="ThreeDots" color="#F7931E" height={50} width={50} />
    </div>
  )

  render() {
    const {carouselLoading} = this.state
    return carouselLoading ? this.renderLoader() : this.renderCarousel()
  }
}
export default Carousel
