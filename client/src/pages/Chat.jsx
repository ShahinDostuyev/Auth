import {Container, Grid,} from "@mui/material";
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import CommentIcon from '@mui/icons-material/Comment';
import IconButton from '@mui/material/IconButton'
import { socket } from "../App";
import { useState } from "react";
import { useContext ,useEffect} from "react";
import { AuthContext } from "../contex/AuthContext";
export const Chat = () => {
  const {user}=useContext(AuthContext)
  const [value,setValue]=useState("")
  const [messages,setMessage]=useState([])
  const handlerSubmit=()=>{
    const sendObj={
      from:user.username,
      message:value,
      date:new Date().getHours()+":"+new Date().getMinutes(),
      to:null
    }
    socket.emit("sendMessage",sendObj)
  }
  useEffect(() => {
    socket.on("chatMessage",(data)=>{
      setMessage((oldData)=>[...oldData,data])
    })
    return () => {
      socket.off("chatMessage")
    };
  }, []);
  return (
    <Container maxWidth="lg">
      <h1>Chat</h1>
      <Grid container spacing={2}>
        <Grid item xs={8}>
          <div style={{ display: "flex" }}>
            <div style={{ marginRight: "20px" }}>Message</div>
            <div>
              <input value={value} type="text" onChange={(ev)=>{setValue(ev.target.value)}} />
            </div>
          </div>
          <div style={{ marginTop: "15px" }}>
            <button onClick={handlerSubmit}>Send Message</button>
          </div>
          <Grid item xs={12}>
            <hr/>
          </Grid>
          <Grid item xs={4}>
        <List
            sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}
          >
            {messages.map((item) => (
              <ListItem
                key={item.username}
                disableGutters
              >
                <ListItemText primary={`${item.date} ${item.from.toUpperCase()}: ${item.message}`} />
              </ListItem>
            ))}
        </List>
        </Grid>
        </Grid>
        <Grid item xs={4} style={{border:"1px solid silver"}}>
          <List
            sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}
          >
            {[1, 2, 3].map((value) => (
              <ListItem
                key={value}
                disableGutters
                secondaryAction={
                  <IconButton aria-label="comment">
                    <CommentIcon />
                  </IconButton>
                }
              >
                <span className="bg-offline" style={{width:"20px",height:"20px",borderRadius:"50%",display:'inline-block', marginRight:"5px"}}></span>
                <ListItemText primary={`Line item ${value}`} />
              </ListItem>
            ))}
          </List>
        </Grid>
      </Grid>
    </Container>
  );
};
