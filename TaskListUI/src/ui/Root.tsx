import React, {FC, useEffect, useState} from "react";
import {createStyles, makeStyles} from '@mui/styles';
import ToDoItem from "./ToDoItem";
import {
    Button,
    Container,
    Grid,
    Paper, Theme,
    Typography
} from "@mui/material";
import {TodoItem} from "../api/Interfaces";
import AddToDo from "./AddToDo";
import RemoveIcon from '@mui/icons-material/Remove';
import {useDispatch, useSelector} from "react-redux";
import {fetchTodosAction, postTodoAction} from "../store/actions/TodoActions";
import {allTodosSelector} from "../store/selectors/todosSelector";

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        mainContainer: {
           paddingTop: theme.spacing(3),
        },
        addNewPaper: {
            marginBottom: theme.spacing(3),
            padding: theme.spacing(3),
        },
        newItemContainer: {
            paddingLeft: theme.spacing(3),
            paddingRight: theme.spacing(3),
        },
        topText: {
           paddingBottom: theme.spacing(1),
        },
        subText: {
            paddingBottom: theme.spacing(2),
        },
        descriptionText: {
            paddingTop: theme.spacing(1),
        },
        timeBlock: {
            color: '#b6b6b6',
        },
        icon: {
            paddingTop: '3px', //icon specific
            paddingRight: theme.spacing(1),
        },
        boxPadding: {
            paddingRight: theme.spacing(1),
        },
    }),
);

export interface AddNewItem {
    onClose: (item:TodoItem) => void;
}

const Root: FC = () => {
    const classes = useStyles();
    const [addNew, setAddNew] = useState<boolean>(false);
    const dispatch = useDispatch();
    const tasks = useSelector(allTodosSelector);

    useEffect(() => {
        dispatch(fetchTodosAction());
    },[]);

    const onCloseAdd = (item:TodoItem): void => {
        setAddNew(false);
        dispatch(postTodoAction(item));
    };
    return (
        <Container maxWidth="md" className={classes.mainContainer}>
            <Grid container direction="row">
                <Grid container item xs={12} direction="row" alignItems="center" className={classes.mainContainer}>
                    <Grid item xs={1}>
                        <Typography variant="h5" className={classes.topText}>Tasker</Typography>
                    </Grid>
                    <Grid item xs={9}/>
                    <Grid container item xs={2} justifyContent="flex-end">
                        <Typography variant="h6" className={classes.subText}>Techformist</Typography>
                    </Grid>
                    <Grid container item xs={12} direction="row" alignItems="center">
                        <Grid item xs={11} className={classes.boxPadding}/>
                        <Grid container item xs={1} justifyContent="flex-end">
                            <Button
                                id="add-new"
                                variant={"outlined"}
                                onClick={() => setAddNew(!addNew)}
                            >{addNew ? <RemoveIcon/> : 'New'}</Button>
                        </Grid>
                    </Grid>
                </Grid>
                <Grid container item xs={12} direction="row" alignItems="flex-start" className={classes.mainContainer}>
                    <Grid container item xs={12} direction="column" alignItems="flex-center">
                     {
                         addNew && (<AddToDo onClose={onCloseAdd}/>)
                     }
                    <Paper elevation={1} sx={{flexGrow: 1, padding: '20px'}} >
                        {tasks.length === 0 ?
                                <Typography variant="h6" className={classes.subText}>Task list is empty</Typography>
                            :
                            tasks.map((task) => <ToDoItem  key={task.id} id={task.id} description={task.description} dueDate={task.dueDate} completed={task.completed}/>)
                        }
                    </Paper>
                    </Grid>
                </Grid>
            </Grid>
        </Container>
    );
};

/*
Uncomment for performance testing (identify unnecessary re-renders)
// @ts-ignore
Root.whyDidYouRender = true;
*/
export default Root;