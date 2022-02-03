import React from 'react';
import {mount} from "enzyme";

import AddToDo from "./AddToDo";
import {createTheme} from "@mui/material";
import {ThemeProvider} from "@mui/styles";
import store from "../store/store";
import {Provider} from "react-redux";
import {TodoItem} from "../api/Interfaces";

describe('Test add todo', () => {

   beforeAll(() => {
      // add window.matchMedia
      // this is necessary for the date picker to be rendered in desktop mode.
      // if this is not provided, the mobile mode is rendered, which might lead to unexpected behavior
      Object.defineProperty(window, "matchMedia", {
         writable: true,
         value: (query: string) => ({
            media: query,
            // this is the media query that @material-ui/pickers uses to determine if a device is a desktop device
            matches: query === "(pointer: fine)",
            onchange: () => {},
            addEventListener: () => {},
            removeEventListener: () => {},
            addListener: () => {},
            removeListener: () => {},
            dispatchEvent: () => false,
         }),
      });
   });

   afterAll(() => {
      // @ts-ignore (can be fixed by extending window namespace interface)
      delete window.matchMedia;
   });

   beforeEach(() => {
      jest.resetAllMocks();
   })

   it('Dialog renders with defaults', () => {
      const theme = createTheme();

      const wrapper = mount(<ThemeProvider theme={theme}><AddToDo onClose={jest.fn()}/></ThemeProvider>);
      expect(wrapper).toMatchSnapshot();
   });

   it('Save button is disabled when no values are entered', () => {
      const theme = createTheme();
      const wrapper = mount(<ThemeProvider theme={theme}><AddToDo onClose={jest.fn()}/></ThemeProvider>);
      const button = wrapper.find('[id="save"]').first();
      expect(button.props().disabled).toBe(true);
   });

   it('Save button is disabled when date is in past', () => {
      const theme = createTheme();
      const wrapper = mount(<ThemeProvider theme={theme}><AddToDo onClose={jest.fn()}/></ThemeProvider>);
      //give a correct text
      const descriptionInputField = wrapper.find('[id="description"]');
      descriptionInputField.last().simulate('change', { target: { value: 'Test task' } });
      //but set date way in past
      const dateInputField = wrapper.find('[id="date_field"]');
      dateInputField.last().simulate('change', { target: { value: '01/01/1970' } });
      wrapper.update();
      const button = wrapper.find('[id="save"]').first();
      expect(button.props().disabled).toBe(true);
   });

   it('Save button is enabled when everything is correct', (done) => {
      const description:string = 'Test task';
      const date = '10/10/2030';
      const theme = createTheme();
      const mock = jest.fn().mockImplementation((data: TodoItem) => {
         //verify that we got the call back
         expect(mock).toBeCalledTimes(1);
         expect(data.id).toEqual(-1);
         expect(data.description).toStrictEqual(description);
         expect(data.dueDate).toStrictEqual(Date.parse(date));
         expect(data.completed).toBeUndefined();
         done();
      });
      const wrapper = mount(<ThemeProvider theme={theme}><Provider store={store}><AddToDo onClose={mock}/></Provider></ThemeProvider>);
      //give a correct text
      const descriptionInputField = wrapper.find('[id="description"]');
      descriptionInputField.last().simulate('change', { target: { value: description } });
      //and a correct date FIXME - would be wise to do Date.now() + time offset, otherwise the test will stop working on 10/11/2030 :)
      const dateInputField = wrapper.find('[id="date_field"]');
      dateInputField.last().simulate('change', { target: { value: date } });
      wrapper.update();
      const button = wrapper.find('[id="save"]');
      expect(button.first().props().disabled).toBe(false);

      button.last().simulate('click');// simulate click on button
   });
});