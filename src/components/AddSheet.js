import React, { Component } from 'react';
import {Card, CardActions, CardText} from 'material-ui/Card';
import { Grid, Row, Col } from 'react-flexbox-grid';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';

export default class AddSheet extends Component {
  constructor(props) {
    super(props)
    this.state = {}
    this.handleAdd = this.handleAdd.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
    this.handleMessageChange = this.handleMessageChange.bind(this);
  }
  handleValueChange(type,value) {
    this.props.onChange({
      target: {
        type: type,
        value: value
      }
    })
  }
  handleAdd() {
    this.handleValueChange("add",{url:"",sheet:"",from:"",to:""});
  }
  handleDelete(idx,event) {
    let curSheets = this.props.data.map(sheet => sheet);
    curSheets.splice(idx, 1);
    this.handleValueChange("delete",curSheets);
  }
  handleMessageChange(idx,event,type) {
    let curSheets = this.props.data.map(sheet => sheet);
    curSheets.forEach((msg,index) => {
      if (index === idx) {
        msg[type] = event.target.value;
      }
      return msg;
    })
  }
  render() {
    const styles = {
      cardStyle : {
        width: '600px',
        margin: 'auto',
        marginTop: '30px',
        marginBottom: '10px'
      },
    }
    return (
      <div>
        <Grid fluid>
          {(this.props.data && this.props.data.length > 0) &&
            this.props.data.map((sheet, idx) => (
              <Card key={idx} style={styles.cardStyle}>
                <CardText>
                  <Row start="xs"><Col xs={4}>
                    <TextField style={{width:"100%"}} hintText="Sheet Name"
                    onChange={(event) => this.handleMessageChange(idx,event,"sheet")}/>
                  </Col>
                  <Col xsOffset={1} xs={3}>
                    <TextField style={{width:"100%"}} hintText="From"
                    onChange={(event) => this.handleMessageChange(idx,event,"from")}/>
                  </Col>
                  <Col xsOffset={1} xs={3}>
                    <TextField style={{width:"100%"}} hintText="To"
                    onChange={(event) => this.handleMessageChange(idx,event,"to")}/>
                  </Col></Row>
                  <Row between="xs"><Col xs={12}>
                    <TextField style={{width:"100%"}} hintText="Google Sheet URL"
                    onChange={(event) => this.handleMessageChange(idx,event,"url")}/>
                  </Col></Row>
                </CardText>
                <CardActions>
                  <RaisedButton
                    label="Delete"
                    secondary={true}
                    disabled={!(this.props.data.length > 1)}
                    onClick={(event) => this.handleDelete(idx, event)}/>
                </CardActions>
              </Card>
            ))
          }
          <Row center="xs">
            <FloatingActionButton
              style={{margin:"10px"}}
              onClick={this.handleAdd}>
              <ContentAdd />
            </FloatingActionButton>
          </Row>
        </Grid>
      </div>
    )
  }
}
