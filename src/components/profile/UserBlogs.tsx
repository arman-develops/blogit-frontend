import {
  Box,
  Typography,
  Avatar,
  Card,
  CardContent,
  CardActions,
  IconButton,
  Grid
} from "@mui/material"
import { Edit, Delete } from "@mui/icons-material"
import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { useQueryClient, useQuery, useMutation } from "@tanstack/react-query"
import api from "../../service/BlogApi"

function UserBlogs() {
    const navigate = useNavigate()
    const queryClient = useQueryClient()

    const [userForm, setUserForm] = useState({
        firstName: "",
        lastName: "",
        username: "",
        email: "",
    })

    const { data: userData } = useQuery({
        queryKey: ["user"],
        queryFn: async () => {
        const res = await api.get("/user")
        return res.data
        },
    })

    const { data: userBlogs } = useQuery({
        queryKey: ["userBlogs"],
        queryFn: async () => {
        const res = await api.get("/user/blogs")
        return res.data.filter((blog: any) => !blog.isDeleted)
        },
    })

    useEffect(() => {
        if (userData) {
        setUserForm({
            firstName: userData.firstName,
            lastName: userData.lastName,
            username: userData.username,
            email: userData.email,
        })
        }
    }, [userData])

    const deleteBlogMutation = useMutation({
        mutationFn: async (id: string) => {
        return api.delete(`/blogs/${id}`)
        },
        onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["userBlogs"] })
        },
    })

    return (
        <>
            
            <Typography variant="h4" gutterBottom>
                My Blogs
            </Typography>

            <Grid container spacing={2}>
                {userBlogs?.map((blog: any) => (
                <Grid size={{xs:12, md:6, lg:4}} key={blog._id}>
                    <Card>
                    <CardContent>
                        <Box display="flex" alignItems="center" mb={2}>
                        <Avatar sx={{ mr: 2 }}>
                            {userForm.firstName[0]}
                            {userForm.lastName[0]}
                        </Avatar>
                        <Box>
                            <Typography variant="h6">{blog.title}</Typography>
                            <Typography variant="body2" color="textSecondary">
                            {new Date(blog.dateCreated).toLocaleDateString()}
                            </Typography>
                        </Box>
                        </Box>
                        <Typography variant="body1" noWrap>
                        {blog.synopsis}
                        </Typography>
                    </CardContent>
                    <CardActions>
                        <IconButton color="primary" onClick={() => navigate(`/blogs/edit/${blog._id}`)}>
                        <Edit />
                        </IconButton>
                        <IconButton
                        color="error"
                        onClick={() => {
                            if (confirm("Are you sure you want to delete this blog?")) {
                            deleteBlogMutation.mutate(blog._id)
                            }
                        }}
                        >
                        <Delete />
                        </IconButton>
                    </CardActions>
                    </Card>
                </Grid>
                ))}
            </Grid>
        </>
    )
}

export default UserBlogs