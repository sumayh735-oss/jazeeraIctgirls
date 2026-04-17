import api from './api';

const communityservice = {
  getPosts: () => api.get('/community/posts'),

  createPost: (data) => api.post('/community/posts', data),

  addComment: (postId, data) =>
    api.post(`/community/posts/${postId}/comment`, data),

  addReply: (postId, commentId, data) =>
    api.post(`/community/posts/${postId}/comment/${commentId}/reply`, data),
};

export default communityservice;