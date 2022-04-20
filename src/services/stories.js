import axios from "axios";
import { getStoriesAction } from "../store/action/storyAction";
import { closeLoading } from "../store/action/loaderAction";
import baseURL from "../utils/baseURL";

export const getStories = () => {
  return (dispatch) => {
    axios.get(`${baseURL}/getStories`).then((response) => {
      dispatch(getStoriesAction(response.data));
      dispatch(closeLoading());
    });
  };
};

export const getStory = async (id) => {
  const response = await axios.post(`${baseURL}/getStory?id=${id}`, {
    id: id,
  });
  console.log(response);
  return response.data[0];
};

export const deleteStory = async (id) => {
  const response = await axios.post(`${baseURL}/deleteStory?id=${id}`, {
    id: id,
  });
  console.log(response);
};

export const addLike = async (id, str) => {
  console.log(id , str);
  const response = await axios.post(
    `${baseURL}/likeStory?id=${id}&likes=${str}`,
    {
      id: id,
      likes: str,
    }
  );
  console.log(response);
};

export const addStory = (data) => {
  console.log(data);
  return (dispatch) => {
    axios
      .post(
        `${baseURL}/addStory?title=${data.title}&story=${data.story}&author=${data.author}&date=${data.date}&email=${data.email}`,
        {
          title: data.title,
          story: data.story,
          author: data.author,
          date: data.date,
          email: data.email,
        }
      )
      .then((response) => {
        dispatch(getStories());
        dispatch(closeLoading());
      });
  };
};

export const editStory = (data) => {
  axios
    .post(
      `${baseURL}/editStory?title=${data.title}&story=${data.story}&id=${data.id}`,
      {
        title: data.title,
        story: data.story,
        id: data.id,
      }
    )
    .then((response) => {
      console.log(response);
    });
};
