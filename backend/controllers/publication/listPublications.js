const getDB = require('../../db/getDB');
const jwt = require('jsonwebtoken');
const listPublications = async (req, res, next) => {
    let connection;

    try {
        connection = await getDB();

        const { search, order, direction } = req.query;

        const validOrderOptions = ['place', 'category', 'likes'];

        const validDirectionOptions = ['ASC', 'DESC'];

        const orderBy = validOrderOptions.includes(order) ? order : 'likes';

        const orderDirection = validDirectionOptions.includes(direction)
            ? direction
            : 'DESC';
        const { authorization } = req.headers;

        let tokenInfo;

        if (authorization) {
            // Desencriptamos el token
            tokenInfo = jwt.verify(authorization, process.env.SECRET);
        }
        let publications;

        if (search) {
            [publications] = await connection.query(
                `SELECT p.*,
                count(u.id) as likes, if(max(u2.idUser), true, false) as loggedUserLiked
                            FROM publication p
                            left JOIN user_like_publication u
                            ON p.id = u.idPublication
                            left JOIN user_like_publication u2
                            ON (p.id = u2.idPublication and u2.idUser = ?)
                            WHERE category = ? OR place LIKE ?
                            GROUP BY p.id 
                 ORDER BY ${orderBy} ${orderDirection}`,
                [tokenInfo?.id, search, `%${search}%`]
            );
        } else {
            [publications] = await connection.query(
                `SELECT p.*,
                count(u.id) as likes, if(max(u2.idUser), true, false) as loggedUserLiked
                            FROM publication p
                            left JOIN user_like_publication u
                            ON p.id = u.idPublication
                            left JOIN user_like_publication u2
                            ON (p.id = u2.idPublication and u2.idUser = ?)
                            GROUP BY p.id 
                ORDER BY ${orderBy} ${orderDirection}`,
                [tokenInfo?.id]
            );
        }

        const data = [];

        for (let i = 0; i < publications.length; i++) {
            const [photos] = await connection.query(
                `SELECT id, name FROM publication_photo
                WHERE idPublication = ?`,
                [publications[i].id]
            );

            data.push({
                ...publications[i],
                photos,
            });
        }

        res.send({
            status: 'Ok',
            message: '¡Lista de publicaciones!',
            publications: data,
        });
    } catch (error) {
        next(error);
    } finally {
        if (connection) connection.release();
    }
};

module.exports = listPublications;
