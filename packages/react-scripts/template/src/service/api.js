import axios from 'axios';

//host
const API_ROOT = '/api';

//setting up request
const request = axios.create({
  baseURL: API_ROOT,
});
//methods
// const encode = encodeURIComponent
const responseBody = res => res.data.recordset;
const responseOutput = res => res.data;

const ax = {
  del: url => request.delete(url).then(responseOutput),
  get: url => request.get(url).then(responseBody),
  put: (url, body) => request.put(url, body).then(responseOutput), //put is for update
  post: (url, body) => request.post(url, body).then(responseOutput), //post is for create
};

const Game = {
  // all: () => ax.get('/users'),
  // editName: ({ name, id }) => ax.put(`/users/${id}`, { name }),
  all: () => fetchGames(),
  add: () => addGame(),
  edit: () => editGame(),
};

const Content = {
  all: () => fetchContent(),
  add: () => addContent(),
  edit: () => editContent(),
};

export default {
  request,
  Game,
  Content,
};

// mock data & methods

const fakedb = {
  games: [
    {
      id: '1',
      name: 'Booking红包小卡片',
      createdBy: '阿三',
      type: '酒店',
    },
    {
      id: '2',
      name: '商家私域配置',
      createdBy: '天天',
      type: '国际机票',
    },
    {
      id: '3',
      name: '机票自营活动',
      createdBy: '小绿',
      type: '度假',
    },
  ],
  content: [
    {
      id: '1',
      name: '酒店专享10元',
      createdBy: '阿三',
      type: '酒店',
      content: '酒店优惠',
    },
    {
      id: '2',
      name: '火车票100元券',
      createdBy: '天天',
      type: '国际机票',
      content: '机票优惠',
    },
    {
      id: '3',
      name: '度假APP专享',
      createdBy: '小绿',
      type: '度假',
      content: '度假优惠',
    },
  ],
};

const delay = ms => new Promise(resolve => setTimeout(resolve, ms));

const returnRandom = () => (Math.random() > 0.2 ? true : false);

const fetchGames = () => delay(500).then(() => fakedb.games);
const addGame = () => delay(500).then(returnRandom);
const editGame = () => delay(500).then(returnRandom);

const fetchContent = () => delay(500).then(() => fakedb.content);
const addContent = () => delay(500).then(returnRandom);
const editContent = () => delay(500).then(returnRandom);
