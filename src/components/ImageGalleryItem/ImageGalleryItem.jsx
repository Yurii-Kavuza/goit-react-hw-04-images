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

export default ImageGalleryItem;
