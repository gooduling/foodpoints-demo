/* Mapper binds random Users' appointments to foodpoints
    For DEMO purpose only!
 */

import LocalStorage from '../api/LocalStorage';

const getRandomLengthArray = (limitEnd, limitStart = 0) => {
    /* makes array of randomized length in range start - end */
    const randomNumber = limitStart + Math.round(Math.random() * limitEnd);
    return new Array(randomNumber).fill(true);
};

const getRandomUser = () => {
    /* get user with randomized ID from a localstorage */
    const { id, name, avatar } = LocalStorage.get(1001 + Math.round(Math.random() * 6));
    return { id, name, avatar };
};

const getRandomUsersAppointment = (foodpoint) => {
    /* Emulate appointments data in backend response (for demo only) */
    const workTime = {
        start: Number(foodpoint.start24.substring(0, 2)),
        end: Number(foodpoint.end24.substring(0, 2)),
    };

    const userAppointment = {
        users: [getRandomUser()],
        meetingStart: workTime.start + Math.round(Math.random() * (workTime.end - workTime.start - 1)),
        meetingId: Math.round(Math.random() * 10000),
        meetingDay: foodpoint.dayofweekstr,
        foodpointId: foodpoint.foodpointId,
        foodpointLocation: foodpoint.location,
    };

    userAppointment.meetingEnd = userAppointment.meetingStart + 1;
    userAppointment.users.forEach(item => {
        const user = LocalStorage.get(item.id);
        user.appointments.push(userAppointment);
        LocalStorage.set(user.id, user);
    });

    return userAppointment;
};

const getAll = (foodpoints) => (

    foodpoints
        .filter(item => (!isNaN(item.latitude) && !isNaN(item.longitude)))
        .map(foodpoint => {
            foodpoint.foodpointId = `${foodpoint.locationid}-${foodpoint.dayorder}`;
            foodpoint.latitude = Number(foodpoint.latitude);
            foodpoint.longitude = Number(foodpoint.longitude);

            return {
                meetingSlots: getRandomLengthArray(3, 1).map(i => getRandomUsersAppointment(foodpoint)),
                ...foodpoint,
            };
        })
);

export default {
    req: {},
    res: {
        getAll,
    },
};
