import { Trash } from "phosphor-react";


import styles from './Task.module.css'
import '../global.css'

export interface TaskProps {
    id: String,
    text: String;
    isChecked: boolean;
    onDeleteTask: (id: String) => void;
    onUpdateCheckTask: (id: String) => void;
}

export function Task({ id, text, isChecked, onDeleteTask, onUpdateCheckTask }: TaskProps) {
    function handleDeleteTask(){
        onDeleteTask(id);
    }

    function handleUpdateCheckTask(){
        onUpdateCheckTask(id);
    }

    return (
        <div className={styles.wrapper}>
            <label className={styles.checkmarkButton}>
                <input type="checkbox" checked={isChecked} onClick={handleUpdateCheckTask} readOnly/>
                <span className={styles.checkmark} />
                <p>{text}</p>
            </label>
            <button className={styles.delete} onClick={handleDeleteTask}>
                <Trash size={18} />
            </button>
        </div>
    )
}