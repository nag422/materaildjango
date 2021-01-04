import React, { ReactNode } from "react";
import { Field, ErrorMessage, FieldInputProps } from "formik";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormHelperText from "@material-ui/core/FormHelperText";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";

const MaterialUISelectField = ({
    errorString,
    label,
    children,
    value,
    name,
    onChange,
    onBlur,
    required
}) => {
    return (
        <FormControl fullWidth>
            <InputLabel required={required}>{label}</InputLabel>
            <Select name={name} onChange={onChange} onBlur={onBlur}
                value={value}>
                {children}
            </Select>
            <FormHelperText>{errorString}</FormHelperText>
        </FormControl>
    );
};

const FormikSelect = ({name,items,label, required=false}) => {
    return (
        <div className="FormikSelect">
            <Field
                name={name}
                as={MaterialUISelectField}
                label={label}
                errorString={<ErrorMessage name={name} />}
                required={required}           
            >
                {items.map(item => (
                    <MenuItem key={item.value} value={item.value}>
                        {item.label}
                    </MenuItem>
                ))}
                </Field>

        </div>
    )
}
export default FormikSelect;