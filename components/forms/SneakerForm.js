import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import { Button, FloatingLabel, Form } from 'react-bootstrap';
import { useAuth } from '../../utils/context/authContext';
import { createSneaker, updateSneaker } from '../../api/shoeData';
import { getCreators } from '../../api/creatorData';

const initialState = {
  shoe_name: '',
  release_date: '',
  brand: '',
  manufacturer: '',
  image: '',
  favorite: '',
  nickname: '',
  uid: '',
};

function SneakerForm({ obj }) {
  const [formInput, setFormInput] = useState(initialState);
  const [creators, setCreators] = useState([]);
  const router = useRouter();
  const { user } = useAuth();

  useEffect(() => {
    getCreators(user.uid).then(setCreators);

    if (obj.firebaseKey) setFormInput(obj);
  }, [obj, user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormInput((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if (obj.firebaseKey) {
      updateSneaker(formInput).then(() => router.push(`/sneaker/${obj.firebaseKey}`));
    } else {
      const payload = { ...formInput, uid: user.uid };
      createSneaker(payload).then(({ name }) => {
        const patchPayload = { firebaseKey: name };
        updateSneaker(patchPayload).then(() => {
          router.push('/');
        });
      });
    }
  };
  return (
    <Form onSubmit={handleSubmit}>
      <h2 className="text-white mt-5">{obj.firebaseKey ? 'Update' : 'Create'} Sneaker</h2>

      <FloatingLabel controlId="floatingInput1" label="Shoe Name" className="mb-3">
        <Form.Control
          type="text"
          placeholder="Enter Shoe Name"
          name="shoe_name"
          value={formInput.shoe_name}
          onChange={handleChange}
          required
        />
      </FloatingLabel>

      <FloatingLabel controlId="floatingInput2" label="Release Date" className="mb-3">
        <Form.Control
          type="text"
          placeholder="Enter Original release date"
          name="release_date"
          value={formInput.release_date}
          onChange={handleChange}
          required
        />
      </FloatingLabel>

      <FloatingLabel controlId="floatingInput2" label="Shoe Image" className="mb-3">
        <Form.Control
          type="url"
          placeholder="Enter an image url"
          name="image"
          value={formInput.image}
          onChange={handleChange}
          required
        />
      </FloatingLabel>

      <FloatingLabel controlId="floatingInput1" label="Manufacturer" className="mb-3">
        <Form.Control
          type="text"
          placeholder="Enter the Manufacturer"
          name="manufacturer"
          value={formInput.manufacturer}
          onChange={handleChange}
          required
        />
      </FloatingLabel>

      <FloatingLabel controlId="floatingTextarea" label="Brand" className="mb-3">
        <Form.Control
          as="textarea"
          placeholder="Brand"
          name="brand"
          value={formInput.brand}
          onChange={handleChange}
          required
        />
      </FloatingLabel>

      <FloatingLabel controlId="floatingSelect" label="Creator">
        <Form.Select
          aria-label="Creator"
          name="creator_id"
          onChange={handleChange}
          className="mb-3"
          value={formInput.creator_id}
          required
        >
          <option value="">Select a Creator</option>
          {
            creators.map((creator) => (
              <option
                key={creator.firebaseKey}
                value={creator.firebaseKey}
              >
                {creator.name}
              </option>
            ))
          }
        </Form.Select>
      </FloatingLabel>

      <Form.Check
        className="text-white mb-3"
        type="switch"
        id="favorite"
        name="favorite"
        label="Do you love the shoes?"
        checked={formInput.favorite}
        onChange={(e) => {
          setFormInput((prevState) => ({
            ...prevState,
            favorite: e.target.checked,
          }));
        }}
      />

      {/* SUBMIT BUTTON  */}
      <Button type="submit">{obj.firebaseKey ? 'Update' : 'Create'} Sneaker</Button>
    </Form>
  );
}

SneakerForm.propTypes = {
  obj: PropTypes.shape({
    shoe_name: PropTypes.string,
    release_date: PropTypes.string,
    image: PropTypes.string,
    manufacturer: PropTypes.string,
    favorite: PropTypes.bool,
    nickname: PropTypes.string,
    firebaseKey: PropTypes.string,
  }),
};

SneakerForm.defaultProps = {
  obj: initialState,
};

export default SneakerForm;
