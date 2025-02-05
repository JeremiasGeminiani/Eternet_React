// -- Server Express.js
import express from 'express';
import cors from 'cors';
import { createServer } from 'http'; // Para crear el servidor HTTP con Express.
import { Server as SocketIO } from 'socket.io'; // Importar Socket.IO.

// -- MySQL2
import { pool } from './config.js'; // Asegúrate de exportar 'pool' en tu archivo config.js

const app = express();
const http = createServer(app); // Crear el servidor HTTP para usarlo con Socket.IO.


// -- Socket.IO Configuración
const io = new SocketIO(http, {
    cors: {
        origin: 'http://192.168.0.103:3000'
    }
});

// -- Middlewares
app.use(cors());
app.use(express.urlencoded({ extended: false })); // Middleware para parsear datos urlencoded (formularios).
app.use(express.json()); // Middleware para parsear datos JSON.


// -- GET: Index
app.get("/", (req, res) => {
    res.send("All ok!");
});


// -- POST: Register
app.post("/register", async (req, res) => {
    const { username, email, password } = req.body;
    console.log(req.body);

    try {
        const [createUser] = await pool.query(
            "INSERT INTO users (username, email, password) VALUES (?, ?, ?)",
            [username, email, password]
        );

        if (createUser.affectedRows > 0) {
            console.log("OKK");
            res.status(200).json({ status: "ok", msg: "All ok!" });
        } else {
            res.status(400).json({ error: true, msg: "Error al crear el usuario" });
        }
    } catch (error) {
        console.error('Error al crear el usuario:', error);
        res.status(500).json({ error: true, msg: "Error del servidor" });
    }
});


// -- POST: Login
const getUserByUsername = async username => {
    try {
        const [getUser] = await pool.query("SELECT * FROM users WHERE username = ?", [username]);

        if (getUser.length > 0) {
            const id = getUser[0].iduser;
            return id.toString();
        } else {
            return 0;
        }
    } catch (e) {
        return e;
    }
};

app.post("/login", async (req, res) => {
    const { username, password } = req.body;
    console.log(req.body);

    if (!username || !password) {
        return res.status(400).json({ error: true, msg: "Username y password son requeridos" });
    }

    try {
        const [rows] = await pool.query("SELECT * FROM users WHERE username = ? AND password = ?", [username, password]);

        if (rows.length === 0) {
            return res.status(404).json({ error: true, msg: "Usuario no encontrado o contraseña incorrecta" });
        }

        const token = await getUserByUsername(username);
        return res.status(200).json(token);
    } catch (error) {
        console.error('Error en el login:', error);
        return res.status(500).json({ error: true, msg: "Error del servidor" });
    }
});


// -- POST: Check-session:
app.post('/check-session', async (req, res) => {
    const { token } = req.body;
    console.log(req.body);

    const [getIdUser] = await pool.query("SELECT * FROM users WHERE iduser = ?", [token]);

    if (getIdUser.length > 0) {
        return res.status(200).json({ iduser: getIdUser[0].iduser, username: getIdUser[0].username });
    } else {
        return res.status(500).json({ msg: 'Server Error on /check-session' });
    }
});


// -- POST: Create group
app.post("/create", async (req, res) => {
    const { name, token } = req.body;
    const datetime = new Date();
    console.log(req.body);

    try {
        const [createGroup] = await pool.query(
            "INSERT INTO `groups` (name, iduser, datetime) VALUES (?, ?, ?)",
            [name, parseInt(token), datetime]
        );

        if (createGroup.affectedRows > 0) {
            return res.status(200).json({ status: true, name: name });
        } else {
            return res.status(500).json({ status: false });
        }
    } catch (error) {
        console.error(error);
        return res.status(500).json({ status: false, message: error.message });
    }
});


// -- GET: List users
app.get("/users", async (req, res) => {
    const [getUsers] = await pool.query("SELECT * FROM users");

    if (getUsers.length > 0) {
        return res.json(getUsers);
    } else {
        return res.json({ error: true, msg: "Error listando usuarios" });
    }
});


// -- POST: Enviar mensaje al grupo
app.post("/send-message", async (req, res) => {

    console.log(req.body);

    const { idgroup, token, message } = req.body;
    const datetime = new Date();

    try {

        const [sendMessage] = await pool.query("INSERT INTO groups_messages(idgroup, iduser, message, datetime) VALUES(?, ?, ?, ?)", [
            parseInt(idgroup), parseInt(token), message, datetime
        ])

        if (sendMessage.affectedRows > 0) {
            return res.status(200).json({ status: true, message: message, datetime: datetime })
        } else {
            return res.status(500).json({ status: false, msg: "Error while sending the parameters." })
        }

    } catch (e) {

        return res.status(500).json({ status: false, msg: e })
    }

})


// -- Socket.IO Connection
let chatgroups = [];

io.on('connection', socket => {
    console.log(`${socket.id} is Connected....[ok]`);


    // -- Obtener todos los miembros del grupo
    socket.on('getAllGroups', data => {
        socket.emit('groupList', chatgroups)
    })


    // -- Crear nuevo grupo
    socket.on("createNewGroup", data => {

        console.log(`New group: ${data}`)

        chatgroups.unshift({
            id: Math.floor(chatgroups.length + 1),
            data, messages: []
        })
        socket.emit("groupList", chatgroups);



    });

    // -- enviar mensaje a grupo especifico
});



// -- GET: Get all chat groups
app.get("/chats", (req, res) => {
    return res.json(chatgroups)
})

// Iniciar el servidor
http.listen(process.env.PORT || 3000, '0.0.0.0', () => {
    console.log('Server starting......[OK]');
});
