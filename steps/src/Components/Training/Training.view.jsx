import React, { useState } from 'react'
import { v4 as uuidv4 } from 'uuid';

export const Training = () => {
  const [stepItems, setStepItems] = useState([
    { id: uuidv4(), date: '2019-10-19', distance: 100 },
    { id: uuidv4(), date: '2020-10-20', distance: 5 },
    { id: uuidv4(), date: '2003-10-21', distance: 6 },
    { id: uuidv4(), date: '2022-07-24', distance: 10 },
  ]);

  let sortDateItems = stepItems.sort((a, b) => new Date(b.date) - new Date(a.date));
  const createStepItem = (date, distance) => {
    const parseDistance = parseInt(distance)
    if (!date && !distance) return false
    for (let i = 0; i < stepItems.length; i++) {
      if (date === stepItems[i].date) {
        return {
          ...stepItems,
          distance: stepItems[i].distance += parseDistance
        }
      }
    };
    const newStepItem = [
      ...stepItems,
      { id: uuidv4(), date: date, distance: parseInt(distance) }]
    setStepItems(newStepItem)
  };
  const [valueDistance, setValueDistance] = useState("");
  const [valueDate, setValueDate] = useState("");
  const handleSubmit = e => {
    e.preventDefault();
    createStepItem(valueDate, valueDistance);
    setValueDate("");
    setValueDistance("");
  };
  const deleteTodoItem = (id) => {
    const removeTodoItem = stepItems.filter((item) => item.id !== id);
    setStepItems(removeTodoItem);
  };

  return (
    <div className="container-box">
      <form onSubmit={handleSubmit}>
        <div className="container-boxes-input">
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="inputDate">Дата (ДД.ММ.ГГ)</label>
              <input
                type="date"
                className="input-date"
                placeholder="введдиите дату"
                id="inputDate"
                value={valueDate}
                onChange={(event) => setValueDate(event.target.value)}
              />
            </div>
            <div className="form-group">
              <label htmlFor="inputDistance">Пройдено км</label>
              <input
                type="number"
                className="input-distance"
                placeholder="введите расстояние"
                id="inputDistance"
                value={valueDistance}
                onChange={(event) => setValueDistance(event.target.value)}
              />
            </div>
            <button className="btn" onClick={handleSubmit}>
              OK
            </button>
          </div>
          <div className="caption_group">
            <caption>Дата (ДД)</caption>
            <caption>Пройдено км</caption>
            <caption>Действия</caption>
          </div>
          <table>
            <tbody>
              {sortDateItems.map((el) => (
                <tr key={el.id}>
                  <td>{el.date}</td>
                  <td>{el.distance}</td>
                  <td>
                    <button
                      className="btn-actions"
                      onClick={() => deleteTodoItem(el.id)}
                    >
                      &#10008;
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </form>
    </div>
  );
}

