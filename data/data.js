const docusign = require("docusign-esign");
const restApi = docusign.ApiClient.RestApi;

const basePath = restApi.BasePath.DEMO;

const user = {
  accessToken:
    "eyJ0eXAiOiJNVCIsImFsZyI6IlJTMjU2Iiwia2lkIjoiNjgxODVmZjEtNGU1MS00Y2U5LWFmMWMtNjg5ODEyMjAzMzE3In0.AQoAAAABAAUABwAAiWQlxjnaSAgAAMmHMwk62kgCAIFsk6p513dHkN4M1e0dSsAVAAEAAAAYAAEAAAAFAAAADQAkAAAAMWY0ZDhjYWEtMGIxNC00ZWNhLThkZjItMTdiZWUyZmQwOTI2IgAkAAAAMWY0ZDhjYWEtMGIxNC00ZWNhLThkZjItMTdiZWUyZmQwOTI2MACAK8CjxDnaSDcAha2GJRkoIEGaJ6b9bq6DVA.H91Br9ixCwkEHhoKC4VT1uCKEhep8kGTqkKrdKLbArqi8-jDNpMD1V1WHOleKIwoTAibOzQsV7RubR8KQnBoP_Hho8xBfgYq0ed9OC825fEjs6KiX9TTaMqARmtTzILjm7-fvTbLplYIjcU3HepYJLyol2yndJnoRYBlYV-uBdiQvE0XmBW4Xa-_qbB6WI1BdrsRacyZxPsuij-WsCYZwpyFczdToK5YhzjycUvz-xSQEJLpWtDHrS9OL6ZSO6v01L1hwFbHMzI9CgaNGJwJic9aOtBZf5kLxEL5CpKTzJ7cfar7sOFhl_1ONFh-sDhOytGutcZvV0LJ8bgBTNCotw",
  basePath: basePath,
  accountId:
    "7e1b7492-5a6c-4d24-bce2-1e679cc28e27",
     /*   documentId: "combined", //combined
envelopeDocuments: [
  {
    authoritativeCopy: "false",
    availableDocumentTypes: [
      {
        isDefault: "true",
        type: "electronic",
      },
    ],
    display: "inline",
    documentId: "1",
    documentIdGuid: "01a5bb58-e208-41a0-898a-a2e6cc844176",
    includeInDownload: "true",
    name: "Order acknowledgement",
    order: "1",
    pages: [
      {
        dpi: "72",
        height: "792",
        pageId: "4540d377-12ff-423b-852b-3dcfdc5f88a2",
        sequence: "1",
        width: "612",
      },
    ],
    signerMustAcknowledge: "no_interaction",
    templateRequired: "false",
    type: "content",
    uri: "/envelopes/20600305-1642-48ad-b254-ade082b13677/documents/1",
  },
  {
    authoritativeCopy: "false",
    availableDocumentTypes: [
      {
        isDefault: "true",
        type: "electronic",
      },
    ],
    display: "inline",
    documentId: "2",
    documentIdGuid: "12523710-88f8-4d94-822a-554c71a25467",
    includeInDownload: "true",
    name: "Battle Plan",
    order: "2",
    pages: [
      {
        dpi: "72",
        height: "792",
        pageId: "1224bbb6-1964-47d1-88fd-ff1582755a9f",
        sequence: "1",
        width: "612",
      },
    ],
    signerMustAcknowledge: "no_interaction",
    templateRequired: "false",
    type: "content",
    uri: "/envelopes/20600305-1642-48ad-b254-ade082b13677/documents/2",
  },
  {
    authoritativeCopy: "false",
    availableDocumentTypes: [
      {
        isDefault: "true",
        type: "electronic",
      },
    ],
    display: "inline",
    documentId: "3",
    documentIdGuid: "76261727-fd03-498a-99cf-7ecebc191333",
    includeInDownload: "true",
    name: "Lorem Ipsum",
    order: "3",
    pages: [
      {
        dpi: "72",
        height: "792",
        pageId: "041444b8-ea31-4c9b-8df8-f3199a5cc534",
        sequence: "1",
        width: "612",
      },
    ],
    signerMustAcknowledge: "no_interaction",
    templateRequired: "false",
    type: "content",
    uri: "/envelopes/20600305-1642-48ad-b254-ade082b13677/documents/3",
  },
  {
    authoritativeCopy: "false",
    availableDocumentTypes: [
      {
        isDefault: "true",
        type: "electronic",
      },
    ],
    display: "inline",
    documentId: "certificate",
    documentIdGuid: "65a83e4d-35a7-4b68-8c86-0fbfec97f5ef",
    includeInDownload: "true",
    name: "Summary",
    order: "999",
    signerMustAcknowledge: "no_interaction",
    templateRequired: "false",
    type: "summary",
    uri: "/envelopes/20600305-1642-48ad-b254-ade082b13677/documents/certificate",
  },
],
*/
};

module.exports = user;
