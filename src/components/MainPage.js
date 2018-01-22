import React, { Component } from 'react';
import { Grid, Row, Col } from 'react-flexbox-grid';
import TopBar from './TopBar';
import AddSheet from './AddSheet';
import RaisedButton from 'material-ui/RaisedButton';

export default class MainPage extends Component {
  constructor(props) {
    super(props)
    this.state = {sheets:[{url:"",sheet:"",from:"",to:""}]} // sheet contains
                                 // spreadsheetId (url/d/<id>),
                                 // range (user input)
    this.handleAddSheet = this.handleAddSheet.bind(this);
    this.handleGetEmail = this.handleGetEmail.bind(this);
  }
  handleAddSheet(e) {
    let curSheets = this.state.sheets.map(sheet => sheet);
    let type = e.target.type;

    switch (type) {
      case "add":
        this.setState({
          sheets: [...curSheets, e.target.value]
        })
        break;
      case "delete":
        this.setState({
          sheets: e.target.value
        })
        break;
      default:
        break
    }
  }
  handleGetEmail() {
    let curSheets = this.state.sheets;
    for (var i = 0; i < curSheets.length; i++) {
      for (var val in curSheets[i]) {
        if (curSheets[i][val] === "") {
          alert('One of your "' + val + '" field is empty')
          return
        }
      }
    }
    fetch('/sheets',{
       method: 'POST',
       body: JSON.stringify({
         sheets: curSheets
       }),
       headers: {"Content-Type": "application/json"}
     })
     .then(function(response){
       return response.json()
     }).then(function(body){
       console.log(body);
     });
  }
  render() {
    return (
      <div>
        <TopBar/>
        <Grid fluid><Row center="xs"><Col xs={12}>
          <RaisedButton
            style={{marginTop:"20px"}}
            label="Get Emails"
            primary={true}
            onClick={this.handleGetEmail}/>
          <AddSheet data={this.state.sheets} onChange={this.handleAddSheet}/>
        </Col></Row></Grid>
      </div>
    )
  }
}
