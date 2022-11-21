import PropTypes from 'prop-types';
import { ListItem, ListItemImage } from './ImageGalleryItem.styled';

const ImageGalleryItem = ({ large, preview, desc }) => {
  return (
    <ListItem>
      <ListItemImage
        src={preview}
        alt={desc}
        data-big-image={large}
        width="480px"
      />
    </ListItem>
  );
};

ImageGalleryItem.propTypes = {
  images: PropTypes.arrayOf(
    PropTypes.shape({
      large: PropTypes.string.isRequired,
      preview: PropTypes.string.isRequired,
      desc: PropTypes.string.isRequired,
    })
  ),
};

export default ImageGalleryItem;
