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
import {DisputeType, LawCalculatorComputations} from "./LawCalculatorComputations";

const style = {
    width: '100%',
    maxWidth: 360,
    bgcolor: 'background.paper',
};


export function LawCalculator() {

    const [disputeValue, setDisputeValue] = useState('');
    const [disputeType, setDisputeType] = useState('');
    const [disputeHearings, setDisputeHearings] = useState('');

    const [lawCalculatorComputations, setLawCalculatorComputations] = useState<LawCalculatorComputations>(new LawCalculatorComputations());

    const handleDisputeValue = (event: ChangeEvent) => {
        event.preventDefault();
        const target = event.target as HTMLTextAreaElement;
        let disputeValueValue = target.value;
        setDisputeValue(disputeValueValue);
        lawCalculatorComputations.disputeValue = disputeValue as unknown as number;
    };

    const handleDisputeType = (event: SelectChangeEvent) => {
        let disputeTypeValue = event.target.value as string;
        setDisputeType(disputeTypeValue);
        lawCalculatorComputations.disputeType = disputeType as unknown as DisputeType;
    };

    const handleDisputeHearings = (event: ChangeEvent) => {
        event.preventDefault();
        const target = event.target as HTMLTextAreaElement;
        let disputeHearingsValue = target.value;
        setDisputeHearings(disputeHearingsValue);
        lawCalculatorComputations.disputeHearings = disputeHearings as unknown as number;
    }

    return (

        <Grid
            container
            direction="row"
            justifyContent="center"
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
                            value={disputeType}
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
                <Divider/>
                <h1>{lawCalculatorComputations.disputeTotal}</h1>

            </List>

        </Grid>
    );
}
