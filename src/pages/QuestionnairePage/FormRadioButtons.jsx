import {
    Box,
    FormControl,
    FormControlLabel,
    Radio,
    RadioGroup,
    Typography
} from '@mui/material';
import PropTypes from 'prop-types';
import { memo } from 'react';

const classes = {
    radioGroup: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        gap: 2,
        flexWrap: 'wrap',
    },
};


const FormRadioButtons = memo(({
    hairType,
    setHairType,
    hairLength,
    setHairLength,
    dyeHairFrequency,
    setDyeHairFrequency,
    mainConcern,
    setMainConcern
}) => {
    return (
        <Box
            sx={{
                width: '100%',
                padding: '1rem',
                boxSizing: 'border-box',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
            }}
        >
            {/* Tipo de cabello */}
            <Typography variant="h6" fontWeight={'bold'}>
                1. ¿Cómo describirías tu tipo de cabello?
            </Typography>
            <FormControl component="fieldset">
                <RadioGroup
                    value={hairType}
                    onChange={(e) => setHairType(e.target.value)}
                    sx={classes.radioGroup}
                >
                    <FormControlLabel value="liso" control={<Radio />} label="Liso" />
                    <FormControlLabel
                        value="ondulado"
                        control={<Radio />}
                        label="Ondulado"
                    />
                    <FormControlLabel
                        value="rizado"
                        control={<Radio />}
                        label="Rizado"
                    />
                    <FormControlLabel
                        value="muyRizado"
                        control={<Radio />}
                        label="Muy rizado"
                    />
                </RadioGroup>
            </FormControl>

            {/* Longitud del cabello */}
            <Typography variant="h6" sx={{ marginTop: '3rem' }} fontWeight={'bold'}>
                2. ¿Qué tan largo es tu cabello?
            </Typography>
            <FormControl component="fieldset">
                <RadioGroup
                    sx={classes.radioGroup}
                    value={hairLength}
                    onChange={(e) => setHairLength(e.target.value)}
                >
                    <FormControlLabel value="corto" control={<Radio />} label="Corto" />
                    <FormControlLabel value="medio" control={<Radio />} label="Medio" />
                    <FormControlLabel value="largo" control={<Radio />} label="Largo" />
                </RadioGroup>
            </FormControl>

            {/* ¿Sueles teñir o tratar químicamente tu cabello? */}
            <Typography variant="h6" sx={{ marginTop: '3rem' }} fontWeight={'bold'}>
                3. ¿Sueles teñir o tratar químicamente tu cabello?
            </Typography>
            <FormControl component="fieldset">
                <RadioGroup
                    sx={classes.radioGroup}
                    value={dyeHairFrequency}
                    onChange={(e) => setDyeHairFrequency(e.target.value)}
                >
                    <FormControlLabel
                        value="Sí, frecuentemente"
                        control={<Radio />}
                        label="Sí, frecuentemente"
                    />
                    <FormControlLabel
                        value="Ocasionalmente"
                        control={<Radio />}
                        label="Ocasionalmente"
                    />
                    <FormControlLabel
                        value="No, nunca"
                        control={<Radio />}
                        label="No, nunca"
                    />
                </RadioGroup>
            </FormControl>

            {/* ¿Cuál es tu mayor preocupación relacionada con tu cabello? */}
            <Typography variant="h6" sx={{ marginTop: '3rem' }} fontWeight={'bold'}>
                4. ¿Cuál es tu mayor preocupación relacionada con tu cabello?
            </Typography>
            <FormControl component="fieldset">
                <RadioGroup
                    sx={classes.radioGroup}
                    value={mainConcern}
                    onChange={(e) => setMainConcern(e.target.value)}
                >
                    <FormControlLabel
                        value="Caída excesiva"
                        control={<Radio />}
                        label="Caída excesiva"
                    />
                    <FormControlLabel value="Frizz" control={<Radio />} label="Frizz" />
                    <FormControlLabel
                        value="Falta de volumen"
                        control={<Radio />}
                        label="Falta de volumen"
                    />
                    <FormControlLabel
                        value="Daño por calor o tratamiento químico"
                        control={<Radio />}
                        label="Daño por calor o tratamiento químico"
                    />
                    <FormControlLabel
                        value="Falta de volumen"
                        control={<Radio />}
                        label="Falta de volumen"
                    />
                </RadioGroup>
            </FormControl>

        </Box>

    )
});

FormRadioButtons.displayName = 'FormRadioButtons';

FormRadioButtons.propTypes = {
    hairType: PropTypes.string,
    hairLength: PropTypes.string,
    dyeHairFrequency: PropTypes.string,
    mainConcern: PropTypes.string,
    setHairType: PropTypes.func,
    setHairLength: PropTypes.func,
    setDyeHairFrequency: PropTypes.func,
    setMainConcern: PropTypes.func,

};

export default FormRadioButtons