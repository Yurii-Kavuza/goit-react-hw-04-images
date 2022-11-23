import React from 'react';
import PropTypes from 'prop-types';
import * as API from 'services/api';
import { Container } from './App.styled';
import Box from './Box';
import SearchBar from './SearchBar';
import ImageGallery from './ImageGallery';
import Button from './Button';
import Modal from './Modal';
import Loader from './Loader';

class App extends React.Component {
  static propTypes = {
    images: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.number.isRequired,
        largeImageURL: PropTypes.string,
        previewURL: PropTypes.string,
        tags: PropTypes.string.isRequired,
      })
    ),
    totalImages: PropTypes.number,
    search: PropTypes.string,
    isLoading: PropTypes.bool,
    error: PropTypes.string,
    isButtonShown: PropTypes.bool,
    page: PropTypes.number,
  };

  state = {
    images: [],
    totalImages: 0,
    search: '',
    isLoading: false,
    error: null,
    isButtonShown: false,
    page: 1,
    isModalShown: false,
    largeImage: null,
    desc: '',
  };

  componentDidUpdate(prevProps, prevState) {
    if (
      prevState.page !== this.state.page ||
      prevState.search !== this.state.search
    ) {
      this.loadPictures();
      this.setState({ isButtonShown: this.checkButtonShow() });
    }
  }

  setDefaultData = () => {
    this.setState({
      images: [],
      totalImages: 0,
      search: '',
      isLoading: false,
      error: null,
      isButtonShown: false,
      page: 1,
      isModalShown: false,
      largeImage: null,
      desc: '',
    });
  };

  formSubmitHandler = async searchQuery => {
    this.setDefaultData();
    this.setState({ search: searchQuery.search });
  };

  setModalImageData = (largeImage, desc) => {
    this.setState({ largeImage, desc, isModalShown: true });
  };

  clearModalImageData = () => {
    this.setState({ largeImage: null, desc: '' });
  };

  loadPictures = async () => {
    const { search, page } = this.state;
    try {
      this.setState({ isLoading: true });
      const { hits } = await API.fetchImages(search, page);
      this.setState(state => ({
        images: [...state.images, ...hits],
        totalImages: totalHits,
      }));
    } catch (error) {
      this.setState({ error: error.message });
    } finally {
      this.setState({
        isLoading: false,
      });
    }
  };

  loadMoreHandler = () => {
    this.setState(prevState => ({ page: prevState.page + 1 }));
  };

  toggleModal = () => {
    this.setState(({ isModalShown }) => ({
      isModalShown: !isModalShown,
    }));
  };

  checkButtonShow = () => {
    const { totalImages, page } = this.state;
    return API.PER_PAGE * page < totalImages;
  };

  render() {
    const { isLoading, images, isButtonShown, isModalShown, largeImage, desc } =
      this.state;
    const {
      formSubmitHandler,
      loadMoreHandler,
      toggleModal,
      clearModalImageData,
      setModalImageData,
    } = this;

    return (
      <Container>
        <SearchBar onSubmit={formSubmitHandler} />
        {images.length > 0 && (
          <ImageGallery images={images} setImage={setModalImageData} />
        )}
        {isLoading && (
          <Box display="flex" alignItems="center" justifyContent="center">
            <Loader />
          </Box>
        )}
        {isButtonShown && (
          <Box display="flex" alignItems="center" justifyContent="center">
            <Button text="Load more" buttonHandler={loadMoreHandler} />
          </Box>
        )}
        {isModalShown && (
          <Modal
            onClose={toggleModal}
            clearImage={clearModalImageData}
            largeImage={largeImage}
            desc={desc}
          />
        )}
      </Container>
    );
  }
}

export default App;