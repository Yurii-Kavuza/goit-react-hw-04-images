import React from 'react';
import PropTypes from 'prop-types';
import SearchBar from './SearchBar';
import { Container } from './App.styled';
import * as API from 'services/api';
import ImageGallery from './ImageGallery';
import Button from './Button';

class App extends React.Component {
  static propTypes = {
    contacts: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
        number: PropTypes.string.isRequired,
      })
    ),
    filter: PropTypes.string,
  };

  state = {
    images: [],
    search: '',
    isLoading: false,
    error: null,
    isButtonShown: false,
  };

  // async componentDidMount() {
  //   const response = await axios.get(
  //     `?q=${this.state.search}&page=1&key=${API_KEY}&${OPTIONS}`
  //   );
  //   this.setState({ images: response.data });

  // }

  componentDidUpdate(prevProps, prevState) {}

  formSubmitHandler = async searchQuery => {
    try {
      this.setState({ isLoading: true });
      const { hits } = await API.fetchImages(searchQuery);
      this.setState(state => ({
        images: [...state.images, ...hits],
        search: searchQuery.search,
        isButtonShown: true,
      }));
    } catch (error) {
      this.setState({ error: error.message });
    } finally {
      this.setState({ isLoading: false });
    }
  };

  render() {
    const { isLoading, images, isButtonShown } = this.state;
    return (
      <Container>
        <SearchBar onSubmit={this.formSubmitHandler} />
        {images.length > 0 && <ImageGallery images={images} />}
        {isLoading && <div>Loading...</div>}
        {isButtonShown && (
          <div>
            <Button text="Load more" />
          </div>
        )}
      </Container>
    );
  }
}

export default App;
