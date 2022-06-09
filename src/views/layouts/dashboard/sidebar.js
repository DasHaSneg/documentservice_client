import PropTypes from 'prop-types';
import { Drawer, Box, Divider, useMediaQuery, Typography, useTheme, Button } from "@mui/material";
import { NavItem } from "./nav-item";
import { useNavigate } from "react-router-dom";
import { strings } from '../../../i18n';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import { useDispatch } from 'react-redux';
import { setUser } from '../../../redux/reducers/user';

const strPrefix = "sidebar";

const items = [
    {
      href: '/profile',
      icon: null,
      title: strings(`${strPrefix}.items.profile`)
    },
    {
        href: '/documents',
        icon: null,
        title: strings(`${strPrefix}.items.documents`)
    }

    // {
    // href: '/main',
    // icon: null,
    // title: strings(`${strPrefix}.items.annex`)
    // },
];

export const DashboardSidebar = (props) => {
    const { open, onClose } = props;
    const navigate = useNavigate();
    const theme = useTheme();
    const lgUp = useMediaQuery(() => theme.breakpoints.up('lg'), {
        defaultMatches: true,
        noSsr: false
    });


    if (lgUp) {
        return (
          <Drawer
            anchor="left"
            open
            PaperProps={{
              sx: {
                backgroundColor: 'neutral.900',
                color: '#FFFFFF',
                width: 280
              }
            }}
            variant="permanent"
          >
            <Content/>
          </Drawer>
        );
    }

    return (
        <Drawer
          anchor="left"
          onClose={onClose}
          open={open}
          PaperProps={{
            sx: {
              backgroundColor: 'neutral.900',
              color: '#FFFFFF',
              width: 280
            }
          }}
          sx={{ zIndex: (theme) => theme.zIndex.appBar + 100 }}
          variant="temporary"
        >
          <Content/>
        </Drawer>
    );
};

const Content = () => {
    const dispatch=useDispatch();
    return (
        <>
            <Box
                sx={{
                display: 'flex',
                flexDirection: 'column',
                height: '100%'
                }}
            >
                <div>
                    <Box sx={{ px: 2 }}>
                        <Box
                            sx={{
                                alignItems: 'center',
                                backgroundColor: 'rgba(255, 255, 255, 0.04)',
                                cursor: 'pointer',
                                display: 'flex',
                                justifyContent: 'space-between',
                                px: 3,
                                py: '11px',
                                borderRadius: 1
                            }}
                        >
                        <div>
                            <Typography
                                color="inherit"
                                variant="subtitle1"
                            >
                                
                            </Typography>
                            <Typography
                                color="neutral.400"
                                variant="body2"
                            >
                                
                            </Typography>
                        </div>
                        </Box>
                    </Box>
                </div>


                <Divider
                    sx={{
                        borderColor: '#2D3748',
                        my: 3
                    }}
                />

                    
                {items.map(item => {
                    return <NavItem 
                        key={item.title}
                        icon={item.icon}
                        href={item.href}
                        title={item.title}
                    />
                })}
                <NavItem 
                        key={'exit'}
                        icon={<ExitToAppIcon fontSize="small" />}
                        title={strings('buttons.exit')}
                        href={'/login'}
                        onClick={() => {
                            localStorage.removeItem('user');
                            localStorage.removeItem('token');
                            dispatch(setUser(null))
                        }}
                    />
            </Box>
        </>
    )
}

DashboardSidebar.propTypes = {
    onClose: PropTypes.func,
    open: PropTypes.bool
};