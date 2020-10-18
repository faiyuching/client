const axios = require('axios');

axios.defaults.headers.common["Authorization"] = `Bearer ${localStorage.token}`;

const findComment = (filter, id) => {
  return axios({
    url: `/api/comment?filter=${filter}&id=${id}`,
    method: "get",
  })
    .then((res) => {
      return res.data;
    })
    .catch((e) => {
      console.log(e);
    });
};

const findCommentById = (id) => {
  return axios({
    url: `/api/comment/${id}`,
    method: "get",
  })
    .then((res) => {
      return res.data;
    })
    .catch((e) => {
      console.log(e);
    });
};

const createComment = (data) => {
  return axios({
    url: `/api/comment`,
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

const deleteComment = (id) => {
  return axios({
    url: `/api/comment/${id}`,
    method: "delete",
  })
    .then((res) => {
      return res.data;
    })
    .catch((e) => {
      console.log(e);
    });
};
const likeComment = (id) => {
  return axios({
    url: `/api/comment/${id}/like`,
    method: "put",
  })
    .then((res) => {
      return res.data;
    })
    .catch((e) => {
      console.log(e);
    });
};

const unlikeComment = (id) => {
  return axios({
    url: `/api/comment/${id}/unlike`,
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
  findComment,
  findCommentById,
  createComment,
  deleteComment,
  likeComment,
  unlikeComment,
};
