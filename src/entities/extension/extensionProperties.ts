export type ExtensionProperties = {
  wrapLogMessage: boolean;
  // logMessagePrefix: string;
  logMessageSuffix: string;
  // addSemicolonInTheEnd: boolean;
  // insertEnclosingClass: boolean;
  // insertEnclosingFunction: boolean;
  // insertEmptyLineBeforeLogMessage: boolean;
  // insertEmptyLineAfterLogMessage: boolean;
  // delimiterInsideMessage: string;
  // includeFileNameAndLineNum: boolean;
  // quote: string;
  logType: enumLogType;
  logFunction: string;
};

enum enumLogType {
  d = 'd',
  dd = 'dd',
  ksm = 'ksm',
  var_dump = 'var_dump',
  print_r = 'print_r',
}
