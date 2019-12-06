import React, { Fragment } from "react";

import { Table } from "semantic-ui-react";

import Loader from "./Loader";

const TokenTable = ({token}) => {
  return (
    <Table definition>
        <Table.Body>
          <Table.Row>
            <Table.Cell>RAMP API Access Token</Table.Cell>
            <Table.Cell>{token}</Table.Cell>
          </Table.Row>
        </Table.Body>
    </Table>
  )
}
const TokenList = ({ token }) => {
  return (
    <Fragment>
      { !token && <Loader />}
      { token && <TokenTable token={token}/>}
    </Fragment>
  );
};

export default TokenList;
