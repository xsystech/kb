const github = 'https://github.com/pactumjs/pactum';
const releases = 'https://github.com/pactumjs/pactum/releases';
const packages = 'https://www.npmjs.com/package/pactum';
const twitter = 'https://twitter.com/pactumjs';
const telegram = 'https://t.me/xsystech_ru';

import { createWriteStream } from 'node:fs';
import { resolve } from 'node:path';
import { defineConfig } from 'vitepress';

const links: Array<{url: string, lastmod?: number}> = []

const home_sidebar = [
  {
    text: 'Документация Director',
    collapsed: false,
    items: [
      { text: 'Технические характеристики', link: '/datasheet.html' },
      { text: 'Руководство по установке', link: '/install_guide_v11.html' },
      { text: 'Руководство Администратора', link: '/admin_guide_v11.html' },
      { text: 'Руководство Пользователя', link: '/user_guide_v11.html' }
    ]
  },
  {
    text: 'Общие данные',
    collapsed: false,
    items: [
      
      { text: 'Управление жизненным циклом', link: '/lifecycle.html' },
      { text: 'Регламент технческой поддержки', link: '/support.html' }
    ]
  }
];

const api_sidebar = [
  {
    text: '🪄 Requests',
    collapsed: false,
    items: [
      { text: 'spec', link: '/api/requests/spec', },
      { text: 'withMethod', link: '/api/requests/withMethod', },
      { text: 'withPath', link: '/api/requests/withPath', },
      { text: 'withPathParams', link: '/api/requests/withPathParams', },
      { text: 'withQueryParams', link: '/api/requests/withQueryParams', },
      { text: 'withHeaders', link: '/api/requests/withHeaders', },
      { text: 'withCookies', link: '/api/requests/withCookies', },
      { text: 'withAuth', link: '/api/requests/withAuth', },
      { text: 'withBearerToken', link: '/api/requests/withBearerToken', },
      { text: 'withCore', link: '/api/requests/withCore', },
      { text: 'withBody', link: '/api/requests/withBody', },
      { text: 'withJson', link: '/api/requests/withJson', },
      { text: 'withForm', link: '/api/requests/withForm', },
      { text: 'withFile', link: '/api/requests/withFile', },
      { text: 'withMultiPartFormData', link: '/api/requests/withMultiPartFormData', },
      { text: 'withGraphQLQuery', link: '/api/requests/withGraphQLQuery', },
      { text: 'withGraphQLVariables', link: '/api/requests/withGraphQLVariables', },
      { text: 'withRequestTimeout', link: '/api/requests/withRequestTimeout', },
      { text: 'withCompression', link: '/api/requests/withCompression', },
      { text: 'withFollowRedirects', link: '/api/requests/withFollowRedirects', },
      { text: 'inspect', link: '/api/requests/inspect', },
      { text: 'retry', link: '/api/requests/retry', },
      { text: 'returns', link: '/api/requests/returns', },
      { text: 'stores', link: '/api/requests/stores', },
      { text: 'save', link: '/api/requests/save', },
      { text: 'records', link: '/api/requests/records', },
      { text: 'toss', link: '/api/requests/toss', },
      { text: 'wait', link: '/api/requests/wait', },
      { text: 'use', link: '/api/requests/use', },
      { text: 'name', link: '/api/requests/name', },
      { text: 'flow', link: '/api/requests/flow', },
      { text: 'useLogLevel', link: '/api/requests/useLogLevel', },
      { text: 'setState', link: '/api/requests/setState', },
    ]
  },
  {
    text: '📨 Response Defaults',
    collapsed: false,
    items: [
      { text: 'setDefaultExpectHeaders', link: '/api/responses/setDefaultExpectHeaders', },
      { text: 'setDefaultExpectResponseTime', link: '/api/responses/setDefaultExpectResponseTime', },
      { text: 'setDefaultExpectStatus', link: '/api/responses/setDefaultExpectStatus', },
      { text: 'setDefaultExpectHandlers', link: '/api/responses/setDefaultExpectHandlers', },
      { text: 'removeDefaultExpectHeader', link: '/api/responses/removeDefaultExpectHeader', },
      { text: 'removeDefaultExpectHeaders', link: '/api/responses/removeDefaultExpectHeaders', },
      { text: 'removeDefaultExpectHandlers', link: '/api/responses/removeDefaultExpectHandlers', }         
    ]
  },
  {
    text: '🧶 Assertions',
    collapsed: false,
    items: [
      { text: 'expectStatus', link: '/api/assertions/expectStatus', },
      { text: 'expectHeader', link: '/api/assertions/expectHeader', },
      { text: 'expectHeaderContains', link: '/api/assertions/expectHeaderContains', },
      { text: 'expectCookies', link: '/api/assertions/expectCookies', },
      { text: 'expectCookiesLike', link: '/api/assertions/expectCookiesLike', },
      { text: 'expectJson', link: '/api/assertions/expectJson', },
      { text: 'expectJsonLike', link: '/api/assertions/expectJsonLike', },
      { text: 'expectJsonMatch', link: '/api/assertions/expectJsonMatch', },
      { text: 'expectJsonMatchStrict', link: '/api/assertions/expectJsonMatchStrict', },
      { text: 'expectJsonSchema', link: '/api/assertions/expectJsonSchema', },
      { text: 'expectJsonLength', link: '/api/assertions/expectJsonLength', },
      { text: 'expectJsonSnapshot', link: '/api/assertions/expectJsonSnapshot', },
      { text: 'updateSnapshot', link: '/api/assertions/updateSnapshot', },
      { text: 'expectBody', link: '/api/assertions/expectBody', },
      { text: 'expectBodyContains', link: '/api/assertions/expectBodyContains', },
      { text: 'expectResponseTime', link: '/api/assertions/expectResponseTime', },
      { text: 'expectError', link: '/api/assertions/expectError', },
      { text: 'expect', link: '/api/assertions/expect', }          
    ]
  },
  {
    text: '🔩 Utils',
    collapsed: false,
    items: [
      { text: 'clone', link: '/api/utils/clone', },
      { text: 'parse', link: '/api/utils/parse', },
      { text: 'sleep', link: '/api/utils/sleep' }
    ]
  },
  {
    text: '🖇️ Matching',
    collapsed: false,
    items: [
      { text: 'like', link: '/api/matching/like', },
      { text: 'eachLike', link: '/api/matching/eachLike', },
      { text: 'any', link: '/api/matching/any', },
      { text: 'regex', link: '/api/matching/regex', },
      { text: 'expression', link: '/api/matching/expression', },
      { text: 'email', link: '/api/matching/email', },
      { text: 'uuid', link: '/api/matching/uuid', },
      { text: 'string', link: '/api/matching/string', },
      { text: 'includes', link: '/api/matching/includes', },
      { text: 'oneOf', link: '/api/matching/oneOf', },
      { text: 'int', link: '/api/matching/int', },
      { text: 'float', link: '/api/matching/float', },
      { text: 'gt', link: '/api/matching/gt', },
      { text: 'gte', link: '/api/matching/gte', },
      { text: 'lt', link: '/api/matching/lt', },
      { text: 'lte', link: '/api/matching/lte', },
      { text: 'notIncludes', link: '/api/matching/notIncludes', },
      { text: 'notNull', link: '/api/matching/notNull', },
      { text: 'notEquals', link: '/api/matching/notEquals', }      
    ]
  },
  {
    text: '⚒️ Settings',
    collapsed: false,
    items: [
      { text: 'setBaseUrl', link: '/api/settings/setBaseUrl', },
      { text: 'setDefaultHeaders', link: '/api/settings/setDefaultHeaders', },
      { text: 'setDefaultTimeout', link: '/api/settings/setDefaultTimeout', },
      { text: 'setLogLevel', link: '/api/settings/setLogLevel', },
      { text: 'setLogger', link: '/api/settings/setLogger', },
      { text: 'setJsonLikeAdapter', link: '/api/settings/setJsonLikeAdapter', },
      { text: 'setJsonMatchAdapter', link: '/api/settings/setJsonMatchAdapter', },
      { text: 'setJsonSchemaAdapter', link: '/api/settings/setJsonSchemaAdapter', },
      { text: 'setFormDataAdapter', link: '/api/settings/setFormDataAdapter', },
      { text: 'setAssertHandlerStrategy', link: '/api/settings/setAssertHandlerStrategy', },
      { text: 'setAssertExpressionStrategy', link: '/api/settings/setAssertExpressionStrategy', },
      { text: 'setCaptureHandlerStrategy', link: '/api/settings/setCaptureHandlerStrategy', },
      { text: 'setSnapshotDirectoryPath', link: '/api/settings/setSnapshotDirectoryPath', },
      { text: 'setReporterAutoRun', link: '/api/settings/setReporterAutoRun', },
      { text: 'setRequestDefaultRetryCount', link: '/api/settings/setRequestDefaultRetryCount', },
      { text: 'setRequestDefaultRetryDelay', link: '/api/settings/setRequestDefaultRetryDelay', },
      { text: 'setDataDirectory', link: '/api/settings/setDataDirectory', },    
    ]
  },
  {
    text: '🧰 Handlers',
    collapsed: false,
    items: [
      { text: 'addAssertHandler', link: '/api/handlers/addAssertHandler', },
      { text: 'addCaptureHandler', link: '/api/handlers/addCaptureHandler', },
      { text: 'addDataFuncHandler', link: '/api/handlers/addDataFuncHandler', },
      { text: 'addExpectHandler', link: '/api/handlers/addExpectHandler', },
      { text: 'addInteractionHandler', link: '/api/handlers/addInteractionHandler', },
      { text: 'addRetryHandler', link: '/api/handlers/addRetryHandler', },
      { text: 'addSpecHandler', link: '/api/handlers/addSpecHandler', },
      { text: 'addStateHandler', link: '/api/handlers/addStateHandler', },
      { text: 'addWaitHandler', link: '/api/handlers/addWaitHandler', }      
    ]
  },
  {
    text: '🎭 Mock',
    collapsed: false,
    items: [
      { text: 'setDefaults', link: '/api/mock/setDefaults', },
      { text: 'start', link: '/api/mock/start', },
      { text: 'stop', link: '/api/mock/stop', },
      { text: 'interaction', link: '/api/mock/interaction', },
      { text: 'addInteraction', link: '/api/mock/addInteraction', },
      { text: 'useInteraction', link: '/api/mock/useInteraction', },
      { text: 'clearInteractions', link: '/api/mock/clearInteractions', },
      { text: 'getInteraction', link: '/api/mock/getInteraction', },
      { text: 'removeInteraction', link: '/api/mock/removeInteraction', },
      { text: 'useRemoteServer', link: '/api/mock/useRemoteServer', }      
    ]
  },
  {
    text: '💼 Stash',
    collapsed: false,
    items: [
      { text: 'addDataTemplate', link: '/api/stash/addDataTemplate', },
      { text: 'getDataTemplate', link: '/api/stash/getDataTemplate', },
      { text: 'addDataMap', link: '/api/stash/addDataMap', },
      { text: 'getDataMap', link: '/api/stash/getDataMap', },
      { text: 'loadData', link: '/api/stash/loadData', }      
    ]
  },
  {
    text: '🎡 Fuzz',
    collapsed: false,
    items: [
      { text: 'fuzz', link: '/api/fuzz/fuzz', },
      { text: 'onSwagger', link: '/api/fuzz/onSwagger', },
      { text: 'withBatchSize', link: '/api/fuzz/withBatchSize', }      
    ]
  },
];

