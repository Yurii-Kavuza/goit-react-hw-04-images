import React from 'react';
import PropTypes from 'prop-types';
import * as API from 'services/api';
import { Container } from './App.styled';
import { Box } from './Box/Box';
import SearchBar from './SearchBar';
import ImageGallery from './ImageGallery';
import Button from './Button';

class App extends React.Component {
  static propTypes = {
    images: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.string.isRequired,
        largeImageURL: PropTypes.string.isRequired,
        previewURL: PropTypes.string.isRequired,
        tags: PropTypes.string.isRequired,
      })
    ),
    totalImages: PropTypes.number,
    search: PropTypes.string.isRequired,
    isLoading: PropTypes.bool.isRequired,
    error: PropTypes.string,
    isButtonShown: PropTypes.bool.isRequired,
    page: PropTypes.number.isRequired,
  };

  state = {
    images: [],
    totalImages: 0,
    search: '',
    isLoading: false,
    error: null,
    isButtonShown: false,
    page: 1,
  };

  setDefaultData = () => {
    this.setState({
      images: [],
      totalImages: 0,
      search: '',
      isLoading: false,
      error: null,
      isButtonShown: false,
      page: 1,
    });
  };

  formSubmitHandler = async searchQuery => {
    this.setDefaultData();
    const { search } = searchQuery;
    try {
      this.setState({ isLoading: true });
      const { hits, totalHits } = await API.fetchImages(search);
      this.setState(state => ({
        images: [...hits],
        search: search,
        page: 1,
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

  showMorePictures = async () => {
    const { search, page } = this.state;
    try {
      this.setState({ isLoading: true });
      const { hits } = await API.fetchImages(search, page);
      this.setState(state => ({
        images: [...state.images, ...hits],
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

  checkButtonShow = () => {
    const { totalImages, page } = this.state;
    return API.PER_PAGE * page < totalImages;
  };

  componentDidUpdate(prevProps, prevState) {
    if (prevState.page !== this.state.page) {
      this.showMorePictures();
      this.setState({ isButtonShown: this.checkButtonShow() });
    }
    if (prevState.search !== this.state.search) {
      this.setState({ isButtonShown: this.checkButtonShow() });
    }
  }

  render() {
    const { isLoading, images, isButtonShown } = this.state;
    return (
      <Container>
        <SearchBar onSubmit={this.formSubmitHandler} />
        {images.length > 0 && <ImageGallery images={images} />}
        {isLoading && <div>Loading...</div>}
        {isButtonShown && (
          <Box display="flex" alignItems="center" justifyContent="center">
            <Button text="Load more" buttonHandler={this.loadMoreHandler} />
          </Box>
        )}
      </Container>
    );
  }
}

export default App;
