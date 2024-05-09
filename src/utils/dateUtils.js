export const formatDate = (date) => {
    return `${date.getDate() < 10 ? '0' : ''}${date.getDate()}-${(date.getMonth() + 1) < 10 ? '0' : ''}${date.getMonth() + 1}-${date.getFullYear()}`;
};

export const formatTimeRange = (start, end) => {
    const hoursFrom = start.getHours();
    const minutesFrom = start.getMinutes();
    const hoursTo = end.getHours();
    const minutesTo = end.getMinutes();
    return `${hoursFrom < 10 ? '0' : ''}${hoursFrom}:${minutesFrom < 10 ? '0' : ''}${minutesFrom} - ${hoursTo < 10 ? '0' : ''}${hoursTo}:${minutesTo < 10 ? '0' : ''}${minutesTo}`;
};


export const getFavorites = () => {
    const favorites = localStorage.getItem('favorites');
    return favorites ? JSON.parse(favorites) : [];
  };
  
// export  const saveFavorite = (questionId) => {
//     const favorites = getFavorites();
//     if (favorites.includes(questionId)) {
//       localStorage.setItem('favorites', JSON.stringify(favorites.filter(id => id !== questionId)));
//     } else {
//       localStorage.setItem('favorites', JSON.stringify([...favorites, questionId]));
//     }
//   };

  export const toggleFavorite = (questionId) => {
    let favorites = getFavorites();
    if (favorites.includes(questionId)) {
      favorites = favorites.filter(id => id !== questionId);
      localStorage.setItem('favorites', JSON.stringify(favorites));
      return false;  // Indicates the item was removed
    } else {
      favorites.push(questionId);
      localStorage.setItem('favorites', JSON.stringify(favorites));
      return true;   // Indicates the item was added
    }
  };

export const uniqueByTitle = items => {
    const seenTitles = new Set();
    return items?.filter(item => {
      if (seenTitles.has(item.title)) {
        return false;
      } else {
        seenTitles.add(item.title);
        return true;
      }
    });
  };