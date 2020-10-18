const axios = require('axios');

axios.defaults.headers.common["Authorization"] = `Bearer ${localStorage.token}`;

const findUser = (filter,id) => {
  return axios({
    url: `/api/user?filter=${filter}&id=${id}`,
    method: "get",
  })
    .then((res) => {
      return res.data;
    })
    .catch((e) => {
      console.log(e);
    });
};

const findUserById = (id) => {
  return axios({
    url: `/api/user/${id}`,
    method: "get",
  })
    .then((res) => {
      return res.data;
    })
    .catch((e) => {
      console.log(e);
    });
};

const updateUser = (id, data) => {
  return axios({
    url: `/api/user/${id}`,
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

const createUser = (data) => {
  return axios({
    url: "/api/user",
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

const login = (data) => {
  return axios({
    url: "/api/user/login",
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
const followUser = (id) => {
  return axios({
    url: `/api/user/follow/${id}`,
    method: "put",
  })
    .then((res) => {
      return res.data;
    })
    .catch((e) => {
      console.log(e);
    });
};
const unfollowUser = (id) => {
  return axios({
    url: `/api/user/unfollow/${id}`,
    method: "delete",
  })
    .then((res) => {
      return res.data;
    })
    .catch((e) => {
      console.log(e);
    });
};

const updateAvatar = (id, data) => {
  return axios({
    url: `/api/user/update/avatar/${id}`,
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

const updatePicture = (id, data) => {
  return axios({
    url: `/api/user/update/picture/${id}`,
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

export {
  findUser,
  findUserById,
  updateUser,
  createUser,
  login,
  followUser,
  unfollowUser,
  updateAvatar,
  updatePicture
};
