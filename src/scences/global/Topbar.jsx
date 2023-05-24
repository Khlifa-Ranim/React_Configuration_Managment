import { Box, IconButton, useTheme } from "@mui/material";
import { useContext, useEffect, useState } from "react";
import { ColorModeContext, tokens } from "../../theme";
import InputBase from "@mui/material/InputBase";
import LightModeOutlinedIcon from "@mui/icons-material/LightModeOutlined";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import NotificationsOutlinedIcon from "@mui/icons-material/NotificationsOutlined";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import SearchIcon from "@mui/icons-material/Search";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import { styled, alpha } from "@mui/material/styles";
import MenuItem from "@mui/material/MenuItem";
import EditIcon from "@mui/icons-material/Edit";
import Divider from "@mui/material/Divider";
import LogoutIcon from "@mui/icons-material/Logout";
import HistoryIcon from '@mui/icons-material/History';
import ArchiveIcon from "@mui/icons-material/Archive";
import FileCopyIcon from "@mui/icons-material/FileCopy";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import { useNavigate } from "react-router-dom";
import jwt_decode from "jwt-decode";
import { fetchProfiles } from "../../redux/ProfileSlices/FetchProfileSlice";
import { useDispatch, useSelector } from "react-redux";



const StyledMenu = styled((props) => (
  <Menu
    elevation={0}
    anchorOrigin={{
      vertical: "bottom",
      horizontal: "right",
    }}
    transformOrigin={{
      vertical: "top",
      horizontal: "right",
    }}
    {...props}
  />
))(({ theme }) => ({
  "& .MuiPaper-root": {
    borderRadius: 6,
    marginTop: theme.spacing(1),
    minWidth: 180,
    color:
      theme.palette.mode === "light"
        ? "rgb(55, 65, 81)"
        : theme.palette.grey[300],
    boxShadow:
      "rgb(255, 255, 255) 0px 0px 0px 0px, rgba(0, 0, 0, 0.05) 0px 0px 0px 1px, rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px",
    "& .MuiMenu-list": {
      padding: "4px 0",
    },
    "& .MuiMenuItem-root": {
      "& .MuiSvgIcon-root": {
        fontSize: 18,
        color: theme.palette.text.secondary,
        marginRight: theme.spacing(1.5),
      },
      "&:active": {
        backgroundColor: alpha(
          theme.palette.primary.main,
          theme.palette.action.selectedOpacity
        ),
      },
    },
  },
}));

const Topbar = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const colorMode = useContext(ColorModeContext);
  const Navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState(null);
  const [accessToken, setAccessToken] = useState(localStorage.getItem("token"));

  
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const decoded_token = jwt_decode(accessToken);
    const user_id=decoded_token.user_id
    console.log("user_id",decoded_token.user_id);

  const handleClose = () => {
    setAnchorEl(null);
  };
  const navigate = useNavigate();


  const dispatch = useDispatch();
  const profile = useSelector((state) => state.FetchProfilessStore);
   const Profile=profile.profiles;
   

   useEffect(() => {
    dispatch(fetchProfiles());
  }, []);

  const ProfileIdMap = {};
  Profile.forEach((profile) => {
    ProfileIdMap[profile.user_id] = profile.id;
  });


  
  const profileId = ProfileIdMap[decoded_token.user_id];

  console.log("idProfile:",profileId)

  
  return (
    <Box display="flex" justifyContent="space-between" p={2}>
      {/*Search bar*/}
      {/* <Box
        display="flex"
        backgroundColor={colors.primary[400]}
        borderRadius="3px"
      >
        <InputBase sx={{ ml: 2, flex: 1 }} placeholder="search"></InputBase>
        <IconButton type="button" sx={{ p: 1 }}>
          <SearchIcon></SearchIcon>
        </IconButton>
      </Box> */}
      <IconButton></IconButton>
      {/*ICONS*/}
      <Box display="flex">
        <IconButton onClick={colorMode.toggleColorMode}>
          {theme.palette.mode === "dark" ? (
            <DarkModeOutlinedIcon />
          ) : (
            <LightModeOutlinedIcon />
          )}
        </IconButton>
        <IconButton>
          <NotificationsOutlinedIcon />
        </IconButton>
        
        {/* <IconButton>
          {
                        OpenProfile && (
                            <PersonOutlinedIcon onClick={()=>SetOpenProfile((prev)=>!prev)}>
          <ul>
            <li>Update Profile</li>
            <li>Logout</li>
          </ul>
          </PersonOutlinedIcon>
                        )
                    }
        </IconButton> */}
        <div>
          <Button
            id="demo-customized-button"
            aria-controls={open ? "demo-customized-menu" : undefined}
            aria-haspopup="true"
            aria-expanded={open ? "true" : undefined}
            // variant="contained"
            disableElevation
            onClick={handleClick}
            // endIcon={<KeyboardArrowDownIcon />}
          >
            <AccountCircleIcon />
          </Button>
          <StyledMenu
            id="demo-customized-menu"
            MenuListProps={{
              "aria-labelledby": "demo-customized-button",
            }}
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
          >
               <MenuItem
              onClick={() => {
                Navigate("/FeatchLogs");
              }}
              disableRipple
            >
              <HistoryIcon />
              Logs
            </MenuItem>
            <MenuItem
             onClick={() =>{Navigate(`/EditProfile/${profileId}`)}}
             disableRipple>
              <EditIcon />
              Edit
            </MenuItem>

            <Divider sx={{ my: 0.5 }} />
            <MenuItem
              onClick={() => {
                Navigate("/");
                localStorage.clear();
              }}
              disableRipple
            >
              <LogoutIcon />
              Logout
            </MenuItem>

          </StyledMenu>
        </div>
      </Box>
    </Box>
  );
};

export default Topbar;
