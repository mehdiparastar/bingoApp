import * as React from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete, { createFilterOptions } from '@mui/material/Autocomplete';
import CircularProgress from '@mui/material/CircularProgress';
import { useSnackbar } from 'notistack';

export default function LoadingCreatableAutoComplete({
    getOptions,
    getOptionsApiEndPoints,
    createOption,
    createOptionApiEndPoint,
    optionTitleKey,
    noOptionTitle,
    value,
    setValue,
    label,
    size,
    rest
}) {
    const [open, setOpen] = React.useState(false);
    const [options, setOptions] = React.useState([]);
    const loading = open && options.length === 0;
    const { enqueueSnackbar } = useSnackbar();

    React.useEffect(() => {
        let active = true;

        if (!loading) {
            return undefined;
        }

        (async () => {
            if (active) {
                const x = await getOptions
                const options = ((await getOptions(getOptionsApiEndPoints)).data).map(item => ({ ...item, title: item[optionTitleKey] })) || []
                if (options.length === 0) {
                    setOptions([{ title: 'no options exist!' }]);
                } else {
                    setOptions([...options]);
                }
            }
        })();

        return () => {
            active = false;
        };
    }, [loading]);

    React.useEffect(() => {
        if (!open) {
            setOptions([]);
        }
    }, [open]);

    const filter = createFilterOptions();

    return (
        <Autocomplete
            id="asynchronous-creatable-demo"
            sx={{ width: 300 }}
            open={open}
            onOpen={() => {
                setOpen(true);
            }}
            onClose={() => {
                setOpen(false);
            }}
            isOptionEqualToValue={(option, value) => {
                return option.title === value.title
            }}
            // getOptionLabel={(option) => option.title}
            options={options}
            loading={loading}
            getOptionDisabled={(option) =>
                option.title === noOptionTitle
            }
            renderInput={(params) => (
                <TextField
                    {...params}
                    label={label}
                    InputProps={{
                        ...params.InputProps,
                        endAdornment: (
                            <React.Fragment>
                                {loading ? <CircularProgress color="inherit" size={20} /> : null}
                                {params.InputProps.endAdornment}
                            </React.Fragment>
                        ),
                    }}
                    size={size}
                />
            )}
            /////////////// creatable //////////////////////////
            onChange={async (event, newValue) => {
                if (typeof newValue === 'string') {
                    setValue({
                        title: newValue,
                    });
                } else if (newValue && newValue.inputValue) {
                    try {
                        // Create a new value from the user input
                        const createNewValue = await createOption(createOptionApiEndPoint, { [optionTitleKey]: newValue.inputValue })
                        enqueueSnackbar(`successfully created`, { variant: 'success' })
                        setValue({
                            ...createNewValue.data,
                            title: createNewValue.data[optionTitleKey],
                        });
                    }
                    catch (ex) {
                        enqueueSnackbar(`Error ${ex.response.status} - try again...`, { variant: 'error' })
                        throw ex
                    }
                } else {
                    setValue(newValue);
                }
            }}
            filterOptions={(options, params) => {
                const filtered = filter(options, params);

                const { inputValue } = params;
                // Suggest the creation of a new value
                const isExisting = options.some((option) => inputValue === option.title);
                if (inputValue !== '' && !isExisting) {
                    filtered.push({
                        inputValue,
                        title: `Add "${inputValue}"`,
                    });
                }

                return filtered;
            }}
            getOptionLabel={(option) => {
                // Value selected with enter, right from the input
                if (typeof option === 'string') {
                    return option;
                }
                // Add "xxx" option created dynamically
                if (option.inputValue) {
                    return option.inputValue;
                }
                // Regular option
                return option.title;
            }}
            renderOption={(props, option) => <li {...props}>{option.title}</li>}

            ///////////////////////////////////////////////////
            {...rest}
        />
    );
}

LoadingCreatableAutoComplete.defaultProps = {
    noOptionTitle: 'no options exist!',
    size: 'medium'
}
