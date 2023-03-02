const getDB = require('../../db/getDB');
const { generateError } = require('../../helpers');
const jwt = require('jsonwebtoken');

const getPublication = async (req, res, next) => {
    let connection;

    try {
        connection = await getDB();
        const { authorization } = req.headers;

        let tokenInfo;

        if (authorization) {
            // Desencriptamos el token
            tokenInfo = jwt.verify(authorization, process.env.SECRET);
        }
        const { idPublication } = req.params;

        const [publications] = await connection.query(
            `SELECT p.*,
            COUNT(u.id) as likes, if(max(u2.idUser), true, false) as loggedUserLiked
            FROM publication p
            left JOIN user_like_publication u
            ON p.id = u.idPublication
            left JOIN user_like_publication u2
            ON (p.id = u2.idPublication and u2.idUser = ?)
            WHERE p.id = ?;`,
            [tokenInfo?.id, idPublication]
        );

        const [photos] = await connection.query(
            `SELECT id, name FROM publication_photo
            WHERE idPublication = ?`,
            [publications[0].id]
        );

        const [comments] = await connection.query(
            `SELECT idUser, comment FROM user_comment_publication
            WHERE idPublication = ?`,
            [publications[0].id]
        );

        const publication = { ...publications[0], photos, comments };

        if (publication.id === null) {
            throw generateError('¡La publicación no existe!', 404);
        }

        res.send({
            status: 'Ok',
            publication,
        });
    } catch (error) {
        next(error);
    } finally {
        if (connection) connection.release();
    }
};

module.exports = getPublication;
