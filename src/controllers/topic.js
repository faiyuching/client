const axios = require('axios');

axios.defaults.headers.common["Authorization"] = `Bearer ${localStorage.token}`;

const findTopic = (filter) => {
  return axios({
    url: `/api/topic?filter=${filter}`,
    method: "get",
  })
    .then((res) => {
      return res.data;
    })
    .catch((e) => {
      console.log(e);
    });
};

const findTopicById = (id) => {
  return axios({
    url: `/api/topic/${id}`,
    method: "get",
  })
    .then((res) => {
      return res.data;
    })
    .catch((e) => {
      console.log(e);
    });
};

const updateTopic = (id, data) => {
  return axios({
    url: `/api/topic/${id}`,
    method: "patch",
    data: data,
  })
    .then((res) => {
      return res.data;
    })
    .catch((e) => {
      console.log(e);
    });
};

const createTopic = (data) => {
  return axios({
    url: "/api/topic",
    method: "post",
    data: data,
  })
    .then((res) => {
      return res.data;
    })
    .catch((e) => {
      console.log(e);
    });
};

const deleteTopic = (id) => {
  return axios({
    url: `/api/topic/${id}`,
    method: "delete",
  })
    .then((res) => {
      return res.data;
    })
    .catch((e) => {
      console.log(e);
    });
};


export { findTopic, findTopicById, updateTopic, createTopic, deleteTopic };
