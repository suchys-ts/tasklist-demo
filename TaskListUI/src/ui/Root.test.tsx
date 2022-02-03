import React from 'react';
import * as reactRedux from 'react-redux';
import {mount} from "enzyme";

import {createTheme} from "@mui/material";
import {ThemeProvider} from "@mui/styles";
import Root from "./Root";
import store from "../store/store";
import { Provider } from 'react-redux';
import {allTodosSelector} from "../store/selectors/todosSelector";

describe('Test add todo', () => {

     beforeEach(() => {
        jest.resetAllMocks();
    })

    //this is just an empty page after restart
    it('Render main page without any item', () => {
        const theme = createTheme();

        const wrapper = mount(<ThemeProvider theme={theme}><Provider store={store}><Root/></Provider></ThemeProvider>);
        expect(wrapper).toMatchSnapshot();
    });

    //adding the first item with add item in line dialog open
    it('Render main page with add item open', () => {
        const theme = createTheme();
        const wrapper = mount(<ThemeProvider theme={theme}><Provider store={store}><Root/></Provider></ThemeProvider>);

        const button = wrapper.find('[id="add-new"]');
        button.last().simulate('click');// simulate click on button
        wrapper.update();
        expect(wrapper).toMatchSnapshot();
    });

    //it is possible to look if the items are rendered in proper place etc., but snapshot should give enough assurance that rendering is correct
    it('Render main page with an item', () => {
        const selectorSpy = jest.spyOn(reactRedux, 'useSelector');
        //mock the selector and return value (TodoItem[])
        selectorSpy.mockImplementation((selector) => {
           if (selector === allTodosSelector) {
               return [{id:1, description: 'Test task', dueDate: Date.parse('10/10/2030'), completed: false}];
           }
           return selector;
        });
        const theme = createTheme();
        const wrapper = mount(<ThemeProvider theme={theme}><Provider store={store}><Root/></Provider></ThemeProvider>);
        expect(wrapper).toMatchSnapshot();
    });
});