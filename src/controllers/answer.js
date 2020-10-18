const axios = require('axios');

axios.defaults.headers.common["Authorization"] = `Bearer ${localStorage.token}`;

const findAnswer = (filter,id) => {
  return axios({
    url: `/api/answer?filter=${filter}&id=${id}`,
    method: "get",
  })
    .then((res) => {
      return res.data;
    })
    .catch((e) => {
      console.log(e);
    });
};

const findAnswerById = (id) => {
  return axios({
    url: `/api/answer/${id}`,
    method: "get",
  })
    .then((res) => {
      return res.data;
    })
    .catch((e) => {
      console.log(e);
    });
};


const updateAnswer = (id,data) => {
  return axios({
    url: `/api/answer/${id}`,
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

const createAnswer = (data) => {
  return axios({
    url: `/api/answer`,
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

const deleteAnswer = (id) => {
  return axios({
    url: `/api/answer/${id}`,
    method: "delete",
  })
    .then((res) => {
      return res.data;
    })
    .catch((e) => {
      console.log(e);
    });
};

const likeAnswer = (id) => {
  return axios({
    url: `/api/answer/${id}/like`,
    method: "put",
  })
    .then((res) => {
      return res.data;
    })
    .catch((e) => {
      console.log(e);
    });
};

const unlikeAnswer = (id) => {
  return axios({
    url: `/api/answer/${id}/unlike`,
    method: "delete",
  })
    .then((res) => {
      return res.data;
    })
    .catch((e) => {
      console.log(e);
    });
};

export {
  findAnswer,
  findAnswerById,
  updateAnswer,
  createAnswer,
  deleteAnswer,
  likeAnswer,
  unlikeAnswer
};
