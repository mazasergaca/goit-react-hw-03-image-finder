const API_KEY = '25910562-a2104437e4307ded07a843390';

function fetchImages(searchName, page) {
  return fetch(
    `https://pixabay.com/api/?q=${searchName}&page=${page}&key=${API_KEY}&image_type=photo&orientation=horizontal&per_page=12`
  ).then(res => {
    return res.json();
  });
}

const api = {
  fetchImages,
};

export default api;
