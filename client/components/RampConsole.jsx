import React, { Fragment } from "react";

import { Grid, GridColumn, Segment, Header, Divider, Button, Icon, Input } from "semantic-ui-react";

import Loader from "./Loader";
import RampGuide from "./RampGuide";

const RampToken = ({token, app }) => {
  const handleClickCopy = () => {
    if ("clipboard" in navigator){

      navigator.clipboard.writeText(token)
        .then(() => { 
          console.log('Copied to buffer!');
        })
        .catch((e) => {
          console.error(e)
        })
    }
  }

  return (
    <Grid verticalAlign='middle'>

      <Grid.Row>
        <Grid.Column computer={4} tablet={4} mobile={16}>
          <Header as="h4">RAMP API Access Token</Header>
        </Grid.Column>
        <Grid.Column computer={12} tablet={12} mobile={16}>
          <Segment className="secretSauce">
            <span>{token}</span>
            <Button icon primary labelPosition='right' onClick={handleClickCopy} >
              <i aria-hidden="true" className="rampCopy icon"></i>
              Copy
            </Button>
          </Segment>
        </Grid.Column>
      </Grid.Row>

      <Divider/>

      <Grid.Row>
        <Grid.Column computer={4} tablet={4} mobile={16}>
          <Header as="h4">App Name</Header>
        </Grid.Column>
        <Grid.Column computer={12} tablet={12} mobile={16}>
          <Segment className="secretSauce">
            <span>{ app }</span>
          </Segment>
        </Grid.Column>
      </Grid.Row>

      <Divider/>

      <Grid.Row>
        <Grid.Column width={16}>
          <RampGuide />
        </Grid.Column>
      </Grid.Row>

    </Grid>
  )
}
const RampConsole = ({ token, app }) => {
  return (
    <Fragment>
      { token && <RampToken token={token} app={app} />}
    </Fragment>
  );
};

export default RampConsole;
