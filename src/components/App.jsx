import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import * as API from 'services/api';
import { Container } from './App.styled';
import Box from './Box';
import SearchBar from './SearchBar';
import ImageGallery from './ImageGallery';
import Button from './Button';
import Modal from './Modal';
import Loader from './Loader';

const App = () => {
  const [images, setImages] = useState([]);
  const [totalImages, setTotalImages] = useState(0);
  const [search, setSearch] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isButtonShown, setIsButtonShown] = useState(false);
  const [page, setPage] = useState(1);
  const [isModalShown, setIsModalShown] = useState(false);
  const [largeImage, setLargeImage] = useState(null);
  const [desc, setDesc] = useState('');

  const setDefaultData = () => {
    setImages([]);
    setTotalImages(0);
    setSearch('');
    setIsLoading(false);
    setError(null);
    setIsButtonShown(false);
    setPage(1);
    setIsModalShown(false);
    setLargeImage(null);
    setDesc('');
  };

  const formSubmitHandler = async searchQuery => {
    setDefaultData();
    setSearch(searchQuery.search);
  };

  const setModalImageData = (largeImage, desc) => {
    setLargeImage(largeImage);
    setDesc(desc);
    setIsModalShown(true);
  };

  const clearModalImageData = () => {
    setLargeImage(null);
    setDesc('');
  };

  const toggleModal = () => {
    setIsModalShown(state => !state);
  };

  const loadMoreHandler = () => {
    setPage(page + 1);
  };

  useEffect(() => {
    const loadPictures = async () => {
      try {
        setIsLoading(true);
        const { hits, totalHits } = await API.fetchImages(search, page);
        setImages(state => [...state, ...hits]);
        setTotalImages(totalHits);
        setIsButtonShown(() => {
          return API.PER_PAGE * page < totalHits;
        });
      } catch (error) {
        setError(error.message);
      } finally {
        setIsLoading(false);
      }
    };
    if (search !== '') {
      loadPictures();
    }
  }, [page, search]);

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
};

App.propTypes = {
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

export default App;
