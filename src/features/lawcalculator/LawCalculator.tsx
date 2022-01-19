import React, {ChangeEvent, useState} from 'react';
import Grid from '@mui/material/Grid';
import FormControl from '@mui/material/FormControl';
import Select, {SelectChangeEvent} from '@mui/material/Select';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import TextField from '@mui/material/TextField';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import {useLawCalculator} from "../../app/hooks";
import {DisputeType} from "./LawCalculatorTypes";

const style = {
    width: '100%',
    maxWidth: 360,
    bgcolor: 'background.paper',
};


export function LawCalculator() {

    const [disputeValue, setDisputeValue] = useState<number>(100000);
    const [disputeType, setDisputeType] = useState<DisputeType>(0);
    const [disputeHearings, setDisputeHearings] = useState<number>(5);

    const {state, computeDisputeTotal} = useLawCalculator({
        disputeValue: 100000,
        disputeType: DisputeType.Unspecified,
        disputeHearings: 0,
    })

    const handleDisputeValue = (event: ChangeEvent) => {
        event.preventDefault();
        const target = event.target as HTMLTextAreaElement;
        let disputeValueValue = +target.value as unknown as number;
        setDisputeValue(disputeValueValue);
        computeDisputeTotal(disputeValueValue, disputeType, disputeHearings);
    };

    const handleDisputeType = (event: SelectChangeEvent) => {
        event.preventDefault();
        let disputeTypeValue = +event.target.value as unknown as DisputeType;
        setDisputeType(disputeTypeValue);
        console.log('disputeTypeValue', disputeTypeValue);
        computeDisputeTotal(disputeValue, disputeTypeValue, disputeHearings);
    };

    const handleDisputeHearings = (event: ChangeEvent) => {
        event.preventDefault();
        const target = event.target as HTMLTextAreaElement;
        let disputeHearingsValue = +target.value as unknown as number;
        setDisputeHearings(disputeHearingsValue);
        console.log('disputeHearingsValue', disputeHearingsValue);
        computeDisputeTotal(disputeValue, disputeType, disputeHearingsValue);
    }

    return (

        <Grid
            container
            direction="row"
            justifyContent="flex-start"
            alignItems="center"
        >

            <List sx={style} component="nav" aria-label="mailbox folders">
                <h1>Law Calculator</h1>
                <ListItem button>
                    <TextField fullWidth
                               id="disputeValue-textField"
                               label="Вредност на Спорот"
                               type="number"
                               value={disputeValue}
                               onChange={handleDisputeValue}
                    />
                </ListItem>
                <Divider/>
                <ListItem button divider>
                    <FormControl fullWidth>
                        <InputLabel id="demo-simple-select-label">Тип на Спорот</InputLabel>
                        <Select
                            labelId="disputeType-select-label"
                            label="Тип на Спорот"
                            id="disputeType-select"
                            value={disputeType as unknown as string}
                            onChange={handleDisputeType}
                        >
                            <MenuItem value={DisputeType.Unspecified}>Неспецифичен Спор</MenuItem>
                            <MenuItem value={DisputeType.WorkDispute}>Спор На Работен Однос</MenuItem>
                        </Select>
                    </FormControl>
                </ListItem>
                <ListItem button>
                    <TextField fullWidth
                               id="disputeHearings-textField"
                               label="Број на Рочишта"
                               type="number"
                               value={disputeHearings}
                               onChange={handleDisputeHearings}
                    />
                </ListItem>

            </List>

            <Paper sx={{padding: 3, marginTop: 5, marginLeft: 15, minHeight: 250, maxWidth: 400}}>
                {JSON.stringify(state).replaceAll(',', ',\n')}
            </Paper>
        </Grid>
    );
}
