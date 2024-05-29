import React from 'react'
import UserCard from '../components/UserCard'
import { useSelector } from 'react-redux'
import { Box, Button, Grid } from '@mui/material'
import { useNavigate } from 'react-router-dom'

const HomePage = () => {

  const users = useSelector((state) => state.users)
  const navigate = useNavigate()

  return (
    <>
    <div style={{display:'flex', alignItems:'center', flexDirection:'column'}}>
      <h2>Welcome to Redux CRUD App</h2>
      <p>Please perform CRUD operations to manage Users with redux-toolkit</p>
      <Button variant="contained" color="primary" onClick={ () => {
          navigate('/add-user')
        }}>Add New User
      </Button>
    </div>
    <Box sx={{ flexGrow: 1, padding: 2 }}>
      <Grid container spacing={2}>
        {users.users?.length !== 0 && users?.users?.map((user, index) => (
          <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
            <UserCard userId={user.id} user={user} />
          </Grid>
        ))}
      </Grid>
    </Box>
    </>
  )
}

export default HomePage