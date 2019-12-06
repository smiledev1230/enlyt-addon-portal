import React from "react";

import { Segment , Dimmer, Loader as SemanticLoader} from 'semantic-ui-react';

const Loader = () => {
  return (
    <Segment style={{padding:'30px'}}>
      <Dimmer active>
          <SemanticLoader />
      </Dimmer>
    </Segment>
  );
}

export default Loader