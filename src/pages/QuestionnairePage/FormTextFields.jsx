import {
    Box,
    TextField,
    Typography
} from '@mui/material';
import PropTypes from 'prop-types';
import { memo } from 'react';

const FormTextFields = memo(({
    scalpCondition,
    setScalpCondition,
    currentIssues,
    setCurrentIssues,
    goals,
    setGoals

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
            {/* Condición del cuero cabelludo */}
            <Typography variant="h6" sx={{ marginTop: '3rem' }} fontWeight={'bold'}>
                5. ¿Cuál es la condición de tu cuero cabelludo?
            </Typography>
            <TextField
                fullWidth
                variant="outlined"
                placeholder="Describe tu cuero cabelludo (ej. seco, graso, sensible...)"
                value={scalpCondition}
                sx={{ background: 'white' }}
                onChange={(e) => setScalpCondition(e.target.value)}
            />

            {/* Problemas actuales */}
            <Typography variant="h6" sx={{ marginTop: '3rem' }} fontWeight={'bold'}>
                6. ¿Qué problemas específicos tiene tu cabello?
            </Typography>
            <TextField
                fullWidth
                variant="outlined"
                placeholder="Ej. caída excesiva, frizz, daño químico..."
                value={currentIssues}
                sx={{ background: 'white' }}
                onChange={(e) => setCurrentIssues(e.target.value)}
            />

            {/* Objetivos */}
            <Typography variant="h6" sx={{ marginTop: '3rem' }} fontWeight={'bold'}>
                7. ¿Qué resultados esperas conseguir?
            </Typography>
            <TextField
                fullWidth
                variant="outlined"
                placeholder="Ej. más hidratación, volumen, reparación..."
                value={goals}
                sx={{ background: 'white' }}
                onChange={(e) => setGoals(e.target.value)}
            />
        </Box>
    )
});

FormTextFields.displayName = 'FormTextFields';

FormTextFields.propTypes = {
    scalpCondition: PropTypes.string,
    currentIssues: PropTypes.string,
    goals: PropTypes.string,
    setScalpCondition: PropTypes.func,
    setCurrentIssues: PropTypes.func,
    setGoals: PropTypes.func,
};

export default FormTextFields