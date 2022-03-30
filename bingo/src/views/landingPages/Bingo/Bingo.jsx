import { Button, colors, Grid, LinearProgress, Paper, ToggleButton, Typography } from "@mui/material";
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
import { getNewTableDetail, validSelections } from '../../../utils'

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
    const [key, setKey] = React.useState(null);
    const [selectedTable, setSelectedTable] = React.useState(null);
    const [thisTablePlayersCount, setThisTablePlayersCount] = React.useState(0);
    const [isJoined, setIsJoined] = React.useState(false);
    const [selectedIndex, setSelectedIndex] = React.useState([12]);
    const [winNumber, setWinNumber] = React.useState(0);
    const [showConfetti, setShowConfetti] = React.useState(false);
    const [tableDetail, setTableDetail] = React.useState([])
    const { enqueueSnackbar } = useSnackbar();
    const theme = useTheme();
    const classes = useStyles(theme);

    const socketRef = React.useRef();

    React.useEffect(() => {
        setTableDetail(getNewTableDetail())
    }, [])

    React.useEffect(() => {
        socketRef.current = io("http://localhost:3001/");

        socketRef.current.on("newJoining", (data) => {
            setThisTablePlayersCount(data.total);
        })

        socketRef.current.on("newKey", (data) => {
            setKey(data.key)
        });

        return (() => {
            socketRef.current.disconnect()
        })
    }, []);

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

    React.useEffect(() => {
        setSelectedIndex([12])
        setTableDetail(getNewTableDetail())
        setIsJoined(false)
    }, [selectedTable])

    const handleJoin = async e => {
        try {
            const join = await playersServices.create('/', { table: selectedTable._id, playerId: socketRef.current.id })
            socketRef.current.emit("joinTable", {
                table: join.data.table,
                playerId: join.data.playerId,
            });
            setIsJoined(true)
            enqueueSnackbar(`you successfully joind, play with enjoy :)`, { variant: 'success' })
        }
        catch (ex) {
            enqueueSnackbar((ex && ex.response && ex.response.data && ex.response.data.message) || `Error ${ex.response.status} - try again...`, { variant: 'error' })
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
            <Grid container>
                <Grid item xs={5}>
                    {
                        selectedTable && isJoined ?
                            <h2>
                                {`Number of players of "${selectedTable.name}" table is: ${thisTablePlayersCount}`}
                            </h2>
                            :
                            <h2>
                                Bingo
                            </h2>
                    }
                </Grid>
                {selectedTable && isJoined &&
                    <Grid sx={{ width: '100%' }} justifyContent="center" alignItems={'center'} item xs={7}>
                        <LinearProgress value={50} color="success" />
                        <Paper sx={{ display: 'flex', alignItems: 'center', margin: 'auto', textAlign: 'center', width: '100%', borderRadius: 0, height: '100%', backgroundColor: theme.palette.grey[800] }}>
                            <Typography variant="h5" sx={{ textAlign: 'center', width: '100%' }}>{key}</Typography>
                        </Paper>
                    </Grid>
                }
            </Grid>

            <Grid container justifyContent="space-between" alignItems="center">
                <Grid item>
                    <Typography lineHeight={3} variant="caption">Enter new Table Name or Join to one of existing Tables :)</Typography>
                    <LoadingCreatableAutoComplete
                        size='small'
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
                    tableDetail
                        .map((item, index) =>
                            <Grid key={index} item xs={2.4} >
                                <ToggleButton
                                    disabled={!isJoined}
                                    selected={selectedIndex.includes(index)}
                                    onClick={e => {
                                        if (item === key) {
                                            setSelectedIndex(selectedIndex => ([...(new Set([...selectedIndex, index]))]))
                                        }
                                    }}
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
