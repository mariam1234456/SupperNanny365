import { useEffect, useState } from "react";
import React from 'react';
import styles from "../Todolist/Todolist.module.css";

export default function Todolist({ tasks = [], addTask, deleteTask, updateTaskText, toggleFavorite }) {
  return (
    <div className={styles.todoContainer}>
      <button onClick={addTask} className={styles.addButton}>
        +
      </button>

      {tasks.map((task, index) => {
        const angle = (index * 360) / tasks.length;
        return (
          <div
            key={task.id}
            className={`${styles.taskCircle} ${task.favorite ? styles.favorite : ''}`}
            style={{ '--angle': `${angle}deg` }} // الزاوية كمتغير
          >
            <span className={styles.taskNumber}>{index + 1}</span>
            <textarea
              type="text"
              value={task.text}
              onChange={(e) => updateTaskText(task.id, e.target.value)}
              className={styles.taskInput}
            />
            <div className={styles.taskActions}>
              <button onClick={() => toggleFavorite(task.id)} className={styles.favoriteButton}>
                {task.favorite ? "⭐" : "☆"}
              </button>
              <button onClick={() => deleteTask(task.id)} className={styles.deleteButton}>
                <i className="fas fa-trash"></i>
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
}