/**
 * @type {import('vitepress').UserConfig}
 */
const config = defineConfig({
  title: 'XSYSTECH KB',
  description: 'База знаний XSYSTECH',
  lastUpdated: true,
  ignoreDeadLinks: true,
  head: [
    ['meta', { property: 'og:title', content: 'XSYSTECH KB' }],
    ['meta', { property: 'og:description', content: 'База знаний XSYSTECH' }],
    ['meta', { property: 'og:image', content: 'https://static.tildacdn.com/tild3035-3132-4632-a630-323561373565/1126228.png' }],
  ],
  themeConfig: {
    logo: 'https://static.tildacdn.com/tild3035-3132-4632-a630-323561373565/1126228.png',
    search: {
      provider: 'local'
    },

    nav: [
      { text: '🏠 Home', link: '/readme.html', activeMatch: '/readme.html'},
      
    ],

    sidebar: {
        '/': home_sidebar,
    },
    footer: {
      message: 'XSYSTECH.RU',
      copyright: 'Copyright © 2025'
    },
  },
  markdown: {
    lineNumbers: true
  },
  transformHtml: (_, id, { pageData }) => {
    if (!/[\\/]404\.html$/.test(id))
      links.push({
        // you might need to change this if not using clean urls mode
        url: pageData.relativePath.replace(/((^|\/)index)?\.md$/, '$2'),
        lastmod: pageData.lastUpdated
      })
  }

})

export default config
