import React from 'react';
import { liteAgent, proAgent, proAndSpaAgent } from '../browser-agents/latest';

export default ({ setHeadComponents }, pluginOptions) => {
  const {
    config: userConfigs
  } = pluginOptions;

  const requiredConfig = {
    accountId: '',
    trustKey: '',
    agentID: '',
    licenseKey: '',
    applicationID: '',
    beacon: 'bam.nr-data.net',
    errorBeacon: 'bam.nr-data.net',
    instrumentationType: 'lite' // Options are 'lite', 'pro', 'proAndSPA'
  };

  const env = process.env.GATSBY_NEWRELIC_ENV;

  const userEnvConfig = env && userConfigs[env] ? userConfigs[env] : userConfigs;
  if (!userEnvConfig) {
    console.warn(`gatsby-plugin-newrelic is missing the configuration${env ? ` for the ${env} environment` : ''}`);
    return;
  }

  if (env) {
    console.warn('gatsby-plugin-newrelic has deprecated using GATSBY_NEWRELIC_ENV for multiple environments');
  }

  const allowedInstrumentationTypes = ['lite', 'pro', 'proAndSPA'];
  const itExists = allowedInstrumentationTypes.find(
    i => i === userEnvConfig.instrumentationType
  );
  if (!itExists) {
    // TO DO - Error/Warn about wrong instrumentation type
  }

  const options = { ...requiredConfig, ...userEnvConfig };
  const instrumentationType = options.instrumentationType;

  const emptyOptions = Object.entries(options).filter(([, v]) => v === '');
  if (emptyOptions.length > 0) {
    // TO DO - Warn about missing options
  }

  let agent;
  if (instrumentationType === 'lite') {
    agent = liteAgent;
  }

  if (instrumentationType === 'pro') {
    agent = proAgent;
  }

  if (instrumentationType === 'proAndSPA') {
    agent = proAndSpaAgent;
  }

  const configs = `
    ;NREUM.loader_config={accountID:"${options.accountId}",trustKey:"${options.trustKey}",agentID:"${options.agentID}",licenseKey:"${options.licenseKey}",applicationID:"${options.applicationID}"}
    ;NREUM.info={beacon:"${options.beacon}",errorBeacon:"${options.errorBeacon}",licenseKey:"${options.licenseKey}",applicationID:"${options.applicationID}",sa:1}
  `;

  if (agent && configs) {
    setHeadComponents([
      <script
        key="gatsby-plugin-newrelic"
        dangerouslySetInnerHTML={{
          __html: agent + configs
        }}
      />
    ]);
  }
};
