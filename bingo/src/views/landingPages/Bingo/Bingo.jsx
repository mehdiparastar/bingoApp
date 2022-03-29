import { Button, colors, Grid, Paper, ToggleButton, Typography } from "@mui/material";
import * as React from "react";
import { io } from "socket.io-client";
import LoadingCreatableAutoComplete from "../../../components/loadingCreatableAutoComplete";
import playersServices from "../../../services/playersServices";
import tablesServices from "../../../services/tablesServices";
import { useSnackbar } from 'notistack';
import { Box } from "@mui/system";
import { useTheme } from '@mui/material/styles';
import { makeStyles } from '@mui/styles';
import clsx from 'clsx'
import _, { set } from 'lodash'
import Confetti from 'react-confetti'

const tableDetail = [
    '(child noises in the background)',
    'Hello, Hello?',
    'i need to jump in another call',
    'can everyone go on mute',
    'could you please get closer to the mic',

    '(load painful echo / feedback)',
    'Next slide, please.',
    'can we take this offline?',
    'is __ on the call?',
    'Could you share this slides afterwards?',

    'can somebody grant presenter rights',
    'can you email that to everyone?',
    'sorry, i had problems logging in',
    '(animal noises in the background)',

    'sorry, i did not found the conference id',
    'i was having connection issues',
    'i will have to get back to you',
    'who just joined',
    'sorry, something __ with my calendar',

    'do you see my screen?',
    'lets wait for __!',
    'You will send the minutes?',
    'sorry, i was in mute.',
    'can you repeat, please?',
].sort(function () { return 0.5 - Math.random() })

const validSelections = [
    [0, 1, 2, 3, 4],
    [5, 6, 7, 8, 9],
    [10, 11, 12, 13, 14],
    [15, 16, 17, 18, 19],
    [20, 21, 22, 23, 24],
    [0, 5, 10, 15, 20],
    [1, 6, 11, 16, 21],
    [2, 7, 12, 17, 22],
    [3, 8, 13, 18, 23],
    [4, 9, 14, 19, 24],
    [0, 6, 12, 18, 24],
    [4, 8, 12, 16, 20],
]

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
        height: '100%'
    },
    selected: {
        // color: theme.palette.primary.main,
        textDecoration: 'line-through',
    },
    confetti: {
        padding: 0,
        margin: 'auto'
    }
}));

function Bingo() {
    const [currentTable, setCurrentTable] = React.useState({
        key: "",
        name: "Chat",
    });
    const [tables, setTables] = React.useState([]);
    const [selectedTable, setSelectedTable] = React.useState(null);
    const [messages, setMessages] = React.useState([]);
    const [alert, setAlert] = React.useState(true);
    const [selectedIndex, setSelectedIndex] = React.useState([12]);
    const [winNumber, setWinNumber] = React.useState(0);
    const [showConfetti, setShowConfetti] = React.useState(false);
    const { enqueueSnackbar } = useSnackbar();
    const theme = useTheme();
    const classes = useStyles(theme);



    const socketRef = React.useRef();

    React.useEffect(() => {
        socketRef.current = io("http://localhost:3001/");

        socketRef.current.on("message", (data) => {
            setMessages((previousMessages) => {
                return [...previousMessages, data];
            });
        });

        socketRef.current.on("output-messages", (data) => {
            setMessages((previousMessages) => {
                return [...previousMessages, ...data];
            });
        });
        return (() => {
            socketRef.current.disconnect()
        })
    }, []);

    React.useEffect(() => {
        if (alert) {
            setAlert(false);
        }
    }, [alert]);

    React.useEffect(() => {
        const allSubArrays = validSelections.filter(selection =>
            selection
                .map(item => selectedIndex.includes(item))
                .filter(item => item === false).length === 0
        )
        if (allSubArrays.length !== winNumber) {
            setShowConfetti(true)
        } else {
            setShowConfetti(false)
        }
        setWinNumber(allSubArrays.length)
    }, [selectedIndex])

    const handleJoin = async e => {
        try {
            const join = await playersServices.create('/', { table: selectedTable._id, playerId: socketRef.current.id })
            enqueueSnackbar(`you successfully joind, play with enjoy :)`, { variant: 'success' })
        }
        catch (ex) {
            enqueueSnackbar(`Error ${ex.response.status} - try again...`, { variant: 'error' })
            throw ex
        }
    }

    return (
        <div className={classes.root}>
            {
                showConfetti &&
                <Confetti
                    width={400}
                    height={window.innerHeight}
                    className={classes.confetti}
                />
            }
            <h2>Bingo</h2>
            <Grid container justifyContent="space-between" alignItems="center">
                <Grid item>
                    <Typography variant="caption">Enter new Table Name or Join to one of existing Tables :)</Typography>
                    <br />
                    <LoadingCreatableAutoComplete
                        getOptions={tablesServices.get}
                        createOption={tablesServices.create}
                        getOptionsApiEndPoints='/all'
                        createOptionApiEndPoint='/'
                        optionTitleKey="name"
                        label="Table Name"
                        value={selectedTable}
                        setValue={setSelectedTable}
                    />
                </Grid>
                <Grid item>
                    <Typography variant="h5" >{`Number of Correct Answers: ${winNumber}`}</Typography>
                </Grid>
                <Grid item>
                    <Button
                        disabled={selectedTable === null}
                        variant="contained"
                        onClick={handleJoin}
                    >
                        join to Play :)
                    </Button>
                </Grid>
            </Grid>
            <br />
            <Grid container spacing={1}>
                {
                    [...tableDetail.slice(0, 12), 'CONF CALL BINGO 😷', ...tableDetail.slice(12)]
                        .map((item, index) =>
                            <Grid key={index} item xs={2.4} >
                                <ToggleButton
                                    selected={selectedIndex.includes(index)}
                                    onClick={e => setSelectedIndex(selectedIndex => ([...(new Set([...selectedIndex, index]))]))}
                                    size="large"
                                    sx={{
                                        height: {
                                            xs: 200,
                                            md: 100
                                        },
                                        width: '100%',
                                        backgroundColor: colors.blueGrey[800],
                                        textAlign: 'center',
                                        padding: 1
                                    }}
                                    value={index}
                                >
                                    <div style={{ width: '100%', height: '100%', padding: 0 }}>
                                        <Typography width={'100%'} color={theme.palette.common.white} display={"block"} align="right" variant="caption">
                                            {index}
                                        </Typography>
                                        <Typography className={clsx({ [classes.selected]: selectedIndex.includes(index) })} noWrap={false} width={'100%'} color={theme.palette.common.white} variant="caption">
                                            {item}
                                        </Typography>
                                    </div>
                                </ToggleButton>
                            </Grid>
                        )}
            </Grid>
        </div >
    );
}

export default Bingo;
