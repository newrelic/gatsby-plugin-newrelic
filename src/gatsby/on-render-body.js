import React from 'react';

function getCdnFromInstrumentationType(instrumentationType) {
  const lite = 'http://js-agent.newrelic.com/nr-loader-rum-current.min.js';
  const pro = 'https://js-agent.newrelic.com/nr-loader-full-current.min.js';
  const spa = 'https://js-agent.newrelic.com/nr-loader-spa-current.min.js';

  switch (instrumentationType) {
    case 'spa':
      return spa;
    case 'pro':
      return pro;
    case 'lite':
      return lite;
    default:
      console.warn('Unsupported Instrumentation Type set, please provide "spa", "pro", or "lite"');
      return spa;
  }
}

export default ({ setHeadComponents }, pluginOptions) => {
  const {
    configs: userConfigs
  } = pluginOptions;

  const requiredConfigs = {
    accountId: '',
    trustKey: '',
    agentID: '',
    licenseKey: '',
    applicationID: '',
    beacon: 'bam.nr-data.net',
    errorBeacon: 'bam.nr-data.net',
    instrumentationType: 'spa' // Options are 'lite', 'pro', 'spa'
  };

  const env = process.env.GATSBY_NEWRELIC_ENV;

  if (!env) {
    // TO DO - Error/Warn about envVariable not being set
    console.warn('GATSBY_NEWRELIC_ENV env variable is not set');
    return;
  }

  const userEnvConfig = userConfigs[env] ? userConfigs[env] : userConfigs;
  if (!userEnvConfig) {
    // TO DO - Error/Warn about missing config option for a given env
    console.warn('gatsby-plugin-newrelic is missing the configuration for the ' + env + ' environment');
    return;
  }

  const allowedInstrumentationTypes = ['lite', 'pro', 'spa'];
  const itExists = allowedInstrumentationTypes.find(
    i => i === userEnvConfig.instrumentationType
  );
  if (!itExists) {
    // TO DO - Error/Warn about wrong instrumentation type
  }

  const options = { ...requiredConfigs, ...userEnvConfig };
  const instrumentationType = options.instrumentationType;

  const emptyOptions = Object.entries(options).filter(([, v]) => v === '');
  if (emptyOptions.length > 0) {
    // TO DO - Warn about missing options
  }

  const init = `
    window.NREUM||(NREUM={});
    NREUM.init={distributed_tracing:{enabled:false},privacy:{cookies_enabled:true}};
  `;

  const loader = getCdnFromInstrumentationType(instrumentationType);

  const configs = `
    ;NREUM.loader_config={accountID:"${options.accountId}",trustKey:"${options.trustKey}",agentID:"${options.agentID}",licenseKey:"${options.licenseKey}",applicationID:"${options.applicationID}"}
    ;NREUM.info={beacon:"${options.beacon}",errorBeacon:"${options.errorBeacon}",licenseKey:"${options.licenseKey}",applicationID:"${options.applicationID}",sa:1}
  `;

  setHeadComponents([
    // Initialize NR namespace
    <script
      key="gatsby-plugin-newrelic-init"
      dangerouslySetInnerHTML={{
        __html: init
      }}
    />,

    // Load aggregator
    <script
      key="gatsby-plugin-newrelic-loader"
      src={loader}
    />,

    // Configure
    <script
      key="gatsby-plugin-newrelic-configs"
      dangerouslySetInnerHTML={{
        __html: configs
      }}
    />
  ]);
};
