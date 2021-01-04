import React, { ReactNode } from "react";
import { Field, ErrorMessage, FieldInputProps } from "formik";
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import clsx from 'clsx';
import {Divider, makeStyles} from '@material-ui/core'

const useStyles = makeStyles({
    root: {
      '&:hover': {
        backgroundColor: 'transparent',
      },
    },
    icon: {
      borderRadius: '50%',
      width: 16,
      height: 16,
      boxShadow: 'inset 0 0 0 1px rgba(16,22,26,.2), inset 0 -1px 0 rgba(16,22,26,.1)',
      backgroundColor: '#f5f8fa',
      backgroundImage: 'linear-gradient(180deg,hsla(0,0%,100%,.8),hsla(0,0%,100%,0))',
      '$root.Mui-focusVisible &': {
        outline: '2px auto rgba(19,124,189,.6)',
        outlineOffset: 2,
      },
      'input:hover ~ &': {
        backgroundColor: '#ebf1f5',
      },
      'input:disabled ~ &': {
        boxShadow: 'none',
        background: 'rgba(206,217,224,.5)',
      },
    },
    checkedIcon: {
      backgroundColor: '#137cbd',
      backgroundImage: 'linear-gradient(180deg,hsla(0,0%,100%,.1),hsla(0,0%,100%,0))',
      '&:before': {
        display: 'block',
        width: 16,
        height: 16,
        backgroundImage: 'radial-gradient(#fff,#fff 28%,transparent 32%)',
        content: '""',
      },
      'input:hover ~ &': {
        backgroundColor: '#106ba3',
      },
    },
  });
  
  // Inspired by blueprintjs
  function StyledRadio(props) {
    const classes = useStyles();
  
    return (
      <Radio
        className={classes.root}
        disableRipple
        color="default"
        checkedIcon={<span className={clsx(classes.icon, classes.checkedIcon)} />}
        icon={<span className={classes.icon} />}
        {...props}
      />
    );
  }
  
  

  const MaterialUIRadioField = ({
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
        <FormControl component="fieldset">
        {/* <FormLabel component="legend">Select Subs</FormLabel> */}
        <RadioGroup defaultValue="subscribed" aria-label="Lettersub"
        name={name} onChange={onChange} onBlur={onBlur}
        value={value}
        >
            {children}
        </RadioGroup>
      </FormControl>
    );
};

  const FormikRadio = ({name,label,val,required}) => {
      return (
            <div className="FormikSelect">
                <Field
                name={name}
                as={MaterialUIRadioField}
                label={label}
                errorString={<ErrorMessage name={name} />}
                required={required}
                >
                    <FormControlLabel value={val} control={<StyledRadio />} label={val} />
                    {/* <FormControlLabel value="unsubscribe" control={<StyledRadio />} label="Unsubscribe" />       */}

                </Field>


                {/* <FormControl component="fieldset">
                    <FormLabel component="legend">Select Subs</FormLabel>
                </FormControl> */}


            </div>
      );
  }


  
  export default FormikRadio
  