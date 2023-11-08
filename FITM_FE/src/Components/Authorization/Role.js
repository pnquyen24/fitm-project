import {
    Box,
    Button,
    Chip,
    Grid,
    MenuItem,
    OutlinedInput,
    Select,
    TextField,
    useTheme,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axiosClient from "../../Variable/Api/api";
import CustomeAlert from "../Member/Alert/CustomeAlert";
import "./Role.css";

const GET_ALL_URL = "Role/GetAll";
const GET_URL = "Role/Get";
const ADD_URL = "Role/AddRole";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
    PaperProps: {
        style: {
            maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
            width: "80%",
            padding: 10,
        },
    },
};

function getStyles(name, personName, theme) {
    return {
        fontWeight: personName.some((pName) => pName.id === name.id)
            ? theme.typography.fontWeightBold
            : theme.typography.fontWeightRegular,
    };
}

function removeDuplicates(array) {
    let ids = array.map((obj) => obj.id);
    let uniqueIds = ids.filter(
        (id, index) => ids.indexOf(id) === ids.lastIndexOf(id)
    );
    let uniqueArray = array.filter((obj) => uniqueIds.includes(obj.id));
    return uniqueArray;
}

function RoleModify() {
    document.title = "Modify Role";
    const location = useLocation();
    const id = new URLSearchParams(location.search).get("id");

    const navigate = useNavigate();

    const theme = useTheme();
    const [personRole, setPersonRole] = useState([]);
    const [roles, setRoles] = useState([]);
    const [memberInfo, setMemberInfo] = useState({
        id: 0,
        username: "",
        fullname: "",
    });

    function GetRoles() {
        axiosClient
            .get(GET_ALL_URL)
            .then((res) => res.data)
            .then((data) => setRoles(data))
            .catch();
    }

    function GetMemberRoles() {
        axiosClient
            .get(`${GET_URL}?id=${id}`)
            .then((res) => res.data)
            .then((data) => {
                setMemberInfo({
                    id: data.id,
                    fullname: data.name,
                    username: data.username,
                });
                setPersonRole(data.roles);
            })
            .catch();
    }

    useEffect(() => {
        GetRoles();
        GetMemberRoles();
    }, []);

    const handleChange = (event) => {
        const {
            target: { value },
        } = event;
        let uniqueArray = removeDuplicates(value);
        setPersonRole(uniqueArray);
    };

    const handleSave = (event) => {
        axiosClient
            .post(ADD_URL, {
                userId: memberInfo.id,
                roleIds: personRole.map((role) => role.id),
            })
            .then((res) => CustomeAlert.success("Modify Role success"))
            .then(() => navigate(`/member-manager/member-profile?id=${id}`))
            .catch((error) => CustomeAlert.error(error.response.data.message));
    };

    const handleCancel = (event) => {
        navigate(`/member-manager/member-profile?id=${id}`);
    };

    return (
        <Grid paddingTop={10} container xs={6} spacing={2}>
            <Grid item xs={4}>
                <TextField
                    label="Member ID"
                    aria-readonly
                    value={memberInfo.id}
                />
            </Grid>
            <Grid item xs={4}>
                <TextField
                    label="Username"
                    aria-readonly
                    value={memberInfo.username}
                />
            </Grid>
            <Grid item xs={4}>
                <TextField
                    label="Full Name"
                    aria-readonly
                    value={memberInfo.fullname}
                />
            </Grid>
            <Grid item xs={12}>
                <Select
                    className="background--white select_role"
                    fullWidth
                    label="Roles"
                    multiple
                    displayEmpty
                    value={personRole}
                    onChange={handleChange}
                    input={
                        <OutlinedInput label="Chip" id="select-multiple-chip" />
                    }
                    renderValue={(selected) =>
                        selected.length === 0 ? (
                            <em>Roles</em>
                        ) : (
                            <Box
                                sx={{
                                    display: "flex",
                                    flexWrap: "wrap",
                                    gap: 0.5,
                                    backgroundColor: "white",
                                }}
                            >
                                {selected.map((value) => (
                                    <Chip key={value.id} label={value.name} />
                                ))}
                            </Box>
                        )
                    }
                    MenuProps={MenuProps}
                >
                    {roles.map((role) => (
                        <MenuItem
                            key={role.id}
                            value={role}
                            style={getStyles(role, personRole, theme)}
                        >
                            {role.name}
                        </MenuItem>
                    ))}
                </Select>
            </Grid>
            <Grid item xs={12}>
                <Button variant="outlined" onClick={(e) => handleCancel(e)}>
                    Cancel
                </Button>
                <Button variant="contained" onClick={(e) => handleSave(e)}>
                    Save
                </Button>
            </Grid>
        </Grid>
    );
}

export default RoleModify;
