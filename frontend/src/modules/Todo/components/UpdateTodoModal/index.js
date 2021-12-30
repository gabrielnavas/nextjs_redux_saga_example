import { useEffect, useState } from 'react';

import { useSelector, useDispatch } from 'react-redux';

import {Box, Button, Typography, Modal, Stack, TextField} from '@mui/material';

import {todoUpdateRequest} from '../../../../store/actions/todo'


const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

const UpdateTodoModal = ({isOpen, onClose })  => {
  const [description, setDescription] = useState('')
  const [done, setDone] = useState(false)
  
  const dispatch = useDispatch()
  const todoStore = useSelector(state => state.todos)

  useEffect(() => {
    if (todoStore.todoUpdate) {
      setDescription(todoStore.todoUpdate.description)
      setDone(todoStore.todoUpdate.done)
    }
  }, [todoStore.todoUpdate])

  const handleUpdate = () => {
    const todoToUpdate = {
      ...todoStore.todoUpdate,
      description,
      done
    }
    dispatch(todoUpdateRequest(todoToUpdate))
    onClose()
  }

  return (
    <Modal
      open={isOpen}
      onClose={onClose}
      >
      <Box sx={style}>
        <Typography id="modal-modal-title" variant="h6" component="h2">
          Atualizar ToDo
        </Typography>
        <Typography id="modal-modal-description" sx={{ mt: 2 }}>
          <Stack direction="column" spacing={4}>
            <TextField 
              label="Descrição" 
              variant="standard" 
              value={description} 
              onChange={e => setDescription(e.target.value)} />
            <Stack  direction="row" spacing={4}>
              <span>
                <input type="checkbox" checked={done}  onChange={e => setDone(!done)} />
                <label>{done ? ' Continuar ? ' : ' Finalizar ? '} </label>
              </span>
            </Stack>
            <Stack  direction="row" spacing={4} style={{display: 'flex', justifyContent: 'center'}}>
              <Button variant="outlined" onClick={onClose}>Cancelar</Button>
              <Button variant="contained" onClick={handleUpdate}>Atualizar</Button>
            </Stack>
          </Stack>
        </Typography>
      </Box>
    </Modal>
  )
}

export default UpdateTodoModal