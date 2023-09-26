
export const getTimeMakingPost = (timeString: string) => {

    const date = new Date(timeString);
  
    if (isNaN(date.getTime())) {
      return "Неверный формат даты и времени";
    } else {
      const year = date.getFullYear();
      const month = date.getMonth() + 1; 
      const day = date.getDate();
      const hours = date.getHours();
      const minutes = date.getMinutes();
  
      const formattedDate = `${year}-${month.toString().padStart(2, '0')}-${day.toString().padStart(2, '0')} ${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;
  
      return formattedDate;
    }
};

