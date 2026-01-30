import React from "react";

export default ({ setHeadComponents }, pluginOptions) => {
  const { configs: userConfigs, config: userConfig } = pluginOptions;

  const requiredConfig = {
    accountId: "",
    trustKey: "",
    agentID: "",
    licenseKey: "",
    applicationID: "",
    beacon: "bam.nr-data.net",
    errorBeacon: "bam.nr-data.net",
    instrumentationType: "lite", // Options are 'lite', 'pro', 'proAndSPA'
    browserAgentVersion: '1.x.x' // Can provide a specific version, e.g. 1.298.0.  No version will default to 1.x.x, e.g. the lastest stable version
  };

  const env = process.env.GATSBY_NEWRELIC_ENV;

  const userEnvConfig = env ? userConfigs[env] : userConfig;
  if (!userEnvConfig) {
    console.warn(
      `gatsby-plugin-newrelic is missing the configuration${
        env ? ` for the ${env} environment` : ""
      }`
    );
    return;
  }

  if (env) {
    console.warn(
      "gatsby-plugin-newrelic has deprecated using GATSBY_NEWRELIC_ENV for multiple environments"
    );
  }

  const allowedInstrumentationTypes = ["lite", "pro", "proAndSPA"];
  const itExists = allowedInstrumentationTypes.find(
    (i) => i === userEnvConfig.instrumentationType
  );
  if (!itExists) {
    // TO DO - Error/Warn about wrong instrumentation type
  }

  const options = { ...requiredConfig, ...userEnvConfig };
  let loaderType = 'rum'
  else if (options.instrumentationType === 'pro') loaderType = 'full';
  else if (options.instrumentationType === 'proAndSPA') loaderType = 'spa';

  const emptyOptions = Object.entries(options).filter(([, v]) => v === "");
  if (emptyOptions.length > 0) {
    // TO DO - Warn about missing options
  }

  // --- Possible Browser > Application Settings in the NR1 UI and their options ---
  // Do not supply hard coded defaults for missing options. If the key is not provided, let the browser agent handle those values.
  let init;
  if (options?.settings) {
    const {
      distributed_tracing: dt,
      session_replay: sr,
      privacy,
      ajax,
    } = options?.settings;

    // 'Distributed tracing'
    let distributedTracingInitString = "";

    if (dt?.enabled) {
      const distributedTracingConfigObject = {
        enabled: `enabled:${dt.enabled}`,
        exclude_newrelic_header: dt.exclude_newrelic_header
          ? `exclude_newrelic_header:${dt.exclude_newrelic_header}`
          : "",
        cors_use_newrelic_header: dt.cors_use_newrelic_header
          ? `cors_use_newrelic_header:${dt.cors_use_newrelic_header}`
          : "",
        cors_use_tracecontext_headers: dt.cors_use_tracecontext_headers
          ? `cors_use_tracecontext_headers:${dt.cors_use_tracecontext_headers}`
          : "",
        allowed_origins: dt.allowed_origins
          ? `dt.allowed_origins:${JSON.stringify(dt.allowed_origins)}`
          : "",
      };

      distributedTracingInitString = `distributed_tracing:{${Object.values(
        distributedTracingConfigObject
      )
        .filter((v) => v !== "")
        .join(",")}},`;
    }

    // 'Session Replay'
    let sessionReplayInitString = "";

    if (sr?.enabled) {
      let maskOptionsString = "";
      const mOption = sr.mask_input_options;

      // if user selects custom privacy settings:
      const maskOptionsObject = {
        color: mOption?.color ? `color:${mOption?.color}` : "",
        date: mOption?.date ? `date:${mOption?.date}` : "",
        datetime_local: mOption?.datetime_local
          ? `datetime_local:${mOption?.datetime_local}`
          : "",
        email: mOption?.email ? `email:${mOption?.email}` : "",
        month: mOption?.month ? `month:${mOption?.month}` : "",
        number: mOption?.number ? `number:${mOption?.number}` : "",
        range: mOption?.range ? `range:${mOption?.range}` : "",
        search: mOption?.search ? `search:${mOption?.search}` : "",
        tel: mOption?.tel ? `tel:${mOption?.tel}` : "",
        text: mOption?.text ? `text:${mOption?.text}` : "",
        time: mOption?.time ? `time:${mOption?.time}` : "",
        url: mOption?.url ? `url:${mOption?.url}` : "",
        week: mOption?.week ? `week:${mOption?.week}` : "",
        text_area: mOption?.text_area ? `text_area:${mOption?.text_area}` : "",
        select: mOption?.select ? `select:${mOption?.select}` : "",
      };

      maskOptionsString = `${Object.values(maskOptionsObject)
        .filter((v) => v !== "")
        .join(",")}`;

      const sessionReplayConfigObject = {
        enabled: sr.enabled ? `enabled:${sr.enabled}` : "",
        block_selector: sr.block_selector
          ? `block_selector:'${sr.block_selector}'`
          : "",
        mask_text_selector: sr.mask_text_selector
          ? `mask_text_selector:'${sr.mask_text_selector}'`
          : "",
        sampling_rate: sr.sampling_rate
          ? `sampling_rate:${sr.sampling_rate}`
          : "",
        error_sampling_rate: sr.error_sampling_rate
          ? `error_sampling_rate:${sr.error_sampling_rate}`
          : "",
        mask_all_inputs: sr.mask_all_inputs
          ? `mask_all_inputs:${sr.mask_all_inputs}`
          : "",
        collect_fonts: sr.collect_fonts
          ? `collect_fonts:${sr.collect_fonts}`
          : "",
        inline_images: sr.inline_images
          ? `inline_images:${sr.inline_images}`
          : "",
        inline_stylesheet: sr.inline_stylesheet
          ? `inline_stylesheet:${sr.inline_stylesheet}`
          : "",
        mask_input_options:
          maskOptionsString.length > 0
            ? `mask_input_options:{${maskOptionsString}}`
            : "",
      };

      sessionReplayInitString = `session_replay:{${Object.values(
        sessionReplayConfigObject
      )
        .filter((v) => v !== "")
        .join(",")}},`;
    }

    // 'Browser Settings'
    const privacyInitString = privacy?.cookies_enabled
      ? `privacy:{cookies_enabled:${privacy?.cookies_enabled}},`
      : "";

    // 'AJAX request deny list'
    const ajaxInitString = ajax?.deny_list
      ? `ajax:{deny_list:${JSON.stringify(ajax?.deny_list)}},`
      : "";

    init =
      sessionReplayInitString ||
      distributedTracingInitString ||
      privacyInitString ||
      ajaxInitString
        ? `;window.NREUM||(NREUM={});NREUM.init={${sessionReplayInitString}${distributedTracingInitString}${privacyInitString}${ajaxInitString}};`
        : "";
  }

  const configs = `
    ;NREUM.loader_config={accountID:"${options.accountId}",trustKey:"${options.trustKey}",agentID:"${options.agentID}",licenseKey:"${options.licenseKey}",applicationID:"${options.applicationID}"}
    ;NREUM.info={beacon:"${options.beacon}",errorBeacon:"${options.errorBeacon}",licenseKey:"${options.licenseKey}",applicationID:"${options.applicationID}",sa:1}
  `;

  if (agent && configs && loaderType) {
    setHeadComponents([
      <script
        key="nr-init"
        dangerouslySetInnerHTML={{
          __html: init,
        }}
      />,
      <script
        key="nr-configs"
        dangerouslySetInnerHTML={{
          __html: configs,
        }}
      />,
      <script
        key="nr-agent"
        src={`https://js-agent.newrelic.com/nr-loader-${loaderType}-${options.browserAgentVersion}.min.js`}
      />
    ]);
  }
};
