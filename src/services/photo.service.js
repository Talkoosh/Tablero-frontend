import axios from 'axios';
export const photoService = {
  loadDefaultPhotos,
};

const KEY = 'photos';

async function loadDefaultPhotos() {
  const storagePhotos = localStorage.getItem(KEY);
  let photos = storagePhotos ? JSON.parse(storagePhotos) : [];
  if (!photos || !photos.length) {
    const res = await axios.get(
      'https://api.unsplash.com/photos/random/?count=12&&client_id=uFlXoOBB-1QIZ9Qf2FIQEBZjmO6n3HlN6XtOulT3ciA'
    );
    res.data.forEach((p) => photos.push(p.urls.regular));
    localStorage.setItem(KEY, JSON.stringify(photos));
  }
  console.log('hiioljsas');
  return photos;
}
