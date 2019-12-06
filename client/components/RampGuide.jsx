import React, { Fragment } from "react";

import { Grid, GridColumn, Segment, Header, Divider, Button, Icon, Input } from "semantic-ui-react";


const RampGuide = () => {
  return (
    <Fragment>
      <Header as="h2">Installation Guide</Header>
      <Header as="h3">Create and launch a new HEROKU App from the RAMP API Github repo</Header>
      <ol>
        <li>Navigate to <span className="codeText bubble">https://github.com/trifinlabs/ramp-api</span></li>
        <li>Click the <strong>HEROKU</strong> button to deploy the RAMP API modules.</li>
        <li>On this screen, you will need to name the application, and set the app owner. <small>NOTE: You will need a verified account in order to fully setup the API.</small></li>
        <li>Select <strong>Deploy App.</strong></li>
        <li>After deploying the application, you can verify the application deployed by clicking ‘<strong>View</strong>’ and it will show you a list of RAMP objects.</li>
      </ol>
      <Divider/>
      <Header as="h3">Install Managed Package in Salesforce</Header>
      <p>To get this started, navigate to your Salesforce Org.</p>
      <ol>
        <li>Copy and paste the RAMP package URL: <span className="codeText bubble">/packaging/installPackage.apexp?p0=04t41000002O4I9</span>
        </li>
        <li>Enter the password</li>
        <li>Click <strong>install only for admins</strong>, then click install. </li>
      </ol>
      <p>This step will provision all of our RAMP objects and will only take a few seconds. You will receive an email confirmation once the package is installed.</p>
      <Divider/>
      <Header as="h3">HEROKU Connect Environment Setup</Header>
      <p>After the package is installed, <strong>we'll go back to HEROKU</strong> to connect the Salesforce org to HEROKU.</p>
      <ol>
        <li>Click on the <strong>HEROKU Connect addon</strong> to begin the configuration.</li>
        <li>Next, click <strong>set-up connection</strong>. Our database will be <strong>POSTGRES</strong>.</li>
        <li>You will be prompted to login to Salesforce (SF).</li>
        <li>When you see the message <strong>provisioning the database</strong> you will have to choose your SF environment. Once you login to SF, click <strong>allow</strong> to complete the connection to Salesforce. You can now pull up all of the metadata from the SF org to setup the object/table mappings.</li>
        <li>Click <strong>create mapping</strong>. This will load all the metadata and objects from Salesforce. For demo purposes we will choose a couple RAMP package objects.</li>
        <li>First, find and select the <strong>Organization object</strong>.</li>
        <li>Then, <strong>Select all the fields to sync</strong>, set the <strong>poll frequency</strong>, etc. Click <strong>accelerate polling</strong> for enhanced performance. We use an <em>external ID</em> to update as our <em>unique identifier.</em></li>
        <li><strong>Now we create our field mappings</strong>. If you want to map a field in the database simply click on the <strong>field</strong> and then click <strong>save</strong>. Now we've created our Salesforce schema and our first table in POSTGRES which will be the organization.</li>
      </ol>

      <Divider/>
      <Header as="h3">Local Development Setup</Header>
      <ol>
        <li>Download the Github repository: <span className="codeText bubble">https://github.com/trifinlabs/ramp-api</span></li>
        <li><strong>Create a new repository</strong> either on Github or any other managed repository of your choice (bitbucket, SVN, etc) in order to manage your own RAMP API development.</li>
        <li>Navigate to your local project and create a new file called <strong>.env</strong>.</li>
        <li>Add all of the config variables created in the HEROKU app creation steps to this .env file.</li>
        <li>Run the following commands from the root folder of the project:
          <pre>npm install</pre>
          <small>Installs the ramp secure API and other necessary node packages.</small>
          <pre>npm run cli-win -- discover --allNewModels</pre>
          <small>Sets up the models folder with the ramp objects. This command can be run for any new models that need to be created or added via salesforce.</small>
        </li>
        <li>Run the following command to get help for other CLI commands:
          <pre>npm run cli-win -- help</pre>
        </li>
        <li>Once the commands have been run and the .env file setup, the local API is ready to be started via the following command:
          <pre>npm run start-win</pre>
          <small>If you are on <strong>MacOS</strong> replace all instances of ‘win’ with ‘macos’. If you are on <strong>Linux</strong> remove all instances of ‘win’.</small>
        </li>
        <li>Verify that your local server is running by opening a browser and navigating to <span className="codeText bubble">http://localhost:5000/explorer</span>. You should see all of the current models in the model folder in the API explorer.</li>
      </ol>
      <p>NOTE: As changes are made to the code and need to be redeployed to HEROKU, you will need to setup a deployment pattern on your repository created in Step #2 above (either via HEROKU command line, bitbucket pipelines, codeship, etc).</p>

      <Divider/>
      <Header as="h3">Local Development Walkthrough</Header>
      <p>The local environment has a number of configuration files and packages. This section will walk the user through each of these files and packages to gain a better understanding of the RAMP API and how to develop the API further. Below is an image of all of the potential files and folders that can be added to the API to expand functionality.</p>
      <p><img src="assets/images/ramp-api-file-list.png" alt="ramp api file list" /></p>

      <p>The API is versioned based on a <strong>Node Loopback pattern</strong> and a description of each of these folders can be found on loopback:</p>

      <ol>
        <li>boot: <span className="codeText bubble">https://loopback.io/doc/en/lb2/Defining-boot-scripts.html</span></li>
        <li>components: <span className="codeText bubble">https://loopback.io/doc/en/lb2/LoopBack-components.html</span></li>
        <li>mixins: <span className="codeText bubble">https://loopback.io/doc/en/lb2/Defining-mixins.html</span></li>
        <li>models: <span className="codeText bubble">https://loopback.io/doc/en/lb2/Defining-models.html</span></li>
      </ol>

      <p>All of the files within these folders will be concatenated with standard RAMP API functionality where possible and will override functionality where not.</p>

      <p><strong>Models</strong> are the workhorse and lifeline connection to both the database and Salesforce. They should be generated using the CLI command from the section above. This command runs directly against the database configured in the .env file and will guarantee the model’s properties will match those properties setup on the database columns in POSTGRES. Models contain both a .js and a .json file. The .json file contains a name, options, list of properties (columns), field types, ACLs, hidden fields, etc. The .js file for the model will contain any custom REST endpoints, parsers, etc. If you run the CLI command from the setup above each time a new model needs to be added, the models will also be added to the model-config.json file. If you add the models manually, you will need to add the model to the model-config.json file as well.</p>

      <p>The RAMP API setup also allows for multiple data source integration. By default the HEROKU POSTGRES database datasource is configured for each model created. This datasource is the database provisioned in the initial setup procedure above in HEROKU. You can append more data sources to this as well, such as: file systems (AWS, Azure, etc), databases, in memory, and local file systems. The datasources.json file is where these new data sources can be placed. These data sources, like the folders and packages in the local development environment, are concatenated with the default herokuPostgres datasource and will not overwrite functionality.</p>


    </Fragment>
  )
}


export default RampGuide;
