import { FunctionComponent, FunctionComponentElement, ReactNode } from 'react';
import { Avatar, Typography, Drawer } from "@material-ui/core";
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';


const drawerWidth = 240;

const drawerlistStyles = makeStyles((theme: Theme) => (createStyles({
  root: {
    display: 'flex',
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  drawerContainer: {
    overflow: 'auto',
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
})
)
);

type DrawerProps = {
  user: any;
}
export default ({ user }: DrawerProps): FunctionComponentElement<ReactNode> => {

  const classes = drawerlistStyles();

  return (
    <Drawer
      anchor="left"
      classes={{ paper: classes.drawer }}
      onClose={() => null}
      open={true}
      variant={"permanent"}
    >
      <Profile user={user} />
    </Drawer>
  )
};

const profileStyles = makeStyles((theme: Theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    minHeight: 'fit-content'
  },
  avatar: {
    width: 60,
    height: 60
  },
  name: {
    marginTop: theme.spacing(1)
  }
}));

const Profile: FunctionComponent<{ user: any; }> = ({ user }): FunctionComponentElement<ReactNode> => {

  const classes = profileStyles();

  return <div
    className={classes.root}
  >
    <Avatar
      src={user.avatar}
    />
    <Typography
      className={classes.name}
      variant="h4"
    >
      {user.name}
    </Typography>
    <Typography variant="body2">{user.email}</Typography>
  </div>
}