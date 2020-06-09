import React from 'react';
import { shallow } from 'enzyme';
import TripSummary from './TripSummary';

describe('Component TripSummary', () => {

  it('should render correct link ', () => { //czy link przekazany w propsie faktycznie jest wyświetlany na stronie
    const id = 'abc';
    const component = shallow(<TripSummary id={id} />); 
    const renderedLink = component.find('.link').prop('to');
    expect(renderedLink).toEqual(`/trip/${id}`);
  });

  it('should render correct src and alt for image', () => { //sprawdza, czy obrazek otrzymuje poprawny dane z propsa
    const expectedName = 'TestName';
    const expectedImage = 'TestName.jpg';
    const component = shallow(<TripSummary  id="test"  image={expectedImage} name={expectedName} />);
    expect(component.find('img').prop('src')).toEqual(expectedImage);
    expect(component.find('img').prop('alt')).toEqual(expectedName);
  });

  it('should render correct name, cost, days', () => { //czy komponent renderuje się poprawnie
    const expectedName = 'TestName';
    const expectedCost = '5678';
    const expectedDays = 345;
    const component = shallow(<TripSummary  id="test"  name={expectedName} cost={expectedCost} days={expectedDays} />);
    expect(component).toBeTruthy();
  });

  it('should throw error without required props', () => { //przy braku kompon. otrzymamy błąd. 
    expect(() => shallow(<TripSummary/>)).toThrow();
  });

  it('should render tags and span', () => { 
    const expectedTags = ['tag1', 'tag2', 'tag3'];
    const component = shallow(<TripSummary tags={expectedTags} id="test" />); 
    expect(component.find('.tags span').at(0).text()).toEqual(expectedTags[0]);
    expect(component.find('.tags span').at(1).text()).toEqual(expectedTags[1]);
    expect(component.find('.tags span').at(2).text()).toEqual(expectedTags[2]);
  });

  it('should render div with tags class if tags array is not empty ', () => {
    const expectedTags = [];
    const component = shallow(<TripSummary tags={expectedTags} />);
    expect(component).toEqual({});
  });
});