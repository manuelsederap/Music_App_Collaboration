import React, { Component } from "react";
import { Button, Grid } from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import { Link } from "react-router-dom";

export default class RoomJoinPage extends Component {
  constructor(props) {
      super(props);
      this.state = {
        roomCode: "",
        error: ""
      }

      this.handleTextFieldChange = this.handleTextFieldChange.bind(this)
      this.roomButtonPressed = this.roomButtonPressed.bind(this)
  }

  render() {
    return (
      <Grid container spacing={1} align="center">
        <Grid item xs={12}>
          <Typography variant="h4" component="h4">
            Join a Room
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <TextField
            error={this.state.error}
            label="code"
            placeholder="Enter a Room code"
            value={this.state.roomCode}
            helperText={this.state.error}
            name="rcode"
            variant="outlined"
            onChange={this.handleTextFieldChange}
          />
        </Grid>
        <Grid item xs={12}>
          <Button
            variant="contained"
            color="primary"
            onClick={this.roomButtonPressed}
          >
          Enter Room
          </Button>
        </Grid>
        <Grid item xs={12}>
          <Button
            variant="contained"
            color="secondary"
            to="/"
            component={Link}>
          Back
          </Button>
        </Grid>
      </Grid>
    )
  }

  handleTextFieldChange(e) {
    console.log(11)
    this.setState({
      roomCode: e.target.value,
      error: ""
    })
  }

  roomButtonPressed() {
    const requestOptions = {
      method: "POST",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify({
        code: this.state.roomCode
      })
    };
    fetch('/api/join-room', requestOptions)
    .then((response) =>
      response.json())
    .then((data) => {
      console.log(data)
      if (data.message == "Room Joined!") {
        this.props.history.push(`/room/${this.state.roomCode}`)
      } else {
        this.setState({
          error: data[0].slice(12)
        })
      }
    })
    .catch((error) => {
      console.log(error);
    })
  }
}