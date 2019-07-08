import React from 'react';
import renderer from 'react-test-renderer';
import BluetoothForm from '../components/BluetoothForm';

describe('<BluetoothForm />', () => {
  it('has 1 child', () => {
    const tree = renderer.create(<BluetoothForm />).toJSON();
    expect(tree.children.length).toBe(1);
  });
});