import PropTypes from 'prop-types';
import { List } from './ImageGallery.styled';

const { default: ImageGalleryItem } = require('components/ImageGalleryItem');

const ImageGallery = ({ images }) => (
  <List>
    {images.map(({ id, largeImageURL, previewURL, tags }) => (
      <ImageGalleryItem
        key={id}
        preview={previewURL}
        large={largeImageURL}
        desc={tags}
      />
    ))}
  </List>
);

ImageGallery.propTypes = {
  images: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      largeImageURL: PropTypes.string.isRequired,
      previewURL: PropTypes.string.isRequired,
      tags: PropTypes.string.isRequired,
    })
  ),
}

export default ImageGallery;
