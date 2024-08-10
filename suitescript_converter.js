// suitescript_converter.js

const conversionPatterns = [
  // Record manipulation
  [
    /nlapiLoadRecord\s*\(\s*'(\w+)'\s*,\s*(\w+)\s*\)/g,
    "record.load({type:'$1',id:$2})",
  ],
  [/nlapiCreateRecord\s*\(\s*'(\w+)'\s*\)/g, "record.create({type:'$1'})"],
  [/nlapiSubmitRecord\s*\(\s*(\w+)\s*\)/g, '$1.save()'],
  [
    /nlapiDeleteRecord\s*\(\s*'(\w+)'\s*,\s*(\w+)\s*\)/g,
    "record.delete({type:'$1',id:$2})",
  ],
  [
    /nlapiSubmitField\s*\(\s*'(\w+)'\s*,\s*(\w+)\s*,\s*(\[.*?\])\s*,\s*(\[.*?\])\s*(?:,\s*(\w+))?\s*\)/g,
    'record.submitFields({type: record.Type.$1, id: $2, values: $3, options: {enableSourcing: $4, ignoreMandatoryFields: $5}})',
  ],

  // Field manipulation
  [
    /nlapiGetFieldValue\s*\(\s*'(\w+)'\s*\)/g,
    "record.getValue({fieldId:'$1'})",
  ],
  [
    /nlapiSetFieldValue\s*\(\s*'(\w+)'\s*,\s*'(.+?)'\s*\)/g,
    "record.setValue({fieldId:'$1', value:'$2'})",
  ],
  [/nlapiGetFieldText\s*\(\s*'(\w+)'\s*\)/g, "record.getText({fieldId:'$1'})"],
  [
    /nlapiSetFieldText\s*\(\s*'(\w+)'\s*,\s*'(.+?)'\s*\)/g,
    "record.setText({fieldId:'$1', text:'$2'})",
  ],

  // Sublist manipulation
  [
    /nlapiGetLineItemValue\s*\(\s*'(\w+)'\s*,\s*'(\w+)'\s*,\s*(\d+)\s*\)/g,
    "record.getSublistValue({sublistId:'$1', fieldId:'$2', line:$3})",
  ],
  [
    /nlapiSetLineItemValue\s*\(\s*'(\w+)'\s*,\s*'(\w+)'\s*,\s*(\d+)\s*,\s*'(.+?)'\s*\)/g,
    "record.setSublistValue({sublistId:'$1', fieldId:'$2', line:$3, value:'$4'})",
  ],
  [
    /nlapiInsertLineItem\s*\(\s*'(\w+)'\s*,\s*(\d+)\s*\)/g,
    "record.insertLine({sublistId:'$1', line:$2})",
  ],
  [
    /nlapiRemoveLineItem\s*\(\s*'(\w+)'\s*,\s*(\d+)\s*\)/g,
    "record.removeLine({sublistId:'$1', line:$2})",
  ],

  // Search functions
  [
    /nlapiSearchRecord\s*\(\s*'(\w+)'\s*,\s*'(\w+)'\s*,\s*(\[.*?\])\s*,\s*(\[.*?\])\s*\)/g,
    "search.create({type:'$1', filters:$3, columns:$4}).run().getRange({start: 0, end: 1000})",
  ],
  [
    /nlapiSearchRecord\s*\(\s*'(\w+)'\s*,\s*(null)\s*,\s*(\[.*?\])\s*\)/g,
    "search.create({type:'$1', filters:$3}).run().getRange({start: 0, end: 1000})",
  ],
  [
    /nlapiSearchRecord\s*\(\s*'(\w+)'\s*,\s*(null)\s*\)/g,
    "search.create({type:'$1'}).run().getRange({start: 0, end: 1000})",
  ],

  // Record references
  [
    /nlapiCopyRecord\s*\(\s*'(\w+)'\s*,\s*(\w+)\s*\)/g,
    "record.copy({type:'$1', id:$2})",
  ],

  // Logging
  // Logging
  [
    /nlapiLogExecution\s*\(\s*'DEBUG'\s*,\s*'(.+?)'\s*,\s*(.+?)\s*\)/g,
    "log.debug('$1', $2)",
  ],
  [
    /nlapiLogExecution\s*\(\s*'AUDIT'\s*,\s*'(.+?)'\s*,\s*(.+?)\s*\)/g,
    "log.audit('$1', $2)",
  ],
  [
    /nlapiLogExecution\s*\(\s*'ERROR'\s*,\s*'(.+?)'\s*,\s*(.+?)\s*\)/g,
    "log.error('$1', $2)",
  ],

  // Utilities
  [
    /nlapiLookupField\s*\(\s*'(\w+)'\s*,\s*(\w+)\s*,\s*'(\w+)'\s*\)/g,
    "search.lookupFields({type:'$1', id:$2, columns:['$3']})['$3']",
  ],
  [
    /nlapiLookupField\s*\(\s*'(\w+)'\s*,\s*(\w+)\s*,\s*(\[.*?\])\s*\)/g,
    "search.lookupFields({type:'$1', id:$2, columns:$3})",
  ],
  [
    /nlapiSendEmail\s*\(\s*(\d+)\s*,\s*(\d+)\s*,\s*'(.+?)'\s*,\s*'(.+?)'\s*,\s*(\[.*?\])?\s*,\s*(\[.*?\])?\s*,\s*(\w+)?\s*,\s*(.+?)?\s*\)/g,
    "email.send({author:$1, recipients:$2, subject:'$3', body:'$4', cc:$5, bcc:$6, replyTo:$7, attachments:$8})",
  ],
  [
    /nlapiFormatDate\s*\(\s*(.+?)\s*\)/g,
    'format.format({value:$1, type:format.Type.DATE})',
  ],
  [
    /nlapiFormatCurrency\s*\(\s*(.+?)\s*\)/g,
    'format.format({value:$1, type:format.Type.CURRENCY})',
  ],
];

/**
 * Function to convert SuiteScript 1.0 code to SuiteScript 2.0.
 *
 * @param {string} script - The SuiteScript 1.0 code to be converted.
 * @returns {string} - The converted SuiteScript 2.0 code.
 */
function convertSuiteScript(script) {
  conversionPatterns.forEach(([pattern, replacement]) => {
    script = script.replace(pattern, replacement);
  });
  return script;
}

module.exports = convertSuiteScript;
