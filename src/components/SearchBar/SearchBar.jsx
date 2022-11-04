import { Component } from 'react';
import { Formik } from 'formik';
import * as yup from 'yup';
import {
  Button,
  ButtonLabel,
  FormError,
  FormBox,
  Header,
  Input,
} from './SearchBar.styled';
import { AiOutlineSearch } from 'react-icons/ai';

class SearchBar extends Component {
  schema = yup.object().shape({
    search: yup.string().min(2).required(),
  });

  initialValues = { search: '' };

  handleSubmit = (values, { resetForm }) => {
    this.props.onSubmit(values);
    resetForm();
  };

  render() {
    return (
      <Header>
        <Formik
          initialValues={this.initialValues}
          onSubmit={this.handleSubmit}
          validationSchema={this.schema}
        >
          <FormBox autoComplete="off">
            <Button type="submit">
              <AiOutlineSearch />
            </Button>

            <Input
              name="search"
              type="text"
              autoFocus
              placeholder="Search images and photos"
            />
            <FormError name="search" component="div" />
          </FormBox>
        </Formik>
      </Header>
    );
  }
}

export default SearchBar;
