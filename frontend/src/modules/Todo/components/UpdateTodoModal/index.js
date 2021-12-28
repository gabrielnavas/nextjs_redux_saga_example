import { useEffect, useState } from 'react';
import Modal from 'react-modal';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';

import {todoUpdateRequest} from '../../../../store/actions/todo'

import styles from './styles.module.css'

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
  },
};

const UpdateTodoModal = ({isOpen, onClose })  => {
  
  const dispatch = useDispatch()
  

  const [description, setDescription] = useState('')
  const [done, setDone] = useState(false)
  
  const todoStore = useSelector(state => state.todos)

  useEffect(() => {
    if (todoStore.todoUpdate) {
      setDescription(todoStore.todoUpdate.description)
      setDone(todoStore.todoUpdate.done)
    }
  }, [todoStore.todoUpdate])

  const handleUpdate = () => {
    debugger
    const todoToUpdate = {
      ...todoStore.todoUpdate,
      description,
      done
    }
    dispatch(todoUpdateRequest(todoToUpdate))
    onClose()
  }

  console.log(done);

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      style={customStyles}
      contentLabel="Example Modal"
      ariaHideApp={false}
    >
      <div className={styles.content}> 
        <div>Atualizar Todo item</div>
        <form className={styles.form}>
          <div className={styles.form_group}>
            <label>Descrição</label>
            <input 
              className={styles.input}
              value={description} 
              onChange={e => setDescription(e.target.value)} />
          </div>
          <div  className={styles.form_group}>
            <span>
              <label>Finalizar?</label>
              <input type="checkbox" checked={done}  onChange={e => setDone(!done)} />
            </span>
          </div>
          <div className={styles.buttons}>
            <button  type='button' className={styles.input} onClick={handleUpdate}>Atualizar</button>
            <button  type='button' className={styles.input} onClick={onClose}>Cancelar</button>
          </div>
        </form>
      </div>
    </Modal>
  );
}

export default UpdateTodoModal