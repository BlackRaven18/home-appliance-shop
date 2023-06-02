import { TextField } from "@mui/material";
import { useState } from "react";

interface FormTextPropsI {
    label: string,
    value: string,
    formFieldName: string,
    helperText: string,

    onChangeForm: (key: string, value: any) => void,
}

export const FormTextField = (props: FormTextPropsI) => {

    const [isFieldEmpty, setIsFieldEmpty] = useState(false);
    const [fieldValue, setFieldValue] = useState<string>("");

    return (
        <TextField
            margin="normal"
            required
            fullWidth
            label={props.label}
            value={props.value}
            name={props.formFieldName}
            onChange={(e) => {
                props.onChangeForm(props.formFieldName, e.target.value);
                setFieldValue(e.target.value);
            }}
            error={fieldValue.length === 0? true : false}
            helperText={fieldValue.length === 0? "Pole nie może być puste!": ""}
                
                // errorMessages.includes('email') ?
                //     'Pole nie może być puste' :
                //     ''
           // }
        />
    );
}

export default FormTextField;