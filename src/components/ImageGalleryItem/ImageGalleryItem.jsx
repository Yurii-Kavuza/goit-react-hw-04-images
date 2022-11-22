import PropTypes from 'prop-types';
import { ListItem, ListItemImage } from './ImageGalleryItem.styled';

const ImageGalleryItem = ({ large, preview, desc, setImage }) => {
  return (
    <ListItem>
      <ListItemImage
        src={preview}
        alt={desc}
        data-big-image={large}
        width="480px"
        onClick={()=>setImage(large, desc)}
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
