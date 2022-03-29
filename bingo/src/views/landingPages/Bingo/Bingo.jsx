import * as React from "react";
import { io } from "socket.io-client";
import LoadingAutoComplete from "../../../components/loadingAutoComplete";
import tablesServices from "../../../services/tablesServices";

function Bingo() {
    const [currentTable, setCurrentTable] = React.useState({
        key: "",
        name: "Chat",
    });
    const [tables, setTables] = React.useState([]);
    const [messages, setMessages] = React.useState([]);
    const [alert, setAlert] = React.useState(true);

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

    return (
        <div>
            <h2>Bingo</h2>
            <LoadingAutoComplete
                getOptions={tablesServices.get('/tables/all')}
                optionTitleKey="name"
            />
        </div>
    );
}

export default Bingo;
