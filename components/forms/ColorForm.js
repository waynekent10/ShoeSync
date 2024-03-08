import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import { Button, FloatingLabel, Form } from 'react-bootstrap';
import { useAuth } from '../../utils/context/authContext';
import { createColor, updateColor } from '../../api/colorData';
import { getEachSneaker } from '../../api/shoeData';

const initialState = {
  nickname: '',
  image: '',
  primary_color: '',
  secondary_color: '',
};

function ColorForm({ obj }) {
  const [formInput, setFormInput] = useState(initialState);
  const [sneakers, setSneakers] = useState([]);
  const router = useRouter();
  const { user } = useAuth();

  useEffect(() => {
    getEachSneaker().then(setSneakers);

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
      updateColor(formInput).then(() => router.push(`/colorway${obj.firebaseKey}`));
    } else {
      const payload = { ...formInput, uid: user.uid };
      createColor(payload).then(({ name }) => {
        const patchPayload = { firebaseKey: name };
        updateColor(patchPayload).then(() => {
          router.push('/colorway');
        });
      });
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      <h2 className="text-white mt-5">{obj.firebaseKey ? 'Update' : 'Create'} Colorway</h2>

      <FloatingLabel controlId="floatingInput1" label="Nickame" className="mb-3">
        <Form.Control
          type="text"
          placeholder="Enter Nickname"
          name="nickname"
          value={formInput.nickname}
          onChange={handleChange}
          required
        />
      </FloatingLabel>

      <FloatingLabel controlId="floatingInput2" label="Primary Color" className="mb-3">
        <Form.Control
          type="text"
          placeholder="Primary Color"
          name="primary_color"
          value={formInput.primary_color}
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

      <FloatingLabel controlId="floatingInput3" label="Secondary Color" className="mb-3">
        <Form.Control
          type="text"
          placeholder="Enter Secondary Color"
          name="secondary_color"
          value={formInput.secondary_color}
          onChange={handleChange}
          required
        />
      </FloatingLabel>

      <FloatingLabel controlId="floatingSelect" label="Shoe">
        <Form.Select
          aria-label="Colorway"
          name="shoe_id"
          onChange={handleChange}
          className="mb-3"
          value={formInput.shoe_id}
          required
        >
          <option value="">Select a Shoe</option>
          {sneakers.map((sneaker) => (
            <option
              key={sneaker.firebaseKey}
              value={sneaker.firebaseKey}
            >
              {sneaker.shoe_name}
            </option>
          ))}
        </Form.Select>
      </FloatingLabel>

      <Button type="submit">{obj.firebaseKey ? 'Update' : 'Create'} Colorway</Button>
    </Form>
  );
}

ColorForm.propTypes = {
  obj: PropTypes.shape({
    nickname: PropTypes.string,
    image: PropTypes.string,
    primary_color: PropTypes.string,
    secondary_color: PropTypes.string,
    firebaseKey: PropTypes.string,
  }),
};

ColorForm.defaultProps = {
  obj: initialState,
};

export default ColorForm;
