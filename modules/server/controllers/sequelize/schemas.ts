import { DataTypes as t } from 'sequelize'

//todo add psycholog reviews
//todo add home address (everything needed for a bill)

//todo add isPsychologist
const users = {
    id: {
        type: t.UUID,
        primaryKey: true,
    },
    email: {
        type: t.STRING,
        allowNull: false,
        unique: true,
    },
    lang: {
        type: t.STRING,
        allowNull: false,
    },
    googleCalendarConnected: {
        type: t.BOOLEAN,
        allowNull: false,
    },
    googleAuth: {
        type: t.BOOLEAN,
        allowNull: false,
    },

    //Nullable fields
    profilePictureUrl: {
        type: t.STRING,
        allowNull: true,
    },
    name: {
        type: t.STRING,
        allowNull: true,
    },
    phoneNumber: {
        type: t.STRING,
        allowNull: true,
    },
    jobTitle: {
        type: t.STRING,
        allowNull: true,
    },
    country: {
        type: t.STRING,
        allowNull: true,
    },
    city: {
        type: t.STRING,
        allowNull: true,
    },
    address: {
        type: t.STRING,
        allowNull: true,
    },
    postalCode: {
        type: t.STRING,
        allowNull: true,
    },
    experience: {
        type: t.NUMBER,
        allowNull: true,
    },
    onlineService: {
        type: t.BOOLEAN,
        allowNull: true,
    },
    inPersonService: {
        type: t.BOOLEAN,
        allowNull: true,
    },
    status: {
        type: t.STRING,
        allowNull: true,
    },
    aboutMe: {
        type: t.STRING,
        allowNull: true,
    },
    isClinicPsychologist: {
        type: t.BOOLEAN,
        allowNull: true,
    },
    website: {
        type: t.STRING,
        allowNull: true,
    },
    isPubliclyListed: {
        type: t.BOOLEAN,
        allowNull: false,
    },
    premiumPlanTo: {
        type: t.DATE,
        allowNull: true,
    },
    twoFAEnabled: {
        type: t.BOOLEAN,
        allowNull: false,
    },
    twoFASecret: {
        type: t.STRING,
        allowNull: true,
    },
}
const services = {
    id: {
        type: t.UUID,
        primaryKey: true,
    },
    title: {
        type: t.STRING,
        allowNull: false,
    },
    creatorId: {
        type: t.UUID,
        allowNull: false,
    },
}
const userServices = {
    id: {
        type: t.UUID,
        primaryKey: true,
    },
    userId: {
        type: t.UUID,
        allowNull: false,
    },
    serviceId: {
        type: t.UUID,
        allowNull: false,
    },
}
const clients = {
    // idea online or personal or both
    //where clientz lives
    //tasks thery are working on (terapeuitcký plán) - will be  text made by mum - made miro screen on it
    //terapeutický plán - jsut notw about goals for the psycholog

    id: {
        type: t.UUID,
        primaryKey: true,
    },
    name: {
        type: t.STRING,
        allowNull: false,
    },
    email: {
        type: t.STRING,
        allowNull: true,
    },
    phoneNumber: {
        type: t.STRING,
        allowNull: true,
    },
    age: {
        type: t.NUMBER,
        allowNull: true,
    },
    note: {
        type: t.STRING,
        allowNull: true,
    },
    userId: {
        type: t.UUID,
        allowNull: false,
        foreignKey: true,
    },
}

const clientAttachments = {
    id: {
        type: t.UUID,
        primaryKey: true,
    },
    fileName: {
        type: t.STRING,
        allowNull: false,
    },
    bucket: {
        type: t.STRING,
        allowNull: false,
    },
    userId: {
        type: t.UUID,
        allowNull: false,
    },
    clientId: {
        type: t.UUID,
        allowNull: false,
    },
    path: {
        type: t.STRING,
        allowNull: false,
    },
    size: {
        type: t.NUMBER,
        allowNull: false,
    }
}

const sessionsAttachments = {
    id: {
        type: t.UUID,
        primaryKey: true,
    },
    fileName: {
        type: t.STRING,
        allowNull: false,
    },
    bucket: {
        type: t.STRING,
        allowNull: false,
    },
    userId: {
        type: t.UUID,
        allowNull: false,
    },
    sessionId: {
        type: t.UUID,
        allowNull: true,
    },
    path: {
        type: t.STRING,
        allowNull: false,
    },
    size: {
        type: t.NUMBER,
        allowNull: false,
    }
}

const sessions = {
    id: {
        type: t.UUID,
        primaryKey: true,
    },
    clientId: {
        type: t.UUID,
        allowNull: false,
    },
    userId: {
        type: t.UUID,
        allowNull: false,
    },
    start: {
        type: t.DATE,
        allowNull: false,
    },
    end: {
        type: t.DATE,
        allowNull: false,
    },
    note: {
        type: t.STRING,
        allowNull: true,
    },
    googleEventId: {
        type: t.STRING,
        allowNull: true,
    },
    clientInvite: {
        type: t.BOOLEAN,
        allowNull: true,
    },
}

const quickNotes = {
    id: {
        type: t.UUID,
        primaryKey: true,
    },
    note: {
        type: t.STRING,
        allowNull: true,
    },
    clientId: {
        type: t.UUID,
        allowNull: false,
    },
    userId: {
        type: t.UUID,
        allowNull: false,
    },
}

const tagCategories = {
    id: {
        type: t.UUID,
        primaryKey: true,
    },
    title: {
        type: t.STRING,
        allowNull: false,
    },
    creatorId: {
        type: t.UUID,
        allowNull: false,
    },
    color: {
        type: t.STRING,
        allowNull: false,
    },
}

const tags = {
    id: {
        type: t.UUID,
        primaryKey: true,
    },
    title: {
        type: t.STRING,
        allowNull: false,
    },
    creatorId: {
        type: t.UUID,
        allowNull: true,
    },
    categoryId: {
        type: t.UUID,
        allowNull: false,
    },
}

const clientsTags = {
    id: {
        type: t.UUID,
        primaryKey: true,
    },
    clientId: {
        type: t.UUID,
        foreignKey: true,
        allowNull: false,
    },
    tagId: {
        type: t.UUID,
        foreignKey: true,
        allowNull: false,
    },
}

const passwords = {
    id: {
        type: t.UUID,
        primaryKey: true,
    },
    userId: {
        type: t.UUID,
        allowNull: false,
    },
    password: {
        type: t.STRING,
        allowNull: false,
    },
    email: {
        type: t.STRING,
        allowNull: false,
    },
}

const googleRefreshTokens = {
    id: {
        type: t.UUID,
        primaryKey: true,
    },
    userId: {
        type: t.UUID,
        allowNull: false,
    },
    token: {
        type: t.STRING,
        allowNull: false,
    },
}

const schemas = {
    users,
    passwords,
    services,
    userServices,
    clients,
    clientAttachments,
    sessions,
    sessionsAttachments,
    quickNotes,
    tagCategories,
    tags,
    googleRefreshTokens,
};
export default schemas;
