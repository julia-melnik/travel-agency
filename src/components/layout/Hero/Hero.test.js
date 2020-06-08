import React from 'react';
import { shallow } from 'enzyme';
import Hero from './Hero';

describe('Component Hero', () => { //służy do zgrupowania kilku testów. 
  it('should render without crashing', () => { //it służy do zdefiniowania pojedynczego testu
    const component = shallow(<Hero titleText='Lorem ipsum' imageSrc='image' />);//renderuje komponent, który podajemy jako jej argument
    expect(component).toBeTruthy(); //expect sprawdza, czy otrzymany wynik jest prawdziwy. sprawdza, czy komponent renderuje się poprawnie
    console.log(component.debug()); 
  });

  it('should throw error without required props', () => {
    expect(() => shallow(<Hero />)).toThrow();
  });

  it('should render correct title and image', () => { //przekazany w propsie titleText faktycznie jest wyświetlany na stronie!
    const expectedTitle = 'Lorem ipsum';
    const expectedImage = 'image.jpg';
    const component = shallow(<Hero titleText={expectedTitle} imageSrc={expectedImage} />);

    const renderedTitle = component.find('.title').text(); 
    expect(renderedTitle).toEqual(expectedTitle);
    expect(component.find('.image').prop('src')).toEqual(expectedImage); //sprawdzał, czy obrazek otrzymuje poprawny adres z propsa:
  });

  it('renders correct classNames', () => {
    const mockVariants = 'small dummy';
    const component = shallow(<Hero titleText='Lorem' imageSrc='image.jpg' variant={mockVariants} />);
    expect(component.hasClass('component')).toBe(true);
    expect(component.hasClass('small')).toBe(true);
    expect(component.hasClass('dummy')).toBe(true);
  });
  
});