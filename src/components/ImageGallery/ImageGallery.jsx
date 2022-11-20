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

export default ImageGallery;
