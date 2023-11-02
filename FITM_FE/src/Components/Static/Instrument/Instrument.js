import { Accordion, AccordionDetails, AccordionSummary, Button, List, ListItem, Stack, Typography } from "@mui/material";

function Instrument(){
    document.title = "Instrument";

    const status = ["New", "Broken", "Fixed"]
      
      const instrumentTypes = [
        {
            Name: "Dan Tranh",
            ShortName: "DT",
            instruments: [
                {Id: 1, Status: 0},
                {Id: 2, Status: 1},
                {Id: 3, Status: 2},
            ]
        },
        {
            Name: "Dan Nguyet",
            ShortName: "DN",
            instruments: [
                {Id: 4, Status: 0},
                {Id: 5, Status: 0},
                {Id: 6, Status: 0},
            ]
        }
      ]
    return (
        <div className="InstrumentReportManagement-cover" >
            <Button>Add Instrument</Button>
            {instrumentTypes.map(type => (
                <Accordion>
                    <AccordionSummary aria-controls="panel1a-content" id="panel1a-header">
                        <Typography>{type.Name} ({type.ShortName})</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <Typography>
                            <List>
                                {type.instruments.map(instrument => (
                                    <ListItem>
                                        <Stack direction="row" spacing="12">
                                            {instrument.Id}
                                            {status[instrument.Status]}
                                            <Button>Update</Button>
                                        </Stack>
                                    </ListItem>
                                ))}
                                </List>
                        </Typography>
                    </AccordionDetails>
                </Accordion>
            ))}
        </div>
    )
}

export default Instrument;