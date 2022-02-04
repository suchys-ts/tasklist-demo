import {fetchTodosSaga} from "./todosSaga";
import {expectSaga} from "redux-saga-test-plan";
import {fetchTodosAction} from "../actions/TodoActions";

import mockAxios from "jest-mock-axios";
import todoReducer, {initialState} from "../reducers/todoReducer";
import {TodoItem} from "../../api/Interfaces";

describe('Saga test suite', () => {

    const item:TodoItem = {id:1, description: 'Test task', dueDate: Date.parse('10/10/2030'), completed: false};

    afterEach(() => {
        mockAxios.reset();
        jest.resetAllMocks();
    });

    it("Fetch all saga", async() => {
        const mock = mockAxios.get.mockResolvedValueOnce([item]);

        await expectSaga(fetchTodosSaga)
            .withReducer(todoReducer)
            .withState(initialState)
            .dispatch(fetchTodosAction())
            .silentRun(10);
        expect(mock).toBeCalledTimes(1);
    });

    //... more test for sagas as they come
});