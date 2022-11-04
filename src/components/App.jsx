import React from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import { nanoid } from 'nanoid';
import Section from './Section';
import ContactForm from './ContactForm';
import ContactList from './ContactList';
import Filter from './Filter';
import SearchBar from './SearchBar';
import { Container } from './App.styled';

const API_KEY = '29343329-eb32098cf47fcc64118c9b881';
const OPTIONS = 'image_type=photo&orientation=horizontal&per_page=12';

axios.defaults.baseURL = 'https://pixabay.com/api/';

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
  };

  async componentDidMount() {
    const response = await axios.get(
      `?q=${this.state.search}&page=1&key=${API_KEY}&${OPTIONS}`
    );
    this.setState({ images: response.data });
  }

  componentDidUpdate(prevProps, prevState) {}

  formSubmitHandler(searchQuery) {
    console.log(searchQuery);
  }

  render() {
    const { filter } = this.state;
    return (
      <Container>
        <SearchBar onSubmit={this.formSubmitHandler} />
      </Container>
    );
  }
}

export default App;
