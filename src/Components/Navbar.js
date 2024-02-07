import React, {useState} from "react"
import Logo from "../Assets/Logo.svg"
import { BsCart2 } from "react-icons/bs"
import { HiOutlineBars3} from "react-icons/hi2"
import {
    Box, Drawer, List, ListItem, ListItemButton, ListItemIcon, ListItemText
} from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";
import {Link} from "react-router-dom";



const Navbar= () => {
    const [openMenu,setOpenMenu] = useState(false)
    const menuOptions = [
        {
            text:"Accueil",
            icon:<HomeIcon/>
        },
        {
            text:"Statictique",
            icon:<HomeIcon/>
        }
    ];
    return <nav>
        <div className="nav-logo-container">
            <img src={Logo} alt="" class="maImage"/>
        </div>
        <div className="navbar-links-container">
            <a href=""><Link to="/">Accueil</Link></a>
            <a href=""><Link to="/stat">Dashboard</Link></a>
            <Link to="/formulaireun"><button className="primary-button" >Essayez maintenant</button></Link>
        </div>
        <div className="navbar-menu-container">
            <HiOutlineBars3 onClick={() => setOpenMenu(true)}/>
        </div>
        <Drawer open={openMenu} onClose={()=> setOpenMenu(false)} anchor="right">
            <Box sx={{width:250}}
                 role="presentation"
                 onClick={() => setOpenMenu(false)}
                 onKeyDown={() => setOpenMenu(false)}>
                <List>
                    {menuOptions.map((item) =>
                        (<ListItem key={item.text} disablePadding>
                                <ListItemButton>
                                    <ListItemIcon>{item.icon}</ListItemIcon>
                                    <ListItemText primary={item.text}/>

                                </ListItemButton>
                            </ListItem>
                        ))}
                </List>

            </Box>
        </Drawer>
    </nav>
};

export default Navbar;