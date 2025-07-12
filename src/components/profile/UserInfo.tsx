import {
  Typography,
  TextField,
  Button,
  Grid,
} from "@mui/material"
import { useState, useEffect } from "react"
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"
import api from "../../service/BlogApi"

function UserInfo() {
    const queryClient = useQueryClient()
    const [userForm, setUserForm] = useState({
        firstName: "",
        lastName: "",
        username: "",
        email: "",
    })

    const [passwordForm, setPasswordForm] = useState({
        currentPassword: "",
        newPassword: "",
    })

    const { data: userData } = useQuery({
        queryKey: ["user"],
        queryFn: async () => {
        const res = await api.get("/user")
        return res.data
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

    const updateUserMutation = useMutation({
        mutationFn: async () => {
        return api.patch("/user", userForm)
        },
        onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["user"] })
        alert("User details updated")
        },
    })

    const updatePasswordMutation = useMutation({
        mutationFn: async () => {
        return api.patch("/user/password", passwordForm)
        },
        onSuccess: () => {
        setPasswordForm({ currentPassword: "", newPassword: "" })
        alert("Password updated")
        },
        onError: () => {
        alert("Failed to update password. Check current password.")
        },
    })

    return (
        <>
            <Grid container spacing={4}>
                <Grid size={{xs:12, md:6}}>
                <Typography variant="h5" gutterBottom>
                    Personal Information
                </Typography>
                <TextField
                    label="First Name"
                    fullWidth
                    margin="normal"
                    value={userForm.firstName}
                    onChange={(e) => setUserForm({ ...userForm, firstName: e.target.value })}
                />
                <TextField
                    label="Last Name"
                    fullWidth
                    margin="normal"
                    value={userForm.lastName}
                    onChange={(e) => setUserForm({ ...userForm, lastName: e.target.value })}
                />
                <TextField
                    label="Username"
                    fullWidth
                    margin="normal"
                    value={userForm.username}
                    onChange={(e) => setUserForm({ ...userForm, username: e.target.value })}
                />
                <TextField
                    label="Email"
                    fullWidth
                    margin="normal"
                    value={userForm.email}
                    onChange={(e) => setUserForm({ ...userForm, email: e.target.value })}
                />
                <Button
                    variant="contained"
                    color="primary"
                    onClick={() => updateUserMutation.mutate()}
                >
                    Update Info
                </Button>
                </Grid>

                {/* Password Form */}
                <Grid size={{xs:12, md:6}}>
                <Typography variant="h5" gutterBottom>
                    Change Password
                </Typography>
                <TextField
                    label="Current Password"
                    type="password"
                    fullWidth
                    margin="normal"
                    value={passwordForm.currentPassword}
                    onChange={(e) => setPasswordForm({ ...passwordForm, currentPassword: e.target.value })}
                />
                <TextField
                    label="New Password"
                    type="password"
                    fullWidth
                    margin="normal"
                    value={passwordForm.newPassword}
                    onChange={(e) => setPasswordForm({ ...passwordForm, newPassword: e.target.value })}
                />
                <Button
                    variant="contained"
                    color="secondary"
                    onClick={() => updatePasswordMutation.mutate()}
                >
                    Update Password
                </Button>
                </Grid>
            </Grid>
        </>
    )
}

export default UserInfo