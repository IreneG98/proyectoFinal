/* 
    Enviar info de un usuario cuyo id se obtiene por path params
*/

const getDB = require('../../db/getDB');
const { generateError } = require('../../helpers');

const getUser = async (req, res, next) => {
    let connection;

    try {
        // Abrimos una conexión a la base de datos
        connection = await getDB();
        const { id: idUser } = req.userAuth;

        // Comprobamos que el usuario existe en la base de datos
        const [user] = await connection.query(
            `SELECT * FROM user WHERE id = ?`,
            [idUser]
        );

        // Si no devuelve ningun valor la consulta ese usuario no existe
        if (user.length < 1) {
            throw generateError(`El usuario con id ${idUser} no existe.`, 404); // Not Found
        }

        // Si respondieramos con solo algun dato del usuario
        const responseUser = {
            id: user[0].id,
            username: user[0].username,
            email: user[0].email,
            nombre: user[0].name || '',
            apellidos: user[0].lastname || '',
            avatar: user[0].avatar || '',
            direccion: user[0].address || '',
        };

        res.send({
            status: 'Ok',
            user: responseUser,
        });
    } catch (error) {
        // Si ocurre un error, lo pasamos, para que lo capture el middleware de error
        next(error);
    } finally {
        // Si existe una conexión a la base de datos, se cierra
        if (connection) connection.release();
    }
};

// Exportamos la funcion controladora
module.exports = getUser;
