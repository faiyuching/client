const axios = require('axios');

axios.defaults.headers.common["Authorization"] = `Bearer ${localStorage.token}`;

const findQuestion = (filter,id,sort) => {
  return axios({
    url: `/api/question?filter=${filter}&id=${id}&sort=${sort}`,
    method: "get",
  })
    .then((res) => {
      return res.data;
    })
    .catch((e) => {
      console.log(e);
    });
};

const findQuestionById = (id) => {
  return axios({
    url: `/api/question/${id}`,
    method: "get",
  })
    .then((res) => {
      return res.data;
    })
    .catch((e) => {
      console.log(e);
    });
};

const updateQuestion = (id, data) => {
  return axios({
    url: `/api/question/${id}`,
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

const createQuestion = (data) => {
  return axios({
    url: "/api/question",
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

const deleteQuestion = (id) => {
  return axios({
    url: `/api/question/${id}`,
    method: "delete",
  })
    .then((res) => {
      return res.data;
    })
    .catch((e) => {
      console.log(e);
    });
};

const likeQuestion = (id) => {
  return axios({
    url: `/api/question/${id}/like`,
    method: "put",
  })
    .then((res) => {
      return res.data;
    })
    .catch((e) => {
      console.log(e);
    });
};

const unlikeQuestion = (id) => {
  return axios({
    url: `/api/question/${id}/unlike`,
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
  findQuestion,
  findQuestionById,
  updateQuestion,
  createQuestion,
  deleteQuestion,
  likeQuestion,
  unlikeQuestion
};
