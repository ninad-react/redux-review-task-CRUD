import React, { useEffect } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { TextField, Button, Box } from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { addUser, updateUser } from '../redux/userSlice';

const AddUser = () => {
  const { handleSubmit, control, formState: { errors }, setValue } = useForm()
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const {userId} = useParams()
  const users = useSelector(state => state.users)
  const handleAddUser = (data) => {

    if(userId) {
      const updatedUser = {
        id: userId,
        ...data
      }
      dispatch(updateUser(updatedUser))
    }else {
      const newUser = {
        id: Math.floor(Math.random() * 1000),
        ...data,
        // dob: date
    }
    dispatch(addUser(newUser))
    }
    navigate('/')
  };  

  useEffect(() => {
    if(userId) {
      const userToEdit = users.users.filter((user) => user.id == userId)
      setValue('fullName', userToEdit[0]?.fullName)
      setValue('email', userToEdit[0]?.email)
      setValue('dob', userToEdit[0]?.dob)
      setValue('summary', userToEdit[0]?.summary)
    }
  }, [])

  return (
    <div style={{display: 'flex', justifyContent:'center', alignItems:'center', height:'100vh'}}>
        <Box
      component="form"
      sx={{ '& .MuiTextField-root': { m: 1, width: '65ch' } }}
      noValidate
      autoComplete="off"
      onSubmit={handleSubmit(handleAddUser)}
    >
      <h3>Welcome to {userId ? 'edit' : 'add'} user page</h3>
      <div>
        <Controller
          name="fullName"
          control={control}
          defaultValue=""
          rules={{ required: 'Full Name is required' }}
          render={({ field }) => (
            <TextField
              {...field}
              label="Full Name"
              variant="outlined"
              // value={userToEdit?.fullName}
              error={!!errors.fullName}
              helperText={errors.fullName ? errors.fullName.message : ''}
            />
          )}
        />
      </div>
      <div>
        <Controller
          name="email"
          control={control}
          defaultValue=""
          rules={{
            required: 'Email is required',
            pattern: {
              value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
              message: 'Invalid email address'
            }
          }}
          render={({ field }) => (
            <TextField
              {...field}
              label="Email"
              // value={userToEdit?.email}
              variant="outlined"
              error={!!errors.email}
              helperText={errors.email ? errors.email.message : ''}
            />
          )}
        />
      </div>
      <div>
        <Controller
          name="dob"
          control={control}
          defaultValue=""
          rules={{ required: 'Date of Birth is required' }}
          render={({ field }) => (
            <TextField
              {...field}
              label="Date of Birth"
              type="date"
              // value={userToEdit?.dob }
              InputLabelProps={{ shrink: true }}
              variant="outlined"
              error={!!errors.dob}
              helperText={errors.dob ? errors.dob.message : ''}
            />
          )}
        />
      </div>
      <div>
        <Controller
          name="summary"
          control={control}
          defaultValue=""
          rules={{ required: 'Summary is required' }}
          render={({ field }) => (
            <TextField
              {...field}
              label="Summary"
              variant="outlined"
              // value={userToEdit?.summary}
              multiline
              rows={4}
              error={!!errors.summary}
              helperText={errors.summary ? errors.summary.message : ''}
            />
          )}
        />
      </div>
      <div style={{display:'flex', justifyContent:'space-between'}}>
         <Button variant="contained" color="secondary" type="submit" onClick={() => navigate(-1)}>
          Back
        </Button>
        <Button variant="contained" color="primary" type="submit">
          Submit
        </Button>
      </div>
    </Box>
    </div>
    
  );
};

export default AddUser;
