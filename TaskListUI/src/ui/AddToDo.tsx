import React, {FC, useEffect, useState} from "react";
import {Button, Grid, Paper, TextField, Theme, Typography} from "@mui/material";
import {createStyles, makeStyles} from "@mui/styles";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import DatePicker from "@mui/lab/DatePicker";
import {DateValidationError} from "@mui/lab/internal/pickers/date-utils";
import {AddNewItem} from "./Root";


const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        addNewPaper: {
            marginBottom: theme.spacing(3),
            padding: theme.spacing(3),
        },
        newItemContainer: {
            paddingLeft: theme.spacing(3),
            paddingRight: theme.spacing(3),
        },
        subText: {
            paddingBottom: theme.spacing(2),
        },
        descriptionText: {
            paddingTop: theme.spacing(1),
        },
        button: {
            paddingTop: theme.spacing(3),
        }
    }),
);

const AddToDo: FC<AddNewItem> = props => {
    const classes = useStyles();
    const [description, setDescription] = useState<string>('');
    const [date, setDate] = useState<Date | null>();
    const [dateValidationError, setDateValidationError] = useState<DateValidationError>();

    useEffect(() => {
        setDescription('');
        setDate(null);
    },[]);

    const invalid = ():boolean => {
        return description.trim().length === 0 || dateValidationError != undefined || date === null;
    };

    return (
        <Paper elevation={1} sx={{flexGrow: 1}} className={classes.addNewPaper}>
            <Grid container item xs={12} direction="column" alignItems="stretch" className={classes.newItemContainer}>
                <Grid item alignSelf="center">
                    <Typography variant="h6" className={classes.subText}>Add task</Typography>
                </Grid>
                <Grid item alignSelf="start">
                    <Typography variant="h6" className={classes.descriptionText}>Description</Typography>
                </Grid>
                <Grid item>
                    <TextField id="description" value={description} fullWidth variant="outlined"
                               onChange={
                                   (newDescription:React.ChangeEvent<HTMLInputElement>)=>setDescription(newDescription.target.value)
                               }
                    />
                </Grid>
                <Grid item alignSelf="start">
                    <Typography variant="h6" className={classes.descriptionText}>Date</Typography>
                </Grid>
                <Grid item>
                    <LocalizationProvider dateAdapter={AdapterDateFns}>
                        <DatePicker
                            disablePast
                            openTo="year"
                            views={['year', 'month', 'day']}
                            value={date}
                            onChange={(newDate) => {
                                setDate(newDate);
                            }}
                            renderInput={(params) => <TextField id="date_field" fullWidth variant="outlined" {...params} />}
                            onError={(error:DateValidationError) => setDateValidationError(error)}
                        />
                    </LocalizationProvider>
                </Grid>
                <Grid item alignSelf="flex-end" className={classes.button}>
                    <Button id="save" variant="contained" disabled={invalid()} onClick={() => props.onClose({id:-1, description: description, dueDate: date?.getTime()})}>Save</Button>
                </Grid>

            </Grid>
        </Paper>
    );
}

export default AddToDo;