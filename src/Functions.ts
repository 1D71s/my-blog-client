export const getTimeMakingPost = (timeString: string) => {
    // Создаем объект Date из строки времени
    const date = new Date(timeString);
  
    // Проверяем, успешно ли прошло преобразование
    if (isNaN(date.getTime())) {
      return "Неверный формат даты и времени";
    } else {
      // Извлекаем компоненты даты и времени
      const year = date.getFullYear();
      const month = date.getMonth() + 1; // Месяцы в JavaScript начинаются с 0
      const day = date.getDate();
      const hours = date.getHours();
      const minutes = date.getMinutes();
  
      // Форматируем строку без секунд
      const formattedDate = `${year}-${month.toString().padStart(2, '0')}-${day.toString().padStart(2, '0')} ${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;
  
      return formattedDate;
    }
};