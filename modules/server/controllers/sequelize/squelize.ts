import { Sequelize } from "sequelize";
import pg from "pg";
import schemas from "./schemas";
import config from "@/modules/shared/config/config";

const initDatabase = () => {
    const sequelize = new Sequelize(
        config.db_connection_string,
        {
            dialect: "postgres",
            dialectModule: pg,
            logging: config.dev_mode ? true : false,
        }
    );

    const users = sequelize.define("users", schemas.users, {
        timestamps: false,
    });

    const passwords = sequelize.define("passwords", schemas.passwords, {
        timestamps: false,
    });

    const clients = sequelize.define("clients", schemas.clients, {
        timestamps: false,
    });

    const clientAttachments = sequelize.define("clientAttachments", schemas.clientAttachments, {
        timestamps: false,
    });

    const quickNotes = sequelize.define("quickNotes", schemas.quickNotes, {
        timestamps: false,
    });

    const sessions = sequelize.define("sessions", schemas.sessions, {
        timestamps: false,
    });

    const sessionsAttachments = sequelize.define("sessionsAttachments", schemas.sessionsAttachments, {
        timestamps: false,
    });

    const googleRefreshTokens = sequelize.define("googleRefreshTokens", schemas.googleRefreshTokens, {
        timestamps: false,
    });

    //-----------------------------------------

    //associations

    //users can have many clients
    users.hasMany(clients, {
        foreignKey: "userId",
    });

    //users can one password
    users.hasOne(passwords, {
        foreignKey: "userId",
    });

    //quick none has one user (creator) and one client (assigned to)
    clients.hasMany(quickNotes, {
        foreignKey: "clientId",
    });

    users.hasMany(quickNotes, {
        foreignKey: "userId",
    });

    //clients can have many sessions & users have many sessions
    clients.hasMany(sessions, {
        foreignKey: "clientId",
    });

    //session belongs to client
    sessions.belongsTo(clients, {
        foreignKey: 'clientId',
    })

    users.hasMany(sessions, {
        foreignKey: "userId",
    });


    //clients can have many attachments
    clients.hasMany(clientAttachments, {
        foreignKey: "clientId",
    });

    //user can have many attachments
    users.hasMany(clientAttachments, {
        foreignKey: "userId",
    });

    //sessions can have many attachments
    sessions.hasMany(sessionsAttachments, {
        foreignKey: "sessionId",
    });

    //user can have many session attachments
    users.hasMany(sessionsAttachments, {
        foreignKey: "userId",
    });

    //user can have only one google refresh token
    users.hasOne(googleRefreshTokens, {
        foreignKey: "userId",
    });

    try {
        sequelize.authenticate();
        console.log("Connection has been established successfully.");
    } catch (error) {
        throw new Error(`Unable to connect to the database: ${error}`);
    }

    return {
        sequelize,
        users,
        passwords,
        clients,
        clientAttachments,
        quickNotes,
        sessions,
        sessionsAttachments,
        googleRefreshTokens,
    };
};

const db = initDatabase();
export default db;