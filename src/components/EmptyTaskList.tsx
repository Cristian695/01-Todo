import styles from './EmptyTaskList.module.css'
import Clipboard from "../assets/Clipboard.svg"

export function EmptyTaskList() {
    return (
        <div className={styles.EmptyList}>
            <img src={Clipboard} />
            <div className={styles.text}>
                <p>Você ainda não tem tarefas cadastradas</p>
                <p>Crie tarefas e organize seus itens a fazer</p>
            </div>
        </div>
    )
}