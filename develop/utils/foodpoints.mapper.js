import LocalStorage from '../api/LocalStorage';
const getRandomEmptyArray = (limitEnd, limitStart = 0) => {
    const randomNumber = limitStart + Math.round(Math.random() * limitEnd);
    return new Array(randomNumber).join(1).split("");  //Hack to make 'new Array(x)' iterable
}
const getRandomUser = () => {
    const {id, name, avatar} = LocalStorage.get(1001 + Math.round(Math.random() * 6));
    return {id, name, avatar};
}
const getAll = (foodpoints) => (

    foodpoints.filter(item => (!isNaN(item.latitude) && !isNaN(item.longitude))).map(foodpoint => {
      foodpoint.foodpointId = `${foodpoint.locationid}-${foodpoint.dayorder}`;
        foodpoint.latitude = Number(foodpoint.latitude);
        foodpoint.longitude = Number(foodpoint.longitude);
      //Emulate apointments data in backend response (for demo only)
      const getRandomUsersAppointment = () => {
        const workTime = {
            start: Number(foodpoint.start24.substring(0,2)),
            end: Number(foodpoint.end24.substring(0,2))
        };

        const userAppointment = {
          users: [ getRandomUser() ],
          meetingStart: workTime.start + Math.round(Math.random() * (workTime.end - workTime.start - 1)),
          meetingId: Math.round(Math.random() * 10000),
          meetingDay: foodpoint.dayofweekstr,
          foodpointId: foodpoint.foodpointId,
          foodpointLocation: foodpoint.location
        };

        userAppointment.meetingEnd = userAppointment.meetingStart + 1;
        userAppointment.users.forEach(item => {
            const user = LocalStorage.get(item.id);
            user.appointments.push(userAppointment)
            LocalStorage.set(user.id, user);
        });

        return userAppointment;
      };


      return {
        meetingSlots: getRandomEmptyArray(3, 1).map(i=>getRandomUsersAppointment()),
        ...foodpoint
    }})
);

export default {
    req: {},
    res: {
        getAll
    },
};
