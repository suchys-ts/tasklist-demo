import React from 'react';
import {mount} from "enzyme";
import * as reactRedux from 'react-redux';

import {createTheme} from "@mui/material";
import {ThemeProvider} from "@mui/styles";
import ToDoItem from "./ToDoItem";
import store from "../store/store";
import {Provider} from "react-redux";

/*
Test an individual Todo item (nto a whole list)
 */
describe('Test add todo', () => {
   beforeEach(() => {
      jest.resetAllMocks();
   })

   it('Item properly renders as incomplete', () => {
      const theme = createTheme();
      const wrapper = mount(<ThemeProvider theme={theme}><Provider store={store}><ToDoItem description={'Test'} dueDate={1000} completed={false} id={1} /></Provider></ThemeProvider>);
      const checkBox = wrapper.find('[id="completed-checkbox"]').first();
      expect(checkBox.props().checked).toBe(false);
      expect(wrapper).toMatchSnapshot();
   });

   it('Item properly renders as completed', () => {
      const theme = createTheme();
      const wrapper = mount(<ThemeProvider theme={theme}><Provider store={store}><ToDoItem description={'Test'} dueDate={1000} completed={true} id={1} /></Provider></ThemeProvider>);
      const checkBox = wrapper.find('[id="completed-checkbox"]').first();
      expect(checkBox.props().checked).toBe(true);
      expect(wrapper).toMatchSnapshot();
   });

   it('Item can be marked as completed', () => {
      const id = 1;
      let data:any = undefined;
      const theme = createTheme();
      const dispatchSpy = jest.fn((payload) => data = payload);
      jest.spyOn(reactRedux, 'useDispatch').mockImplementation(() => dispatchSpy)

      const wrapper = mount(<ThemeProvider theme={theme}><Provider store={store}><ToDoItem description={'Test'} dueDate={1000} completed={false} id={id} /></Provider></ThemeProvider>);
      const checkBox = wrapper.find('[id="completed-checkbox"]');
      expect(checkBox.first().props().checked).toBe(false);
      wrapper.find('[type="checkbox"]').last().simulate('change', { target: { checked: true } });// simulate click on checkbox

      //verify that dispatch was called on click and if a proper data payload was dispatched
      expect(dispatchSpy).toBeCalledTimes(1);
      expect(data?.payload?.id).toEqual(id);
      expect(data?.payload?.state).toEqual(true);
   });
});