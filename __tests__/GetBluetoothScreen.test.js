import React from 'react';
import renderer from 'react-test-renderer';
import GetBluetoothScreen from '../components/GetBluetoothScreen';

describe('<GetBluetoothScreen />', () => {
  it('has 1 child', () => {
    const tree = renderer.create(<GetBluetoothScreen />).toJSON();
    expect(tree.children.length).toBe(1);
  });
});