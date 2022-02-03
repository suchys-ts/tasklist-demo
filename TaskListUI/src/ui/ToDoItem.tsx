import React, {FC} from "react";
import {createStyles, makeStyles, withStyles} from "@mui/styles";
import {Button, Checkbox, Grid, Paper, Theme, Typography} from "@mui/material";
import {TodoItem} from "../api/Interfaces";
import DateRangeOutlinedIcon from "@mui/icons-material/DateRangeOutlined";
import dateFormat from "dateformat";
import {useDispatch} from "react-redux";
import {markAsCompletedTodoAction} from "../store/actions/TodoActions";

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        timeBlock: {
            color: '#b6b6b6',
        },
        icon: {
            paddingTop: '3px', //icon specific
            paddingRight: theme.spacing(1),
        },
    }),
);
const UserButton = withStyles(theme => ({
    root: {
        width: '100%',
    },
}))(Button); //UserButton size="small" variant={"outlined"}


const ToDoItem: FC<TodoItem> = (props) => {
    //do spread
    const {id, description, completed, dueDate} = props;
    const classes = useStyles();
    const dispatch = useDispatch();

    return (
        <Paper elevation={2} sx={{flexGrow: 1, padding: '20px', margin: '20px'}}>
            <Grid container>
                <Grid item xs={6}>
                    <Grid container>
                        <Grid item xs={12}>
                            <Typography variant="h5">{description}</Typography>
                        </Grid>
                        <Grid item xs={12}>
                            <Grid
                                container
                                justifyContent="flex-start"
                                alignItems="center"
                                className={classes.timeBlock}
                            >
                                <Grid item>
                                    <DateRangeOutlinedIcon className={classes.icon}/>
                                </Grid>
                                <Grid item>
                                    <Typography variant="h5">{dateFormat(dueDate, 'yyyy-mm-dd')}</Typography>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item xs={5}/>
                <Grid item xs={1} alignSelf={'center'}>
                    <Checkbox id="completed-checkbox" checked={completed} color="success" onChange={(e:React.ChangeEvent<HTMLInputElement>) => dispatch(markAsCompletedTodoAction(id, e.target.checked))}/>
                </Grid>
            </Grid>
        </Paper>
    );
};

export default ToDoItem;
