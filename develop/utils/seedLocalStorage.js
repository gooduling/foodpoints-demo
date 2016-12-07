import LocalStorage from '../api/LocalStorage';
import defaultAvatar from '../assets/images/defaultAvatar.jpg'

const users = [
    {
        id: 1001,
        name: "John Fork",
        city: "San Francisco",
        age: 12,
        avatar:'https://cdn1.iconfinder.com/data/icons/user-pictures/100/male3-512.png',
        appointments: []
    },
    {
        id: 1002,
        name: "Ahuma Boris",
        city: "San Francisco",
        age: 27,
        avatar:'https://s-media-cache-ak0.pinimg.com/236x/26/44/4f/26444f66c8cfe2798e892a669e4df8cf.jpg',
        appointments: []
    },
    {
        id: 1003,
        name: "Liora Karlson",
        city: "San Francisco",
        age: 19,
        avatar:'http://icons.iconarchive.com/icons/designbolts/free-male-avatars/128/Male-Avatar-icon.png',
        appointments: []
    },
    {
        id: 1004,
        name: "Emma Hu",
        city: "San Francisco",
        age: 36,
        avatar:'http://i.istockimg.com/file_thumbview_approve/94991407/3/stock-illustration-94991407-young-black-man-icon-vector-man-icon-illustration.jpg',
        appointments: []
    },
    {
        id: 1005,
        name: "Dan",
        sex: "male",
        age: 27,
        avatar:'https://d31ov1gga51spx.cloudfront.net/assets/chat/support_man-15143707f97684a81e15adac4b1d52c5.png',
        appointments: []
    },
    {
        id: 1006,
        name: "Jondal",
        city: "San Francisco",
        age: 19,
        avatar:'http://image.flaticon.com/icons/png/128/145/145857.png',
        appointments: []
    },
    {
        id: 1007,
        name: "Immad",
        city: "San Francisco",
        age: 36,
        avatar:'http://image.flaticon.com/icons/png/128/145/145857.png',
        appointments: []
    },
    {
        id: "test@email.com",
        name: "Dummy O'Slot",
        city: "San Francisco",
        age: 36,
        appointments: [],
        password: '112233',
        avatar: defaultAvatar
    }
];

users.forEach(user => { LocalStorage.set(user.id, user) });
