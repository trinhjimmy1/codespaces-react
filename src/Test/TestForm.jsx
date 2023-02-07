import React from 'react';
import * as Yup from "yup";
import {Grid} from "@material-ui/core";
import Autocomplete from "@material-ui/lab/Autocomplete";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";

export const validationSchema = Yup.object().shape({
    numeroAutomate: Yup.string(),
    ouvrages: Yup.array(),
});
export const TestForm = ({formik, isSubmitting, automates, automatesNumeros, ouvrages}) => {

    return (
        <Grid
            container
            justifyContent="center"
            alignItems="center"
        >
            <Grid container spacing={3}>
                <Grid item md={4} style={{zIndex: 10}}>
                    <Autocomplete
                        style={{ width: 300 }}
                        disablePortal
                        defaultValue={formik.values.numeroAutomate /*|| {value:'', label:''}*/}
                        // value={formik.values.numeroAutomate || ''}
                        onChange={(_, value) => {
                            console.log(value);
                            const val = value ? value.value : '';
                            formik.setFieldValue("numeroAutomate", val);
                        }}
                        options={automatesNumeros}
                        getOptionLabel={option => option.label}
                        getOptionSelected={(option, value) => {
                            return option.value === value.value
                        }}
                        // classes={{option: test ? classes.option1 : classes.option2}}
                        renderInput={(params) =>
                            <TextField
                                {...params}
                                label="Numero automate"
                                variant="outlined"
                            />}
                    />
                </Grid>
                <Grid item xs={6} style={{zIndex: 10}}>
                    <Autocomplete
                        multiple
                        style={{ width: 300 }}
                        disablePortal
                        defaultValue={formik.values.ouvrages}
                        onChange={(_, value) => {
                            console.log(value);
                            const val = value ? value.map(item => item.value) : '';
                            formik.setFieldValue("ouvrages", val);
                        }}
                        options={ouvrages}
                        getOptionLabel={option => `${option.label}` }
                        getOptionSelected={(option, value) => {
                            return option.value === value.value
                        }}
                        renderInput={(params) =>
                            <TextField
                                {...params}
                                label="ouvrages"
                                variant="outlined"
                            />}
                    />
                </Grid>

                <Grid>
                    <Button
                        variant="contained"
                        color="primary" type="submit"
                        disabled={isSubmitting}
                        onClick={formik.submitForm}
                    >
                        Valider
                    </Button>
                </Grid>
            </Grid>
        </Grid>
    );
};
