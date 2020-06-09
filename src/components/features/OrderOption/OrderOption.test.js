import React from 'react';
import { shallow } from 'enzyme';
import OrderOption from './OrderOption';
import DatePicker from 'react-datepicker';


describe('Component OrderOption', () => {
  it('should render without crashing', () => { //czy komponent się renderuje. 
    const expectedName = 'name';
    const expectedType = 'type';
    const component = shallow(<OrderOption name={expectedName} type={expectedType} />);
    expect(component).toBeTruthy();
  });

  it('should return empty object if called without required props', () => { //czy przy braku podanego typu opcji komponent zachowa się poprawnie,
    const component = shallow(<OrderOption />);
    expect(component).toEqual({});
  });

  it('should render correct name', () => {
    const expectedName = 'Lorem ipsum';
    const expectedType = 'text';
    const component = shallow(<OrderOption name={expectedName} type={expectedType}/>);
    const renderedName = component.find('.title').text();
    expect(renderedName).toEqual(expectedName);
  });

});
const optionTypes = {
  dropdown: 'OrderOptionDropdown',
  icons: 'OrderOptionIcons',
  checkboxes: 'OrderOptionCheckboxes',
  number: 'OrderOptionNumber',
  text: 'OrderOptionText',
  date: 'OrderOptionDate',
};

const mockProps = {
  id: 'abc',
  name: 'Lorem',
  values: [
    { id: 'aaa', icon: 'h-square', name: 'Lorem A', price: 0 },
    { id: 'xyz', icon: 'h-square', name: 'Lorem X', price: 100 },
  ],
  required: false,
  currentValue: 'aaa',
  price: '50%',
  limits: {
    min: 0,
    max: 6,
  },
};

const mockPropsForType = { //zawiera propsy istotne tylko dla konkretnego typu opcji.
  dropdown: {},
  icons: {},
  checkboxes: { currentValue: [mockProps.currentValue] }, //mockProps.currentValue = id 1-go ob.
  number: { currentValue: 1 },
  text: {},
  date: {},
};

const testValue = mockProps.values[1].id; 
const testValueNumber = 3;

for (let type in optionTypes) {
  describe(`Component OrderOption with type=${type}`, () => {
    /* test setup - Dodamy tutaj operacje które będą wykonywane przed każdym testem */

    let component;
    let subcomponent;
    let renderedSubcomponent;
    let mockSetOrderOption;

    beforeEach(() => { //każdy test będzie miał  wyrenderowany komponent OrderOption
      mockSetOrderOption = jest.fn(); //sposób na stworzenie atrapy funkcji
      component = shallow(
        <OrderOption
          type={type}
          setOrderOption={mockSetOrderOption}
          {...mockProps}
          {...mockPropsForType[type]}
        />
      );
      subcomponent = component.find(optionTypes[type]);
      renderedSubcomponent = subcomponent.dive(); //.dive wyrenderował subkomponenty, 
    });
    /* common tests - tutaj będziemy pisać testy dotyczące każdego subkomponentu, 
                        
                                    it('passes dummy test', () => {
                                      expect(1).toBe(1);
                                      console.log(subcomponent.debug());
                                    }); */

    it(`renders ${optionTypes[type]}`, () => {
      expect(subcomponent).toBeTruthy(); //sprawdzamy, czy się renderuje. 
      expect(subcomponent.length).toBe(1);
    });


    /* type-specific tests */
    switch (type) { //tutaj  będziemy pisać testy dla konkretnych typów opcji.
      case 'dropdown': {
        /* tests for dropdown */
        it('contains select and options', () => {
          const select = renderedSubcomponent.find('select');
          expect(select.length).toBe(1);

          const emptyOption = select.find('option[value=""]').length; //używamy selektora atrybutu
          expect(emptyOption).toBe(1);

          const options = select.find('option').not('[value=""]');
          expect(options.length).toBe(mockProps.values.length);
          expect(options.at(0).prop('value')).toBe(mockProps.values[0].id);
          expect(options.at(1).prop('value')).toBe(mockProps.values[1].id);
        });

        it('should run setOrderOption function on change', () => {
          renderedSubcomponent.find('select').simulate('change', { currentTarget: { value: testValue } });
          expect(mockSetOrderOption).toBeCalledTimes(1);
          expect(mockSetOrderOption).toBeCalledWith({ [mockProps.id]: testValue });
        });
        break;
      }

      case 'icon': {
        it('contains  div with class=icon', () => {
          const div = renderedSubcomponent.find('.icon');
          expect(div.length).toBe(1);
        });

        it('should run setOrderOption function on change', () => {
          renderedSubcomponent.find('.icon').simulate('click'); //dlaczego klikniecie
          expect(mockSetOrderOption).toBeCalledTimes(1);
          expect(mockSetOrderOption).toBeCalledWith({ [mockProps.id]: testValue });
        });
        break;
      }

      case 'number': {
        it('contains input and options', () => {
          const input = renderedSubcomponent.find('input');
          expect(input.length).toBe(1);
        });

        it('should run setOrderOption function on change', () => {
          renderedSubcomponent.find('input').simulate('change', { currentTarget: { value: testValueNumber } });
          expect(mockSetOrderOption).toBeCalledTimes(1);
          expect(mockSetOrderOption).toBeCalledWith({ [mockProps.id]: testValueNumber });
        });
        break;
      }

      case 'text': {
        it('contains input and options', () => {
          const input = renderedSubcomponent.find('input');
          expect(input.length).toBe(1);
        });

        it('should run setOrderOption function on change', () => {
          renderedSubcomponent.find('input').simulate('change', { currentTarget: { value: testValue } });
          expect(mockSetOrderOption).toBeCalledTimes(1);
          expect(mockSetOrderOption).toBeCalledWith({ [mockProps.id]: testValue });
        });
        break;
      }

      case 'date': {
        it('should run setOrderOption function on change', () => {
          const input = renderedSubcomponent.find(DatePicker);
          expect(input.length).toBe(1);

          renderedSubcomponent.find(DatePicker).simulate('change', testValue );
          expect(mockSetOrderOption).toBeCalledTimes(1);
          expect(mockSetOrderOption).toBeCalledWith({ [mockProps.id]: testValue });
        });
        break;
      }
    }
  });
}