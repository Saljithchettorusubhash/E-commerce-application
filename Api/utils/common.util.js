import bcrypt from 'bcrypt';

export const multipleColumnSet = (object) => {
    if (typeof object !== 'object') {
        throw new Error('Invalid input');
    }

    const keys = Object.keys(object);
    const values = Object.values(object);

    const columnSet = keys.map(key => `${key} = ?`).join(', ');

    return {
        columnSet,
        values
    };
};

export const parseTime = (time) => {
    let times = time.split(":");
    let hours = times[0];
    if (hours.length === 1) hours = `0${hours}`; // pad leading 0
    return `${hours}:${times[1]}:${times[2]}`;
};

export const multipleFilterSet = (object) => {
    if (typeof object !== 'object') {
        throw new Error('Invalid input');
    }

    const keys = Object.keys(object);
    const values = Object.values(object);

    const filterSet = keys.map(key => `${key} = ?`).join(' AND ');

    return {
        filterSet,
        filterValues: values
    };
};

export const structureResponse = (body, success, message) => {
    return {
        headers: { success, message },
        body: body
    };
};

export const hashPassword = async (body) => {
    if (body.password) {
        body.password = await bcrypt.hash(body.password, 8);
    }
};

export const yearRegex = new RegExp(/^(19[5-9]\d|20[0-4]\d|2050)$/);

export const OTPRegex = new RegExp(/^[0-9]{4}$/);


export const timeRegex = new RegExp(/^([01][0-9]|2[0-3]):[0-5][0-9]$/);

export const datetimeRegex = new RegExp(/^([\+-]?\d{4}(?!\d{2}\b))((-?)((0[1-9]|1[0-2])(\3([12]\d|0[1-9]|3[01]))?|W([0-4]\d|5[0-2])(-?[1-7])?|(00[1-9]|0[1-9]\d|[12]\d{2}|3([0-5]\d|6[1-6])))([T\s]((([01]\d|2[0-3])((:?)[0-5]\d)?|24\:?00)([\.,]\d+(?!:))?)?(\17[0-5]\d([\.,]\d+)?)?([zZ]|([\+-])([01]\d|2[0-3]):?([0-5]\d)?)?)?)?$/);