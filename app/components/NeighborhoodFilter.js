import React, {useState} from 'react';
import {
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    Checkbox,
    ListItemText,
} from '@mui/material';
import {makeStyles} from '@mui/styles';




// Estado para manejar la selección de áreas y barrios
const useStyles = makeStyles((theme) => ({
    indented: {
        marginLeft: "25px",
        height: "30px",

    },
}));

const NeighborhoodFilter = ({areas,setSelectedZones}) => {
    const [selectedItems, setSelectedItems] = useState([]);
    const classes = useStyles();

    const handleSelectChange = (value) => {
        console.log(value)
        setSelectedItems(value);
        setSelectedZones(value.map((item) => item.substring(item.indexOf("-") + 1)));
    };

    const renderSelectedItems = (selected) => {
        const selectedAreas = selected.filter((item) => item.includes('area'));
        const selectedNeighborhoods = selected.filter((item) => item.includes('neighborhood'));
        return selectedNeighborhoods.length > 0 ? selectedNeighborhoods.length + " barrios seleccionados" : "Todos los barrios";
    };

    return (
        <FormControl style={{width: "250px"}}>
            <InputLabel>Áreas y Barrios</InputLabel>
            <Select
                multiple
                value={selectedItems}
                renderValue={renderSelectedItems}
            >
                {areas.map((area) => (
                    <React.Fragment key={`fragment-area-${area.id}`}>
                        <MenuItem key={`area-${area.id}`} value={`area-${area.id}`}>
                            <Checkbox checked={selectedItems.includes(`area-${area.id}`)} onClick={() => {
                                if (selectedItems.includes(`area-${area.id}`)) {
                                    //Iterate over areas and remove all neighborhoods
                                    let neighborhoods = []
                                    area.neighborhoods.forEach((neighborhood) => {
                                        neighborhoods.push(`neighborhood-${neighborhood.id}`)
                                    })
                                    handleSelectChange(selectedItems.filter((item) => !neighborhoods.includes(item) && item !== `area-${area.id}`))
                                } else {
                                    //iterate over areas and add all neighborhoods
                                    let neighborhoods = []
                                    area.neighborhoods.forEach((neighborhood) => {
                                        neighborhoods.push(`neighborhood-${neighborhood.id}`)
                                    })
                                    handleSelectChange([...selectedItems, ...neighborhoods, `area-${area.id}`])
                                }
                            }}/>
                            <ListItemText primary={<span className={"TextSmallSemibold"}> {area.name}</span>} />
                        </MenuItem>
                        {area.neighborhoods.map((neighborhood) => (
                            <MenuItem
                                key={`neighborhood-${neighborhood.id}`}
                                value={`neighborhood-${neighborhood.id}`}
                                className={classes.indented }
                            >
                                <Checkbox checked={selectedItems.includes(`neighborhood-${neighborhood.id}`)}
                                          onClick={() => {
                                              if (selectedItems.includes(`neighborhood-${neighborhood.id}`)) {
                                                  handleSelectChange(selectedItems.filter((item) => item !== `neighborhood-${neighborhood.id}`))
                                              } else {
                                                  handleSelectChange([...selectedItems, `neighborhood-${neighborhood.id}`])
                                              }
                                          }}/>
                                <ListItemText primary={<span className={"TextSmallNormal"}> {neighborhood.name}</span>}/>
                            </MenuItem>
                        ))}
                    </React.Fragment>
                ))}
            </Select>
        </FormControl>
    );
};


export default NeighborhoodFilter;
