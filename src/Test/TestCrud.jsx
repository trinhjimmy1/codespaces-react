import React, {useEffect, useState} from 'react';
import { automatesData, dataAutomate, ouvragesData } from '../data';
import {useFormik} from "formik";
import {Grid} from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import {TestForm, validationSchema} from "./TestForm";

const defaultValue = {
    ouvrages : [],
    numeroAutomate : null
}
export const TestCrud = ({edit = false}) => {
    const [initialValues, setInitialValues] = useState(undefined);
    const [isLoading, setIsLoading] = useState(true);
    const [automatesNumeros, setAutomatesNumeros] = useState([]);
    const [ouvrages, setOuvrages] = useState([]);
    const [currentDatas, setCurrentDatas] = useState([]);

    const id = 3;

    const retrieveData = (id) => {
        try {
            console.log(dataAutomate)
            const res = dataAutomate.find(item => item.id === id);
            console.log('responsse',res);
            setCurrentDatas(res);
        } catch (e) {
            console.log('error');
        }
    };


    useEffect(() => {
        if (edit) {
            retrieveData(id);
            setIsLoading(false);
        }
        setIsLoading(true);
    }, [id]);

    useEffect(() => {
        setAutomatesNumeros(automatesData.map(item => {
            return {
                value : item.id,
                label: `${item.numeroAutomate} - ${item.nom} - ${item.codeIdentification}`
            }
        }));
        setOuvrages(ouvragesData.map(item => {
            return {
                value: item.id,
                label: `${item.nom} - ${item.code}`
            }
        }))
    }, []);

    useEffect(() => {
        if(edit) {
            const setValues = () => {
                setInitialValues({
                    nom: currentDatas.nom ?? '',
                    code : currentDatas.code ??'',
                    ouvrages : currentDatas.ouvrages ? currentDatas.ouvrages.map(item => item.ouvrages) : [],
                    numeroAutomate: currentDatas.numeroAutomate ? automatesNumeros.find((automateNumero) => automateNumero.value === currentDatas.numeroAutomate) : null,
                });
            }
            setValues();
        } else if (!edit){
            setInitialValues(defaultValue);
        }
    }, [currentDatas, automatesNumeros, ouvrages]);
    return (
        <>
            {initialValues && <TestCrudForm
                id={id}
                initialValues={initialValues}
                edit={edit}
                automatesNumeros={automatesNumeros}
                ouvrages={ouvrages}
            />}
        </>
    );
};

const TestCrudForm = ({initialValues, id, edit, automatesNumeros, ouvrages}) => {
    const [dataAutos, setDataAutos] = useState([]);
    const [dataAuto, setDataAuto] = useState([]);

    useEffect(() => {
        setDataAutos(automatesData);
        setDataAuto(dataAutomate);
    }, []);

    const formik = useFormik({
        initialValues,
        validationSchema,
        onSubmit: async (values) => {
            try {
                if (edit) {
                    dataAuto[2].ouvrages = values.ouvrages;
                    dataAuto[2].numeroAutomate = values.numeroAutomate;
                    alert(`Update de le l'automate ${JSON.stringify(values)}`)
                    console.log(`Le test ${id} à bien été modifié`);
                    console.log('edit', dataAutomate);
                } else {
                    dataAuto[2].ouvrages = values.ouvrages;
                    dataAuto[2].numeroAutomate = values.numeroAutomate;
                    alert(`Création good ${JSON.stringify(values)}`);
                    console.log("Le test à bien été créée");
                    console.log('create', dataAutomate);
                }
            } catch (e) {
                console.log("Une erreur est survenue: " + e.message);
            }
        },
        validateOnChange: false
    })

    return (
        <div>
            <Grid container
                  justifyContent="center"
                  alignItems="center"
            >
                <Typography variant="h4">{edit ? `Modification d'un test` : `Création d'un test`}</Typography>
            </Grid>
            <TestForm
                formik={formik}
                automates={dataAutos}
                automatesNumeros={automatesNumeros}
                ouvrages={ouvrages}
            />
        </div>

    );
};
